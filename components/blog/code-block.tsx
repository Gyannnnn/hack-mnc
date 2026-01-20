"use client";

import * as React from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

interface CodeBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  filename?: string;
  copy?: boolean;
}

export function CodeBlock({
  filename,
  className,
  children,
  copy = true,
  ...props
}: CodeBlockProps) {
  const [isCopied, setIsCopied] = React.useState(false);
  const preRef = React.useRef<HTMLDivElement>(null);

  const onCopy = async () => {
    if (!preRef.current) return;

    // We need to extract text from the code block.
    // If rehype-pretty-code is used, children might be structured.
    // We'll try to get textContent.
    const code = preRef.current.textContent || "";

    try {
      await navigator.clipboard.writeText(code);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  };

  return (
    <div
      className={cn(
        "relative my-6 overflow-hidden rounded-lg border bg-zinc-950 text-white",
        className,
      )}
      {...props}
    >
      {filename && (
        <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-900/50 px-4 py-3">
          <span className="text-xs font-medium text-zinc-400">{filename}</span>
        </div>
      )}
      <div className="relative group">
        {copy && (
          <button
            onClick={onCopy}
            className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-md border border-zinc-700 bg-zinc-800/50 text-zinc-400 opacity-0 transition-opacity hover:bg-zinc-800 hover:text-white group-hover:opacity-100"
            aria-label="Copy code"
          >
            {isCopied ? (
              <Check className="h-4 w-4 text-green-500" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </button>
        )}
        <div ref={preRef} className="overflow-x-auto p-4">
          {children}
        </div>
      </div>
    </div>
  );
}
