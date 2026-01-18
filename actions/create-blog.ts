"use server";

import fs from 'fs';
import path from 'path';
import { revalidatePath } from 'next/cache';

export async function createBlogAction(formData: FormData) {
    const title = formData.get('title') as string;
    const slug = formData.get('slug') as string;
    const author = formData.get('author') as string;
    const category = formData.get('category') as string;
    const summary = formData.get('summary') as string;
    const content = formData.get('content') as string;
    const coverImage = formData.get('coverImage') as string; // URL

    if (!title || !slug || !content) {
        return { error: "Missing required fields" };
    }

    const filePath = path.join(process.cwd(), 'content/blogs', `${slug}.mdx`);

    if (fs.existsSync(filePath)) {
        return { error: "A blog with this slug already exists." };
    }

    const mdxContent = `---
title: "${title.replace(/"/g, '\\"')}"
slug: "${slug}"
author: "${author || 'Admin'}"
publishedAt: "${new Date().toISOString()}"
updatedAt: "${new Date().toISOString()}"
status: "published"
category: "${category || 'Uncategorized'}"
summary: "${summary.replace(/"/g, '\\"')}"
coverImage: "${coverImage || ''}"
readingTime: ${Math.ceil(content.split(' ').length / 200)}
---

${content}
`;

    try {
        fs.writeFileSync(filePath, mdxContent, 'utf8');
        revalidatePath('/blogs');
        return { success: true, message: `Blog "${title}" published successfully!` };
    } catch (error) {
        console.error("Failed to write blog file:", error);
        return { error: "Failed to save blog post." };
    }
}
