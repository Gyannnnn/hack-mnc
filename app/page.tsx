"use client";
import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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
import Testimonials from "@/components/Testimonials";

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
            "id": "fd5a7829-61a7-45ca-97ce-e04f18a04340",
            "name": "Paypal",
            "type": "PRODUCT_BASED",
            "ctc": 32,
            "logo": "https://veerpreps.s3.ap-south-1.amazonaws.com/uploads/hackmnc/3.png",
            "logoSmall": "https://veerpreps.s3.ap-south-1.amazonaws.com/uploads/hackmnc/Small+Logos/newPaypalSmall.png",
            "_count": {
                "questions": 175
            }
        },
        {
            "id": "ff82eb40-bfb5-43da-af6f-f22d0be55874",
            "name": "Flipkart",
            "type": "PRODUCT_BASED",
            "ctc": 32,
            "logo": "https://veerpreps.s3.ap-south-1.amazonaws.com/uploads/hackmnc/flipkart.png",
            "logoSmall": "https://veerpreps.s3.ap-south-1.amazonaws.com/uploads/hackmnc/Small+Logos/newFlpkartSmall.png",
            "_count": {
                "questions": 100
            }
        },
        {
            "id": "84ef901d-8b56-441a-9859-157221c4fbd0",
            "name": "Microsoft",
            "type": "PRODUCT_BASED",
            "ctc": 40,
            "logo": "https://veerpreps.s3.ap-south-1.amazonaws.com/uploads/hackmnc/microsoft.png",
            "logoSmall": "https://veerpreps.s3.ap-south-1.amazonaws.com/uploads/hackmnc/Small+Logos/newMicrosoftSmall.png",
            "_count": {
                "questions": 521
            }
        },
        {
            "id": "6e37d3d1-b8d6-49c7-a75e-17c5ed1fb027",
            "name": "Goldman Sachs",
            "type": "SERVICE_BASED",
            "ctc": 56,
            "logo": "https://veerpreps.s3.ap-south-1.amazonaws.com/uploads/hackmnc/goldManSachs.png",
            "logoSmall": "https://veerpreps.s3.ap-south-1.amazonaws.com/uploads/hackmnc/goldManSachsSmall.png",
            "_count": {
                "questions": 112
            }
        },
        {
            "id": "d6bef37b-445d-4805-90ef-8d0f4bf1f7f1",
            "name": "Wipro",
            "type": "SERVICE_BASED",
            "ctc": 15,
            "logo": "https://veerpreps.s3.ap-south-1.amazonaws.com/uploads/hackmnc/wipro.png",
            "logoSmall": "https://veerpreps.s3.ap-south-1.amazonaws.com/uploads/hackmnc/Small+Logos/newWiproSmall.png",
            "_count": {
                "questions": 25
            }
        },
        {
            "id": "a203ee0d-e92b-476a-8ab7-30fecd3dc556",
            "name": "Apple",
            "type": "PRODUCT_BASED",
            "ctc": 30,
            "logo": "https://veerpreps.s3.ap-south-1.amazonaws.com/uploads/hackmnc/apple.png",
            "logoSmall": "https://veerpreps.s3.ap-south-1.amazonaws.com/uploads/hackmnc/Small+Logos/newAppleSmall.png",
            "_count": {
                "questions": 100
            }
        },
        {
            "id": "8908f25e-c3c1-4a53-a6c1-f48989142c6f",
            "name": "Uber",
            "type": "PRODUCT_BASED",
            "ctc": 32,
            "logo": "https://veerpreps.s3.ap-south-1.amazonaws.com/uploads/hackmnc/uber.png",
            "logoSmall": "https://veerpreps.s3.ap-south-1.amazonaws.com/uploads/hackmnc/Small+Logos/newUberSmall.png",
            "_count": {
                "questions": 334
            }
        },
        {
            "id": "3aa46666-1793-48df-bb29-08e8af6f8b66",
            "name": "JP Morgan",
            "type": "PRODUCT_BASED",
            "ctc": 43,
            "logo": "https://veerpreps.s3.ap-south-1.amazonaws.com/uploads/hackmnc/jpMorgan.png",
            "logoSmall": "https://veerpreps.s3.ap-south-1.amazonaws.com/uploads/hackmnc/jpmorganSmall.png",
            "_count": {
                "questions": 79
            }
        },
        {
            "id": "01ee71b8-53d6-4415-9d88-9c2423df8691",
            "name": "Google",
            "type": "SERVICE_BASED",
            "ctc": 64,
            "logo": "https://veerpreps.s3.ap-south-1.amazonaws.com/uploads/Google-OfwXGx0Sl_brandlogos.net.svg",
            "logoSmall": "https://veerpreps.s3.ap-south-1.amazonaws.com/uploads/google-favicon-logo-brandlogos.net_gvd970bt9.svg",
            "_count": {
                "questions": 906
            }
        },
        {
            "id": "e2ba08c2-992d-4539-ab8b-187f2e3e9ed3",
            "name": "IBM",
            "type": "SERVICE_BASED",
            "ctc": 15,
            "logo": "https://veerpreps.s3.ap-south-1.amazonaws.com/uploads/hackmnc/ibm.png",
            "logoSmall": "https://veerpreps.s3.ap-south-1.amazonaws.com/uploads/hackmnc/ibmSmall.png",
            "_count": {
                "questions": 100
            }
        },
        {
            "id": "f28f2c5d-75f2-4803-9aca-7f9d3471551b",
            "name": "Oracle",
            "type": "PRODUCT_BASED",
            "ctc": 16,
            "logo": "https://veerpreps.s3.ap-south-1.amazonaws.com/uploads/hackmnc/oracle.png",
            "logoSmall": "https://veerpreps.s3.ap-south-1.amazonaws.com/uploads/hackmnc/oracleSmall.png",
            "_count": {
                "questions": 100
            }
        },
        {
            "id": "8f3be5ba-089f-4ec3-be9f-566f69da4da1",
            "name": "Tcs",
            "type": "SERVICE_BASED",
            "ctc": 6,
            "logo": "https://veerpreps.s3.ap-south-1.amazonaws.com/uploads/Tata_Consultancy_Services_old_logo.svg.png",
            "logoSmall": "https://veerpreps.s3.ap-south-1.amazonaws.com/uploads/hackmnc/Small+Logos/newTcsSmall.png",
            "_count": {
                "questions": 100
            }
        },
        {
            "id": "839efa4c-49a9-4726-80b6-cb6f6d983dd5",
            "name": "Amazon",
            "type": "PRODUCT_BASED",
            "ctc": 32,
            "logo": "https://veerpreps.s3.ap-south-1.amazonaws.com/uploads/hackmnc/1.png",
            "logoSmall": "https://veerpreps.s3.ap-south-1.amazonaws.com/uploads/hackmnc/Small+Logos/newAmazonSmall.png",
            "_count": {
                "questions": 743
            }
        },
        {
            "id": "019de64b-f221-40e5-bf6c-47581b945336",
            "name": "Capgemini",
            "type": "PRODUCT_BASED",
            "ctc": 12,
            "logo": "https://veerpreps.s3.ap-south-1.amazonaws.com/uploads/hackmnc/capegemini.png",
            "logoSmall": "https://veerpreps.s3.ap-south-1.amazonaws.com/uploads/hackmnc/Small+Logos/newCapgeminiSmall.png",
            "_count": {
                "questions": 25
            }
        },
        {
            "id": "748b53bd-9576-4e61-9457-a1de8011b87c",
            "name": "Meta",
            "type": "PRODUCT_BASED",
            "ctc": 34,
            "logo": "https://veerpreps.s3.ap-south-1.amazonaws.com/uploads/hackmnc/meta.png",
            "logoSmall": "https://veerpreps.s3.ap-south-1.amazonaws.com/uploads/hackmnc/Small+Logos/newMetaSmall.png",
            "_count": {
                "questions": 563
            }
        },
        {
            "id": "18eca962-ecf7-46a6-b9b1-a2e00963bbaf",
            "name": "Adobe",
            "type": "PRODUCT_BASED",
            "ctc": 45,
            "logo": "https://veerpreps.s3.ap-south-1.amazonaws.com/uploads/hackmnc/adobe.png",
            "logoSmall": "https://veerpreps.s3.ap-south-1.amazonaws.com/uploads/hackmnc/Small+Logos/newAdobeSmall.png",
            "_count": {
                "questions": 100
            }
        },
        {
            "id": "be3e6bac-ec1f-45d8-bb6f-d9d31e841d0a",
            "name": "Nvidia",
            "type": "PRODUCT_BASED",
            "ctc": 64,
            "logo": "https://veerpreps.s3.ap-south-1.amazonaws.com/uploads/hackmnc/nvidialogo.png",
            "logoSmall": "https://veerpreps.s3.ap-south-1.amazonaws.com/uploads/hackmnc/nvidiaSmall+(1).png",
            "_count": {
                "questions": 100
            }
        },
        {
            "id": "f762d376-ca91-48a9-a89e-7f3dd99ec2e2",
            "name": "Deloitte",
            "type": "SERVICE_BASED",
            "ctc": 7,
            "logo": "https://veerpreps.s3.ap-south-1.amazonaws.com/uploads/hackmnc/deloitte.png",
            "logoSmall": "https://veerpreps.s3.ap-south-1.amazonaws.com/uploads/hackmnc/Small+Logos/newDelloitteSmall.png",
            "_count": {
                "questions": 27
            }
        },
        {
            "id": "2cd9d6bf-39fd-4402-a987-0dffde549612",
            "name": "Cognizant",
            "type": "SERVICE_BASED",
            "ctc": 3,
            "logo": "https://veerpreps.s3.ap-south-1.amazonaws.com/uploads/hackmnc/cognizant.png",
            "logoSmall": "https://veerpreps.s3.ap-south-1.amazonaws.com/uploads/hackmnc/cogniZantSmall.png",
            "_count": {
                "questions": 29
            }
        },
        {
            "id": "208952df-69f9-46dc-8d92-7716d355af29",
            "name": "Netflix",
            "type": "PRODUCT_BASED",
            "ctc": 30,
            "logo": "https://veerpreps.s3.ap-south-1.amazonaws.com/uploads/Logonetflix.png",
            "logoSmall": "https://veerpreps.s3.ap-south-1.amazonaws.com/uploads/netflix-logo-png_seeklogo-327627.png",
            "_count": {
                "questions": 8
            }
        },
        {
            "id": "8993a9e4-f2a9-4398-b32b-597641467f59",
            "name": "Samsung",
            "type": "PRODUCT_BASED",
            "ctc": 64,
            "logo": "https://veerpreps.s3.ap-south-1.amazonaws.com/uploads/hackmnc/samsung.png",
            "logoSmall": "https://veerpreps.s3.ap-south-1.amazonaws.com/uploads/hackmnc/smasung+small.png",
            "_count": {
                "questions": 73
            }
        },
        {
            "id": "7bc22832-d657-424a-8019-0c87d3574d52",
            "name": "HCL Technologies",
            "type": "SERVICE_BASED",
            "ctc": 14,
            "logo": "https://veerpreps.s3.ap-south-1.amazonaws.com/uploads/hackmnc/hcl.png",
            "logoSmall": "https://veerpreps.s3.ap-south-1.amazonaws.com/uploads/hackmnc/hclSmall.png",
            "_count": {
                "questions": 9
            }
        },
        {
            "id": "2624f4fa-dcac-403c-b008-48b5fb150b44",
            "name": "Cisco",
            "type": "SERVICE_BASED",
            "ctc": 6,
            "logo": "https://veerpreps.s3.ap-south-1.amazonaws.com/uploads/hackmnc/cisco.png",
            "logoSmall": "https://veerpreps.s3.ap-south-1.amazonaws.com/uploads/hackmnc/Small+Logos/newSicoSmall.png",
            "_count": {
                "questions": 87
            }
        },
        {
            "id": "734ee652-a58a-48ab-91da-dcd0d99d9166",
            "name": "Tech Mahindra",
            "type": "SERVICE_BASED",
            "ctc": 9,
            "logo": "https://veerpreps.s3.ap-south-1.amazonaws.com/uploads/hackmnc/techMahindra+(1).png",
            "logoSmall": "https://veerpreps.s3.ap-south-1.amazonaws.com/uploads/hackmnc/techMahindraSmall.png",
            "_count": {
                "questions": 5
            }
        },
        {
            "id": "aa70cccc-8a48-4ef7-ba9c-f60b5f23636b",
            "name": "Intel",
            "type": "PRODUCT_BASED",
            "ctc": 32,
            "logo": "https://veerpreps.s3.ap-south-1.amazonaws.com/uploads/hackmnc/intel.png",
            "logoSmall": "https://veerpreps.s3.ap-south-1.amazonaws.com/uploads/hackmnc/intelSmall.png",
            "_count": {
                "questions": 25
            }
        },
        {
            "id": "50e04f19-e2de-41f2-8439-44214e194025",
            "name": "Cars24",
            "type": "PRODUCT_BASED",
            "ctc": 17,
            "logo": "https://veerpreps.s3.ap-south-1.amazonaws.com/uploads/CARS24_logo.svg.png",
            "logoSmall": "https://veerpreps.s3.ap-south-1.amazonaws.com/uploads/CARS24_logo.svg.png",
            "_count": {
                "questions": 8
            }
        },
        {
            "id": "70db1fe5-8b45-4443-b0bf-b4a0829806c3",
            "name": "Infosys",
            "type": "SERVICE_BASED",
            "ctc": 5,
            "logo": "https://veerpreps.s3.ap-south-1.amazonaws.com/uploads/hackmnc/infosys.png",
            "logoSmall": "https://veerpreps.s3.ap-south-1.amazonaws.com/uploads/hackmnc/infosysSmall.png",
            "_count": {
                "questions": 100
            }
        },
        {
            "id": "885de31c-0182-489f-853c-d55b7bc3b548",
            "name": "Atlassian",
            "type": "PRODUCT_BASED",
            "ctc": 34,
            "logo": "https://veerpreps.s3.ap-south-1.amazonaws.com/uploads/hackmnc/atlasian.png",
            "logoSmall": "https://veerpreps.s3.ap-south-1.amazonaws.com/uploads/hackmnc/Small+Logos/newAtlasianSmall.png",
            "_count": {
                "questions": 73
            }
        },
        {
            "id": "ff787fb2-aebf-4f45-9486-3588a7ef2ba5",
            "name": "AMD",
            "type": "PRODUCT_BASED",
            "ctc": 60,
            "logo": "https://veerpreps.s3.ap-south-1.amazonaws.com/uploads/hackmnc/amd.png",
            "logoSmall": "https://veerpreps.s3.ap-south-1.amazonaws.com/uploads/hackmnc/Small+Logos/newAmdSmall.png",
            "_count": {
                "questions": 11
            }
        }
    ]
  
  
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
            <div className="">
              <motion.div
                className="flex gap-4 will-change-transform py-2"
                initial={{ x: 0 }}
                animate={{ x: "-50%" }}
                transition={{ repeat: Infinity, duration: 10, ease: "easeIn" }}
              >
                {[...Array(2)].flatMap(() =>
                  companies.map((company, i) => (
                    <div
                      key={`${company.name}-${i}-${Math.random()}`}
                      className="shrink-0 min-h-16 w-40 grid place-items-center rounded-lg border border-border bg-card/80 hover:bg-card hover:border-primary/40 transition-all p-3"
                    >
                      <Image
                        src={company.logo}
                        alt={company.name}
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
            { k: "Problems", value: 1679, suffix: "+" },
            { k: "Companies", value: 29, suffix: "+" },
            { k: "Active Users", value: 20, suffix: "+" },
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
      {/* <section className="px-4 sm:px-6 lg:px-8 py-10">
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
      </section> */}

        <Testimonials/>
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