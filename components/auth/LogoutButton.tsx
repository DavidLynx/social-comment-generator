"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { signOut } from "@/lib/auth/clientAuth";

type LogoutButtonProps = {
  className?: string;
  label: string;
};

export function LogoutButton({ className, label }: LogoutButtonProps) {
  const router = useRouter();

  async function handleLogout() {
    try {
      await signOut();
      router.refresh();
    } catch (error) {
      console.error("Logout failed", error);
    }
  }

  return (
    <Button className={className} onClick={handleLogout} type="button" variant="ghost">
      {label}
    </Button>
  );
}
