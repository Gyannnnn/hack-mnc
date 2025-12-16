import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import Faqs from "@/components/Faqs";

export const mdxComponents: MDXComponents = {
  Faqs,
  // Headings
  h1: (props) => <h1 className="text-4xl font-bold my-6 mt-8" {...props} />,
  h2: (props) => <h2 className="text-3xl font-semibold my-4 mt-6 border-b pb-2" {...props} />,
  h3: (props) => <h3 className="text-2xl font-semibold my-3 mt-5" {...props} />,
  h4: (props) => <h4 className="text-xl font-medium my-2 mt-4" {...props} />,
  h5: (props) => <h5 className="text-lg font-medium my-2" {...props} />,
  h6: (props) => <h6 className="text-base font-medium my-1" {...props} />,

  // Text - fixed to prevent nesting
  p: (props) => {
    // If children contains block elements, don't wrap in p
    const children = props.children;
    const hasBlockElements = React.Children.toArray(children).some(
      child => React.isValidElement(child) && 
      ['div', 'figure', 'blockquote', 'table', 'ul', 'ol', 'pre'].includes(
        typeof child.type === 'string' ? child.type : ''
      )
    );
    
    if (hasBlockElements) {
      return <>{children}</>;
    }
    
    return <p className="leading-7 mb-4 text-gray-800 dark:text-gray-200" {...props} />;
  },
  
  // Code blocks - simplified
  code: ({ children, className, ...props }) => {
    const match = /language-(\w+)/.exec(className || "");
    
    if (match) {
      // For code blocks, use a div wrapper
      return (
        <div className="my-6">
          <pre className="bg-gray-900 dark:bg-gray-800 text-gray-100 p-4 rounded-lg overflow-x-auto">
            <code className={`language-${match[1]}`} {...props}>
              {children}
            </code>
          </pre>
        </div>
      );
    }
    
    // For inline code
    return (
      <code 
        className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono text-red-600 dark:text-red-400" 
        {...props}
      >
        {children}
      </code>
    );
  },
  
  // Pre tag - simplified
  pre: ({ children }) => <>{children}</>,
  
  // Lists
  ul: (props) => <ul className="list-disc ml-6 mb-4 space-y-2" {...props} />,
  ol: (props) => <ol className="list-decimal ml-6 mb-4 space-y-2" {...props} />,
  li: (props) => <li className="pl-2" {...props} />,
  
  // Links
  a: ({ href, children, ...props }) => {
    if (href?.startsWith("/")) {
      return (
        <Link 
          href={href} 
          className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
          {...props}
        >
          {children}
        </Link>
      );
    }
    
    if (href?.startsWith("#")) {
      return (
        <a 
          href={href} 
          className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
          {...props}
        >
          {children}
        </a>
      );
    }
    
    return (
      <a 
        href={href} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
        {...props}
      >
        {children}
      </a>
    );
  },
  
  // Images - FIXED: Use figure instead of div
  img: ({ src, alt, ...props }) => {
    if (!src) return null;
    
    if (src.startsWith("http")) {
      return (
        <figure className="my-6">
          <Image 
            src={src} 
            alt={alt || ""} 
            className="rounded-lg max-w-full h-auto mx-auto"
            {...props}
          />
          {alt && (
            <figcaption className="text-center text-sm text-gray-500 mt-2">
              {alt}
            </figcaption>
          )}
        </figure>
      );
    }
    
    return (
      <figure className="my-6 relative w-full h-auto">
        <Image 
          src={src}
          alt={alt || ""}
          width={800}
          height={450}
          className="rounded-lg mx-auto"
          {...props}
        />
        {alt && (
          <figcaption className="text-center text-sm text-gray-500 mt-2">
            {alt}
          </figcaption>
        )}
      </figure>
    );
  },
  
  // Blockquotes - FIXED: Wrap in div
  blockquote: (props) => (
    <div className="my-6">
      <blockquote 
        className="border-l-4 border-gray-300 dark:border-gray-600 pl-4 py-2 italic text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/50"
        {...props} 
      />
    </div>
  ),
  
  // Horizontal rule
  hr: (props) => <hr className="my-8 border-gray-300 dark:border-gray-700" {...props} />,
  
  // Tables
  table: (props) => (
    <div className="overflow-x-auto my-6">
      <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-700" {...props} />
    </div>
  ),
  thead: (props) => <thead className="bg-gray-50 dark:bg-gray-800" {...props} />,
  tbody: (props) => <tbody className="divide-y divide-gray-200 dark:divide-gray-700" {...props} />,
  tr: (props) => <tr className="even:bg-gray-50 dark:even:bg-gray-800/50" {...props} />,
  th: (props) => (
    <th 
      className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-100" 
      {...props} 
    />
  ),
  td: (props) => (
    <td 
      className="px-4 py-3 text-sm text-gray-800 dark:text-gray-200" 
      {...props} 
    />
  ),
  
  // Strong/emphasis
  strong: (props) => <strong className="font-semibold" {...props} />,
  em: (props) => <em className="italic" {...props} />,
  
};