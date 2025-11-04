import React from "react";
import { QuestionCardSkeleton } from "./ui/QuestionCardSkeleton";

export default function QuestionCardLoader() {
  return (
    <div className="space-y-2">
      <QuestionCardSkeleton />
      <QuestionCardSkeleton />
      <QuestionCardSkeleton />
      <QuestionCardSkeleton />
      <QuestionCardSkeleton />
      <QuestionCardSkeleton />
      <QuestionCardSkeleton />
      <QuestionCardSkeleton />
      <QuestionCardSkeleton />
      <QuestionCardSkeleton />
    </div>
  );
}
