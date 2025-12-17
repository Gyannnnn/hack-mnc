import { auth } from "@/auth";
import ClientMDX from "@/components/ClientMDX";
import {
  TopicQuestionPageNavigation,
} from "@/components/Navigation";
import TopicDetailsCard from "@/components/TopicDetailsCard";
import TopicQuestionsPage from "@/components/TopicQuestionsDetails";
import { getTopicPostBySlug } from "@/lib/getPostBySlug/GetPostbySlug";
import { mdxComponents } from "@/lib/mdx-components";
import { decodeSlug, slugify } from "@/utils/slugify.utility";
import { Metadata } from "next";
import { compileMDX } from "next-mdx-remote/rsc";
import Script from "next/script";
import React from "react";

// seo
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string[] }>;
}): Promise<Metadata> {
  const slug = (await params).id[0];
  const decodedName = decodeSlug(slug);

  const title = `${decodedName} Interview Questions - Google, Amazon, Microsoft (2025)`;

  const description = `Master ${decodedName} interviews with curated LeetCode questions from Google, Amazon, Microsoft. Sorted by frequency, difficulty & acceptance rate. Updated 2025.`;

  const url = `https://hackmnc.com/topic/${slug}/leetcode-interview-questions`;

  return {
    metadataBase: new URL("https://hackmnc.com"),

    title,
    description,

    applicationName: "HackMNC",
    authors: [{ name: "HackMNC Team", url: "https://hackmnc.com" }],
    category: "Interview Preparation",

    alternates: {
      canonical: url,
      languages: {
        "en-US": url,
      },
    },

    openGraph: {
      title,
      description,
      url,
      siteName: "HackMNC",
      images: [
        {
          url: `https://hackmnc.com/api/og?topic=${encodeURIComponent(
            decodedName
          )}`,
          width: 1200,
          height: 630,
          alt: `${decodedName} LeetCode Interview Questions - HackMNC`,
        },
      ],
      locale: "en_US",
      type: "website",
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [
        `https://hackmnc.com/api/og?topic=${encodeURIComponent(decodedName)}`,
      ],
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

    other: {
      "revisit-after": "7 days",
    },
  };
}

export default async function TopicPage({
  params,
}: {
  params: Promise<{ id: string[] }>;
}) {
  const slug = (await params).id[0];
  const decodedTopicName = decodeSlug(slug);
  const session = await auth();

  const { content, frontmatter } = await getTopicPostBySlug(decodedTopicName);
  const mdx = await compileMDX({
    source: content,
    components: mdxComponents,
    options: { parseFrontmatter: false },
  });

  const heading =
    frontmatter.title && frontmatter.title.trim().length > 0
      ? frontmatter.title
      : `${decodedTopicName} Interview Questions - Google, Amazon, Microsoft (2025)`;

  return (
    <div className="cnt">
      <Script
        id="topic-breadcrumb-schema"
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
                item: "https://hackmnc.com/",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Topics",
                item: "https://hackmnc.com/topic",
              },
              {
                "@type": "ListItem",
                position: 3,
                name: decodedTopicName,
                item: `https://hackmnc.com/topic/${slug}/leetcode-interview-questions`,
              },
            ],
          }),
        }}
      />
      <Script
        id="topic-collection-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: `${decodedTopicName} Interview Questions`,
            description: `Comprehensive collection of ${decodedTopicName} LeetCode questions asked in FAANG interviews`,
            url: `https://hackmnc.com/topic/${slug}/leetcode-interview-questions`,
            isPartOf: {
              "@type": "WebSite",
              name: "HackMNC",
              url: "https://hackmnc.com",
            },
            about: {
              "@type": "Thing",
              name: `${decodedTopicName} Programming`,
              description: `Interview questions and coding problems related to ${decodedTopicName}`,
            },
            publisher: {
              "@type": "Organization",
              name: "HackMNC",
              url: "https://hackmnc.com",
              logo: {
                "@type": "ImageObject",
                url: "https://hackmnc.com/logo.png",
              },
            },
            datePublished: "2024-01-01", // Set your actual date
            dateModified: new Date().toISOString(),
          }),
        }}
      />

      <Script
        id="topic-faq-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: `What are ${decodedTopicName} LeetCode interview questions?`,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: `${decodedTopicName} LeetCode interview questions focus on solving data structure and algorithm problems related to ${decodedTopicName}. These questions are commonly asked by top tech companies to evaluate problem-solving skills, algorithmic thinking, and optimization techniques.`,
                },
              },
              {
                "@type": "Question",
                name: `Which companies ask ${decodedTopicName} questions in interviews?`,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: `Companies such as Google, Amazon, Microsoft, Meta, and other FAANG-level organizations frequently ask ${decodedTopicName} questions during coding interviews for software engineering roles.`,
                },
              },
              {
                "@type": "Question",
                name: `How should I prepare ${decodedTopicName} for coding interviews?`,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: `To prepare ${decodedTopicName} for coding interviews, practice frequently asked LeetCode problems, understand core concepts, analyze time and space complexity, and review problems previously asked by top tech companies using platforms like HackMNC.`,
                },
              },
              {
                "@type": "Question",
                name: `Are ${decodedTopicName} questions asked in FAANG interviews?`,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: `Yes, ${decodedTopicName} questions are regularly asked in FAANG interviews, especially for SDE roles. These questions test advanced problem-solving skills and the ability to apply algorithms efficiently under constraints.`,
                },
              },
              {
                "@type": "Question",
                name: `How does HackMNC help with ${decodedTopicName} interview preparation?`,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: `HackMNC helps candidates prepare for ${decodedTopicName} interviews by providing curated LeetCode questions, company-wise frequency data, difficulty filters, acceptance rates, and progress tracking to optimize interview preparation.`,
                },
              },
            ],
          }),
        }}
      />

      <div className="flex flex-col pt-4">
        <TopicQuestionPageNavigation topicName={decodedTopicName} />
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
            {frontmatter.summary}
          </section>
        </div>
      </div>

      <TopicDetailsCard
        userId={session?.user.id as string}
        name={decodedTopicName}
      />
      <TopicQuestionsPage
        type="topic"
        companyId=""
        userId={session?.user.id as string}
        name={decodedTopicName}
      />
      <div className="rounded-2xl border bg-card/90 px-1  sm:px-6 shadow-sm space-y-4 mb-10">
        <ClientMDX>
          <div className="prose prose-sm sm:prose-base max-w-none prose-invert">
            {mdx.content}
          </div>
        </ClientMDX>
      </div>
    </div>
  );
}
