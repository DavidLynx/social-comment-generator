import type { ReactNode } from "react";

type SharedMockupShellProps = {
  children: ReactNode;
  watermark?: boolean;
  watermarkText?: string;
  className?: string;
};

export function SharedMockupShell({
  children,
  watermark = false,
  watermarkText = "Made with Social Comment Generator",
  className = "",
}: SharedMockupShellProps) {
  return (
    <div className={`relative bg-transparent ${className}`}>
      {children}
      {watermark ? (
        <div className="pointer-events-none absolute bottom-2 right-3 rounded bg-black/35 px-2 py-1 text-[10px] font-medium text-white/55">
          {watermarkText}
        </div>
      ) : null}
    </div>
  );
}
