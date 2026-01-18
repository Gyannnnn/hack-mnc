"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface CommentInputProps {
  onSubmit: (content: string) => void;
  isReply?: boolean;
  onCancel?: () => void;
}

export function CommentInput({
  onSubmit,
  isReply = false,
  onCancel,
}: CommentInputProps) {
  const [content, setContent] = useState("");

  const handleSubmit = () => {
    if (!content.trim()) return;
    onSubmit(content);
    setContent("");
    if (onCancel) onCancel();
  };

  return (
    <div className={`flex flex-col gap-3 ${isReply ? "mt-4 ml-12" : "mt-8"}`}>
      <Textarea
        placeholder={isReply ? "Write a reply..." : "Write a comment..."}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="min-h-[100px] resize-none focus-visible:ring-1"
        autoFocus={isReply}
      />
      <div className="flex justify-end gap-2">
        {isReply && (
          <Button variant="ghost" size="sm" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button size="sm" onClick={handleSubmit} disabled={!content.trim()}>
          {isReply ? "Reply" : "Post Comment"}
        </Button>
      </div>
    </div>
  );
}
