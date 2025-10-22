"use client";
import Link from "next/link";
import React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SideSheet } from "./SideSheet";
import { usePathname } from "next/navigation";

export const navBarData = [
  { Name: "Home", link: "/" },
  { Name: "Problems", link: "/problems" },
  { Name: "Blogs", link: "/blogs" },
  { Name: "Profile", link: "/profile" },
];

export default function Navbar() {
  const path = usePathname();
  return (
    <div className="h-16 fixed top-0 bg-card w-full flex items-center sm:justify-between px-10 justify-between max-sm:px-4 border-b z-10">
      <div className="flex gap-10 items-center">
        <Link
          href="/"
          className="sm:text-2xl text-xl font-bold text-[var(--color-foreground)] hover:text-[var(--color-primary)] transition-all duration-300 font-mono tracking-tight"
        >
          &lt;Hack MNC/&gt;
        </Link>
        <div className="flex items-center gap-3 max-sm:hidden ">
          {navBarData.map((data, index) => {
            const isActive = path === `/${data.link}` || path === data.link;
            return (
              <Link
                key={index}
                href={data.link}
                className={`transition-colors duration-200 hover:text-primary ${
                  isActive ? "text-primary " : "text-gray-400"
                }`}
              >
                {data.Name}
              </Link>
            );
          })}
        </div>
      </div>

      <div className="flex gap-2 items-center">
        <Avatar className="max-sm:hidden">
          <AvatarImage
            src="https://github.com/maxleiter.png"
            alt="@maxleiter"
          />
          <AvatarFallback>LR</AvatarFallback>
        </Avatar>
        <div className="sm:hidden">
          <SideSheet />
        </div>
      </div>
    </div>
  );
}
