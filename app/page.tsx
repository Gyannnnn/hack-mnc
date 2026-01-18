"use client";
import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import {
  Briefcase,
  Layers,
  Filter,
  CheckCircle2,
  Zap,
  Users,
  Map,
  Code2,
  BookOpen,
  Compass,
  Server,
  FileText,
} from "lucide-react";
import Script from "next/script";
import Testimonials from "@/components/Testimonials";
import Faqs from "@/components/Faqs";

// --- Components ---

function AnimatedCounter({
  value,
  suffix = "",
}: {
  value: number;
  suffix?: string;
}) {
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
    <span ref={ref}>
      {displayValue.toLocaleString()}
      {suffix}
    </span>
  );
}

// --- Data ---

const companies = [
  {
    id: "fd5a7829-61a7-45ca-97ce-e04f18a04340",
    name: "Paypal",
    type: "PRODUCT_BASED",
    ctc: 32,
    logo: "https://veerpreps.s3.ap-south-1.amazonaws.com/uploads/hackmnc/3.png",
    logoSmall:
      "https://veerpreps.s3.ap-south-1.amazonaws.com/uploads/hackmnc/Small+Logos/newPaypalSmall.png",
    _count: { questions: 175 },
  },
  {
    id: "ff82eb40-bfb5-43da-af6f-f22d0be55874",
    name: "Flipkart",
    type: "PRODUCT_BASED",
    ctc: 32,
    logo: "https://veerpreps.s3.ap-south-1.amazonaws.com/uploads/hackmnc/flipkart.png",
    logoSmall:
      "https://veerpreps.s3.ap-south-1.amazonaws.com/uploads/hackmnc/Small+Logos/newFlpkartSmall.png",
    _count: { questions: 100 },
  },
  {
    id: "84ef901d-8b56-441a-9859-157221c4fbd0",
    name: "Microsoft",
    type: "PRODUCT_BASED",
    ctc: 40,
    logo: "https://veerpreps.s3.ap-south-1.amazonaws.com/uploads/hackmnc/microsoft.png",
    logoSmall:
      "https://veerpreps.s3.ap-south-1.amazonaws.com/uploads/hackmnc/Small+Logos/newMicrosoftSmall.png",
    _count: {
      questions: 521,
    },
  },
  {
    id: "6e37d3d1-b8d6-49c7-a75e-17c5ed1fb027",
    name: "Goldman Sachs",
    type: "SERVICE_BASED",
    ctc: 56,
    logo: "https://veerpreps.s3.ap-south-1.amazonaws.com/uploads/hackmnc/goldManSachs.png",
    logoSmall:
      "https://veerpreps.s3.ap-south-1.amazonaws.com/uploads/hackmnc/goldManSachsSmall.png",
    _count: {
      questions: 112,
    },
  },
  {
    id: "d6bef37b-445d-4805-90ef-8d0f4bf1f7f1",
    name: "Wipro",
    type: "SERVICE_BASED",
    ctc: 15,
    logo: "https://veerpreps.s3.ap-south-1.amazonaws.com/uploads/hackmnc/wipro.png",
    logoSmall:
      "https://veerpreps.s3.ap-south-1.amazonaws.com/uploads/hackmnc/Small+Logos/newWiproSmall.png",
    _count: {
      questions: 25,
    },
  },
  {
    id: "a203ee0d-e92b-476a-8ab7-30fecd3dc556",
    name: "Apple",
    type: "PRODUCT_BASED",
    ctc: 30,
    logo: "https://veerpreps.s3.ap-south-1.amazonaws.com/uploads/hackmnc/apple.png",
    logoSmall:
      "https://veerpreps.s3.ap-south-1.amazonaws.com/uploads/hackmnc/Small+Logos/newAppleSmall.png",
    _count: {
      questions: 100,
    },
  },
  {
    id: "8908f25e-c3c1-4a53-a6c1-f48989142c6f",
    name: "Uber",
    type: "PRODUCT_BASED",
    ctc: 32,
    logo: "https://veerpreps.s3.ap-south-1.amazonaws.com/uploads/hackmnc/uber.png",
    logoSmall:
      "https://veerpreps.s3.ap-south-1.amazonaws.com/uploads/hackmnc/Small+Logos/newUberSmall.png",
    _count: {
      questions: 334,
    },
  },
  {
    id: "3aa46666-1793-48df-bb29-08e8af6f8b66",
    name: "JP Morgan",
    type: "PRODUCT_BASED",
    ctc: 43,
    logo: "https://veerpreps.s3.ap-south-1.amazonaws.com/uploads/hackmnc/jpMorgan.png",
    logoSmall:
      "https://veerpreps.s3.ap-south-1.amazonaws.com/uploads/hackmnc/jpmorganSmall.png",
    _count: {
      questions: 79,
    },
  },
  {
    id: "01ee71b8-53d6-4415-9d88-9c2423df8691",
    name: "Google",
    type: "SERVICE_BASED",
    ctc: 64,
    logo: "https://veerpreps.s3.ap-south-1.amazonaws.com/uploads/Google-OfwXGx0Sl_brandlogos.net.svg",
    logoSmall:
      "https://veerpreps.s3.ap-south-1.amazonaws.com/uploads/google-favicon-logo-brandlogos.net_gvd970bt9.svg",
    _count: {
      questions: 906,
    },
  },
  {
    id: "e2ba08c2-992d-4539-ab8b-187f2e3e9ed3",
    name: "IBM",
    type: "SERVICE_BASED",
    ctc: 15,
    logo: "https://veerpreps.s3.ap-south-1.amazonaws.com/uploads/hackmnc/ibm.png",
    logoSmall:
      "https://veerpreps.s3.ap-south-1.amazonaws.com/uploads/hackmnc/ibmSmall.png",
    _count: {
      questions: 100,
    },
  },
  {
    id: "f28f2c5d-75f2-4803-9aca-7f9d3471551b",
    name: "Oracle",
    type: "PRODUCT_BASED",
    ctc: 16,
    logo: "https://veerpreps.s3.ap-south-1.amazonaws.com/uploads/hackmnc/oracle.png",
    logoSmall:
      "https://veerpreps.s3.ap-south-1.amazonaws.com/uploads/hackmnc/oracleSmall.png",
    _count: {
      questions: 100,
    },
  },
  {
    id: "8f3be5ba-089f-4ec3-be9f-566f69da4da1",
    name: "Tcs",
    type: "SERVICE_BASED",
    ctc: 6,
    logo: "https://veerpreps.s3.ap-south-1.amazonaws.com/uploads/Tata_Consultancy_Services_old_logo.svg.png",
    logoSmall:
      "https://veerpreps.s3.ap-south-1.amazonaws.com/uploads/hackmnc/Small+Logos/newTcsSmall.png",
    _count: {
      questions: 100,
    },
  },
  {
    id: "839efa4c-49a9-4726-80b6-cb6f6d983dd5",
    name: "Amazon",
    type: "PRODUCT_BASED",
    ctc: 32,
    logo: "https://veerpreps.s3.ap-south-1.amazonaws.com/uploads/hackmnc/1.png",
    logoSmall:
      "https://veerpreps.s3.ap-south-1.amazonaws.com/uploads/hackmnc/Small+Logos/newAmazonSmall.png",
    _count: {
      questions: 743,
    },
  },
  {
    id: "019de64b-f221-40e5-bf6c-47581b945336",
    name: "Capgemini",
    type: "PRODUCT_BASED",
    ctc: 12,
    logo: "https://veerpreps.s3.ap-south-1.amazonaws.com/uploads/hackmnc/capegemini.png",
    logoSmall:
      "https://veerpreps.s3.ap-south-1.amazonaws.com/uploads/hackmnc/Small+Logos/newCapgeminiSmall.png",
    _count: {
      questions: 25,
    },
  },
  {
    id: "748b53bd-9576-4e61-9457-a1de8011b87c",
    name: "Meta",
    type: "PRODUCT_BASED",
    ctc: 34,
    logo: "https://veerpreps.s3.ap-south-1.amazonaws.com/uploads/hackmnc/meta.png",
    logoSmall:
      "https://veerpreps.s3.ap-south-1.amazonaws.com/uploads/hackmnc/Small+Logos/newMetaSmall.png",
    _count: {
      questions: 563,
    },
  },
  {
    id: "18eca962-ecf7-46a6-b9b1-a2e00963bbaf",
    name: "Adobe",
    type: "PRODUCT_BASED",
    ctc: 45,
    logo: "https://veerpreps.s3.ap-south-1.amazonaws.com/uploads/hackmnc/adobe.png",
    logoSmall:
      "https://veerpreps.s3.ap-south-1.amazonaws.com/uploads/hackmnc/Small+Logos/newAdobeSmall.png",
    _count: {
      questions: 100,
    },
  },
  {
    id: "be3e6bac-ec1f-45d8-bb6f-d9d31e841d0a",
    name: "Nvidia",
    type: "PRODUCT_BASED",
    ctc: 64,
    logo: "https://veerpreps.s3.ap-south-1.amazonaws.com/uploads/hackmnc/nvidialogo.png",
    logoSmall:
      "https://veerpreps.s3.ap-south-1.amazonaws.com/uploads/hackmnc/nvidiaSmall+(1).png",
    _count: {
      questions: 100,
    },
  },
  {
    id: "f762d376-ca91-48a9-a89e-7f3dd99ec2e2",
    name: "Deloitte",
    type: "SERVICE_BASED",
    ctc: 7,
    logo: "https://veerpreps.s3.ap-south-1.amazonaws.com/uploads/hackmnc/deloitte.png",
    logoSmall:
      "https://veerpreps.s3.ap-south-1.amazonaws.com/uploads/hackmnc/Small+Logos/newDelloitteSmall.png",
    _count: {
      questions: 27,
    },
  },
  {
    id: "2cd9d6bf-39fd-4402-a987-0dffde549612",
    name: "Cognizant",
    type: "SERVICE_BASED",
    ctc: 3,
    logo: "https://veerpreps.s3.ap-south-1.amazonaws.com/uploads/hackmnc/cognizant.png",
    logoSmall:
      "https://veerpreps.s3.ap-south-1.amazonaws.com/uploads/hackmnc/cogniZantSmall.png",
    _count: {
      questions: 29,
    },
  },
  {
    id: "208952df-69f9-46dc-8d92-7716d355af29",
    name: "Netflix",
    type: "PRODUCT_BASED",
    ctc: 30,
    logo: "https://veerpreps.s3.ap-south-1.amazonaws.com/uploads/Logonetflix.png",
    logoSmall:
      "https://veerpreps.s3.ap-south-1.amazonaws.com/uploads/netflix-logo-png_seeklogo-327627.png",
    _count: {
      questions: 8,
    },
  },
  {
    id: "8993a9e4-f2a9-4398-b32b-597641467f59",
    name: "Samsung",
    type: "PRODUCT_BASED",
    ctc: 64,
    logo: "https://veerpreps.s3.ap-south-1.amazonaws.com/uploads/hackmnc/samsung.png",
    logoSmall:
      "https://veerpreps.s3.ap-south-1.amazonaws.com/uploads/hackmnc/smasung+small.png",
    _count: {
      questions: 73,
    },
  },
  {
    id: "7bc22832-d657-424a-8019-0c87d3574d52",
    name: "HCL Technologies",
    type: "SERVICE_BASED",
    ctc: 14,
    logo: "https://veerpreps.s3.ap-south-1.amazonaws.com/uploads/hackmnc/hcl.png",
    logoSmall:
      "https://veerpreps.s3.ap-south-1.amazonaws.com/uploads/hackmnc/hclSmall.png",
    _count: {
      questions: 9,
    },
  },
  {
    id: "2624f4fa-dcac-403c-b008-48b5fb150b44",
    name: "Cisco",
    type: "SERVICE_BASED",
    ctc: 6,
    logo: "https://veerpreps.s3.ap-south-1.amazonaws.com/uploads/hackmnc/cisco.png",
    logoSmall:
      "https://veerpreps.s3.ap-south-1.amazonaws.com/uploads/hackmnc/Small+Logos/newSicoSmall.png",
    _count: {
      questions: 87,
    },
  },
  {
    id: "734ee652-a58a-48ab-91da-dcd0d99d9166",
    name: "Tech Mahindra",
    type: "SERVICE_BASED",
    ctc: 9,
    logo: "https://veerpreps.s3.ap-south-1.amazonaws.com/uploads/hackmnc/techMahindra+(1).png",
    logoSmall:
      "https://veerpreps.s3.ap-south-1.amazonaws.com/uploads/hackmnc/techMahindraSmall.png",
    _count: {
      questions: 5,
    },
  },
  {
    id: "aa70cccc-8a48-4ef7-ba9c-f60b5f23636b",
    name: "Intel",
    type: "PRODUCT_BASED",
    ctc: 32,
    logo: "https://veerpreps.s3.ap-south-1.amazonaws.com/uploads/hackmnc/intel.png",
    logoSmall:
      "https://veerpreps.s3.ap-south-1.amazonaws.com/uploads/hackmnc/intelSmall.png",
    _count: {
      questions: 25,
    },
  },
  {
    id: "50e04f19-e2de-41f2-8439-44214e194025",
    name: "Cars24",
    type: "PRODUCT_BASED",
    ctc: 17,
    logo: "https://veerpreps.s3.ap-south-1.amazonaws.com/uploads/CARS24_logo.svg.png",
    logoSmall:
      "https://veerpreps.s3.ap-south-1.amazonaws.com/uploads/CARS24_logo.svg.png",
    _count: {
      questions: 8,
    },
  },
  {
    id: "70db1fe5-8b45-4443-b0bf-b4a0829806c3",
    name: "Infosys",
    type: "SERVICE_BASED",
    ctc: 5,
    logo: "https://veerpreps.s3.ap-south-1.amazonaws.com/uploads/hackmnc/infosys.png",
    logoSmall:
      "https://veerpreps.s3.ap-south-1.amazonaws.com/uploads/hackmnc/infosysSmall.png",
    _count: {
      questions: 100,
    },
  },
  {
    id: "885de31c-0182-489f-853c-d55b7bc3b548",
    name: "Atlassian",
    type: "PRODUCT_BASED",
    ctc: 34,
    logo: "https://veerpreps.s3.ap-south-1.amazonaws.com/uploads/hackmnc/atlasian.png",
    logoSmall:
      "https://veerpreps.s3.ap-south-1.amazonaws.com/uploads/hackmnc/Small+Logos/newAtlasianSmall.png",
    _count: {
      questions: 73,
    },
  },
  {
    id: "ff787fb2-aebf-4f45-9486-3588a7ef2ba5",
    name: "AMD",
    type: "PRODUCT_BASED",
    ctc: 60,
    logo: "https://veerpreps.s3.ap-south-1.amazonaws.com/uploads/hackmnc/amd.png",
    logoSmall:
      "https://veerpreps.s3.ap-south-1.amazonaws.com/uploads/hackmnc/Small+Logos/newAmdSmall.png",
    _count: {
      questions: 11,
    },
  },
  // ... (rest of the companies - removed to save space, but you should keep them all in reality)
  // For brevity in this edit, assuming all previous companies are here.
];

