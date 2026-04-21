-- Social Comment Generator - Phase 1 Supabase schema
-- Run this in the Supabase SQL editor.

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  username text,
  plan text not null default 'free' check (plan in ('free', 'premium')),
  created_at timestamptz not null default now()
);

create table if not exists public.daily_usage (
  user_id uuid not null references auth.users(id) on delete cascade,
  usage_date date not null default current_date,
  count integer not null default 0 check (count >= 0),
  updated_at timestamptz not null default now(),
  primary key (user_id, usage_date)
);

create index if not exists daily_usage_user_date_idx
  on public.daily_usage (user_id, usage_date desc);

alter table public.profiles enable row level security;
alter table public.daily_usage enable row level security;

drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own"
  on public.profiles
  for select
  using (auth.uid() = id);

drop policy if exists "profiles_insert_own" on public.profiles;
create policy "profiles_insert_own"
  on public.profiles
  for insert
  with check (auth.uid() = id);

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own"
  on public.profiles
  for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

drop policy if exists "daily_usage_select_own" on public.daily_usage;
create policy "daily_usage_select_own"
  on public.daily_usage
  for select
  using (auth.uid() = user_id);

drop policy if exists "daily_usage_insert_own" on public.daily_usage;
create policy "daily_usage_insert_own"
  on public.daily_usage
  for insert
  with check (auth.uid() = user_id);

drop policy if exists "daily_usage_update_own" on public.daily_usage;
create policy "daily_usage_update_own"
  on public.daily_usage
  for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create or replace function public.set_daily_usage_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists daily_usage_set_updated_at on public.daily_usage;
create trigger daily_usage_set_updated_at
before update on public.daily_usage
for each row
execute function public.set_daily_usage_updated_at();
