import Link from "next/link";
import { BlogPost } from "@/lib/mdx";

interface FeaturedPostProps {
  post: BlogPost;
}

export function FeaturedPost({ post }: FeaturedPostProps) {
  return (
    <Link href={`/blogs/${post.slug}`} className="group block">
      <article className="transition-all">
        <h3 className="font-bold text-foreground leading-snug group-hover:text-primary transition-colors mb-2 line-clamp-2">
          {post.metadata.title}
        </h3>
        <div className="flex items-center gap-2 text-xs text-muted-foreground/70">
          <time dateTime={post.metadata.publishedAt}>
            {new Date(post.metadata.publishedAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </time>
          <span className="w-1 h-1 rounded-full bg-border" />
          <span className="uppercase font-semibold tracking-wider text-[10px]">
            {post.metadata.category}
          </span>
        </div>
      </article>
    </Link>
  );
}
