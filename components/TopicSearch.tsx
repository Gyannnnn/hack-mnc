"use client";
import React, { useMemo, useState } from "react";
import { Card } from "./ui/card";
import Link from "next/link";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { debounce } from "lodash";
import { topic } from "@/types/type";
import { slugify } from "@/utils/slugify.utility";

type Props = {
  topics: topic[];
};

export default function TopicSearch({ topics }: Props) {
  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState<topic[]>(topics || []);

  const runSearch = (value: string) => {
    const v = value.trim().toLowerCase();
    if (!v) {
      setFiltered(topics || []);
      return;
    }
    setFiltered((topics || []).filter((t) => t.name.toLowerCase().includes(v)));
  };

  const debouncedSearch = useMemo(() => debounce(runSearch, 400), [topics,runSearch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    debouncedSearch(val);
  };

  return (
    <div className="w-full">
      <div className="w-full flex items-center justify-start py-2">
        <div className="relative w-full max-w-xl">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M10.5 3.75a6.75 6.75 0 1 0 4.243 11.964l4.271 4.272a.75.75 0 1 0 1.06-1.06l-4.272-4.272A6.75 6.75 0 0 0 10.5 3.75Zm-5.25 6.75a5.25 5.25 0 1 1 10.5 0 5.25 5.25 0 0 1-10.5 0Z"
              clipRule="evenodd"
            />
          </svg>
          <Input
            placeholder="Search topics..."
            value={query}
            onChange={handleChange}
            className="w-full pl-10 rounded-lg"
          />
        </div>
      </div>

      <Card className="p-4 md:p-6 bg-card border border-border shadow-sm">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
          {filtered.length > 0 ? (
            filtered.map((topic) => (
              <Link key={topic.id} href={`/topic/${slugify(topic.name)}/leetcode-interview-questions`} className="group block">
                <div className="flex flex-col p-3 md:p-4 rounded-lg border border-border bg-card hover:bg-card/60 hover:border-primary/40 transition-colors duration-200 h-full">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-foreground text-base md:text-lg line-clamp-2 group-hover:text-primary transition-colors">
                      {topic.name}
                    </h3>
                  </div>
                  <div className="mt-auto flex items-center justify-between">
                    <span className="text-xs text-muted-foreground font-medium">Questions</span>
                    <Badge variant="secondary" className="font-semibold px-2 py-1 text-[10px] md:text-xs">
                      {topic._count.questions}
                    </Badge>
                  </div>
                  <div className="mt-2 w-full bg-muted rounded-full h-1">
                    <div
                      className="bg-primary h-1 rounded-full transition-all duration-300"
                      style={{ width: `${Math.min((topic._count.questions / 50) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-full text-sm text-muted-foreground">No topics found</div>
          )}
        </div>
      </Card>
    </div>
  );
}


