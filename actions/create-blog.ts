"use server";

import fs from 'fs';
import path from 'path';
import { revalidatePath } from 'next/cache';

interface FormState {
    message?: string;
    error?: string;
    success?: boolean;
}

export async function createBlogAction(prevState: FormState, formData: FormData) {
    const title = formData.get('title') as string;
    const slug = formData.get('slug') as string;
    const author = formData.get('author') as string;
    const authorId = formData.get('authorId') as string;

    const category = formData.get('category') as string;
    const summary = formData.get('summary') as string;
    const content = formData.get('content') as string;
    const coverImageFile = formData.get('coverImage') as File;
    const isFile = coverImageFile instanceof File && coverImageFile.size > 0;

    if (!title || !slug || !content || !authorId) {
        return { error: "Missing required fields" };
    }

    let coverImageUrl = '';

    if (isFile) {
        try {
            const buffer = Buffer.from(await coverImageFile.arrayBuffer());
            const imageDir = path.join(process.cwd(), 'public/blogs-image', slug);

            if (!fs.existsSync(imageDir)) {
                fs.mkdirSync(imageDir, { recursive: true });
            }

            const fileName = coverImageFile.name.replace(/\s+/g, '-');
            const filePath = path.join(imageDir, fileName);
            fs.writeFileSync(filePath, buffer);
            coverImageUrl = `/blogs-image/${slug}/${fileName}`;
        } catch (error) {
            console.error("Error uploading image:", error);
            return { error: "Failed to upload cover image" };
        }
    } else {
        // Handle case where it might be a string URL if we support manual entry (optional, but good for robustness)
        const coverImageString = formData.get('coverImage') as string;
        if (typeof coverImageString === 'string' && coverImageString.length > 0) {
            coverImageUrl = coverImageString;
        }
    }

    // Sanitize category for directory name
    const sanitizedCategory = category.replace(/[^a-zA-Z0-9-_]/g, '-').trim();
    const blogDir = path.join(process.cwd(), 'content/blogs', sanitizedCategory);

    // Check if category directory is valid
    if (fs.existsSync(blogDir) && !fs.statSync(blogDir).isDirectory()) {
        // Fallback if there's a file named same as category (unlikely but possible)
        console.warn(`File exists with category name ${sanitizedCategory}, using 'Uncategorized'`);
        return { error: `Cannot create category folder "${sanitizedCategory}" because a file exists with that name.` };
    }

    if (!fs.existsSync(blogDir)) {
        fs.mkdirSync(blogDir, { recursive: true });
    }

    const mdxPath = path.join(blogDir, `${slug}.mdx`);

    if (fs.existsSync(mdxPath)) {
        return { error: "A blog with this slug already exists." };
    }

    // We also need the Author Name and Slug for the MDX frontmatter? 
    // The prompt says "author: 'K Suman Patra', authorSlug: 'ksumanp'".
    // We only have `authorId` from the form (if we follow the plan to use ID for API).
    // However, the MDX file needs `author` ID? Or Name?
    // The example MDX in prompt had:
    // author: "K Suman Patra"
    // authorSlug: "ksumanp"

    // The previous implementation had `author: "${author || 'Admin'}"`.
    // I should probably pass these as hidden fields or fetch them.
    // For now, I will assume the form passes authorName and authorSlug as well, or I'll just use what I have.
    // Actually, the prompt says: "the admin fills all the metadata for the .mdx file ... author: 'K Suman Patra'".
    // But ALSO "on clicking publish it will hit createblog api ... createBlog need an user id".
    // So I need both.

    const authorName = formData.get('authorName') as string;
    const authorSlug = formData.get('authorSlug') as string;

    const mdxContent = `---
title: "${title.replace(/"/g, '\\"')}"
slug: "${slug}"
author: "${authorName || 'Admin'}"
authorSlug: "${authorSlug || 'admin'}"
publishedAt: "${new Date().toISOString().split('T')[0]}"
updatedAt: "${new Date().toISOString().split('T')[0]}"
status: "published"
category: "${category || 'Uncategorized'}"
tags:
  - ${category}
difficulty: "easy"
readingTime: ${Math.ceil(content.split(' ').length / 200)}
coverImage: "${coverImageUrl}"
summary: "${summary.replace(/"/g, '\\"')}"
---

${content}
`;

    try {
        fs.writeFileSync(mdxPath, mdxContent, 'utf8');

        // Call API
        // We need a token. The prompt implies the admin is logged in.
        // `createBlog` action takes `token` as first arg.
        // How do we get the token here?
        // The prompt says "required api/ servre actions are in actions/blogs.actions.ts ... createBlog".
        // In `editor/page.tsx` the user used `const blog = await createBlog(token,blogdata);` in a client-side function.
        // But requested to "automate these process ... on clicking publish it will hit createblog api".
        // Use `createBlog` from `blogs.actions.ts` inside THIS server action?
        // Server actions run on server. `createBlog` (from blogs.actions.ts) is "use server".
        // Wait, `blogs.actions.ts` functions are "use server".
        // But `createBlogAction` (this file) is also "use server".
        // I can import `createBlog` and call it.
        // But I need the TOKEN.
        // Typically tokens are in cookies or passed from client.
        // I'll check if I can get token from cookies or if I should expect it in FormData.

        // For now, I will try to retrieve token from cookies if possible, or assume it's passed in hidden field.
        // Let's check `actions/blogs.actions.ts` again. It uses `axios`.

        // In the USER'S changed code for `app/admin/editor/page.tsx`, they had:
        // `const blog = await createBlog(token,blogdata);`
        // Validation: The user provided `createBlog` in `blogs.actions.ts` which takes `token`.

        // Retrieve token using NextAuth session
        const { auth } = await import('@/auth');
        const session = await auth();
        const token = session?.accessToken || '';

        // Actually, the PROMPT said "the admin will come if roll is not admin access denied".

        // I'll import `createBlog` from `@/actions/blogs.actions`.
        const { createBlog } = await import('@/actions/blogs.actions');

        const blogData = {
            title,
            slug,
            summary,
            // content not sent to DB as per request
            coverImage: coverImageUrl,
            authorId: authorId,
            relatedBlogs: [] // Optional
        };

        // If token is missing, the API call might fail, but MDX is created.
        // I'll try to call it.
        const responseCallback = await createBlog(token, blogData);

        if (!responseCallback) {
            console.error("Failed to sync blog with database. Token present:", !!token);
            // Optional: Backup or rollback MDX creation? 
            // For now, let's just return error so user knows DB sync failed.
            // We might want to rename the MDX status to 'draft' or similar if we could, but let's stick to error reporting.
            return { error: "Blog created locally but failed to sync with database. Please check your connection or login status." };
        }

        revalidatePath('/blogs');
        return { success: true, message: `Blog "${title}" published successfully!` };
    } catch (error) {
        console.error("Failed to publish blog:", error);
        return { error: "Failed to publish blog post." };
    }
}
