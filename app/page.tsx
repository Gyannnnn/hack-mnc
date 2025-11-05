"use client";
import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { Briefcase, Layers, Filter, CheckCircle2 } from "lucide-react";

function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 60,
    stiffness: 100,
  });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, value, motionValue]);

  useEffect(() => {
    springValue.on("change", (latest) => {
      setDisplayValue(Math.round(latest));
    });
  }, [springValue]);

  return (
    <div ref={ref}>
      {displayValue.toLocaleString()}{suffix}
    </div>
  );
}

import Script from "next/script";

<Script
  id="ld-json-home"
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Hack MNC",
      url: "https://hackmnc.com",
      description:
        "Hack MNC helps developers crack FAANG and top MNC interviews with free DSA problems, progress tracking, and real interview experiences.",
      potentialAction: {
        "@type": "SearchAction",
        target: "https://hackmnc.com/search?q={search_term_string}",
        "query-input": "required name=search_term_string",
      },
    }),
  }}
/>





export default function Page() {
  
  const companies = [
    {
      "companyName": "AMD",
      "logo": "https://veerpreps.s3.ap-south-1.amazonaws.com/uploads/hackmnc/amd.png"
    },
    {
      "companyName": "Adobe",
      "logo": "https://veerpreps.s3.ap-south-1.amazonaws.com/uploads/hackmnc/adobe.png"
    },
    {
      "companyName": "Amazon",
      "logo": "https://veerpreps.s3.ap-south-1.amazonaws.com/uploads/hackmnc/1.png"
    },
    {
      "companyName": "Apple",
      "logo": "https://veerpreps.s3.ap-south-1.amazonaws.com/uploads/hackmnc/apple.png"
    },
    {
      "companyName": "Atlassian",
      "logo": "https://veerpreps.s3.ap-south-1.amazonaws.com/uploads/hackmnc/atlasian.png"
    },
    {
      "companyName": "Capgemini",
      "logo": "https://veerpreps.s3.ap-south-1.amazonaws.com/uploads/hackmnc/capegemini.png"
    },
    {
      "companyName": "CARS24",
      "logo": "https://veerpreps.s3.ap-south-1.amazonaws.com/uploads/CARS24_logo.svg.png"
    },
    {
      "companyName": "Cisco",
      "logo": "https://veerpreps.s3.ap-south-1.amazonaws.com/uploads/hackmnc/cisco.png"
    },
    {
      "companyName": "Deloitte",
      "logo": "https://veerpreps.s3.ap-south-1.amazonaws.com/uploads/hackmnc/deloitte.png"
    },
    {
      "companyName": "Flipkart",
      "logo": "https://veerpreps.s3.ap-south-1.amazonaws.com/uploads/hackmnc/flipkart.png"
    },
    {
      "companyName": "Google",
      "logo": "https://veerpreps.s3.ap-south-1.amazonaws.com/uploads/Google-OfwXGx0Sl_brandlogos.net.svg"
    },
    {
      "companyName": "Meta",
      "logo": "https://veerpreps.s3.ap-south-1.amazonaws.com/uploads/hackmnc/meta.png"
    },
    {
      "companyName": "Microsoft",
      "logo": "https://veerpreps.s3.ap-south-1.amazonaws.com/uploads/hackmnc/microsoft.png"
    },
    {
      "companyName": "Netflix",
      "logo": "https://veerpreps.s3.ap-south-1.amazonaws.com/uploads/Logonetflix.png"
    },
    {
      "companyName": "Oracle",
      "logo": "https://veerpreps.s3.ap-south-1.amazonaws.com/uploads/hackmnc/3.png"
    },
    {
      "companyName": "TCS",
      "logo": "https://veerpreps.s3.ap-south-1.amazonaws.com/uploads/Tata_Consultancy_Services_old_logo.svg.png"
    },
    {
      "companyName": "Uber",
      "logo": "https://veerpreps.s3.ap-south-1.amazonaws.com/uploads/hackmnc/uber.png"
    },
    {
      "companyName": "Wipro",
      "logo": "https://veerpreps.s3.ap-south-1.amazonaws.com/uploads/hackmnc/wipro.png"
    }
  ]
  
  const testimonials = [
    {
      name: "Ananya S.",
      quote:
        "Tracked my prep company-wise and finally cracked my first MNC offer.",
      role: "SWE Intern",
    },
    {
      name: "Rohit K.",
      quote:
        "The topic filters + progress tracking feel like a premium paid tool.",
      role: "SDE-1",
    },
    {
      name: "Meera T.",
      quote:
        "Exactly what I needed to stay consistent before interviews.",
      role: "Master's student",
    },
  ];

  return (
    <main className="w-full">
      {/* Hero */}
      <section className="relative overflow-hidden px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_-20%,theme(colors.primary/0.18),transparent)] pointer-events-none" />
        <div className="absolute inset-0 pointer-events-none [mask-image:linear-gradient(to_bottom,black,transparent_80%)] bg-[linear-gradient(to_right,transparent_0,transparent_95%,theme(colors.border)_95%),linear-gradient(to_bottom,transparent_0,transparent_95%,theme(colors.border)_95%)] bg-[size:24px_24px]" />
        <div className="max-w-7xl mx-auto pt-12 pb-16 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center"
          >
            
            <h1 className="mt-10 text-5xl md:text-6xl font-black tracking-tight bg-gradient-to-b from-foreground to-foreground/70 bg-clip-text text-transparent">
            &lt;HackMNC/&gt;
            </h1>
            <p className="mt-3 text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto">
              Your roadmap to top MNCs. Master DSA, track your prep, and crack your
              dream company — all in one place.
            </p>
            <div className="mt-6 flex items-center justify-center gap-3 relative z-10">
              <Button asChild size="lg" className="px-6">
                <Link href="/problems" className="inline-flex items-center justify-center">
                  Start Solving
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="px-6">
                <Link href="/blogs" className="inline-flex items-center justify-center">
                  Read Blogs
                </Link>
              </Button>
           
            </div>
          </motion.div>

          {/* Company carousel */}
          <div className="mt-8 relative">
            <div className="overflow-hidden">
              <motion.div
                className="flex gap-4 will-change-transform py-2"
                initial={{ x: 0 }}
                animate={{ x: "-50%" }}
                transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
              >
                {[...Array(2)].flatMap(() =>
                  companies.map((company, i) => (
                    <div
                      key={`${company.companyName}-${i}-${Math.random()}`}
                      className="shrink-0 min-h-16 w-40 grid place-items-center rounded-lg border border-border bg-card/80 hover:bg-card hover:border-primary/40 transition-all p-3"
                    >
                      <Image
                        src={company.logo}
                        alt={company.companyName}
                        width={200}
                        height={40}
                        className="object-contain h-full w-full"
                        unoptimized
                      />
                    </div>
                  ))
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Core features */}
      <section className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            {
              title: "Company-wise prep",
              desc: "Hand-picked problems mapped to FAANG and top MNCs.",
              Icon: Briefcase,
            },
            {
              title: "Topic-wise roadmap",
              desc: "Master DSA topics with a structured path.",
              Icon: Layers,
            },
            {
              title: "Smart filters",
              desc: "Difficulty, frequency and acceptance tuning.",
              Icon: Filter,
            },
            {
              title: "Progress tracking",
              desc: "See your journey across companies and topics.",
              Icon: CheckCircle2,
            },
          ].map(({ title, desc, Icon }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.05 }}
            >
              <Card className="bg-card border border-border h-full">
                <div className="p-5 flex items-start gap-3">
                  <div className="h-9 w-9 rounded-md bg-primary/10 text-primary grid place-items-center">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-semibold leading-tight">{title}</div>
                    <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                      {desc}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { k: "Problems", value: 1024, suffix: "+" },
            { k: "Companies", value: 20, suffix: "+" },
            { k: "Active Users", value: 10, suffix: "+" },
          ].map((s) => (
            <motion.div
              key={s.k}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Card className="bg-card border border-border">
                <div className="p-5 text-center">
                  <div className="text-3xl font-extrabold text-foreground">
                    <AnimatedCounter value={s.value} suffix={s.suffix} />
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">{s.k}</div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-4 sm:px-6 lg:px-8 py-10">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold">What our users say</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Real stories from learners using hackmnc for interview prep
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {testimonials.map((t, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: idx * 0.05 }}
            >
              <Card className="bg-card border border-border h-full">
                <div className="p-5 flex flex-col gap-4">
                  <p className="text-sm text-foreground leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback>
                        {t.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="text-sm font-semibold">{t.name}</div>
                      <div className="text-xs text-muted-foreground">{t.role}</div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
          </div>
        </div>
      </section>

      {/* Blog teaser */}
      {/* <section className="px-4 sm:px-6 lg:px-8 py-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between gap-4 mb-4">
            <div>
              <h2 className="text-2xl font-bold">Learn from those who made it</h2>
              <p className="text-sm text-muted-foreground">
                Interview experiences, prep strategies, and tips from the community
              </p>
            </div>
            <Link href="/blogs">
              <Button variant="outline" size="sm">View blog</Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="bg-card border border-border">
              <div className="p-5">
                <div className="h-36 rounded-md border border-border bg-muted" />
                <h3 className="mt-3 font-semibold">Interview prep story #{i}</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  How I structured my DSA prep, tracked progress and cracked the interview.
                </p>
              </div>
            </Card>
          ))}
          </div>
        </div>
      </section> */}
    </main>
  );
}