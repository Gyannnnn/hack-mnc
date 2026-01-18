import Link from "next/link";
import React from "react";
import { SideSheet } from "./SideSheet";
import Navlinks from "./Navlinks";
import AvatarProfile from "./Avatar";

export const navBarData = [
  { Name: "Problems", link: "/problems" },
  { Name: "Companies", link: "/companies" },
  { Name: "Topics", link: "/topic" },
  { Name: "Blogs", link: "/blogs" },
  { Name: "Profile", link: "/profile" },
];

export default function Navbar() {
  return (
    <div className="h-16 fixed top-2 left-1/2 -translate-x-1/2 w-[98%] max-w-[1450px] flex items-center sm:justify-between px-8 justify-between max-sm:px-4 z-50 rounded-full border border-border/40 bg-zinc-100/50 dark:bg-zinc-900/50 backdrop-blur-md shadow-sm transition-all duration-300 hover:bg-zinc-100/70 dark:hover:bg-zinc-900/70 hover:border-border/60">
      <div className="flex items-center gap-10">
        <Link href="/" className="sm:text-2xl text-xl font-bold text-primary">
          &lt;HackMNC/&gt;
        </Link>
        <Navlinks />
      </div>

      <div className="flex gap-2 items-center">
        {/* <AvatarProfile/> */}
        <AvatarProfile />
        <div className="sm:hidden">
          <SideSheet />
        </div>
      </div>
    </div>
  );
}
