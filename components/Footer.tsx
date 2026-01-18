import React from "react";
import Link from "next/link";
import { SiGmail } from "react-icons/si";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { ArrowUpRight } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const companyGroups = [
    {
      title: "Product Based MNCs",
      links: [
        "Google",
        "Amazon",
        "Microsoft",
        "Meta",
        "Apple",
        "Netflix",
        "Uber",
        "Adobe",
        "Atlassian",
        "PayPal",
      ].map((c) => ({
        name: c,
        href: `/companies/${c
          .toLowerCase()
          .replace(/\s+/g, "-")}/leetcode-interview-questions`,
      })),
    },
    {
      title: "Service Based MNCs",
      links: [
        "TCS",
        "Infosys",
        "Wipro",
        "Cognizant",
        "Accenture",
        "Capgemini",
        "HCL Tech",
        "Tech Mahindra",
      ].map((c) => ({
        name: c,
        href: `/companies/${c
          .toLowerCase()
          .replace(/\s+/g, "-")}/leetcode-interview-questions`,
      })),
    },
  ];

  const learnResources = [
    { name: "LeetCode Problems", href: "/problems" },
    { name: "Company Wise Questions", href: "/companies" },
    { name: "DSA Roadmap", href: "/topic" },
    { name: "System Design", href: "/blogs/system-design" },
  ];

  const recentBlogs = [
    {
      name: "How to Crack FAANG Interviews",
      href: "/blogs/how-to-crack-faang",
    },
    { name: "Top 50 Array Problems", href: "/blogs/top-50-array-problems" },
    {
      name: "Dynamic Programming Guide",
      href: "/blogs/dynamic-programming-guide",
    },
    { name: "Resume Tips for SDE", href: "/blogs/resume-tips-for-sde" },
  ];

  return (
    <footer className="w-full border-t border-border bg-card/30 backdrop-blur-sm mt-auto">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        {/* Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-12">
          {/* Brand & Mission */}
          <div className="lg:col-span-4 space-y-6">
            <Link href="/" className="inline-block">
              <span className="text-2xl font-black tracking-tighter bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                &lt;HackMNC/&gt;
              </span>
            </Link>
            <p className="text-muted-foreground leading-relaxed pr-4">
              The ultimate free resource for coding interview preparation.
              Master Data Structures & Algorithms with company-specific
              questions from Google, Amazon, Microsoft, and more.
            </p>
            <div className="flex items-center gap-4">
              <Link
                href="mailto:hackmnc.mail@gmail.com"
                className="p-2 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
              >
                <SiGmail className="w-5 h-5" />
                <span className="sr-only">Email</span>
              </Link>
              <Link
                href="https://linkedin.com/company/hackmnc"
                className="p-2 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
              >
                <FaLinkedin className="w-5 h-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link
                href="https://github.com/hackmnc"
                className="p-2 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
              >
                <FaGithub className="w-5 h-5" />
                <span className="sr-only">GitHub</span>
              </Link>
            </div>
          </div>

          {/* Links Grid */}
          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-8">
            {companyGroups.map((group) => (
              <div key={group.title}>
                <h3 className="font-semibold text-foreground mb-4">
                  {group.title}
                </h3>
                <ul className="space-y-2">
                  {group.links.slice(0, 8).map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1 group"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div>
              <h3 className="font-semibold text-foreground mb-4">Resources</h3>
              <ul className="space-y-2">
                {learnResources.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-4">
                Latest Blogs
              </h3>
              <ul className="space-y-2">
                {recentBlogs.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors line-clamp-1"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href="/blogs"
                    className="text-sm font-medium text-primary hover:underline inline-flex items-center gap-1 mt-2"
                  >
                    View all blogs <ArrowUpRight className="w-3 h-3" />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* SEO Text */}
        <div className="pt-8 border-t border-border/50 mb-8">
          <p className="text-xs text-muted-foreground leading-relaxed text-justify">
            <strong>HackMNC</strong> is your go-to platform for free company-wise interview patterns, and DSA
            roadmaps. Prepare for technical interviews at top product-based
            companies (Google, Microsoft, Amazon, Meta) and service-based firms
            (TCS, Infosys, Wipro). Access curated problem lists, system design
            guides, and real interview experiences to crack your dream job.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {currentYear} HackMNC. Open source contributions welcome.</p>
          <div className="flex items-center gap-6">
            <Link
              href="/about-us"
              className="hover:text-foreground transition-colors"
            >
              About Us
            </Link>
            <Link
              href="/privacy-policy"
              className="hover:text-foreground transition-colors"
            >
              Privacy Policy
            </Link>           
          </div>
        </div>
      </div>
    </footer>
  );
}
