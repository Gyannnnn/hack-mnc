"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { BlogMetaData } from "@/types/blog.types";
import { getBlogMetaData, likeBlog } from "@/actions/blogs.actions";
import {
  BlogMetaSkeleton,
  BlogActionsSkeleton,
  AuthorBioSkeleton,
} from "./skeletons";
import { motion } from "framer-motion";
import { Heart, MessageCircle, Instagram, Github, Globe } from "lucide-react";

import { toast } from "sonner";
import { FaLinkedin } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";

interface BlogHeaderMetaProps {
  slug: string;
  staticAuthorName: string;
  readingTime: number;
  publishedAt: string;
  token: string;
}

export function BlogHeaderMeta({
  slug,
  staticAuthorName,
  readingTime,
  publishedAt,
  token,
}: BlogHeaderMetaProps) {
  const [meta, setMeta] = useState<BlogMetaData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  useEffect(() => {
    const fetchMeta = async () => {
      try {
        const data = await getBlogMetaData(slug, token);
        if (data) {
          setMeta(data);
          setIsLiked(data?.data?.isLikedByCurrentUser ?? false);
          setLikeCount(data?.data?._count?.likes ?? 0);
        }
      } catch (error) {
        console.error("Failed to fetch blog meta:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMeta();
  }, [slug, token]);

  const handleLike = async () => {
    if (!token) {
      toast.error("Please sign in to like this post");
      return;
    }

    // Optimistic Update
    const previousLiked = isLiked;
    const previousCount = likeCount;

    setIsLiked(!previousLiked);
    setLikeCount((prev) => (previousLiked ? prev - 1 : prev + 1));

    try {
      await likeBlog(token, slug);
    } catch (_error) {
      // Revert on error
      setIsLiked(previousLiked);
      setLikeCount(previousCount);
      toast.error("Failed to like post");
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col gap-6 w-full">
        <BlogMetaSkeleton />
        <div className="py-4 border-y border-border/40 w-full">
          <BlogActionsSkeleton />
        </div>
      </div>
    );
  }

  // Fallback to static data if API fails or returns null, but try to use dynamic if available
  const authorName = meta?.data?.author?.name || staticAuthorName;
  const authorImage = meta?.data?.author?.image;
  // stats managed by local state now
  const comments = meta?.data?._count?.comments || 0;

  return (
    <div className="w-full pt-6 border-t border-border/40">
  <div className="flex flex-col gap-5">
    
    {/* Author + Meta */}
    <div className="flex items-center justify-between max-sm:flex-col max-sm:items-start gap-4">
      
      <div className="flex items-center gap-3">
        {/* Avatar */}
        <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-base font-bold text-foreground overflow-hidden uppercase shrink-0 ring-1 ring-border/50">
          {authorImage ? (
            <Image
              src={authorImage}
              alt={authorName}
              width={100}
              height={100}
              className="w-full h-full object-cover"
              unoptimized
            />
          ) : (
            <span>{authorName.charAt(0)}</span>
          )}
        </div>

        {/* Author Info */}
        <div className="flex flex-col">
          <p className="text-xs text-muted-foreground uppercase tracking-wide">
            Written by
          </p>

          <span className="font-semibold text-foreground leading-tight">
            {authorName}
          </span>

          <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
            <span>{readingTime} min read</span>
            <span>•</span>
            <time dateTime={publishedAt}>
              {(() => {
                try {
                  const d = new Date(publishedAt);
                  return isNaN(d.getTime())
                    ? publishedAt
                    : d.toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      });
                } catch (_e) {
                  return publishedAt;
                }
              })()}
            </time>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-6 text-sm text-muted-foreground">
        
        {/* Like */}
        <motion.div
          className="flex items-center gap-2 cursor-pointer hover:text-foreground transition-colors"
          whileTap={{ scale: 0.9 }}
          onClick={handleLike}
        >
          <motion.div
            initial={false}
            animate={{ scale: isLiked ? [1, 1.2, 1] : 1 }}
            transition={{ duration: 0.3 }}
          >
            <Heart className={`w-5 h-5`} />
          </motion.div>
          <span className={isLiked ? "text-foreground font-medium" : ""}>
            {likeCount}
          </span>
        </motion.div>

        {/* Comments */}
        <div className="flex items-center gap-2 cursor-pointer hover:text-foreground transition-colors">
          <MessageCircle className="w-5 h-5" />
          <span>{comments}</span>
        </div>
      </div>
    </div>
  </div>
</div>
  );
}

export function BlogAuthorBio({ slug }: { slug: string }) {
  const [meta, setMeta] = useState<BlogMetaData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMeta = async () => {
      try {
        const data = await getBlogMetaData(slug);
        if (data) {
          setMeta(data);
        }
      } catch (error) {
        console.error("Failed to fetch blog meta:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMeta();
  }, [slug]);

  if (loading) {
    return <AuthorBioSkeleton />;
  }

  if (!meta || !meta.data?.author) return null;

  const { author } = meta.data;

  return (
    <div className="rounded-2xl border border-border/50 bg-card/40 backdrop-blur-md p-6 shadow-sm">
  <div className="flex flex-col gap-5">
    
    {/* Header */}
    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
      Written by
    </p>

    {/* Author Info */}
    <div className="flex items-center gap-4">
      <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center text-lg font-bold text-foreground overflow-hidden uppercase shrink-0 ring-1 ring-border/50">
        {author.image ? (
          <Image
            src={author.image}
            alt={author.name}
            width={80}
            height={80}
            className="w-full h-full object-cover"
          />
        ) : (
          <span>{author.name.charAt(0)}</span>
        )}
      </div>

      <div className="min-w-0">
        <h3 className="font-semibold text-base text-foreground leading-tight truncate">
          {author.name}
        </h3>

        {author.location && (
          <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
            <IoLocationOutline className="w-3 h-3" />
            {author.location}
          </p>
        )}
      </div>
    </div>

    {/* Bio */}
    <p className="text-sm text-muted-foreground leading-relaxed">
      {author.bio}
    </p>

    {/* Social Links */}
    <div className="flex items-center gap-4 pt-4 border-t border-border/40">
      <span className="text-xs text-muted-foreground">Connect:</span>

      {author.linkedin && (
        <Link
          href={author.linkedin}
          target="_blank"
          className="hover:text-primary transition-colors"
        >
          <FaLinkedin className="w-4 h-4" />
        </Link>
      )}

      {author.github && (
        <Link
          href={author.github}
          target="_blank"
          className="hover:text-primary transition-colors"
        >
          <Github className="w-4 h-4" />
        </Link>
      )}

      {author.instagram && (
        <Link
          href={author.instagram}
          target="_blank"
          className="hover:text-primary transition-colors"
        >
          <Instagram className="w-4 h-4" />
        </Link>
      )}

      {author.website && (
        <Link
          href={author.website}
          target="_blank"
          className="hover:text-primary transition-colors"
        >
          <Globe className="w-4 h-4" />
        </Link>
      )}
    </div>
  </div>
</div>
  );
}
