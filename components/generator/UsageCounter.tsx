type UsageCounterProps = {
  label: string;
  limit: number;
};

export function UsageCounter({ label, limit }: UsageCounterProps) {
  return (
    <p className="mt-1 text-sm text-zinc-500">
      {label}: <span className="text-zinc-300">0 / {limit}</span>
    </p>
  );
}
