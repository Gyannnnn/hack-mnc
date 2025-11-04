import { getAllArticles, getArticlePage, getArticlePageData } from '@/utils/notion'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'



// Generate metadata for SEO
export async function generateMetadata({ params }: {
  params: Promise<{ title: string }>
}): Promise<Metadata> {
  const title = await (await params).title;
  const decodedTitle = decodeURIComponent(title);
  
  try {
    const articles = await getAllArticles("291f49e716c081d9bf0be895bb2f85e9")
    const page = getArticlePage(articles, decodedTitle)

    if (!page) {
      return {
        title: 'Article Not Found',
        description: 'The requested article could not be found.',
      }
    }

    const articleData = await getArticlePageData(page, decodedTitle, "291f49e716c081d9bf0be895bb2f85e9")
    
    return {
      title: `${articleData.title} | Blog`,
      description: articleData.summary,
      openGraph: {
        title: articleData.title,
        description: articleData.summary,
        images: [articleData.thumbnail],
        type: 'article',
        publishedTime: articleData.publishedDate || undefined,
      },
      twitter: {
        card: 'summary_large_image',
        title: articleData.title,
        description: articleData.summary,
        images: [articleData.thumbnail],
      },
      alternates: {
        canonical: `/blog/${decodedTitle}`,
      },
    }
  } catch (error) {
    console.log(error)
    return {
      title: 'Error',
      description: 'An error occurred while loading the article.',
    }
  }
}

// Generate static params for SSG
export async function generateStaticParams() {
  try {
    const articles = await getAllArticles("291f49e716c081d9bf0be895bb2f85e9")
    
    return articles.map((article) => {
      const titleProperty = article.properties.title as any
      const title = titleProperty?.title[0]?.plain_text || ''
      return {
        title: slugify(title).toLowerCase(),
      }
    })
  } catch (error) {
    return []
  }
}

// Helper function for slugify
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-')
}

// Notion block renderer component
function NotionBlockRenderer({ block }: { block: any }) {
  switch (block.type) {
    case 'paragraph':
      return (
        <p className="text-[var(--color-foreground)] leading-7 mb-4">
          {block.paragraph.rich_text.map((text: any, index: number) => (
            <span
              key={index}
              className={`
                ${text.annotations.bold ? 'font-bold' : ''}
                ${text.annotations.italic ? 'italic' : ''}
                ${text.annotations.code ? 'font-mono bg-[var(--color-muted)] px-1 py-0.5 rounded-[var(--radius-sm)] text-sm' : ''}
                ${text.annotations.underline ? 'underline' : ''}
                ${text.annotations.strikethrough ? 'line-through' : ''}
              `}
              style={{
                color: text.annotations.color !== 'default' ? text.annotations.color : undefined,
              }}
            >
              {text.plain_text}
            </span>
          ))}
        </p>
      )
    
    case 'heading_1':
      return (
        <h2 className="text-2xl font-bold text-[var(--color-foreground)] mt-8 mb-4">
          {block.heading_1.rich_text[0]?.plain_text}
        </h2>
      )
    
    case 'heading_2':
      return (
        <h3 className="text-xl font-semibold text-[var(--color-foreground)] mt-6 mb-3">
          {block.heading_2.rich_text[0]?.plain_text}
        </h3>
      )
    
    case 'heading_3':
      return (
        <h4 className="text-lg font-medium text-[var(--color-foreground)] mt-4 mb-2">
          {block.heading_3.rich_text[0]?.plain_text}
        </h4>
      )
    
    case 'bulleted_list_item':
      return (
        <li className="text-[var(--color-foreground)] leading-7 mb-1 ml-4 list-disc">
          {block.bulleted_list_item.rich_text[0]?.plain_text}
        </li>
      )
    
    case 'numbered_list_item':
      return (
        <li className="text-[var(--color-foreground)] leading-7 mb-1 ml-4 list-decimal">
          {block.numbered_list_item.rich_text[0]?.plain_text}
        </li>
      )
    
    case 'code':
      return (
        <pre className="bg-[var(--color-card)] border border-[var(--color-border)] text-[var(--color-foreground)] p-4 rounded-[var(--radius)] overflow-x-auto mb-4">
          <code className="font-mono text-sm">
            {block.code.rich_text[0]?.plain_text}
          </code>
        </pre>
      )
    
    case 'quote':
      return (
        <blockquote className="border-l-4 border-[var(--color-primary)] pl-4 italic text-[var(--color-muted-foreground)] my-4">
          {block.quote.rich_text[0]?.plain_text}
        </blockquote>
      )
    
    case 'image':
      const imageUrl = block.image.type === 'external' 
        ? block.image.external.url 
        : block.image.file.url;
      
      return (
        <figure className="my-6">
          <img
            src={imageUrl}
            alt={block.image.caption?.[0]?.plain_text || 'Blog image'}
            className="rounded-[var(--radius)] w-full h-auto border border-[var(--color-border)]"
          />
          {block.image.caption && block.image.caption.length > 0 && (
            <figcaption className="text-center text-sm text-[var(--color-muted-foreground)] mt-2">
              {block.image.caption[0].plain_text}
            </figcaption>
          )}
        </figure>
      )
    
    case 'divider':
      return <hr className="my-6 border-[var(--color-border)]" />
    
    default:
      return null
  }
}

