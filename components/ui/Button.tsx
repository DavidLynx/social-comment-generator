import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";
import Link from "next/link";

type ButtonVariant = "primary" | "secondary" | "ghost";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-cyan-300 text-slate-950 shadow-[0_0_0_1px_rgba(255,255,255,0.02),0_12px_32px_rgba(34,211,238,0.16)] hover:bg-cyan-200 hover:shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_14px_34px_rgba(34,211,238,0.24)] focus-visible:outline-cyan-200",
  secondary:
    "border border-white/14 bg-white/8 text-white hover:border-cyan-300/30 hover:bg-white/12 hover:shadow-[0_0_0_1px_rgba(34,211,238,0.14)] focus-visible:outline-white",
  ghost:
    "text-zinc-300 hover:bg-white/8 hover:text-white hover:shadow-[inset_0_0_0_1px_rgba(34,211,238,0.16)] focus-visible:outline-white",
};

const base =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-4 text-sm font-semibold transition-[background-color,border-color,color,box-shadow,transform,opacity] duration-200 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

export function Button({
  className = "",
  variant = "primary",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`${base} ${variants[variant]} ${className}`}
      {...props}
    />
  );
}

type ButtonLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
};

export function ButtonLink({
  className = "",
  variant = "primary",
  href,
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      className={`${base} ${variants[variant]} ${className}`}
      href={href}
      {...props}
    >
      {children}
    </Link>
  );
}
