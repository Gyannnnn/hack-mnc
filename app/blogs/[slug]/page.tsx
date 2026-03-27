import { notFound } from "next/navigation";
import Link from "next/link";
import { getBlogPost, getBlogPosts } from "@/lib/mdx";
import { MDXContent } from "@/components/mdx-content";
import { ShareButtons } from "@/components/blog/share-buttons";
import { ReadingProgressBar } from "@/components/blog/reading-progress-bar";
import { BlogCard } from "@/components/blog/blog-card";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  BlogHeaderMeta,
  BlogAuthorBio,
} from "@/components/blog/blog-header-meta";
import { BlogCTA } from "@/components/blog/blog-cta";
import { RelatedArticles } from "@/components/blog/related-articles";
import Image from "next/image";
import { auth } from "@/auth";
import { CommentList } from "@/components/blog/comments/comment-list";
import { getBlogMetaData } from "@/actions/blogs.actions";

// Ensure this component is dynamic to avoid build errors if slugs are generated at build time
// or use generateStaticParams for SSG

export async function generateStaticParams() {
  const posts = getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: `${post.metadata.title} | HackMNC Blog`,
    description: post.metadata.summary,
    openGraph: {
      title: post.metadata.title,
      description: post.metadata.summary,
      url: `https://hackmnc.com/blogs/${slug}`,
      siteName: "HackMNC",
      images: [
        {
          url: post.metadata.coverImage || "https://hackmnc.com/og-image.jpg", // Fallback image
          width: 1200,
          height: 630,
        },
      ],
      type: "article",
      publishedTime: post.metadata.publishedAt,
      authors: [post.metadata.author],
    },
    twitter: {
      card: "summary_large_image",
      title: post.metadata.title,
      description: post.metadata.summary,
      images: [post.metadata.coverImage || "https://hackmnc.com/og-image.jpg"],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const allPosts = getBlogPosts();
  const similarPosts = allPosts
    .filter(
      (p) => p.slug !== slug && p.metadata.category === post.metadata.category,
    )
    .slice(0, 3);

  // Structured Data (JSON-LD)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.metadata.title,
    image: post.metadata.coverImage,
    datePublished: post.metadata.publishedAt,
    dateModified: post.metadata.updatedAt || post.metadata.publishedAt,
    author: {
      "@type": "Person",
      name: post.metadata.author,
    },
    publisher: {
      "@type": "Organization",
      name: "HackMNC",
      logo: {
        "@type": "ImageObject",
        url: "https://hackmnc.com/logo.png", // Replace with actual logo URL
      },
    },
    description: post.metadata.summary,
  };

  const session = await auth();
  const token = session?.accessToken;

  const blogMeta = await getBlogMetaData(slug, token);

  return (
    <article className="min-h-screen  bg-background pt-24 pb-16 relative max-sm:px-2">
      <ReadingProgressBar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="flex flex-col lg:grid lg:grid-cols-[260px_minmax(0,820px)_230px] gap-x-10 xl:gap-x-12 max-w-[1420px] mx-auto px-1 sm:px-6 lg:px-8">
        {/* Left Sidebar - Related Articles */}
        <aside className="hidden lg:block self-start sticky top-24">
          <RelatedArticles
            currentSlug={slug}
            category={post.metadata.category}
            tags={post.metadata.tags}
          />
        </aside>

        <main className="flex flex-col min-w-0 max-w-[820px] mx-auto w-full">
          {/* Breadcrumbs */}
          <Breadcrumb className="mb-6 text-sm">
            <BreadcrumbList className="flex flex-nowrap">
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/blogs">Blogs</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>

              <BreadcrumbSeparator />

              <BreadcrumbItem className="flex-1 min-w-0">
                <BreadcrumbPage className="min-w-0">
                  <span className="block truncate">{post.metadata.title}</span>
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          {/*Header */}
          <header className="flex flex-col gap-2">
            <h1 className="text-3xl font-semibold my-4 mt-3   text-foreground">
              {post.metadata.title}
            </h1>

            {/* Subtitle / Summary */}
            {post.metadata.summary && (
              <p className="text-md  leading-relaxed text-left">
                {post.metadata.summary}
              </p>
            )}
            <hr />

            {/* Author / Meta Row */}
            {/* <BlogHeaderMeta
              slug={slug}
              staticAuthorName={post.metadata.author}
              readingTime={post.metadata.readingTime || 5}
              publishedAt={post.metadata.publishedAt}
              token={token as string}
            /> */}
          </header>

          {/* Cover Image */}
          {post.metadata.coverImage && (
            <div className="w-full mt-10 mb-10">
              <div className="relative w-full aspect-[2/1] md:aspect-[16/9] overflow-hidden rounded-md">
                <Image
                  src={post.metadata.coverImage}
                  alt={post.metadata.coverAlt || post.metadata.title}
                  fill
                  className="object-cover"
                  priority
                  unoptimized
                />
              </div>
              <div className="text-center text-sm text-muted-foreground mt-2 italic">
                {post.metadata.coverAlt || post.metadata.title}
              </div>
            </div>
          )}

          {/* Main Content */}
          <div
            className={`bg-background w-full ${!post.metadata.coverImage ? "mt-10" : ""}`}
          >
            <MDXContent source={post.content} />
          </div>

          {/* <BlogAuthorBio slug={slug} /> */}
          <hr />
          <BlogHeaderMeta
            slug={slug}
            staticAuthorName={post.metadata.author}
            readingTime={post.metadata.readingTime || 5}
            publishedAt={post.metadata.publishedAt}
            token={token as string}
          />

          {/* Post Footer */}
          <div className=" pt-2 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="lg:hidden w-full flex justify-center">
              <ShareButtons title={post.metadata.title} slug={post.slug} />
            </div>

            {/* Tags */}
            {post.metadata.tags && (
              <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                {post.metadata.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-secondary hover:bg-secondary/80 text-secondary-foreground text-sm rounded-full transition-colors cursor-default"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
          <CommentList
            blogId={blogMeta?.data?.id}
            token={token}
            userId={session?.user?.id}
          />
        </main>

        {/* Right Sidebar - Author Info */}
        <aside className="hidden lg:block self-start sticky top-24">
          <div className="flex flex-col gap-6">
            <BlogCTA />
            <BlogAuthorBio slug={slug} />
          </div>
        </aside>
      </div>

      {/* Responsive Fallback / Mobile View Components */}
      {/* <div className="lg:hidden px-4 sm:px-6 mt-16 space-y-8">
        <BlogAuthorBio slug={slug} />
        <BlogCTA />
        <div className="pt-8 border-t border-border">
          <RelatedArticles
            currentSlug={slug}
            category={post.metadata.category}
            tags={post.metadata.tags}
          />
        </div>
      </div> */}

      {/* Similar Blogs (Desktop) */}
      {similarPosts.length > 0 && (
        <section className="mt-24 py-16 bg-muted/20 border-t border-border w-full">
          <div className="max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-12 text-center">Read Next</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {similarPosts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  );
}
