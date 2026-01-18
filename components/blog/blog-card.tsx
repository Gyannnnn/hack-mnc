import Link from 'next/link';
import { BlogPost } from '@/lib/mdx';
import { CalendarIcon, Clock, ChevronRight } from 'lucide-react';

interface BlogCardProps {
  post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <Link href={`/blogs/${post.slug}`} className="group block h-full">
      <article className="flex flex-col h-full bg-card border border-border rounded-xl overflow-hidden transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:-translate-y-1">
        {/* Image Container */}
        <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-muted">
          {post.metadata.coverImage ? (
            <img
              src={post.metadata.coverImage}
              alt={post.metadata.coverAlt || post.metadata.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-secondary text-secondary-foreground">
              <span className="text-4xl font-bold opacity-20">#</span>
            </div>
          )}
          
          <div className="absolute top-3 left-3">
             <span className="px-2.5 py-1 bg-background/90 backdrop-blur-sm text-foreground text-xs font-semibold rounded-full border border-border/50 shadow-sm">
               {post.metadata.category}
             </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 p-5">
          <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
            <div className="flex items-center gap-1">
              <CalendarIcon className="w-3.5 h-3.5" />
              <time dateTime={post.metadata.publishedAt}>
                {new Date(post.metadata.publishedAt).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </time>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              <span>{post.metadata.readingTime} min read</span>
            </div>
          </div>

          <h3 className="text-xl font-bold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {post.metadata.title}
          </h3>

          <p className="text-muted-foreground text-sm line-clamp-3 mb-4 flex-1">
            {post.metadata.summary}
          </p>

          <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/50">
            <div className="flex items-center gap-2">
               <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-[10px] font-bold text-primary">
                  {post.metadata.author.charAt(0)}
               </div>
               <span className="text-xs font-medium text-foreground">{post.metadata.author}</span>
            </div>
            
            <span className="text-xs font-semibold text-primary flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              Read Post <ChevronRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
