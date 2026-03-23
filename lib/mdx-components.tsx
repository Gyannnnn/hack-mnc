import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import { Question } from "@/types/questionsTable";
import Faqs from "@/components/Faqs";
import { CodeBlock } from "@/components/ui/code-block";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import QuestionTable from "@/components/ui/QuestionTable";
import { topArrayQuestionsAskedInMicrosoft } from "@/data/microsoft/ms.top_50_array";
import { topStringQuestionsAskedInMicrosoft } from "@/data/microsoft/ms.top_50_string";
import { topLinkedListQuestionsAskedInMicrosoft } from "@/data/microsoft/ms.top_ll";
import { topBinarySearchQuestionsAskedInMicrosoft } from "@/data/microsoft/ms.binary search";
import { topTreeQuestionsAskedInMicrosoft } from "@/data/microsoft/ms.top.treequestions";
import { topGraphQuestionsAskedInMicrosoft } from "@/data/microsoft/ms.graphQuestions";
import { topDPQuestionsAskedInMicrosoft } from "@/data/microsoft/ms.dpQuestions";
import { topStackQuestionsAskedInMicrosoft } from "@/data/microsoft/ms.stackQuestions";
import { GreedyMicrosoftQuestions } from "@/data/microsoft/ms.greedy";
import { SortingMicrosoftQuestions } from "@/data/microsoft/ms.sortingQuestions";
import { hashTableMicrosoft } from "@/data/microsoft/ms.hashTable";
import { TopArrayGoogle } from "@/data/Google/google.topArray";
import { TopStringGoogle } from "@/data/Google/google.topString";
import { TopLLGoogle } from "@/data/Google/google.topLL";
import { TopSlidingWindowGoogle } from "@/data/Google/google.topSlidingWindow";


function ArrayQuestionsMicrosoft() {
  return (
    <QuestionTable
      questions={
        topArrayQuestionsAskedInMicrosoft.data as unknown as Question[]
      }
    />
  );
}

function StringQuestionsMicrosoft(){
  return (
    <QuestionTable questions={topStringQuestionsAskedInMicrosoft.data as unknown as Question[]}/>
  )
}

function LinkedListQuestionsMicrosoft(){
  return (
    <QuestionTable questions={topLinkedListQuestionsAskedInMicrosoft.data as unknown as Question[]}/>
  )
}

function BinarySearchQuestionsMicrosoft(){
  return (
    <QuestionTable questions={topBinarySearchQuestionsAskedInMicrosoft.data as unknown as Question[]}/>
  )
}

function TreeQuestionsMicrosoft(){
  return (
    <QuestionTable questions={topTreeQuestionsAskedInMicrosoft.data as unknown as Question[]}/>
  )
}

function GraphQuestionsMicrosoft(){
  return(
    <QuestionTable questions={topGraphQuestionsAskedInMicrosoft.data as unknown as Question[]} />
  )
}

function DpQuestionsMIcrosoft(){
  return(
    <QuestionTable questions={topDPQuestionsAskedInMicrosoft.data as unknown as Question[]}/>
  )
}

function StackQuestionsMicrosoft(){
  return(
    <QuestionTable questions={topStackQuestionsAskedInMicrosoft.data as unknown as Question[]}/>
  )
}

function TwoPointersMicrosoft(){
  return (
    <QuestionTable questions={topDPQuestionsAskedInMicrosoft.data as unknown as Question[]}/>
  )
}
function GreedyQuestionsMicrosoft(){
  return (
    <QuestionTable questions={GreedyMicrosoftQuestions.data as unknown as Question[]}/>
  )
}

function SortingQuesationMicrosoft(){
  return(
    <QuestionTable questions={SortingMicrosoftQuestions.data as unknown as Question[]}/>
  )
}

function HashTableMicrosoftQuestions(){
  return(
    <QuestionTable questions={hashTableMicrosoft.data as unknown as Question[]}/>
  )
}

function TopArrayQuestionsGoogle(){
  return(
    <QuestionTable questions={TopArrayGoogle.data as unknown as Question[]}/>
  )
}

function TopStringQuestionsGoogle(){
  return(
    <QuestionTable questions={TopStringGoogle.data as unknown as Question[]}/>
  )
}

function TopLLQuestionsGoogle(){
  return(
    <QuestionTable questions={TopLLGoogle.data as unknown as Question[]}/>
  )
}

function TopSlidingWindowQuestionsGoogle(){
  return (
    <QuestionTable questions={TopSlidingWindowGoogle.data as unknown as Question[]}/>
  )
}

