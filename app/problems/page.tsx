import React from "react";

import FeaturedCompany from "@/components/FeaturedCompany";
import Topics from "@/components/Topics";
import Questions from "@/components/Questions";
import { auth } from "@/auth";

export const metadata = {
  title:
    "LeetCode Questions with Solutions | 2000+ Problems by Company & Topic",
  description:
    "Browse 2000+ LeetCode questions with solutions, sorted by company (Google, Amazon, Meta), topic, frequency & acceptance rate. Perfect for interview prep!",
  keywords: [
    "Hack MNC",
    "LeetCode premium helper",
    "DSA tracker",
    "company-wise coding questions",
    "FAANG interview preparation",
    "DSA practice problems",
    "free LeetCode premium questions",
    "Google interview questions",
    "Amazon interview questions",
    "Microsoft interview prep",
    "DSA for beginners",
    "data structures and algorithms",
    "LeetCode India",
    "LeetCode US",
    "coding interview preparation",
  ],
  alternates: {
    canonical: "https://hackmnc.com",
  },
  openGraph: {
    title: "Hack MNC – Free LeetCode Premium Helper & DSA Tracker",
    description:
      "Prepare for FAANG and MNC interviews with company-wise and topic-wise DSA questions, progress tracking, and interview blogs — 100% free.",
    url: "https://hackmnc.com",
    images: [
      {
        url: "https://hackmnc.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Hack MNC Landing Page",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hack MNC | Free DSA & LeetCode Helper",
    description:
      "Master DSA and track your coding progress with Hack MNC. Solve company-wise and topic-wise problems for FAANG prep — free forever.",
    images: ["https://hackmnc.com/og-image.png"],
  },
};

export default async function Problems() {

  

  const session = await auth();
  return (
    <main className="cnt gap-6 px-10">
      <header className="space-y-3 rounded-2xl border bg-card/80 backdrop-blur-sm px-4 py-5 sm:px-6 shadow-sm">
        <div className="space-y-2 ">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary/80">
            Frequently asked leetcode questions
          </p>
          <h1 className="text-2xl sm:text-3xl font-semibold leading-tight">
            LeetCode Interview Questions by Company & Topic
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Master your coding interviews with the most comprehensive LeetCode
            questions list, featuring real interview frequency data and
            acceptance rates across 200+ companies. Explore LeetCode problems by
            company and topic, identify high-frequency interview questions, and
            understand which problems are asked most often at Google, Amazon,
            Microsoft, Meta, and other top tech companies.
          </p>
        </div>
      </header>

      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
          <div className="space-y-1">
            <h2 className="text-xl font-semibold">
              LeetCode Questions Asked by Top Companies
            </h2>
            {/* <p className="text-sm text-muted-foreground">
              Quickly jump into frequently-asked problems from FAANG and other
              top product companies.
            </p> */}
          </div>
        </div>
        <div className="rounded-2xl border bg-card/80 px-3 py-4 sm:px-4 shadow-sm">
          <FeaturedCompany />
        </div>
      </section>

      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold">LeetCode Questions by Topic</h2>
          {/* <p className="text-sm text-muted-foreground ">
            Browse LeetCode interview questions categorized by data structures
            and algorithms such as Arrays, Trees, Graphs, Dynamic Programming,
            and more.
          </p> */}
        </div>
        <div className="rounded-2xl border bg-card/80 px-0 py-3 sm:px-2 shadow-sm">
          <Topics />
        </div>
      </section>

      <section className="space-y-4 mb-10">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold">
            Company-Wise & Topic-Wise LeetCode Interview Questions
          </h2>
          {/* <p className="text-sm text-muted-foreground">
            View all LeetCode problems sorted by company frequency, acceptance
            rate, and difficulty. This section highlights the most frequently
            asked coding interview questions across FAANG and other top tech
            companies.
          </p> */}
        </div>
        <div className="">
          <Questions userId={session?.user.id as string} />
        </div>
      </section>
    </main>
  );
}
