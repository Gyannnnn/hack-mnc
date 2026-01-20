import { MDXRemote } from "next-mdx-remote/rsc";
import React from "react";
import Link from "next/link";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import { mdxComponents } from "@/lib/mdx-components";

const rehypePrettyCodeOptions = {
  theme: "github-dark",
  keepBackground: false,
};

export function MDXContent({ source }: { source: string }) {
  return (
    <article className="prose prose-zinc dark:prose-invert max-w-none">
      <MDXRemote
        source={source}
        components={mdxComponents}
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
              [rehypePrettyCode, rehypePrettyCodeOptions],
            ],
          },
        }}
      />
    </article>
  );
}
