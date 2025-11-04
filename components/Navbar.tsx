import Link from "next/link";
import React from "react";
import { SideSheet } from "./SideSheet";
import Navlinks from "./Navlinks";
import AvatarProfile from "./Avatar";

export const navBarData = [
  { Name: "Home", link: "/" },
  { Name: "Companies", link: "/companies" },
  { Name: "Topics", link: "/topic" },
  { Name: "Blogs", link: "/blogs" },
  { Name: "Profile", link: "/profile" },
];

export default function Navbar() {
  return (
    <div className="h-16 fixed top-0 bg-card w-full flex items-center sm:justify-between px-10 justify-between max-sm:px-4 border-b z-10">
      <div className="flex gap-5 items-center">
        <Link
          href="/"
          className="sm:text-2xl text-xl font-bold text-[var(--color-foreground)] hover:text-[var(--color-primary)] transition-all duration-300 font-mono tracking-tight"
        >
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
