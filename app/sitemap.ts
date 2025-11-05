import { MetadataRoute } from 'next';
import { getAllArticles } from '@/utils/notion';
import { getAllCompaniesForSeo } from '@/lib/getAllCompanies';
import type { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://hackmnc.com';

  // Fetch blogs (Notion) + companies
  const [pages, companies] = await Promise.all([
    getAllArticles('291f49e716c081d9bf0be895bb2f85e9'),
    getAllCompaniesForSeo(),
  ]);

  // Type-safe blog mapping
  const blogUrls: MetadataRoute.Sitemap = pages.map((page: PageObjectResponse) => {
    const slugProp = page.properties?.['slug'];

    const slug =
      slugProp?.type === 'rich_text' && slugProp.rich_text[0]?.plain_text
        ? slugProp.rich_text[0].plain_text
        : page.id;

    const lastModified = page.last_edited_time
      ? new Date(page.last_edited_time)
      : new Date();

    return {
      url: `${baseUrl}/blogs/${slug}`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.8,
    };
  });

  // Company URLs (already typed)
  const companyUrls: MetadataRoute.Sitemap = companies.map((company) => ({
    url: `${baseUrl}/companies/${company.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/companies`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blogs`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/login`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/signup`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ];

  return [...staticPages, ...blogUrls, ...companyUrls];
}
