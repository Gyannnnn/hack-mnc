"use client";

import {
  WhatsappShareButton,
  WhatsappIcon,
  RedditShareButton,
  RedditIcon,
  LinkedinShareButton,
  LinkedinIcon,
} from "next-share";
import { Share2 } from "lucide-react";

export default function SocialShare({
  title,
  url,
}: {
  title: string;
  url: string;
}) {
  const handleNormalShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: title,
          url,
        });
      } catch {
        // user cancelled
      }
    } else {
      await navigator.clipboard.writeText(url);
      alert("Link copied to clipboard");
    }
  };

  return (
    <div className="flex gap-1 items-center">
      {/* Normal system share */}
      <button
        onClick={handleNormalShare}
        className="rounded-full border p-2 hover:bg-muted"
        aria-label="Share"
      >
        <Share2 size={18} />
      </button>

      {/* LinkedIn */}
      <LinkedinShareButton url={url}>
        <LinkedinIcon size={32} round />
      </LinkedinShareButton>

      {/* Reddit */}
      <RedditShareButton url={url} title={title}>
        <RedditIcon size={32} round />
      </RedditShareButton>

      {/* WhatsApp */}
      <WhatsappShareButton url={url} title={title} separator=":: ">
        <WhatsappIcon size={32} round />
      </WhatsappShareButton>
    </div>
  );
}