export const mdxComponents: MDXComponents = {
  Faqs,
  ArrayQuestionsMicrosoft,
  StringQuestionsMicrosoft,
  LinkedListQuestionsMicrosoft,
  BinarySearchQuestionsMicrosoft,
  TreeQuestionsMicrosoft,
  GraphQuestionsMicrosoft,
  DpQuestionsMIcrosoft,
  StackQuestionsMicrosoft,
  TwoPointersMicrosoft,GreedyQuestionsMicrosoft,SortingQuesationMicrosoft,HashTableMicrosoftQuestions,TopArrayQuestionsGoogle,
  TopStringQuestionsGoogle,TopLLQuestionsGoogle,
  TopSlidingWindowQuestionsGoogle,
  // Headings
  h1: (props) => (
    <h1 className="text-4xl font-bold my-6 mt-8 text-foreground" {...props} />
  ),
  h2: (props) => (
    <h2
      className="text-3xl font-semibold my-4 mt-3   text-foreground"
      {...props}
    />
  ),
  h3: (props) => (
    <h3
      className="text-2xl font-semibold my-3 mt-5 text-foreground"
      {...props}
    />
  ),
  h4: (props) => (
    <h4 className="text-xl font-medium my-2 mt-4 text-foreground" {...props} />
  ),
  h5: (props) => (
    <h5 className="text-lg font-medium my-2 text-foreground" {...props} />
  ),
  h6: (props) => (
    <h6 className="text-base font-medium my-1 text-foreground" {...props} />
  ),

  // Text - fixed to prevent nesting
  p: (props) => {
    // If children contains block elements, don't wrap in p
    const children = props.children;
    const hasBlockElements = React.Children.toArray(children).some(
      (child) =>
        React.isValidElement(child) &&
        ["div", "figure", "blockquote", "table", "ul", "ol", "pre"].includes(
          typeof child.type === "string" ? child.type : "",
        ),
    );

    if (hasBlockElements) {
      return <>{children}</>;
    }

    return (
      <p
        className="leading-7 mb-4 text-gray-800 dark:text-gray-200"
        {...props}
      />
    );
  },

  // Code blocks
  pre: ({ children, ...props }: React.HTMLAttributes<HTMLPreElement>) => {
    const language =
      ((props as Record<string, unknown>)["data-language"] as string) || "code";

    // Recursive helper to get text content from React nodes
    const getTextContent = (node: React.ReactNode): string => {
      if (!node) return "";
      if (typeof node === "string") return node;
      if (Array.isArray(node)) return node.map(getTextContent).join("");
      if (React.isValidElement(node)) {
        const children = (node.props as { children?: React.ReactNode })
          .children;
        return getTextContent(children);
      }
      return "";
    };

    let rawCode = "";
    React.Children.forEach(children, (child) => {
      if (
        React.isValidElement<{ children?: React.ReactNode }>(child) &&
        child.type === "code"
      ) {
        rawCode = getTextContent(child).trim();
      }
    });

    // Handle single line blocks that might be wrapped in backticks by some MDX parsers
    if (rawCode.startsWith("`") && rawCode.endsWith("`")) {
      rawCode = rawCode.slice(1, -1);
    }
    rawCode = rawCode.trim();

    return (
      <CodeBlock language={language} filename={language} code={rawCode}>
        {children}
      </CodeBlock>
    );
  },
  code: ({ children, ...props }) => {
    const isBlock =
      (props as Record<string, unknown>)["data-language"] ||
      (props as Record<string, unknown>)["data-line"] !== undefined;

    // Helper to get all text content recursively
    const getText = (node: React.ReactNode): string => {
      if (!node) return "";
      if (typeof node === "string") return node;
      if (Array.isArray(node)) return node.map(getText).join("");
      if (React.isValidElement(node))
        return getText(
          (node.props as { children?: React.ReactNode })?.children,
        );
      return "";
    };

    const text = getText(children);
    const trimmedText = text.trim();

    // If it's a block code (inside pre from rehype-pretty-code)
    if (isBlock) {
      const childrenArray = React.Children.toArray(children);
      let filteredChildren = childrenArray;

      // Recursive helper to check if a node is ONLY a backtick
      const isOnlyBacktick = (node: React.ReactNode): boolean => {
        const nodeText = getText(node).trim();
        return nodeText === "`";
      };

      if (childrenArray.length > 0) {
        const firstChild = childrenArray[0];
        const lastChild = childrenArray[childrenArray.length - 1];

        const hasLeading = isOnlyBacktick(firstChild);
        const hasTrailing = isOnlyBacktick(lastChild);

        if (hasLeading && hasTrailing) {
          filteredChildren = childrenArray.slice(1, -1);
        } else if (hasLeading) {
          filteredChildren = childrenArray.slice(1);
        } else if (hasTrailing) {
          filteredChildren = childrenArray.slice(0, -1);
        }
      }

      return <code {...props}>{filteredChildren}</code>;
    }

    // Handle inline code
    if (trimmedText === "`" || trimmedText === "``") return null;

    let content = children;
    const rawText = getText(children);
    if (rawText.startsWith("`") && rawText.endsWith("`")) {
      content = rawText.slice(1, -1);
    }

    return (
      <code
        className="bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded text-[0.9em] font-mono text-pink-600 dark:text-pink-400 border border-zinc-200 dark:border-zinc-700/50 whitespace-nowrap"
        {...props}
      >
        {content}
      </code>
    );
  },

  // Shadcn Components
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Alert,
  AlertDescription,
  AlertTitle,
  Badge,
  Separator,
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,

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
  hr: (props) => (
    <hr className="my-8 border-gray-300 dark:border-gray-700" {...props} />
  ),

  // Tables
  table: (props) => (
    <div className="overflow-x-auto my-6">
      <table
        className="min-w-full divide-y divide-gray-300 dark:divide-gray-700"
        {...props}
      />
    </div>
  ),
  thead: (props) => (
    <thead className="bg-gray-50 dark:bg-gray-800" {...props} />
  ),
  tbody: (props) => (
    <tbody
      className="divide-y divide-gray-200 dark:divide-gray-700"
      {...props}
    />
  ),
  tr: (props) => (
    <tr className="even:bg-gray-50 dark:even:bg-gray-800/50" {...props} />
  ),
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
