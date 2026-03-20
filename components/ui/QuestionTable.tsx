import { Question } from "@/types/questionsTable";
import Link from "next/link";
import React from "react";

export default function QuestionTable({
  questions,
}: {
  questions: Question[];
}) {
  const levelColor = (level: string): string => {
    if (level === "EASY") return "text-green-500";
    else if (level === "MEDIUM") return "text-yellow-500";
    else return "text-red-500";
  };

  return (
    <div className="w-full overflow-x-auto">
      <table className="min-w-[700px] border-collapse">
        <thead>
          <tr className=" text-left">
            <th className="border p-3 whitespace-nowrap">Sl.No</th>
            <th className="border p-3 whitespace-nowrap">Question</th>
            <th className="border p-3 whitespace-nowrap text-center">
              Difficulty
            </th>
            <th className="border p-3 whitespace-nowrap">Frequency</th>
            <th className="border p-3 whitespace-nowrap">
              LeetCode Link
            </th>
          </tr>
        </thead>

        <tbody>
          {questions.map((q, i) => (
            <tr key={i} className="">
              <td className="border p-3 whitespace-nowrap">{i + 1}</td>

              <td className="border p-3 whitespace-nowrap">
                {q.name}
              </td>

              <td
                className={`border p-3 text-center whitespace-nowrap text-sm md:text-base ${levelColor(
                  q.difficulty
                )}`}
              >
                {q.difficulty}
              </td>

              <td className="border p-3 whitespace-nowrap">
                {q.frequency}
              </td>

              <td className="border p-3 whitespace-nowrap">
                <Link
                  target="_blank"
                  className="text-blue-500 hover:underline"
                  href={q.leetCodeLink}
                >
                  Solve
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}