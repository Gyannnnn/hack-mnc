import { notFound } from "next/navigation";
import Link from "next/link";
import { getBlogPost, getBlogPosts, getHeadings } from "@/lib/mdx"; // Ensure you're importing from your new MDX lib
import { MDXContent } from "@/components/mdx-content";
import { ShareButtons } from "@/components/blog/share-buttons";
import { ReadingProgressBar } from "@/components/blog/reading-progress-bar";
import { TableOfContents } from "@/components/blog/table-of-contents";
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

  const headings = getHeadings(post.content);

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
    <article className="min-h-screen bg-background pt-24 pb-16 relative max-sm:px-2">
      <ReadingProgressBar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-[1400px] mx-auto mb-10">
        <div className="lg:col-span-8 lg:col-start-3">
          {/* Breadcrumbs */}
          <Breadcrumb className="mb-6">
            <BreadcrumbList className="flex flex-wrap">
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/blogs">Blogs</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>

              <BreadcrumbSeparator />

              <BreadcrumbItem className="min-w-0">
                <BreadcrumbPage>
                  <span className="block max-w-full line-clamp-2">
                    {post.metadata.title}
                  </span>
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          {/* Medium Style Header */}
          <header className="mb-8 mx-auto flex flex-col gap-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground tracking-tight leading-[1.15] text-left">
              {post.metadata.title}
            </h1>

            {/* Subtitle / Summary */}
            {post.metadata.summary && (
              <p className="text-xl text-muted-foreground leading-relaxed text-left">
                {post.metadata.summary}
              </p>
            )}

            {/* Author / Meta Row */}
            <BlogHeaderMeta
              slug={slug}
              staticAuthorName={post.metadata.author}
              readingTime={post.metadata.readingTime || 5}
              publishedAt={post.metadata.publishedAt}
              token={token as string}
            />
          </header>

          {/* Cover Image */}
          {post.metadata.coverImage && (
            <div className="w-full">
              <div className="relative w-full aspect-[2/1] md:aspect-[16/9] overflow-hidden rounded-md">
                <Image
                  src={post.metadata.coverImage}
                  alt={post.metadata.coverAlt || post.metadata.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="text-center text-sm text-muted-foreground mt-2 italic">
                {post.metadata.coverAlt || post.metadata.title}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-[1400px] mx-auto">
        {/* Left Sidebar: Share */}
        <div className="hidden lg:block lg:col-span-2 relative">
          <div className="sticky top-32 flex flex-col gap-4 items-center">
            <div className="p-2 border border-border/50 rounded-full bg-card/50 backdrop-blur-sm">
              <ShareButtons
                title={post.metadata.title}
                slug={post.slug}
                vertical
              />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-8">
          {/* Content */}
          <div
            className="bg-background prose prose-zinc dark:prose-invert max-w-none prose-lg 
            prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-foreground 
            prose-a:text-primary hover:prose-a:text-primary/80 
            prose-img:rounded-xl prose-pre:border prose-pre:bg-zinc-950
            [&_:is(h1,h2,h3,h4,h5,h6)_a]:no-underline [&_:is(h1,h2,h3,h4,h5,h6)_a]:text-foreground
            [&_p]:leading-loose [&_p]:text-lg [&_li]:text-lg"
          >
            <MDXContent source={post.content} />
          </div>

          {/* Post Footer */}
          <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-6">
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

          <BlogAuthorBio slug={slug} />

          <CommentList
            blogId={blogMeta?.data?.id}
            token={token}
            userId={session?.user?.id}
          />
        </div>

        {/* Right Sidebar: TOC */}
        <div className="hidden lg:block lg:col-span-2 relative">
          <div className="sticky top-32 pl-4 border-l border-border/40">
            <TableOfContents headings={headings} />
          </div>
        </div>
      </div>

      {/* Similar Blogs */}
      {similarPosts.length > 0 && (
        <section className="mt-24 py-16 bg-muted/20 border-t border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
