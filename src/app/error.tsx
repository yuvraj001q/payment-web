"use client";

import Link from "next/link";
import { Zap } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0f]">
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 text-2xl font-bold mb-8">
          <Zap className="h-8 w-8 text-indigo-400" />
          Predator Grid
        </div>
        <h1 className="text-6xl font-bold mb-4">Oops</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Something went wrong.
        </p>
        <div className="flex items-center justify-center gap-4">
          <button onClick={reset} className="btn-primary">
            Try Again
          </button>
          <Link href="/" className="btn-secondary">
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