export default async function Page({ params }: {
  params: Promise<{ title: string }>
}) {
  const title = await (await params).title;
  const decodedTitle = decodeURIComponent(title);

  try {
    const articles = await getAllArticles("291f49e716c081d9bf0be895bb2f85e9")
    const page = getArticlePage(articles, decodedTitle)

    if (!page) {
      return notFound()
    }

    const articleData = await getArticlePageData(page, decodedTitle, "291f49e716c081d9bf0be895bb2f85e9")

    // Structured data for SEO
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: articleData.title,
      description: articleData.summary,
      image: articleData.thumbnail,
      datePublished: articleData.publishedDate,
      dateModified: articleData.lastEditedAt,
      author: {
        '@type': 'Person',
        name: 'Your Name', // Replace with actual author
      },
      publisher: {
        '@type': 'Organization',
        name: 'Your Blog Name',
        logo: {
          '@type': 'ImageObject',
          url: '/logo.png', // Replace with your logo
        },
      },
    }

    return (
      <>
        {/* Structured data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />

        <main className="min-h-screen bg-[var(--color-background)]">
          {/* Article Header */}
          <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Breadcrumb */}
            <nav className="flex items-center space-x-2 text-sm text-[var(--color-muted-foreground)] mb-8">
              <a href="/" className="hover:text-[var(--color-foreground)] transition-colors">Home</a>
              <span>›</span>
              <a href="/blog" className="hover:text-[var(--color-foreground)] transition-colors">Blog</a>
              <span>›</span>
              <span className="text-[var(--color-foreground)] text-wrap">{articleData.title}</span>
            </nav>

            {/* Article Header */}
            <header className="mb-8">
              <h1 className="text-4xl font-bold text-[var(--color-foreground)] mb-4 leading-tight">
                {articleData.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-4 text-sm text-[var(--color-muted-foreground)] mb-6">
                {articleData.publishedDate && (
                  <time dateTime={articleData.publishedDate}>
                    Published: {new Date(articleData.publishedDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </time>
                )}
                {articleData.lastEditedAt && (
                  <span>
                    Updated: {new Date(articleData.lastEditedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                )}
              </div>

              {/* Categories */}
              {articleData.categories.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {articleData.categories.map((category) => (
                    <span
                      key={category}
                      className="px-3 py-1 bg-[var(--color-primary)] text-[var(--color-primary-foreground)] text-sm font-medium rounded-full"
                    >
                      {category}
                    </span>
                  ))}
                </div>
              )}
            </header>

            {/* Thumbnail */}
            {articleData.thumbnail && (
              <div className="mb-8">
                <img
                  src={articleData.thumbnail}
                  alt={articleData.title}
                  className="w-full h-64 sm:h-80 lg:h-96 object-cover rounded-[var(--radius-xl)] border border-[var(--color-border)]"
                  loading="eager"
                />
              </div>
            )}

            {/* Summary */}
            {articleData.summary && (
              <div className="bg-[var(--color-muted)] border-l-4 border-[var(--color-primary)] p-6 rounded-r-[var(--radius)] mb-8">
                <p className="text-lg text-[var(--color-foreground)] leading-relaxed">
                  {articleData.summary}
                </p>
              </div>
            )}

            {/* Article Content */}
            <div className="prose prose-lg max-w-none">
              {articleData.content.map((block: any) => (
                <NotionBlockRenderer key={block.id} block={block} />
              ))}
            </div>

            {/* Article Footer */}
            <footer className="mt-12 pt-8 border-t border-[var(--color-border)]">
              <div className="flex justify-between items-center text-sm text-[var(--color-muted-foreground)]">
                <span>
                  {articleData.lastEditedAt && (
                    <>Last updated: {new Date(articleData.lastEditedAt).toLocaleDateString()}</>
                  )}
                </span>
                <div className="flex space-x-4">
                  {/* Add social sharing buttons here */}
                </div>
              </div>
            </footer>
          </article>

          {/* Suggested Articles */}
          {articleData.moreArticles.length > 0 && (
            <section className="bg-[var(--color-muted)] py-12">
              <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-2xl font-bold text-[var(--color-foreground)] mb-8 text-center">
                  You Might Also Like
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {articleData.moreArticles.map((article) => (
                    <a
                      key={article.id}
                      href={`/blog/${slugify(article.title).toLowerCase()}`}
                      className="block bg-[var(--color-card)] border border-[var(--color-border)] rounded-[var(--radius)] shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group hover:border-[var(--color-primary)]"
                    >
                      <div className="p-6">
                        <h3 className="font-bold text-lg text-[var(--color-foreground)] mb-2 group-hover:text-[var(--color-primary)] transition-colors">
                          {article.title}
                        </h3>
                        <p className="text-[var(--color-muted-foreground)] text-sm line-clamp-2">
                          {article.summary}
                        </p>
                        {article.publishedDate && (
                          <time className="text-xs text-[var(--color-muted-foreground)] mt-3 block">
                            {new Date(article.publishedDate).toLocaleDateString()}
                          </time>
                        )}
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </section>
          )}
        </main>
      </>
    )
  } catch (error) {
    console.error('Error rendering blog page:', error)
    return notFound()
  }
}