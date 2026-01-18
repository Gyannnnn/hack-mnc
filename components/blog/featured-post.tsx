import Link from "next/link";
import { BlogPost } from "@/lib/mdx";
import { ArrowRight, CalendarIcon, Clock } from "lucide-react";

interface FeaturedPostProps {
  post: BlogPost;
}

export function FeaturedPost({ post }: FeaturedPostProps) {
  return (
    <Link href={`/blogs/${post.slug}`} className="group block mb-4 last:mb-0">
      <article className="py-3 border-b border-border/40 last:border-0 group-hover:bg-muted/30 -mx-3 px-3 rounded-md transition-colors">
        <h3 className="font-bold text-foreground leading-snug group-hover:text-primary transition-colors mb-1.5">
          {post.metadata.title}
        </h3>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <time dateTime={post.metadata.publishedAt}>
            {new Date(post.metadata.publishedAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </time>
          <span>·</span>
          <span className="text-[10px] uppercase font-semibold tracking-wider opacity-80">
            {post.metadata.category}
          </span>
        </div>
      </article>
    </Link>
  );
}
