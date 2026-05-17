import type { HTMLAttributes } from "react";
import Image from "next/image";

type BrandLogoProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: "brand" | "icon";
  imageClassName?: string;
};

export function BrandLogo({
  className = "",
  imageClassName = "",
  variant = "brand",
  ...props
}: BrandLogoProps) {
  const src =
    variant === "icon"
      ? "/assets/icons/commentra-logo.svg"
      : "/assets/icons/commentra-mark.svg";
  const width = variant === "icon" ? 44 : 248;
  const height = variant === "icon" ? 44 : 56;

  return (
    <span className={`inline-flex items-center ${className}`} {...props}>
      <Image
        alt="Commentra"
        className={`shrink-0 object-contain ${
          variant === "icon" ? "h-8 w-8" : "h-auto w-[180px] max-w-full"
        } ${imageClassName}`}
        height={height}
        src={src}
        unoptimized
        width={width}
      />
    </span>
  );
}