const faqs = [
  {
    question: "Is HackMNC really free?",
    answer:
      "Yes. Our mission is to make quality interview preparation accessible to everyone. We are supported by community contributions and occasional ads to keep the servers running.",
  },
  {
    question: "Which companies are covered?",
    answer:
      "We focus on the most popular tech companies including Google, Amazon, Microsoft, Meta, and major service-based MNCs. Our lists are updated regularly based on community feedback.",
  },
  {
    question: "How is this different from other platforms?",
    answer:
      "HackMNC is designed to be a streamlined, focused roadmap. Instead of overwhelming you with thousands of random problems, we provide curated lists organized by company and topic to help you prepare efficiently.",
  },
  {
    question: "Do I need to sign up?",
    answer:
      "You can browse basic content without signing up. Creating a free account allows you to track your progress, save your solved problems, and customize your learning path.",
  },
  {
    question: "Where do the questions come from?",
    answer:
      "Questions are aggregated from public interview experiences, open-source repositories, and user submissions, ensuring they reflect real-world interview patterns.",
  },
];

const features = [
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
];

const whyHackMNC = [
  {
    title: "Curated & Focused",
    desc: "Don't solve random problems. We filter the noise and give you exactly what companies ask.",
    icon: Filter,
  },
  {
    title: "100% Free Access",
    desc: "Premium features like company tags and frequency analysis shouldn't cost a fortune.",
    icon: Zap,
  },
  {
    title: "Community Driven",
    desc: "Built by developers for developers. Real questions from real interviews.",
    icon: Users,
  },
];

