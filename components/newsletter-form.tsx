"use client";

import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email.trim() || !email.includes("@")) {
      setStatus("error");
      return;
    }
    setStatus("success");
    setEmail("");
  }

  return (
    <form onSubmit={onSubmit} className="mx-auto max-w-md text-left">
      <p className="font-heading text-xl font-semibold">Sign up to our newsletter</p>
      <p className="mt-2 text-sm text-muted-foreground">Updates on everything new at Iris.</p>
      <div className="mt-4 space-y-3">
        <Input
          type="email"
          name="email"
          placeholder="Your email address"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status !== "idle") setStatus("idle");
          }}
          aria-invalid={status === "error"}
          className="h-11"
        />
        <div className="absolute -left-[9999px] opacity-0" aria-hidden="true">
          <Input tabIndex={-1} autoComplete="off" name="website" placeholder="Website" />
        </div>
        <Button type="submit" className="w-full bg-iris text-white hover:bg-iris/90">
          Subscribe
        </Button>
      </div>
      {status === "success" ? (
        <p className="mt-3 text-sm text-iris" role="status">
          Thanks — you&apos;re on the list. (Demo: no email is sent.)
        </p>
      ) : null}
      {status === "error" ? (
        <p className="mt-3 text-sm text-destructive" role="alert">
          Enter a valid email address.
        </p>
      ) : null}
    </form>
  );
}
