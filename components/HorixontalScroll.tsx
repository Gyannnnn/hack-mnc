"use client";

import { useRef } from "react";
import type { PropsWithChildren } from "react";

export default function HorizontalScroll({
  children,
}: PropsWithChildren) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={ref}
      onWheel={(e) => {
        if (ref.current) {
          ref.current.scrollLeft += e.deltaY;
        }
      }}
      className="
        w-full
        overflow-x-scroll
        overflow-y-hidden
        scroll-smooth
        scrollbar-visible
        pb-1
      "
    >
      {children}
    </div>
  );
}
