

export interface BlogMetaData {
    success: boolean;
    message: string;
    data: {
        id: string;
        title: string;
        slug: string;
        summary: string;
        coverImage: string;
        publishedAt: string;
        _count: {
            likes: number;
            comments: number;
        };
        isLikedByCurrentUser: boolean;
        author: {
            name: string;
            slug: string;
            image: string;
            bio: string;
            location: string;
            linkedin: string;
            instagram: string;
            github: string;
            website: string;
        };
    };
}

export interface Comment {
    id: string;
    content: string;
    createdAt: string;
    user: {
        id: string;
        name: string;
        image: string;
    };
    likes?: number; // Optional for compatibility if needed, or mapping
    _count?: {
        likes: number;
    };
    children?: Comment[]; // For API response
    replies?: Comment[]; // For frontend compatibility (we might map children to replies)
    isLikedByCurrentUser?: boolean; // If API returns this (controller didn't show it explicitly for getComments but good to have)
    parentId?: string | null;
}



export interface blogType {
    title: string;
    slug: string;
    summary: string;
    content?: string;
    coverImage: string;
    authorId: string;
    relatedBlogs?: string[];
}