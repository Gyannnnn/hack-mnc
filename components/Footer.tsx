import React from "react";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { name: "Problems", href: "/problems" },
      { name: "Companies", href: "/companies" },
      { name: "Topics", href: "/topic" },
      { name: "Blogs", href: "/blogs" },
    ],
    resources: [
      { name: "Profile", href: "/profile" },
      { name: "About", href: "/#about" },
    ],
  };

  return (
    <footer className="w-full border-t border-border bg-card/30 backdrop-blur-sm mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link
              href="/"
              className="text-2xl font-bold text-foreground hover:text-primary transition-colors font-mono tracking-tight mb-4 inline-block"
            >
              &lt;HackMNC/&gt;
            </Link>
            <p className="text-sm text-muted-foreground max-w-md leading-relaxed">
              Your roadmap to top MNCs. Master DSA, track your prep, and crack
              your dream company — all in one place. 100% free
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">
              Product
            </h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
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

          {/* Resources Links */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">
              Resources
            </h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
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
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {currentYear} HackMNC. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-xs text-muted-foreground">
            <span>Free DSA helper </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
