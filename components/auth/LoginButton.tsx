"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { signInWithGoogle } from "@/lib/auth/clientAuth";

type LoginButtonProps = {
  label: string;
  pendingMessage: string;
};

export function LoginButton({ label, pendingMessage }: LoginButtonProps) {
  const [message, setMessage] = useState("");

  async function handleLogin() {
    try {
      setMessage("");
      await signInWithGoogle();
    } catch (error) {
      console.error("Google login failed", error);
      setMessage(pendingMessage);
    }
  }

  return (
    <div className="mt-6">
      <Button onClick={handleLogin} type="button">
        {label}
      </Button>
      {message ? <p className="mt-3 text-sm text-zinc-500">{message}</p> : null}
    </div>
  );
}
