"use client";
import React from "react";

const difficulties = ["EASY", "MEDIUM", "HARD"] as const;

type Props = {
  difficulty?: string;
  onDifficultyChange: (d?: string) => void;
  topics: string[];
  topic?: string;
  onTopicChange: (t?: string) => void;
  sort?: string;
  onSortChange: (s: string) => void;
  order?: "asc" | "desc";
  onOrderChange: (o: "asc" | "desc") => void;
};

export default function QuestionControls({
  difficulty,
  onDifficultyChange,
  topics,
  topic,
  onTopicChange,
  sort,
  onSortChange,
  order,
  onOrderChange,
}: Props) {
  return (
    <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
      <div className="flex gap-2 items-center flex-wrap">
        {difficulties.map((d) => (
          <button
            key={d}
            onClick={() => onDifficultyChange(d === difficulty ? undefined : d)}
            className={`px-3 py-1 rounded-full border ${
              d === difficulty ? "bg-slate-700 text-white" : ""
            }`}
          >
            {d}
          </button>
        ))}

        <select
          value={topic ?? ""}
          onChange={(e) => onTopicChange(e.target.value || undefined)}
          className="ml-2 rounded-md border p-1"
        >
          <option value="">All topics</option>
          {topics.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      <div className="flex gap-2 items-center">
        <select
          value={sort}
          onChange={(e) => onSortChange(e.target.value)}
          className="rounded-md border p-1"
        >
          <option value="frequency">Most frequent</option>
          <option value="acceptanceRate">Acceptance Rate</option>
          <option value="name">Name</option>
        </select>

        <select
          value={order}
          onChange={(e) => onOrderChange(e.target.value as "asc" | "desc")}
          className="rounded-md border p-1"
        >
          <option value="desc">Desc</option>
          <option value="asc">Asc</option>
        </select>
      </div>
    </div>
  );
}
