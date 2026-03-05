"use client";
import React from "react";
import { IconCheck, IconCopy } from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";

type CodeBlockProps = {
  language?: string;
  filename?: string;
  code?: string;
  children?: React.ReactNode;
};

export const CodeBlock = ({
  language,
  filename,
  code,
  children,
}: CodeBlockProps) => {
  const [copied, setCopied] = React.useState(false);

  const copyToClipboard = async () => {
    let textToCopy = code;

    // If code prop is missing, try to get it from children
    if (!textToCopy && children) {
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
      textToCopy = getText(children);
    }

    if (textToCopy) {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="relative w-full rounded-2xl bg-[#0B0E14] border border-white/8 my-8 overflow-hidden group/code shadow-2xl">
      <div className="flex justify-between items-center px-6 py-4 border-b border-white/5 bg-white/2">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E]" />
            <div className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]" />
            <div className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]" />
          </div>
          <div className="h-4 w-px bg-white/10 mx-1" />
          <div className="flex items-center gap-2">
            {filename && (
              <span className="text-[13px] text-zinc-400 font-medium tracking-tight">
                {filename}
              </span>
            )}
            {!filename && language && (
              <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-bold">
                {language}
              </span>
            )}
          </div>
        </div>
        <button
          onClick={copyToClipboard}
          className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-all duration-300 font-medium px-3 py-1.5 rounded-xl hover:bg-white/5 active:scale-95"
        >
          <AnimatePresence mode="wait">
            {copied ? (
              <motion.div
                key="copied"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="flex items-center gap-2"
              >
                <IconCheck size={16} className="text-emerald-400" />
                <span className="text-emerald-400">Copied!</span>
              </motion.div>
            ) : (
              <motion.div
                key="copy"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="flex items-center gap-2"
              >
                <IconCopy
                  size={16}
                  className="group-hover/code:text-white transition-colors"
                />
                <span>Copy</span>
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>

      <div className="relative overflow-x-auto px-6 py-6 scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent">
        <div className="text-[14px] leading-relaxed font-mono whitespace-pre overflow-x-auto min-w-full">
          {children}
          {!children && code && (
            <pre className="text-zinc-300">
              <code>{code}</code>
            </pre>
          )}
        </div>
      </div>
    </div>
  );
};
