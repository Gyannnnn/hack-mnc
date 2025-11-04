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
    <section className="py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
       

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {featuredArticles.map((article) => (
            <article
              key={article.id}
              className="group bg-card border border-border rounded-lg overflow-hidden transition-all duration-300 hover:border-primary/40 hover:bg-card/60 h-full flex flex-col"
            >
  
              <div className="relative overflow-hidden aspect-video">
                <img
                  src={article.thumbnail}
                  alt={article.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
        
                <div className="absolute inset-0 bg-gradient-to-t from-card/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
           
                {article.categories.length > 0 && (
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1">
                    {article.categories.slice(0, 2).map((category) => (
                      <span
                        key={category}
                        className="px-2 py-1 bg-primary text-primary-foreground text-[10px] font-medium rounded-full"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                )}
              </div>

 
              <div className="p-4 md:p-6 flex flex-col flex-1">
            
                {article.publishedDate && (
                  <time className="text-xs text-muted-foreground mb-2 block">
                    {new Date(article.publishedDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </time>
                )}

                {/* Title */}
                <h3 className="font-semibold text-lg md:text-xl text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors duration-200">
                  {article.title}
                </h3>

                {/* Summary */}
                <p className="text-muted-foreground mb-4 line-clamp-3 leading-relaxed">
                  {article.summary}
                </p>

         
                <div className="mt-auto flex items-center justify-between pt-4 border-t border-border">
                  <Link
                    href={`/blog/${slugify(article.title).toLowerCase()}`}
                    className="inline-flex items-center text-primary hover:text-primary/80 font-medium text-sm group/link transition-colors duration-200"
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

                  <div className="flex items-center text-xs text-muted-foreground">
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