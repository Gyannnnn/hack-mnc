// components/FeaturedArticles.tsx
import {
  getAllArticles,
  convertToArticleList,
  shuffleArray,
} from "@/utils/notion";
import Link from "next/link";
import { slugify } from "@/utils/notion";

export default async function FeaturedArticles() {
  const pages = await getAllArticles("291f49e716c081d9bf0be895bb2f85e9");
  const { articles } = convertToArticleList(pages);


  const featuredArticles = shuffleArray(articles)

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
       

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredArticles.map((article, index) => (
            <article
              key={article.id}
              className="group bg-[var(--color-card)] border border-[var(--color-border)] rounded-[var(--radius-lg)] overflow-hidden hover:shadow-lg transition-all duration-300 hover:translate-y-[-4px]"
            >
  
              <div className="relative overflow-hidden">
                <img
                  src={article.thumbnail}
                  alt={article.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
        
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-card)]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
           
                {article.categories.length > 0 && (
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1">
                    {article.categories.slice(0, 2).map((category) => (
                      <span
                        key={category}
                        className="px-2 py-1 bg-[var(--color-primary)] text-[var(--color-primary-foreground)] text-xs font-medium rounded-full"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                )}
              </div>

 
              <div className="p-6">
            
                {article.publishedDate && (
                  <time className="text-sm text-[var(--color-muted-foreground)] mb-2 block">
                    {new Date(article.publishedDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </time>
                )}

                {/* Title */}
                <h3 className="font-bold text-xl text-[var(--color-foreground)] mb-3 line-clamp-2 group-hover:text-[var(--color-primary)] transition-colors duration-200">
                  {article.title}
                </h3>

                {/* Summary */}
                <p className="text-[var(--color-muted-foreground)] mb-4 line-clamp-3 leading-relaxed">
                  {article.summary}
                </p>

         
                <div className="flex items-center justify-between pt-4 border-t border-[var(--color-border)]">
                  <Link
                    href={`/blog/${slugify(article.title).toLowerCase()}`}
                    className="inline-flex items-center text-[var(--color-primary)] hover:text-[var(--color-primary)]/80 font-medium text-sm group/link transition-colors duration-200"
                  >
                    Read More
                    <svg 
                      className="ml-2 w-4 h-4 transition-transform duration-200 group-hover/link:translate-x-1" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>

                  <div className="flex items-center text-xs text-[var(--color-muted-foreground)]">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {Math.ceil(article.summary.length / 200)} min read
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        
      </div>
    </section>
  );
}