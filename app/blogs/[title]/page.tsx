// app/blogs/[title]/page.tsx
import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getAllArticles,
  getArticlePage,
  getArticlePageData,
  NotionTitleProperty,
  slugify,
} from "@/utils/notion";
import { CustomNotionRenderer } from "@/components/notion-renderer";
import { PageObjectResponse } from "@notionhq/client";

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ title: string }>;
}): Promise<Metadata> {
  const title = await (await params).title;
  const decodedTitle = decodeURIComponent(title);

  try {
    const articles = await getAllArticles("291f49e716c081d9bf0be895bb2f85e9");
    const page = getArticlePage(articles, decodedTitle);

    if (!page) {
      return {
        title: "Article Not Found",
        description: "The requested article could not be found.",
      };
    }

    const articleData = await getArticlePageData(
      page,
      decodedTitle,
      "291f49e716c081d9bf0be895bb2f85e9"
    );

    return {
      title: `${articleData.title} | Blog`,
      description: articleData.summary,
      openGraph: {
        title: articleData.title,
        description: articleData.summary,
        images: [articleData.thumbnail],
        type: "article",
        publishedTime: articleData.publishedDate || undefined,
      },
      twitter: {
        card: "summary_large_image",
        title: articleData.title,
        description: articleData.summary,
        images: [articleData.thumbnail],
      },
      alternates: {
        canonical: `/blog/${decodedTitle}`,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      title: "Error",
      description: "An error occurred while loading the article.",
    };
  }
}

// Generate static params for SSG
export async function generateStaticParams() {
  try {
    const articles = await getAllArticles("291f49e716c081d9bf0be895bb2f85e9");

    return articles.map((article) => {
      // Use type assertion instead of any
      const titleProperty = (article as PageObjectResponse).properties.title as NotionTitleProperty;
      const title = titleProperty?.title[0]?.plain_text || "";
      return {
        title: slugify(title).toLowerCase(),
      };
    });
  } catch (error) {
    console.log(error);
    return [];
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ title: string }>;
}) {
  const title = await (await params).title;
  const decodedTitle = decodeURIComponent(title);

  try {
    const articles = await getAllArticles("291f49e716c081d9bf0be895bb2f85e9");
    const page = getArticlePage(articles, decodedTitle);

    if (!page) {
      return notFound();
    }

    const articleData = await getArticlePageData(
      page,
      decodedTitle,
      "291f49e716c081d9bf0be895bb2f85e9"
    );

    // Structured data for SEO
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: articleData.title,
      description: articleData.summary,
      image: articleData.thumbnail,
      datePublished: articleData.publishedDate,
      dateModified: articleData.lastEditedAt,
      author: {
        "@type": "Person",
        name: "Your Name",
      },
      publisher: {
        "@type": "Organization",
        name: "Your Blog Name",
        logo: {
          "@type": "ImageObject",
          url: "/logo.png",
        },
      },
    };

    return (
      <>
        {/* Structured data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />

        <main className="min-h-screen bg-background w-full">
          {/* Article Header */}
          <article className="max-w-4xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-10 w-full">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-muted-foreground mb-4 sm:mb-6 md:mb-8 overflow-hidden min-h-[20px]">
              <Link
                href="/"
                className="hover:text-foreground transition-colors flex-shrink-0 truncate"
              >
                Home
              </Link>
              <span className="flex-shrink-0">›</span>
              <Link
                href="/blogs"
                className="hover:text-foreground transition-colors flex-shrink-0 truncate"
              >
                Blog
              </Link>
              <span className="flex-shrink-0">›</span>
              <span
                className="text-foreground truncate min-w-0 flex-1"
                title={articleData.title}
              >
                {articleData.title}
              </span>
            </nav>

            {/* Article Header */}
            <header className="mb-4 sm:mb-6 md:mb-8">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 sm:mb-4 leading-tight break-words">
                {articleData.title}
              </h1>

              <div className="flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-2 sm:gap-4 text-xs sm:text-sm text-muted-foreground mb-4 sm:mb-6">
                {articleData.publishedDate && (
                  <time
                    dateTime={articleData.publishedDate}
                    className="text-primary"
                  >
                    Published:{" "}
                    {new Date(articleData.publishedDate).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )}
                  </time>
                )}
                {articleData.lastEditedAt && (
                  <span className="text-primary">
                    Updated:{" "}
                    {new Date(articleData.lastEditedAt).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )}
                  </span>
                )}
              </div>

              {/* Categories */}
              {articleData.categories.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
                  {articleData.categories.map((category) => (
                    <span
                      key={category}
                      className="px-2 sm:px-3 py-1 bg-primary text-primary-foreground text-xs sm:text-sm font-medium rounded-full"
                    >
                      {category}
                    </span>
                  ))}
                </div>
              )}
            </header>

            {/* Thumbnail */}
            {articleData.thumbnail && (
  <div className="mb-4 sm:mb-6 md:mb-8 w-full">
    <img
      src={articleData.thumbnail}
      alt={articleData.title}
      className="w-full h-auto max-w-full rounded-lg sm:rounded-xl border border-border"
      loading="eager"
    />
  </div>
)}

            {/* Summary */}
            {articleData.summary && (
              <div className="bg-muted border-l-4 border-primary p-3 sm:p-4 md:p-6 rounded-r-lg mb-4 sm:mb-6 md:mb-8">
                <p className="text-sm sm:text-base md:text-lg text-foreground leading-relaxed break-words">
                  {articleData.summary}
                </p>
              </div>
            )}

            {/* Article Content - UPDATED: Using Notion Renderer */}
            {articleData.renderedHTML && (
              <CustomNotionRenderer html={articleData.renderedHTML} />
            )}

            {/* Article Footer */}
            <footer className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-border">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0 text-xs sm:text-sm text-muted-foreground">
                <span className="text-primary">
                  {articleData.lastEditedAt && (
                    <>
                      Last updated:{" "}
                      {new Date(articleData.lastEditedAt).toLocaleDateString()}
                    </>
                  )}
                </span>
                <div className="flex space-x-4">
                  {/* Add social sharing buttons here */}
                </div>
              </div>
            </footer>
          </article>

          {/* Suggested Articles */}
          {articleData.moreArticles.length > 0 && (
            <section className="bg-muted py-6 sm:py-8 md:py-12 w-full">
              <div className="max-w-4xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 w-full">
                <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-6 sm:mb-8 text-center">
                  You Might Also Like
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  {articleData.moreArticles.map((article) => (
                    <Link
                      key={article.id}
                      href={`/blogs/${slugify(article.title).toLowerCase()}`}
                      className="block bg-card border border-border rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group hover:border-primary/40 w-full"
                    >
                      <div className="p-3 sm:p-4 md:p-6">
                        <h3 className="font-bold text-sm sm:text-base md:text-lg text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2 break-words">
                          {article.title}
                        </h3>
                        <p className="text-muted-foreground text-xs sm:text-sm line-clamp-2 break-words">
                          {article.summary}
                        </p>
                        {article.publishedDate && (
                          <time className="text-xs text-muted-foreground mt-2 sm:mt-3 block">
                            {new Date(
                              article.publishedDate
                            ).toLocaleDateString()}
                          </time>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          )}
        </main>
      </>
    );
  } catch (error) {
    console.error("Error rendering blog page:", error);
    return notFound();
  }
}