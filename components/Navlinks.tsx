"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'


export const navBarData = [
  { Name: "Problems", link: "/problems" },
  { Name: "Companies", link: "/companies" },
  { Name: "Topics", link: "/topic" },
  { Name: "Blogs", link: "/blogs" },
  { Name: "Profile", link: "/profile" },
];

export default function Navlinks() {
    const path = usePathname();
  return (
    <div className="flex items-center gap-3 max-sm:hidden ">
          {navBarData.map((data, index) => {
            const isActive = path === `/${data.link}` || path === data.link;
            return (
              <Link
                key={index}
                href={data.link}
                className={`transition-colors duration-200 hover:text-primary ${
                  isActive ? "text-primary font-medium" : "text-muted-foreground"
                }`}
              >
                {data.Name}
              </Link>
            );
          })}
        </div>
  )
}
