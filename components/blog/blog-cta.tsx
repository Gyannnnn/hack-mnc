"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";

export function BlogCTA() {
  return (
    <div className="rounded-xl border border-border/50 bg-card/30 backdrop-blur-sm p-5 shadow-sm">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0 border border-primary/20">
            <Zap className="w-5 h-5 fill-current" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-foreground leading-tight">
              Practice Frequent Questions
            </h3>
            <p className="text-[11px] text-muted-foreground mt-0.5">
              Top MNC Problems
            </p>
          </div>
        </div>

        <p className="text-muted-foreground text-[13px] leading-relaxed">
          Master the most frequently asked interview questions and track your
          preparation progress.
        </p>

        <Button
          asChild
          className="w-full mt-1 font-semibold shadow-md shadow-primary/20 transition-transform active:scale-95"
        >
          <Link href="/problems">Start Practicing</Link>
        </Button>
      </div>
    </div>
  );
}
