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
    <form onSubmit={onSubmit} className="w-full max-w-2xl text-left">
      <p className="text-xl font-bold text-foreground">Sign up to our newsletter</p>
      <p className="mt-3 text-base text-foreground">Updates on everything new at Iris.</p>
      <div className="mt-4 inline-block w-full space-y-3 sm:max-w-md">
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
          className="h-auto min-w-60 rounded-sm border-grey-light px-3.5 py-3 text-base focus:bg-grey-light-bg"
        />
        <div className="absolute -left-[9999px] opacity-0" aria-hidden="true">
          <Input tabIndex={-1} autoComplete="off" name="website" placeholder="Website" />
        </div>
        <Button
          type="submit"
          variant="outline"
          className="h-auto rounded-sm border-foreground px-5 py-2.5 text-base font-normal hover:bg-grey-light-bg"
        >
          Subscribe
        </Button>
      </div>
      {status === "success" ? (
        <p className="mt-3 text-sm text-muted-foreground" role="status">
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
