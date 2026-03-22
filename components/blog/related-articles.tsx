import Link from "next/link";
import { getBlogPosts } from "@/lib/mdx";

interface RelatedArticlesProps {
  currentSlug: string;
  category: string;
  tags?: string[];
}

export function RelatedArticles({
  currentSlug,
  category,
  tags = [],
}: RelatedArticlesProps) {
  const allPosts = getBlogPosts();

  // Filter logic: Same category OR overlapping tags, excluding current post
  const related = allPosts
    .filter((post) => {
      if (post.slug === currentSlug) return false;

      const sameCategory = post.metadata.category === category;
      const overlappingTags = post.metadata.tags?.some((tag) =>
        tags.includes(tag),
      );

      return sameCategory || overlappingTags;
    })
    .slice(0, 6);

  if (related.length === 0) return null;

  return (
    <div className="space-y-6 opacity-80">
      <h3 className="text-[11px] font-bold text-muted-foreground uppercase tracking-[0.2em] mb-4">
        Related Articles
      </h3>
      <div className="flex flex-col gap-5">
        {related.map((post) => (
          <Link
            key={post.slug}
            href={`/blogs/${post.slug}`}
            className="group flex flex-col gap-1.5"
          >
            <h4 className="text-[13px] font-medium text-muted-foreground/80 group-hover:text-primary transition-colors line-clamp-2 leading-snug">
              {post.metadata.title}
            </h4>
            <div className="flex items-center gap-2 text-[10px] text-muted-foreground/50 font-medium whitespace-nowrap overflow-hidden">
              <span className="uppercase tracking-wider">
                {post.metadata.category}
              </span>
              <span>•</span>
              <time dateTime={post.metadata.publishedAt}>
                {new Date(post.metadata.publishedAt).toLocaleDateString(
                  "en-US",
                  {
                    month: "short",
                    day: "numeric",
                  },
                )}
              </time>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
