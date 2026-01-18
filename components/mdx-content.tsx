import { MDXRemote } from "next-mdx-remote/rsc";
import React from "react";
import Link from "next/link";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

function CustomLink(props: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const href = props.href;

  if (href?.startsWith("/")) {
    return (
      <Link href={href} {...props}>
        {props.children}
      </Link>
    );
  }

  if (href?.startsWith("#")) {
    return <a {...props} />;
  }

  return <a target="_blank" rel="noopener noreferrer" {...props} />;
}

function Code({ children, ...props }: React.HTMLAttributes<HTMLElement>) {
  // Simple styling for code blocks - you can enhance this with syntax highlighting libraries
  return (
    <code
      {...props}
      className="bg-muted px-1.5 py-0.5 rounded-md text-sm font-mono text-primary"
    >
      {children}
    </code>
  );
}

function Pre({ children, ...props }: React.HTMLAttributes<HTMLPreElement>) {
  return (
    <pre
      {...props}
      className="bg-zinc-950 text-white p-4 rounded-lg overflow-x-auto my-6 border border-zinc-800"
    >
      {children}
    </pre>
  );
}

const components = {
  a: CustomLink,
  code: Code,
  pre: Pre,
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 {...props} className="text-3xl font-bold mt-8 mb-4 tracking-tight" />
  ),
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 {...props} className="text-2xl font-bold mt-8 mb-4 tracking-tight" />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 {...props} className="text-xl font-bold mt-6 mb-3 tracking-tight" />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p {...props} className="leading-7 [&:not(:first-child)]:mt-6" />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul {...props} className="my-6 ml-6 list-disc [&>li]:mt-2" />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol {...props} className="my-6 ml-6 list-decimal [&>li]:mt-2" />
  ),
  blockquote: (props: React.BlockquoteHTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      {...props}
      className="mt-6 border-l-2 border-primary pl-6 italic text-muted-foreground"
    />
  ),
  // Add more custom components (e.g., for images, callouts) here
};

export function MDXContent({ source }: { source: string }) {
  return (
    <article className="prose prose-zinc dark:prose-invert max-w-none">
      <MDXRemote
        source={source}
        components={components}
        options={{
          mdxOptions: {
            rehypePlugins: [
              rehypeSlug,
              [
                rehypeAutolinkHeadings,
                {
                  behavior: "wrap",
                },
              ],
            ],
          },
        }}
      />
    </article>
  );
}
