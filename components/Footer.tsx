import React from "react";
import Link from "next/link";
import { SiGmail } from "react-icons/si";

import { FaLinkedin } from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const topCompanies = [
    {
      name: "Google Interview Questions",
      href: "https://www.hackmnc.com/companies/google/leetcode-interview-questions",
    },
    {
      name: "Microsoft Interview Questions",
      href: "https://www.hackmnc.com/companies/microsoft/leetcode-interview-questions",
    },
    {
      name: "Amazon Interview Questions",
      href: "https://www.hackmnc.com/companies/amazon/leetcode-interview-questions",
    },
    {
      name: "Meta (Facebook) Interview Questions",
      href: "https://www.hackmnc.com/companies/meta/leetcode-interview-questions",
    },
    {
      name: "Apple Interview Questions",
      href: "https://www.hackmnc.com/companies/apple/leetcode-interview-questions",
    },
    {
      name: "Netflix Interview Questions",
      href: "https://www.hackmnc.com/companies/netflix/leetcode-interview-questions",
    },
  ];

  const serviceCompanies = [
    {
      name: "TCS Interview Questions",
      href: "https://www.hackmnc.com/companies/tcs/leetcode-interview-questions",
    },
    {
      name: "Infosys Interview Questions",
      href: "https://www.hackmnc.com/companies/infosys/leetcode-interview-questions",
    },
    {
      name: "Wipro Interview Questions",
      href: "https://www.hackmnc.com/companies/wipro/leetcode-interview-questions",
    },
    {
      name: "Cognizant Interview Questions",
      href: "https://www.hackmnc.com/companies/cognizant/leetcode-interview-questions",
    },
    {
      name: "HCL Technologies Interview Questions",
      href: "https://www.hackmnc.com/companies/hcl-technologies/leetcode-interview-questions",
    },
    {
      name: "Capgemini Interview Questions",
      href: "https://www.hackmnc.com/companies/capgemini/leetcode-interview-questions",
    },
  ];

  const techCompanies = [
    {
      name: "Adobe Interview Questions",
      href: "https://www.hackmnc.com/companies/adobe/leetcode-interview-questions",
    },
    {
      name: "Uber Interview Questions",
      href: "https://www.hackmnc.com/companies/uber/leetcode-interview-questions",
    },
    {
      name: "Nvidia Interview Questions",
      href: "https://www.hackmnc.com/companies/nvidia/leetcode-interview-questions",
    },
    {
      name: "Intel Interview Questions",
      href: "https://www.hackmnc.com/companies/intel/leetcode-interview-questions",
    },
    {
      name: "AMD Interview Questions",
      href: "https://www.hackmnc.com/companies/amd/leetcode-interview-questions",
    },
    {
      name: "Cisco Interview Questions",
      href: "https://www.hackmnc.com/companies/cisco/leetcode-interview-questions",
    },
    {
      name: "Oracle Interview Questions",
      href: "https://www.hackmnc.com/companies/oracle/leetcode-interview-questions",
    },
    {
      name: "IBM Interview Questions",
      href: "https://www.hackmnc.com/companies/ibm/leetcode-interview-questions",
    },
    {
      name: "Samsung Interview Questions",
      href: "https://www.hackmnc.com/companies/samsung/leetcode-interview-questions",
    },
  ];

  const otherCompanies = [
    {
      name: "Atlassian Interview Questions",
      href: "https://www.hackmnc.com/companies/atlassian/leetcode-interview-questions",
    },
    {
      name: "PayPal Interview Questions",
      href: "https://www.hackmnc.com/companies/paypal/leetcode-interview-questions",
    },
    {
      name: "Goldman Sachs Interview Questions",
      href: "https://www.hackmnc.com/companies/goldman-sachs/leetcode-interview-questions",
    },
    {
      name: "Flipkart Interview Questions",
      href: "https://www.hackmnc.com/companies/flipkart/leetcode-interview-questions",
    },
    {
      name: "Cars24 Interview Questions",
      href: "https://www.hackmnc.com/companies/cars24/leetcode-interview-questions",
    },
    {
      name: "Deloitte Interview Questions",
      href: "https://www.hackmnc.com/companies/deloitte/leetcode-interview-questions",
    },
  ];

  const resources = [
    {
      name: "LeetCode Problems",
      href: "/problems",
      description: "Practice coding questions",
    },
    {
      name: "Company-wise Questions",
      href: "/companies",
      description: "Interview prep by company",
    },
    {
      name: "Topic-wise DSA",
      href: "/topic",
      description: "Learn by data structure",
    },
    {
      name: "Interview Experiences",
      href: "/blogs",
      description: "Real candidate stories",
    },
  ];

  return (
    <footer className="w-full border-t border-border bg-card/30 backdrop-blur-sm mt-auto">
      <div className="sm:px-6 lg:px-8 pt-12 pb-6">
        {/* Main Footer Content */}
        <div className="w-screen sm:px-8 px-2">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-10 gap-y-8 mb-8 items-start justify-between">
            {/* Brand Section */}
            <div className="lg:col-span-3">
              <Link
                href="/"
                className="text-2xl font-bold text-foreground hover:text-primary transition-colors font-mono tracking-tight mb-4 inline-block"
                aria-label="HackMNC - Free DSA Interview Preparation Platform"
              >
                &lt;HackMNC/&gt;
              </Link>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                Free DSA interview preparation platform with company-specific
                LeetCode questions, coding patterns, and real interview
                experiences from FAANG and top MNCs.
              </p>
              <div className="text-xs text-muted-foreground space-y-1">
                <p>✓ 1000+ Coding Problems</p>
                <p>✓ 20+ Company Question Banks</p>
                <p>✓ 100% Free Forever</p>
              </div>
              <div className="mt-5 flex flex-col gap-2 text-xs text-muted-foreground">
                <Link
                  target="_blank"
                  href="mailto:hackmnc.mail@gmail.com"
                  className="hover:text-primary transition-colors flex gap-2 items-center justify-start"
                >
                  <SiGmail /> hackmnc.mail@gmail.com
                </Link>

                <Link
                  href="https://www.linkedin.com/company/hackmnc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors flex items-center gap-2"
                >
                  <FaLinkedin /> @hackMnc
                </Link>
              </div>
            </div>

            {/* Top Tech Companies */}
            <div className="lg:col-span-2">
              <h3 className="text-sm font-semibold text-foreground mb-4">
                FAANG Interview Prep
              </h3>
              <nav aria-label="Top tech companies">
                <ul className="space-y-2.5">
                  {topCompanies.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors block"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            {/* Service Companies */}
            <div className="lg:col-span-2">
              <h3 className="text-sm font-semibold text-foreground mb-4">
                Service Companies
              </h3>
              <nav aria-label="IT service companies">
                <ul className="space-y-2.5">
                  {serviceCompanies.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors block"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            {/* Tech & Hardware */}
            <div className="lg:col-span-2">
              <h3 className="text-sm font-semibold text-foreground mb-4">
                Tech & Hardware
              </h3>
              <nav aria-label="Technology and hardware companies">
                <ul className="space-y-2.5">
                  {techCompanies.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors block"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            {/* Other Companies & Resources */}
            <div className="lg:col-span-3">
              <h3 className="text-sm font-semibold text-foreground mb-4">
                More Companies
              </h3>
              <nav aria-label="Additional companies">
                <ul className="space-y-2.5 mb-6">
                  {otherCompanies.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors block"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              <h3 className="text-sm font-semibold text-foreground mb-4 mt-6">
                Learning Resources
              </h3>
              <nav aria-label="Learning resources">
                <ul className="space-y-2.5">
                  {resources.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors block"
                        title={link.description}
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
        </div>

        <div className="sm:px-4 px-2">
          <div className="py-6 border-t border-border">
            <div className="prose prose-sm max-w-none">
              <p className="text-xs text-muted-foreground leading-relaxed">
                <strong className="text-foreground">HackMNC</strong> is a
                comprehensive free platform for software engineering interview
                preparation. Access curated LeetCode problems asked by top
                companies including Google, Amazon, Microsoft, Meta, Apple,
                Netflix, and 40+ other MNCs. Master data structures and
                algorithms with topic-wise practice, study real interview
                experiences, and track your preparation progress. Perfect for
                freshers and experienced developers preparing for FAANG,
                product-based companies, and top IT service firms.
              </p>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-6 border-t border-border">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-xs text-muted-foreground">
                © {currentYear} HackMNC. All rights reserved. | Free DSA
                Interview Preparation Platform
              </p>
              <div className="flex items-center  gap-6 text-xs text-muted-foreground">
                <Link
                  href="/about-us"
                  className="hover:text-primary transition-colors"
                >
                  About Us
                </Link>
                <Link
                  href="/privacy-policy"
                  className="hover:text-primary transition-colors"
                >
                  Privacy Policy
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>      
    </footer>
  );
}
