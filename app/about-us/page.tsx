"use client";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  Code2,
  Users,
  Target,
  Rocket,
  Heart,
  Shield,
  Lock,
  Eye,
} from "lucide-react";

export default function AboutUsPage() {
  return (
    <main className="w-full overflow-x-hidden pt-24 pb-20">
      {/* Hero Section */}
      <section className="relative px-4 mb-24">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center justify-center p-3 mb-6 bg-primary/10 rounded-full text-primary">
              <Code2 className="w-6 h-6" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 bg-gradient-to-b from-foreground to-foreground/70 bg-clip-text text-transparent">
              We Are HackMNC
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Built by engineers, for engineers. We&apos;re on a mission to
              democratize technical interview preparation using real-world data
              and structured learning paths.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision Grid */}
      <section className="px-4 mb-24">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-8 rounded-2xl border border-border bg-card/50 backdrop-blur-sm"
          >
            <Target className="w-10 h-10 text-primary mb-4" />
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p className="text-muted-foreground leading-relaxed">
              To simplify DSA preparation by cutting through the noise. We
              aggregate and curate interview questions that actually matter,
              saving candidates from aimless grinding and helping them focus on
              high-impact problems.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-8 rounded-2xl border border-border bg-card/50 backdrop-blur-sm"
          >
            <Users className="w-10 h-10 text-primary mb-4" />
            <h2 className="text-2xl font-bold mb-4">Who We Are</h2>
            <p className="text-muted-foreground leading-relaxed">
              HackMNC is built by solo developers who&apos;ve been in the
              trenches. We understand the frustration of scattered resources and
              paywalls, so we built the platform we wish we had during our own
              prep.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="px-4 mb-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Core Values</h2>
            <p className="text-muted-foreground">
              The principles that drive everything we do.
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              {
                title: "Accessibility",
                desc: "Premium quality education should be free and accessible to all.",
                icon: Heart,
              },
              {
                title: "Transparency",
                desc: "No hidden sources. We use public data and community contributions.",
                icon: Eye,
              },
              {
                title: "Community",
                desc: "We grow together. Your success is our success.",
                icon: Rocket,
              },
            ].map((val, i) => (
              <motion.div
                key={val.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-xl border border-border bg-background hover:border-primary/50 transition-colors"
              >
                <val.icon className="w-8 h-8 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">{val.title}</h3>
                <p className="text-muted-foreground text-sm">{val.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Data Source Info */}
      <section className="px-4 mb-24">
        <div className="max-w-4xl mx-auto bg-muted/30 rounded-3xl p-8 md:p-12 border border-border">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
            How We Source Questions
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-muted-foreground mb-4">
                We believe in transparency. Our data is aggregated from publicly
                available sources to ensure authenticity and relevance.
              </p>
              <ul className="space-y-3">
                {[
                  "LeetCode Discuss",
                  "Blind & Reddit",
                  "GitHub Repositories",
                  "Student Contributions",
                ].map((src) => (
                  <li
                    key={src}
                    className="flex items-center gap-2 text-sm font-medium"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    {src}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-background rounded-xl p-6 border border-border text-sm text-muted-foreground">
              <p>
                &quot;The questions listed on HackMNC are based on real
                interview experiences shared by candidates. We constantly update
                our database to reflect the latest trends in FAANG and top MNC
                interviews.&quot;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-12 text-center">
        <h2 className="text-2xl font-bold mb-6">
          Ready to start your journey?
        </h2>
        <Button asChild size="lg" className="rounded-full px-8">
          <Link href="/problems">Start Solving Now</Link>
        </Button>
      </section>
    </main>
  );
}
