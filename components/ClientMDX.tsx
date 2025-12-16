"use client";

import { ReactNode } from "react";

export default function ClientMDX({ children }: { children: ReactNode }) {
  return <div className="cnt pt-0 min-h-[1vh]">{children}</div>;
}
