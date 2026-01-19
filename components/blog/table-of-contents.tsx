"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface TableOfContentsProps {
  headings: {
    text: string;
    level: number;
    slug: string;
  }[];
}

export function TableOfContents({ headings = [] }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "0% 0% -80% 0%" },
    );

    headings.forEach((heading) => {
      const element = document.getElementById(heading.slug);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      headings.forEach((heading) => {
        const element = document.getElementById(heading.slug);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <div className="space-y-4">
      <h3 className="font-bold text-lg text-foreground">On This Page</h3>
      <nav className="flex flex-col space-y-2 text-sm">
        {headings.map((heading) => (
          <Link
            key={heading.slug}
            href={`#${heading.slug}`}
            className={cn(
              "transition-colors hover:text-primary block py-1",
              heading.level === 3 && "pl-4",
              activeId === heading.slug
                ? "text-primary font-medium border-l-2 border-primary pl-3 -ml-4" // Visual indicator
                : "text-muted-foreground",
            )}
            onClick={(e) => {
              e.preventDefault();
              document.getElementById(heading.slug)?.scrollIntoView({
                behavior: "smooth",
              });
              setActiveId(heading.slug);
            }}
          >
            {heading.text}
          </Link>
        ))}
      </nav>
    </div>
  );
}
