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
  const name = decodeURIComponent(ids[0]);
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
  const decoded_name = decodeURIComponent(companyName);
  const { content, frontmatter } = await getCompanyPostBySlug(decoded_name);
  const mdx = await compileMDX({
    source: content,
    components: mdxComponents,
    options: { parseFrontmatter: false },
  });

  console.log(companyName);
  try {
    const heading =
      frontmatter.title && frontmatter.title.trim().length > 0
        ? frontmatter.title
        : `LeetCode Questions Asked in ${
            decoded_name[0].toUpperCase() + decoded_name.slice(1)
          } Interviews`;

    return (
      <div className="cnt  gap-6">
        <div className="flex flex-col gap-3">
          <CompanyQuestionPageNavigation companyName={decoded_name} />
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

        <div className="space-y-4">
          <CompanyDetailsCard
            companyName={decoded_name}
            userId={session?.user.id as string}
          />
          <div>
            <CompanyDetails
              companyName={decoded_name}
              userId={session?.user.id as string}
              // id={id}
            />
          </div>
        </div>

        <div className="rounded-2xl border bg-card/90 px-4 py-6 sm:px-6 shadow-sm space-y-4 mb-10">
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
