"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Optional: send error to logging service
    console.error("App Error:", error);
  }, [error]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="relative max-w-md w-full text-center">
        {/* Soft glow */}
        <div className="absolute inset-0 -z-10 rounded-2xl bg-destructive/10 blur-3xl" />

        {/* Error badge */}
        <div className="inline-flex items-center justify-center rounded-xl bg-muted px-4 py-1.5 mb-6">
          <span className="text-sm font-mono text-muted-foreground">
            Something went wrong
          </span>
        </div>

        {/* Heading */}
        <h1 className="text-3xl font-bold tracking-tight text-foreground mb-3">
          Unexpected error
        </h1>

        {/* Description */}
        <p className="text-sm text-muted-foreground mb-8 leading-relaxed">
          An internal error occurred while loading this page.  
          This is on us — not you.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => reset()}
            className="inline-flex items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90 transition"
          >
            Try again
          </button>

          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-lg border border-border px-5 py-2.5 text-sm font-medium text-foreground hover:bg-accent transition"
          >
            Go to Home
          </Link>
        </div>

        {/* Debug hint (non-sensitive) */}
        {error?.digest && (
          <p className="mt-6 text-[11px] text-muted-foreground">
            Error reference: <span className="font-mono">{error.digest}</span>
          </p>
        )}

        {/* Brand */}
        <p className="mt-10 text-xs text-muted-foreground">
          © {new Date().getFullYear()} HackMNC · Free DSA Interview Prep
        </p>
      </div>
    </main>
  );
}
