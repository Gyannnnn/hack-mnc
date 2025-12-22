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
    <div className="h-16 fixed top-1 bg-card w-full flex items-center sm:justify-between px-12 justify-between max-sm:px-4 border-b z-20 rounded-2xl">
      <div className="flex items-center gap-10">
        <Link
          href="/"
          className="sm:text-2xl text-xl font-bold text-primary"
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
