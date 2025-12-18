import { MetadataRoute } from 'next';
import { getAllCompaniesForSeo } from '@/lib/getAllCompanies';
import { slugify } from '@/utils/slugify.utility';
import { getAllTopicsForSeo } from '@/lib/getAllCompanies';
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://hackmnc.com';

  const companies = await getAllCompaniesForSeo()
  const topics = await getAllTopicsForSeo()

  const companyUrls: MetadataRoute.Sitemap = companies.map((company) => ({
    url: `${baseUrl}/companies/${slugify(company.name.toLowerCase())}/leetcode-interview-questions`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 1,
  }));

  const topicUrls: MetadataRoute.Sitemap = topics.map((topic) => ({
    url: `${baseUrl}/topic/${slugify(topic.name.toLowerCase())}/leetcode-interview-questions`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 1,
  }));


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
    }
  ];

  return [...staticPages, ...companyUrls, ...topicUrls];
}
