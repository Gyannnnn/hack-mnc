import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import GithubSlugger from 'github-slugger';

const blogsDirectory = path.join(process.cwd(), 'content/blogs');

export type BlogPost = {
    slug: string;
    metadata: BlogPostMetadata;
    content: string;
};

export type BlogPostMetadata = {
    title: string;
    publishedAt: string;
    updatedAt?: string;
    author: string;
    summary?: string;
    coverImage?: string;
    coverAlt?: string;
    category: string;
    tags?: string[];
    status: 'draft' | 'published';
    difficulty?: 'beginner' | 'intermediate' | 'advanced';
    readingTime?: number;
};

export function getBlogPosts(): BlogPost[] {
    if (!fs.existsSync(blogsDirectory)) {
        return [];
    }

    const fileNames = fs.readdirSync(blogsDirectory);
    const allBlogsData = fileNames.map((fileName) => {
        const slug = fileName.replace(/\.mdx$/, '');
        const fullPath = path.join(blogsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);

        return {
            slug,
            metadata: data as BlogPostMetadata,
            content,
        };
    });

    // Filter for published posts
    const publishedBlogs = allBlogsData.filter((post) =>
        post.metadata.status === 'published' &&
        post.metadata.title &&
        post.metadata.title.trim().length > 0
    );

    // Sort posts by date
    return publishedBlogs.sort((a, b) => {
        if (a.metadata.publishedAt < b.metadata.publishedAt) {
            return 1;
        } else {
            return -1;
        }
    });
}

export function getBlogPost(slug: string): BlogPost | undefined {
    const fullPath = path.join(blogsDirectory, `${slug}.mdx`);
    if (!fs.existsSync(fullPath)) {
        return undefined;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
        slug,
        metadata: data as BlogPostMetadata,
        content,
    };
}


export function getAllCategories(): string[] {
    const posts = getBlogPosts();
    const categories = new Set(posts.map((post) => post.metadata.category));
    return Array.from(categories);
}

export function getHeadings(source: string) {
    const slugger = new GithubSlugger();
    const regex = /^(#{2,3})\s+(.*)$/gm;
    const headings = [];
    let match;

    while ((match = regex.exec(source)) !== null) {
        headings.push({
            text: match[2],
            level: match[1].length,
            slug: slugger.slug(match[2]),
        });
    }

    return headings;
}
