import { Question } from "@/types/questionsTable";
import { questionsByCompanyResponse } from "@/types/type";
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
    <div>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid #ddd", padding: "10px" }}>
              Question
            </th>
            <th style={{ border: "1px solid #ddd", padding: "10px" }}>
              Difficulty
            </th>
            <th style={{ border: "1px solid #ddd", padding: "10px" }}>
              Frequency
            </th>
            <th style={{ border: "1px solid #ddd", padding: "10px" }}>
              Leetcode Link
            </th>
          </tr>
        </thead>

        <tbody>
          {questions.map((q, i) => (
            <tr key={i}>
              <td style={{ border: "1px solid #ddd", padding: "10px" }}>
                {q.name}
              </td>
              <td  style={{ border: "1px solid #ddd", padding: "10px" }} className={`text-center  text-sm md:text-base ${levelColor(
              q.difficulty
            )}`}>
                {q.difficulty}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "10px" }}>
                {q.frequency}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "10px" }}>
                <Link target="_blank" className="text-blue-500" href={q.leetCodeLink}>Solve On LeetCode</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
