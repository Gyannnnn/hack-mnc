import CompanyDetails from "@/components/CompanyDetails";
import React from "react";
import { auth } from "@/auth";
import CompanyDetailsCard from "@/components/CompanyDetailsCard";
import { Metadata } from "next";

import { CompanyQuestionPageNavigation } from "@/components/Navigation";
import axios from "axios";
import { getCompanyPostBySlug } from "@/lib/getPostBySlug/GetPostbySlug";
import { compileMDX } from "next-mdx-remote/rsc";
import { mdxComponents } from "@/lib/mdx-components";
import ClientMDX from "@/components/ClientMDX";
import Script from "next/script";
import { decodeSlug } from "@/utils/slugify.utility";
import Head from "next/head";
import SocialShare from "@/components/SocialShare";

interface seoDataRes {
  success: boolean;
  message: string;
  data: {
    name: string;
    logo: string;
  };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const ids = (await params).id;
  const name = decodeSlug(ids[0]);
  const slug = name.toLowerCase().replace(/\s+/g, "-");

  const title = `${
    name[0].toUpperCase() + name.slice(1)
  } LeetCode Interview Questions (2025) | Difficulty, Topics & Frequency`;
  const description = `Explore LeetCode questions frequently asked in ${name} interviews for SDE and frontend roles. Filter by topic, difficulty, acceptance rate and track your interview preparation progress.`;

  let seoData;
  try {
    const res = await axios.get<seoDataRes>(
      `https://api.hackmnc.com/api/v1/company/seo/${slug}`
    );
    seoData = res.data?.data;
  } catch (error) {
    seoData = null;
  }

  const image = seoData?.logo?.startsWith("http")
    ? seoData.logo
    : "https://hackmnc.com/og-image.png";

  const url = `https://hackmnc.com/companies/${slug}/leetcode-interview-questions`;

