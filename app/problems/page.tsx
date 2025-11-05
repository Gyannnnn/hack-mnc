import React from "react";

import FeaturedCompany from "@/components/FeaturedCompany";
import Topics from "@/components/Topics";
import Questions from "@/components/Questions";
import { auth } from "@/auth";


export const metadata = {
  title: "Problems",
  description:
    "Solve DSA problems company-wise and topic-wise with Hack MNC — the free LeetCode premium helper. Track your coding progress and read real interview experiences to prepare for FAANG and top MNCs.",
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
    <div className="cnt">
      <FeaturedCompany />
      <Topics />
      <h1>Questions Topic wise company wise</h1>
      <Questions userId={session?.user.id as string} />
    </div>
  );
}
