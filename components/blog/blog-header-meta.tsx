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
import {
  Heart,
  MessageCircle,
  Linkedin,
  Instagram,
  Github,
  Globe,
} from "lucide-react";

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
          setIsLiked(data.data.isLikedByCurrentUser || false);
          setLikeCount(data.data._count.likes);
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
    } catch (error) {
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
  const authorName = meta?.data.author.name || staticAuthorName;
  const authorImage = meta?.data.author.image;
  // stats managed by local state now
  const comments = meta?.data._count.comments || 0;

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Author / Meta Row */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-sm font-bold text-foreground overflow-hidden uppercase shrink-0">
          {authorImage ? (
            <Image
              src={authorImage}
              alt={authorName}
              width={100}
              height={100}
              className="w-full h-full object-cover"
            />
          ) : (
            <span>{authorName.charAt(0)}</span>
          )}
        </div>
        <div className="flex flex-col text-sm">
          <div className="flex items-center gap-2">
            <span className="font-medium text-foreground">{authorName}</span>
            <span className="text-muted-foreground/60">·</span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <span>{readingTime} min read</span>
            <span>·</span>
            <time dateTime={publishedAt}>
              {new Date(publishedAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </time>
          </div>
        </div>
      </div>

      {/* Actions Bar */}
      <div className="flex items-center justify-between py-4 border-y border-border/40 text-muted-foreground">
        <div className="flex items-center gap-6 text-sm">
          <motion.div
            className="flex items-center gap-2 cursor-pointer transition-colors"
            whileTap={{ scale: 0.8 }}
            onClick={handleLike}
          >
            <motion.div
              initial={false}
              animate={{ scale: isLiked ? [1, 1.2, 1] : 1 }}
              transition={{ duration: 0.3 }}
            >
              <Heart
                className={`w-6 h-6 transition-colors`}
              />
            </motion.div>
            <span className={isLiked ? "text-foreground font-medium" : ""}>
              {likeCount}
            </span>
          </motion.div>
          <div className="flex items-center gap-2 cursor-pointer hover:text-foreground transition-colors">
            <MessageCircle className="w-5 h-5" />
            <span>{comments}</span>
          </div>
        </div>
        {/* Can verify categories here if needed from checking props or context, but usually static is fine too */}
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

  if (!meta) return null;

  const { author } = meta.data;

  return (
    <div className="mt-5 pt-5 border-t border-border/40 flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-foreground">
          Written by {author.name}
        </h3>
      </div>

      <div className="flex items-start gap-4">
        <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center text-xl font-bold text-foreground overflow-hidden uppercase shrink-0">
          {author.image ? (
            <Image
              src={author.image}
              alt={author.name}
              width={100}
              height={100}
              className="w-full h-full object-cover"
            />
          ) : (
            <span>{author.name.charAt(0)}</span>
          )}
        </div>
        <div className="flex-1">
          <p className="text-muted-foreground text-base leading-relaxed">
            {author.bio}
          </p>
          <div className="flex flex-wrap gap-4 mt-4 text-sm text-foreground/80 items-center">
            {author.location && <p className="mr-2 flex items-center gap-2"><IoLocationOutline className="w-5 h-5" /> {author.location}</p>}

            {author.linkedin && (
              <Link
                href={author.linkedin}
                target="_blank"
                className="hover:text-primary transition-colors"
              >
                <FaLinkedin className="w-5 h-5" />
              </Link>
            )}
            {author.instagram && (
              <Link
                href={author.instagram}
                target="_blank"
                className="hover:text-primary transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </Link>
            )}
            {author.github && (
              <Link
                href={author.github}
                target="_blank"
                className="hover:text-primary transition-colors"
              >
                <Github className="w-5 h-5" />
              </Link>
            )}
            {author.website && (
              <Link
                href={author.website}
                target="_blank"
                className="hover:text-primary transition-colors"
              >
                <Globe className="w-5 h-5" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
