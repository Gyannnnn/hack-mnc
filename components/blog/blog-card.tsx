import Link from "next/link";
import { BlogPost } from "@/lib/mdx";
import { CalendarIcon, Clock, ChevronRight } from "lucide-react";

interface BlogCardProps {
  post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <Link href={`/blogs/${post.slug}`} className="group block">
      <article className="py-5 border-b border-zinc-800 transition-colors">
        <div className="flex flex-col gap-2">
          {/* Title */}
          <h3 className="text-xl md:text-2xl font-bold text-foreground group-hover:text-primary transition-colors leading-tight">
            {post.metadata.title}
          </h3>

          {/* Description */}
          <p className="text-muted-foreground text-sm md:text-base line-clamp-2 leading-relaxed">
            {post.metadata.summary}
          </p>

          {/* Metadata Row */}
          <div className="flex items-center gap-2 text-xs text-muted-foreground/60 mt-0.5">
            <time dateTime={post.metadata.publishedAt}>
              {new Date(post.metadata.publishedAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </time>
            <span>•</span>
            <span>{post.metadata.readingTime} min read</span>
            <span>•</span>
            <span className="uppercase tracking-wide font-medium">
              {post.metadata.category}
            </span>
          </div>

          {/* Footer Row */}
          <div className="flex items-center justify-between mt-1">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center text-[8px] font-bold text-primary border border-primary/20">
                {post.metadata.author.charAt(0)}
              </div>
              <span className="text-xs font-medium text-foreground/70">
                {post.metadata.author}
              </span>
            </div>

            <span className="text-sm font-semibold text-primary flex items-center gap-1 opacity-0 group-hover:opacity-100 group-hover:gap-2 transition-all">
              Read Post <ChevronRight className="w-4 h-4" />
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
