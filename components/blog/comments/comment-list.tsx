"use client";

import { useEffect, useState, useCallback } from "react";
import { Comment } from "@/types/blog.types";
import { CommentInput } from "./comment-input";
import { CommentItem } from "./comment-item";
import { CommentSkeleton } from "./comment-skeleton";
import { getComments, createComment } from "@/actions/blogs.actions";
import { toast } from "sonner";

interface CommentListProps {
  blogId?: string; // Optional initially but should be passed
  token?: string;
  userId?: string;
}

export function CommentList({ blogId, token, userId }: CommentListProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchComments = useCallback(async () => {
    if (!blogId) {
      setLoading(false);
      return;
    }
    try {
      const data = await getComments(blogId);
      if (data && data.success && Array.isArray(data.data)) {
        setComments(data.data);
      }
    } catch (error) {
      console.error("Failed to fetch comments", error);
    } finally {
      setLoading(false);
    }
  }, [blogId]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const handleNewComment = async (content: string) => {
    if (!token) {
      toast.error("Please login to comment");
      return;
    }
    if (!blogId) {
      toast.error("Blog ID is missing");
      return;
    }
    if (!userId) {
      toast.error("User ID is missing");
      return;
    }

    const response = await createComment(token, blogId, content, userId);
    if (response) {
      toast.success("Comment added");
      fetchComments(); // Refresh list
    } else {
      toast.error("Failed to add comment");
    }
  };

  if (loading) {
    return <CommentSkeleton />;
  }

  return (
    <section className="mt-5 pt-5 border-t border-border/40" id="comments">
      <h3 className="text-2xl font-bold mb-8">
        Comments (
        {comments.reduce(
          (acc, c) => acc + 1 + (c.children?.length || c.replies?.length || 0),
          0,
        )}
        )
      </h3>

      <CommentInput onSubmit={handleNewComment} />

      <div className="space-y-8 mt-10">
        {comments.length === 0 ? (
          <p className="text-muted-foreground">
            No comments yet. Be the first to share your thoughts!
          </p>
        ) : (
          comments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              token={token}
              onRefresh={fetchComments}
              userId={userId}
              blogId={blogId}
            />
          ))
        )}
      </div>
    </section>
  );
}