export default function Page() {
  return (
    <main className="w-full overflow-x-hidden">
      {/* JSON-LD Structured Data */}
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

      {/* --- HERO SECTION --- */}
      {/* --- HERO SECTION --- */}
      <section className="relative w-full pt-24 pb-20 lg:pt-36 lg:pb-32 overflow-hidden">
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
          <div
            className="relative left-[calc(50%+11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#9089fc] to-[#ff80b5] opacity-20 sm:left-[calc(50%+30rem)] sm:w-[72.1875rem] -mt-20"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-secondary/50 border border-secondary text-secondary-foreground text-sm font-medium mb-6 backdrop-blur-sm">
              <span className="max-sm:hidden">🚀 HackMNC:</span> The Ultimate
              Free Interview Resource
            </span>
            <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6 bg-gradient-to-b from-foreground to-foreground/60 bg-clip-text text-transparent drop-shadow-sm">
              Crack Your Dream <br className="hidden md:block" />
              <span className="text-primary">MNC Interview</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Stop grinding blindly. <strong>HackMNC</strong> gives you
              company-wise questions, structured roadmaps, and progress
              tracking—<strong>all for free</strong>.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="h-12 px-8 text-base shadow-lg shadow-primary/20 transition-transform hover:scale-105"
              >
                <Link href="/problems">Start Solving Now</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-12 px-8 text-base transition-transform hover:scale-105 border-primary/20 hover:border-primary/50 hover:bg-primary/5"
              >
                <Link href="/companies">Explore Companies</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- COMPANIES MARQUEE --- */}
      <section className="py-10 bg-muted/20 border-y border-border/50 overflow-hidden">
        <div className="text-center mb-8">
          <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
            HackMNC Helps You Crack:
          </p>
        </div>
        <div className="relative w-full flex overflow-hidden">
          <motion.div
            className="flex gap-10 items-center whitespace-nowrap"
            initial={{ x: 0 }}
            animate={{ x: "-50%" }}
            transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
          >
            {[...companies, ...companies].map((company, index) => (
              <div
                key={`${company.id}-${index}`}
                className="relative h-22 w-42 shrink-0 transition-all duration-300 cursor-pointer hover:scale-110"
              >
                <Image
                  src={company.logo}
                  alt={company.name}
                  fill
                  className="object-contain"
                  unoptimized
                />
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* --- WHO WE ARE (Enhanced) --- */}
      <section className="py-24 px-4 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
          <div className="absolute top-24 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-24 right-10 w-72 h-72 bg-secondary/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">
                Empowering{" "}
                <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                  Developers
                </span>{" "}
                Everywhere
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                We believe top-tier interview preparation should be{" "}
                <span className="font-semibold text-foreground">
                  accessible to everyone
                </span>
                . HackMNC levels the playing field with high-quality, structured
                resources.
              </p>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Community First",
                desc: "No paywalls, no gatekeeping. A platform built by the community, for the community, ensuring equal opportunity for all.",
                icon: Users,
                color: "bg-blue-500/10 text-blue-500",
              },
              {
                title: "Structured Learning",
                desc: "We cut through the noise. Our resources are logically organized to guide you from basics to mastery without distractions.",
                icon: Layers,
                color: "bg-purple-500/10 text-purple-500",
              },
              {
                title: "Mastery Focused",
                desc: "A distraction-free environment designed solely for one purpose: helping you master your craft and crack that dream job.",
                icon: Zap,
                color: "bg-amber-500/10 text-amber-500",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <Card className="h-full border-border/50 bg-background/50 backdrop-blur-sm hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
                  <div className="p-8">
                    <div
                      className={`h-14 w-14 rounded-2xl ${item.color} flex items-center justify-center mb-6`}
                    >
                      <item.icon size={28} />
                    </div>
                    <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- WHY HACKMNC (Features) --- */}
      <section className="py-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-secondary/30 skew-y-3 transform origin-top-left -z-10" />

        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose HackMNC?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Everything you need to succeed, structured for efficiency.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Features Loop */}
            {whyHackMNC.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <Card className="p-8 h-full bg-card/50 backdrop-blur-sm border-border/60 hover:border-primary/50 transition-colors shadow-sm">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-6">
                    <feature.icon size={24} />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.desc}
                  </p>
                </Card>
              </motion.div>
            ))}

            {/* Existing Features Integrated */}
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (i + 3) * 0.1, duration: 0.5 }}
              >
                <Card className="p-8 h-full bg-card/50 backdrop-blur-sm border-border/60 hover:border-primary/50 transition-colors shadow-sm">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-6">
                    <feature.Icon size={24} />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.desc}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- HOW IT WORKS --- */}
      <section className="py-24 px-4 bg-muted/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How HackMNC Works
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Your simplified path to interview success.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Choose Your Path",
                desc: "Select a target company or a specific DSA topic you want to master. Our roadmaps are tailored for directed learning.",
                icon: Map,
              },
              {
                step: "02",
                title: "Practice & Track",
                desc: "Solve curated problems directly. Use our built-in tracker to mark progress and identify your weak spots.",
                icon: Code2,
              },
              {
                step: "03",
                title: "Learn from Others",
                desc: "Read real recent interview experiences to understand the current hiring trends and question patterns.",
                icon: BookOpen,
              },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="relative p-8 rounded-2xl bg-background border border-border shadow-sm"
              >
                <div className="absolute -top-6 left-8 text-6xl font-black text-muted/20 select-none">
                  {item.step}
                </div>
                <div className="relative z-10">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-6">
                    <item.icon size={24} />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-muted-foreground">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- LEARNING ECOSYSTEM --- */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 space-y-8">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  A Complete Learning Ecosystem
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  It&apos;s not just about solving problems. HackMNC provides a
                  holistic approach to interview preparation, covering
                  everything from core data structures to complex system design.
                </p>
              </div>

              <div className="space-y-6">
                {[
                  {
                    title: "Structured Roadmaps",
                    desc: "Step-by-step guides for beginners to advanced coders.",
                    icon: Compass,
                  },
                  {
                    title: "Learn from experts",
                    desc: "Read interview experiances and learn from those who made it",
                    icon: Server,
                  },
                  {
                    title: "In-Depth Blogs",
                    desc: "Expert articles on algorithms, patterns, and soft skills.",
                    icon: FileText,
                  },
                ].map((feature) => (
                  <div key={feature.title} className="flex gap-4 items-start">
                    <div className="mt-1 h-10 w-10 shrink-0 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground">
                      <feature.icon size={20} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{feature.title}</h3>
                      <p className="text-muted-foreground">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual side - Abstract representation */}
            <div className="order-1 lg:order-2 relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-purple-500/20 rounded-3xl blur-3xl" />
              <div className="relative bg-card border border-border rounded-3xl p-8 shadow-2xl">
                <div className="space-y-4">
                  <div className="h-4 w-1/3 bg-muted rounded animate-pulse" />
                  <div className="h-32 bg-muted/50 rounded-xl" />
                  <div className="space-y-2">
                    <div className="h-4 w-full bg-muted/30 rounded" />
                    <div className="h-4 w-5/6 bg-muted/30 rounded" />
                  </div>
                  <div className="pt-4 flex gap-4">
                    <div className="h-10 w-24 bg-primary/20 rounded-lg" />
                    <div className="h-10 w-24 bg-muted rounded-lg" />
                  </div>
                </div>

                {/* Floating badges */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute -top-6 -right-6 bg-background border border-border p-4 rounded-xl shadow-lg flex items-center gap-3"
                >
                  <div className="h-10 w-10 rounded-full bg-green-500/10 flex items-center justify-center text-green-500">
                    <CheckCircle2 size={24} />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Status</p>
                    <p className="font-bold">Problem Solved!</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- STATS --- */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-border">
            {[
              { k: "Problems Crated", value: 1679, suffix: "+", icon: Layers },
              {
                k: "Companies Covered",
                value: 29,
                suffix: "+",
                icon: Briefcase,
              },
              { k: "Active Learners", value: 1200, suffix: "+", icon: Users },
            ].map((stat) => (
              <div key={stat.k} className="p-6">
                <div className="text-4xl md:text-5xl font-black text-primary mb-2 flex items-center justify-center gap-2">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-muted-foreground font-medium uppercase tracking-wide text-sm">
                  {stat.k}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- TESTIMONIALS --- */}
      <div className="bg-muted/30 py-12">
        <Testimonials />
      </div>

      {/* --- FAQ SECTION --- */}
      <section className="py-24 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground">
              Got questions about HackMNC? We&apos;ve got answers.
            </p>
          </div>
          <Faqs items={faqs} />
        </div>
      </section>

      {/* --- PRE-FOOTER CTA --- */}
      <section className="py-24 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-muted -z-10" />
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Crack Your Next Interview with HackMNC?
          </h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Join thousands of developers mastering DSA with HackMNC today.
            It&apos;s free, forever.
          </p>
          <Button
            asChild
            size="lg"
            className="h-14 px-10 text-lg shadow-xl shadow-primary/20 hover:shadow-primary/40 transition-all hover:-translate-y-1"
          >
            <Link href="/problems">Start Practice for Free</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
