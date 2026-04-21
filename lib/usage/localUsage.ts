const key = "scg:anonymous-usage";

type LocalUsage = {
  date: string;
  count: number;
};

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

export function readAnonymousUsage() {
  if (typeof window === "undefined") {
    return { count: 0, date: todayKey() };
  }

  try {
    const parsed = JSON.parse(window.localStorage.getItem(key) ?? "null") as
      | LocalUsage
      | null;

    if (!parsed || parsed.date !== todayKey()) {
      return { count: 0, date: todayKey() };
    }

    return parsed;
  } catch {
    return { count: 0, date: todayKey() };
  }
}

export function incrementAnonymousUsage(limit: number) {
  const current = readAnonymousUsage();

  if (current.count >= limit) {
    return { ...current, allowed: false, limit };
  }

  const next = { count: current.count + 1, date: current.date };
  window.localStorage.setItem(key, JSON.stringify(next));

  return { ...next, allowed: true, limit };
}
