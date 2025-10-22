import { Client, PageObjectResponse } from '@notionhq/client'

const notion = new Client({
  auth: process.env.NOTION_SECRET,
})

export interface Article {
  id: string
  title: string
  categories: string[]
  thumbnail: string
  publishedDate: string | null
  lastEditedAt: string | null
  summary: string
}

export interface ArticleList {
  articles: Article[]
  categories: string[]
}

export const getAllArticles = async (databaseId: string): Promise<PageObjectResponse[]> => {
  try {
    const response = await notion.databases.query({
      database_id: databaseId,
      filter: {
        property: 'status',
        select: {
          equals: 'published'
        }
      }
    })

    return response.results as PageObjectResponse[]
  } catch (error) {
    console.error('Error fetching articles from Notion:', error)
    throw error
  }
}

const mapArticleProperties = (article: PageObjectResponse): Article => {
  const { id, properties } = article

  const titleProperty = properties.title as any
  const categoriesProperty = properties.categories as any
  const thumbnailProperty = properties.thumbnail as any
  const publishedProperty = properties.published as any
  const lastEditedProperty = properties.LastEdited as any
  const summaryProperty = properties.summary as any

  return {
    id,
    title: titleProperty?.title[0]?.plain_text || '',
    categories: categoriesProperty?.multi_select?.map((category: any) => category.name) || [],
    thumbnail: thumbnailProperty?.files[0]?.file?.url ||
      thumbnailProperty?.files[0]?.external?.url ||
      '/image-background.png',
    publishedDate: publishedProperty?.date?.start || null,
    lastEditedAt: lastEditedProperty?.last_edited_time || null,
    summary: summaryProperty?.rich_text[0]?.plain_text || ''
  }
}

export const convertToArticleList = (tableData: PageObjectResponse[]): ArticleList => {
  const categories: string[] = []

  const articles = tableData.map((article: PageObjectResponse) => {
    const categoriesProperty = article.properties.categories as any
    
    categoriesProperty?.multi_select?.forEach((category: any) => {
      const { name } = category
      if (!categories.includes(name) && name) {
        categories.push(name)
      }
    })

    return mapArticleProperties(article)
  })

  return { articles, categories }
}

export const getMoreArticlesToSuggest = async (databaseId: string, currentArticleTitle: string): Promise<Article[]> => {
  try {
    const response = await notion.databases.query({
      database_id: databaseId,
      filter: {
        and: [
          {
            property: 'status',
            select: {
              equals: 'published'
            }
          },
          {
            property: 'title',
            rich_text: {
              does_not_equal: currentArticleTitle
            }
          }
        ]
      }
    })

    const moreArticles = (response.results as PageObjectResponse[]).map((article: PageObjectResponse) =>
      mapArticleProperties(article)
    )

    return shuffleArray(moreArticles).slice(0, 2)
  } catch (error) {
    console.error('Error fetching more articles:', error)
    throw error
  }
}

export const getArticlePage = (data: PageObjectResponse[], slug: string): PageObjectResponse | undefined => {
  return data.find(result => {
    const titleProperty = result.properties.title as any
    const resultSlug = slugify(
      titleProperty.title[0]?.plain_text || ''
    ).toLowerCase()
    return resultSlug === slug
  })
}

export function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array]
  let currentIndex = newArray.length
  let randomIndex

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--

    // And swap it with the current element.
    ;[newArray[currentIndex], newArray[randomIndex]] = [newArray[randomIndex], newArray[currentIndex]]
  }
  return newArray
}

export const getArticlePageData = async (page: PageObjectResponse, slug: string, databaseId: string) => {
  let content = []
  const title = (page.properties.title as any).title[0].plain_text

  try {
    const moreArticles = await getMoreArticlesToSuggest(databaseId, title)

    let blocks = await notion.blocks.children.list({
      block_id: page.id
    })

    content = [...blocks.results]

    while (blocks.has_more) {
      blocks = await notion.blocks.children.list({
        block_id: page.id,
        start_cursor: blocks.next_cursor!
      })

      content = [...content, ...blocks.results]
    }

    return {
      ...mapArticleProperties(page),
      content,
      slug,
      moreArticles
    }
  } catch (error) {
    console.error('Error fetching article page data:', error)
    throw error
  }
}

// Helper function for slugify since you were using it
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-')
}