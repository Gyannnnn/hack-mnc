"use client";

import { useState } from "react";
import { Comment } from "@/types/blog.types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ThumbsUp, MessageCircle } from "lucide-react";
import { CommentInput } from "./comment-input";
import { formatDistanceToNow } from "date-fns";
import { likeComment, replyToComment } from "@/actions/blogs.actions";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface CommentItemProps {
  comment: Comment;
  token?: string;
  onRefresh?: () => void;
  userId?: string;
  blogId?: string;
}

export function CommentItem({
  comment,
  token,
  onRefresh,
  userId,
  blogId,
}: CommentItemProps) {
  const [isReplying, setIsReplying] = useState(false);
  const [isLiking, setIsLiking] = useState(false);
  // Optimistic like state could be added here

  const user = comment.user || { name: "Anonymous", image: "" };
  const likesCount = comment._count?.likes || comment.likes || 0;
  const replies = comment.children || comment.replies || [];

  const handleReplySubmit = async (content: string) => {
    if (!token) {
      toast.error("Please login to reply");
      return;
    }
    if (!userId || !blogId) {
      toast.error("Missing user or blog information");
      return;
    }

    const response = await replyToComment(
      token,
      comment.id,
      content,
      userId,
      blogId,
    );
    if (response) {
      toast.success("Reply added");
      setIsReplying(false);
      onRefresh?.();
    } else {
      toast.error("Failed to add reply");
    }
  };

  const handleLike = async () => {
    if (!token) {
      toast.error("Please login to like");
      return;
    }
    if (isLiking) return;
    setIsLiking(true);

    // Optimistic update could go here
    const response = await likeComment(token, comment.id);
    if (response) {
      onRefresh?.();
    } else {
      toast.error("Failed to like comment");
    }
    setIsLiking(false);
  };

  return (
    <div className="flex gap-4">
      <Avatar className="w-10 h-10 border border-border">
        <AvatarImage src={user.image} alt={user.name} />
        <AvatarFallback>{user.name ? user.name.charAt(0) : "A"}</AvatarFallback>
      </Avatar>

      <div className="flex-1 flex flex-col gap-2">
        {/* Header */}
        <div className="flex items-center gap-2 text-sm">
          <span className="font-semibold text-foreground">{user.name}</span>
          <span className="text-muted-foreground">•</span>
          <span className="text-muted-foreground">
            {comment.createdAt &&
              formatDistanceToNow(new Date(comment.createdAt), {
                addSuffix: true,
              })}
          </span>
        </div>

        {/* Content */}
        <p className="text-foreground/90 text-sm leading-relaxed whitespace-pre-wrap">
          {comment.content}
        </p>

        {/* Actions */}
        <div className="flex items-center gap-4 mt-1">
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "h-auto p-0 text-muted-foreground hover:text-foreground",
              isLiking && "opacity-50",
            )}
            onClick={handleLike}
          >
            <ThumbsUp className="w-4 h-4 mr-1.5" />
            {likesCount > 0 && <span>{likesCount}</span>}
            <span className="sr-only">Like</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="h-auto p-0 text-muted-foreground hover:text-foreground"
            onClick={() => setIsReplying(!isReplying)}
          >
            <MessageCircle className="w-4 h-4 mr-1.5" />
            Reply
          </Button>
        </div>

        {/* Reply Input */}
        {isReplying && (
          <CommentInput
            onSubmit={handleReplySubmit}
            isReply
            onCancel={() => setIsReplying(false)}
          />
        )}

        {/* Nested Replies */}
        {replies.length > 0 && (
          <div className="mt-4 space-y-6">
            {replies.map((reply) => (
              <CommentItem
                key={reply.id}
                comment={reply}
                token={token}
                onRefresh={onRefresh}
                userId={userId}
                blogId={blogId}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
