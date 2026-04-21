type UsageCounterProps = {
  count: number;
  label: string;
  limit: number;
};

export function UsageCounter({ count, label, limit }: UsageCounterProps) {
  return (
    <p className="mt-1 text-sm text-zinc-500">
      {label}: <span className="text-zinc-300">{count} / {limit}</span>
    </p>
  );
}
