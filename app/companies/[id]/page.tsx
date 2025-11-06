import CompanyDetails from "@/components/CompanyDetails";
import React from "react";
import { auth } from "@/auth";
import CompanyDetailsCard from "@/components/CompanyDetailsCard";
import { Metadata } from "next";
import { getCompanyDetails } from "@/app/actions/company/company";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const res = await getCompanyDetails({ companyId: id, userId: "" });

  if (!res?.success) {
    return {
      title: "Company Not Found | Hack MNC",
      description: "This company is not available on Hack MNC.",
    };
  }

  const company = res.data.company;

  const title = `${company.name} Interview Questions | DSA & Coding Prep | Hack MNC`;
  const description = `Prepare for ${company.name} interviews with company-wise DSA questions, coding problems, and topic analysis. Track your progress and solve ${res.data.totalNumberOfQuestions} curated ${company.name} questions — free on Hack MNC.`;

  const keywords = [
    `${company.name} interview questions`,
    `${company.name} coding interview`,
    `${company.name} DSA problems`,
    `${company.name} LeetCode questions`,
    `${company.name} interview preparation`,
    `${company.name} placement questions`,
    `${company.name} premium questions`,
    `${company.name} dsa questions github`,
    "FAANG interview prep",
    "DSA tracker",
    "free LeetCode premium",
    "Hack MNC",
  ];

  const image = company.logo || "https://hackmnc.com/og-image.png";
  const url = `https://hackmnc.com/companies/${company.name
    .toLowerCase()
    .replace(/\s+/g, "-")}`;

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "Hack MNC",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: `${company.name} interview prep | Hack MNC`,
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
  const id = await (await params).id;
  try {
    return (
      <div className="cnt">
        <CompanyDetailsCard
          companyId={id}
          userId={session?.user.id as string}
        />
        <div>
          <CompanyDetails
            companyId={id}
            userId={session?.user.id as string}
            id={id}
          />
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
