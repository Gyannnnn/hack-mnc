"use server";

import axios from "axios";
import { BlogMetaData } from "@/types/blog.types";

export const getBlogMetaData = async (slug: string, token?: string) => {
    try {
        const headers: Record<string, string> = {};
        if (token) {
            headers["Authorization"] = `Bearer ${token}`;
        }

        const response = await axios.get<BlogMetaData>(
            `https://api.hackmnc.com/api/v1/blog/meta/${slug}`,
            { headers }
        );
        if (response.status === 200) {
            console.log("metaData:", response.data);
            return response.data;
        }
        return null;
    } catch (error) {
        console.error("Error fetching blog metadata:", error);
        return null;
    }
};

export const likeBlog = async (token: string, slug: string) => {
    try {
        const response = await axios.put<BlogMetaData>(
            `https://api.hackmnc.com/api/v1/blog/like/${slug}`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return response.data;
    } catch (error) {
        console.error("Error liking blog:", error);
        return null;
    }
};


export const getComments = async (blogId: string) => {
    try {
        const response = await axios.get(
            `https://api.hackmnc.com/api/v1/blog/comment/${blogId}`
        );
        if (response.status === 200) {
            return response.data;
        }
        return null;
    } catch (error) {
        console.error("Error fetching comments:", error);
        return null;
    }
};

export const createComment = async (token: string, blogId: string, content: string, userId: string) => {
    try {
        const response = await axios.post(
            `https://api.hackmnc.com/api/v1/blog/comment/create`,
            { content, blogId, parentId: null, userId },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return response.data;
    } catch (error: any) {
        if (axios.isAxiosError(error)) {
            console.error("Error creating comment:", error.response?.data || error.message);
        } else {
            console.error("Error creating comment:", error);
        }
        return null;
    }
};

export const replyToComment = async (token: string, parentId: string, content: string, userId: string, blogId: string) => {
    try {
        const response = await axios.post(
            `https://api.hackmnc.com/api/v1/blog/comment/reply/${parentId}`,
            { content, userId, blogId, commentId: parentId }, // sending commentId as parentId since schema asked for it
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return response.data;
    } catch (error) {
        console.error("Error replying to comment:", error);
        return null;
    }
};

export const likeComment = async (token: string, commentId: string) => {
    try {
        const response = await axios.put(
            `https://api.hackmnc.com/api/v1/blog/comment/like/${commentId}`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return response.data;
    } catch (error) {
        console.error("Error liking comment:", error);
        return null;
    }
};