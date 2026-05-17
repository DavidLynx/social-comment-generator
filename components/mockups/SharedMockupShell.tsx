import type { ReactNode } from "react";
import Image from "next/image";

type SharedMockupShellProps = {
  children: ReactNode;
  watermark?: boolean;
  watermarkText?: string;
  className?: string;
};

export function SharedMockupShell({
  children,
  watermark = false,
  watermarkText = "Made with Commentra",
  className = "",
}: SharedMockupShellProps) {
  return (
    <div className={`relative bg-transparent ${className}`}>
      {children}
      {watermark ? (
        <div className="pointer-events-none absolute bottom-2 right-3">
          <Image
            alt={watermarkText}
            className="h-4 w-auto opacity-60"
            height={16}
            src="/assets/icons/commentra-logo.svg"
            unoptimized
            width={16}
          />
        </div>
      ) : null}
    </div>
  );
}
