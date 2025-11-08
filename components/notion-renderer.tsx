// components/notion-renderer.tsx
"use client";

interface NotionRendererProps {
  html: string;
}

export function CustomNotionRenderer({ html }: NotionRendererProps) {
  return (
    <div className="notion-renderer">
      <div 
        className="prose prose-sm sm:prose-base md:prose-lg max-w-none text-foreground break-words overflow-wrap-anywhere"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}