  return {
    metadataBase: new URL("https://hackmnc.com"),
    title,
    description,
    keywords: [
      `${name} interview questions`,
      `${name} leetcode interview questions`,
      `${name} coding interview questions`,
      `${name} dsa interview questions`,
      `${name} sde interview preparation`,
      `${name} frontend interview preparation`,
      "leetcode interview preparation",
      "company wise leetcode questions",
      "dsa interview tracker",
      "HackMNC",
    ],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "HackMNC",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: `${name} LeetCode Interview Preparation | HackMNC`,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-snippet": -1,
        "max-image-preview": "large",
        "max-video-preview": -1,
      },
    },
  };
}

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();
  const ids = (await params).id;
  const companyName = ids[0];
  const decodedCompanyName = decodeSlug(companyName);
  const { content, frontmatter } = await getCompanyPostBySlug(
    decodedCompanyName
  );
  const mdx = await compileMDX({
    source: content,
    components: mdxComponents,
    options: { parseFrontmatter: false },
  });
  const slug = decodedCompanyName.toLowerCase().replace(/\s+/g, "-");

  const breadcrumbTitle = `${
    decodedCompanyName[0].toUpperCase() + decodedCompanyName.slice(1)
  } LeetCode Interview Questions`;
  const companyDisplayName =
    decodedCompanyName.charAt(0).toUpperCase() + decodedCompanyName.slice(1);

  try {
    const heading =
      frontmatter.title && frontmatter.title.trim().length > 0
        ? frontmatter.title
        : `${
            decodedCompanyName[0].toUpperCase() + decodedCompanyName.slice(1)
          } LeetCode Interview Questions – Most Asked Problems`;

    const summary =
      frontmatter.summary && frontmatter.summary.trim().length > 0
        ? frontmatter.summary
        : `This page lists the most frequently asked LeetCode interview questions in ${
            decodedCompanyName[0].toUpperCase() + decodedCompanyName.slice(1)
          } interviews, based on real interview experiences, with tools to help you track your preparation progress.`;

    return (
      <div className="cnt  gap-6">
        <Head>
          <link
            rel="canonical"
            href={`https://www.hackmnc.com/companies/${slug}/leetcode-interview-questions`}
          />
        </Head>
        <Script
          id="breadcrumb-schema"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Home",
                  item: "https://www.hackmnc.com/",
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Companies",
                  item: "https://www.hackmnc.com/companies",
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: breadcrumbTitle,
                  item: `https://www.hackmnc.com/companies/${slug}/leetcode-interview-questions`,
                },
              ],
            }),
          }}
        />
        <Script
          id="faq-schema"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: `Which LeetCode questions are frequently asked in ${companyDisplayName} interviews?`,
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: `HackMNC curates LeetCode questions that are frequently reported in ${companyDisplayName} interviews based on publicly available sources, community discussions, and interview experiences. The list is updated to reflect commonly repeated problems.`,
                  },
                },
                {
                  "@type": "Question",
                  name: `How does HackMNC determine the frequency of ${companyDisplayName} interview questions?`,
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: `HackMNC aggregates data from public resources such as GitHub repositories, LinkedIn posts, and interview discussion forums to estimate how often a LeetCode question appears in ${companyDisplayName} interviews.`,
                  },
                },
                {
                  "@type": "Question",
                  name: `Are these actual ${companyDisplayName} interview questions?`,
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: `No. The questions listed on HackMNC are curated from publicly shared interview experiences and community resources. They are intended for interview preparation only and do not represent official ${companyDisplayName} interview questions.`,
                  },
                },
                {
                  "@type": "Question",
                  name: `Can I filter ${companyDisplayName} LeetCode questions by topic or difficulty?`,
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: `Yes. HackMNC allows you to filter ${companyDisplayName} LeetCode interview questions by topic, difficulty level, acceptance rate, and frequency to help you prepare more effectively.`,
                  },
                },
                {
                  "@type": "Question",
                  name: `How should I prepare for ${companyDisplayName} coding interviews using HackMNC?`,
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: `You can prepare for ${companyDisplayName} interviews by practicing frequently asked LeetCode problems on HackMNC, focusing on high-frequency questions, revising key data structures and algorithms, and tracking your progress over time.`,
                  },
                },
              ],
            }),
          }}
        />

        <div className="flex flex-col pt-4">
          <div className="flex max-sm:flex-col max-sm:gap-1 w-full justify-between sm:items-end">
            <CompanyQuestionPageNavigation companyName={decodedCompanyName} />
            <SocialShare
              title={`Top LeetCode Questions Asked in ${
                decodedCompanyName[0].toUpperCase() +
                decodedCompanyName.slice(1)
              } Interviews`}
              url={`https://www.hackmnc.com/companies/${companyName}/leetcode-interview-questions`}
            />
          </div>
          <div className="rounded-2xl border bg-card/70 backdrop-blur-sm px-4 py-5 sm:px-6 shadow-sm space-y-3 mt-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary/80">
                  Frequently asked leetcode questions
                </p>
                <h1 className="text-2xl sm:text-3xl font-semibold leading-tight text-foreground">
                  {heading}
                </h1>
              </div>
            </div>
            <section className="text-sm leading-relaxed text-muted-foreground">
              {summary}
            </section>
          </div>
        </div>

        <div className="space-y-4">
          <CompanyDetailsCard
            companyName={decodedCompanyName}
            userId={session?.user.id as string}
          />
          <div>
            <CompanyDetails
              companyName={decodedCompanyName}
              userId={session?.user.id as string}
              // id={id}
            />
          </div>
        </div>

        <div className="rounded-2xl border bg-card/90 px-1  sm:px-6 shadow-sm space-y-4 mb-10">
          <ClientMDX>
            <div className="prose prose-sm sm:prose-base max-w-none prose-invert">
              {mdx.content}
            </div>
          </ClientMDX>
        </div>
      </div>
    );
  } catch (error) {
    console.log(error);
    return (
      <div className="cnt">
        <h1>Something went wrong</h1>
      </div>
    );
  }
}
