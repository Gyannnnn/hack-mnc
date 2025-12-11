import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import Navbar from "@/components/Navbar";
import { ReactLenis } from "@/utils/lenis";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner";
import Providers from "./providers";
import { SessionProvider } from "next-auth/react";
import Script from "next/script";
import "@/app/styles/notion-renderer.css";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
export const metadata: Metadata = {
  title: {
    default:
      "HackMNC | Free LeetCode Premium Helper, DSA Tracker & Interview Prep",
    template: "%s | HackMNC",
  },
  description:
    "HackMNC is your ultimate free LeetCode premium helper and DSA practice tracker. Solve coding interview questions company-wise, topic-wise, and difficulty-wise with real acceptance rates, progress tracking, and interview experiences for FAANG and top MNCs.",
  keywords: [
    // Core
    "HackMNC",
    "LeetCode",
    "LeetCode premium helper",
    "LeetCode premium bypass",
    "LeetCode alternative",
    "DSA questions",
    "DSA practice",
    "Data Structures and Algorithms",
    "Coding Interview Preparation",
    "Interview questions and answers",

    // Company wise keywords
    "Google interview questions",
    "Amazon interview questions",
    "Microsoft interview questions",
    "Meta interview questions",
    "Netflix interview questions",
    "Apple interview questions",
    "Adobe interview questions",
    "PayPal interview questions",
    "Oracle interview questions",
    "Uber interview questions",
    "Salesforce interview questions",
    "Flipkart interview questions",
    "TCS NQT coding questions",
    "Infosys interview questions",
    "Wipro coding questions",
    "Top MNC coding questions",

    // Topic wise DSA
    "Array problems",
    "String problems",
    "Dynamic Programming problems",
    "Graph problems",
    "Tree problems",
    "Recursion problems",
    "Backtracking problems",
    "Binary Search problems",
    "Sorting algorithms",
    "Greedy algorithms",
    "Bit manipulation problems",

    // Intent keywords
    "FAANG interview prep",
    "Top DSA problems",
    "LeetCode company wise questions",
    "Company-wise coding questions",
    "DSA interview guide",
    "LeetCode tracker",
    "Coding progress tracker",
    "Crack coding interviews",
    "Free LeetCode premium questions",
    "Coding interview blogs",
    "System design interview prep",
    "Technical interview preparation",
    "Top 100 DSA questions",
    "Most asked interview questions",

    // Regional targeting
    "LeetCode India",
    "LeetCode US",
    "Coding interview questions for freshers",
    "SDE interview preparation",
    "Software engineer interview questions",
    "Data structures interview preparation",
  ],
  authors: [{ name: "HackMNC Team", url: "https://hackmnc.com" }],
  openGraph: {
    title: "HackMNC - Free LeetCode Premium Helper & DSA Interview Tracker",
    description:
      "Access company-wise, topic-wise DSA problems and LeetCode premium questions for free. Track your coding progress and read real interview experiences on Hack MNC.",
    url: "https://hackmnc.com",
    siteName: "HackMNC",
    images: [
      {
        url: "https://hackmnc.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Hack MNC - Free DSA Helper & Tracker",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hack MNC - Free LeetCode Premium Helper & DSA Tracker",
    description:
      "Prepare for FAANG and MNC interviews with HackMNC — company-wise DSA problems, progress tracker, and blogs — 100% free.",
    images: ["https://hackmnc.com/og-image.png"],
    creator: "@hackmnc",
  },
  alternates: {
    canonical: "https://hackmnc.com",
    languages: {
      "en-US": "https://hackmnc.com",
      "en-IN": "https://hackmnc.com/in",
    },
  },
  metadataBase: new URL("https://hackmnc.com"),
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <ReactLenis root>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background`}
        >
          <SessionProvider>
            <Providers>
              <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
                <Navbar />
                <main className="pt-20 min-h-screen flex items-center justify-center w-full sm:px-10">
                  {children}
                </main>
                <Toaster position="top-center" />
                <Footer />
              </ThemeProvider>
            </Providers>
          </SessionProvider>
        </body>
        <Script
          id="microsoft-clarity"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
      (function(c,l,a,r,i,t,y){
          c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
          t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
          y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
      })(window, document, "clarity", "script", "u180ru1k0k");
    `,
          }}
        />

        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
        />
        <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
      </ReactLenis>
    </html>
  );
}
