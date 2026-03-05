import { MDXRemote } from "next-mdx-remote/rsc";
import React from "react";
import rehypeSlug from "rehype-slug";
import rehypePrettyCode from "rehype-pretty-code";
import { mdxComponents } from "@/lib/mdx-components";

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
                rehypePrettyCode,
                {
                  theme: "github-dark",
                  keepBackground: false,
                  onVisitLine(node: {
                    children: { type: string; value: string }[];
                  }) {
                    // Prevent lines from collapsing in `display: grid` mode, and allow empty
                    // lines to be copy/pasted
                    if (node.children.length === 0) {
                      node.children = [{ type: "text", value: " " }];
                    }
                  },
                },
              ],
            ],
          },
        }}
      />
    </article>
  );
}
