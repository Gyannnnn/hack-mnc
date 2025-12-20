import Link from "next/link";

export const metadata = {
  title: "About Us | HackMNC",
  description:
    "HackMNC is a free interview preparation platform built by a solo developer to make DSA interview preparation easier using real questions from publicly available sources.",
};

export default function AboutUsPage() {
  return (
    <main className="bg-background text-foreground pb-10">
      {/* Hero */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">
            We are HackMNC
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            HackMNC is a free interview preparation platform built with one clear
            goal — to make data structures and algorithms (DSA) preparation
            easier and more focused for aspiring software engineers.
          </p>
        </div>
      </section>

      {/* Content Wrapper */}
      <section className="px-4 pb-20">
        <div className="max-w-5xl mx-auto space-y-16">
          {/* Who Built */}
          <div className="grid sm:grid-cols-3 gap-8">
            <h2 className="text-2xl font-semibold sm:col-span-1">
              Who Built HackMNC?
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed sm:col-span-2">
              HackMNC is built and maintained by a solo developer who has
              personally gone through the challenges of interview preparation.
              The platform is shaped by real preparation pain points — scattered
              resources, outdated lists, and too much noise — and aims to solve
              them with structure and clarity.
            </p>
          </div>

          {/* Mission */}
          <div className="grid sm:grid-cols-3 gap-8">
            <h2 className="text-2xl font-semibold">Our Mission</h2>
            <p className="text-sm text-muted-foreground leading-relaxed sm:col-span-2">
              Preparing for coding interviews shouldn’t feel overwhelming.
              HackMNC’s mission is to simplify DSA preparation by highlighting
              questions that actually matter, so candidates can spend less time
              searching and more time practicing.
            </p>
          </div>

          {/* Data Collection */}
          <div className="rounded-2xl border border-border bg-card p-8">
            <h2 className="text-2xl font-semibold mb-4">
              How HackMNC Compiles Interview Questions
            </h2>

            <p className="text-sm text-muted-foreground mb-4">
              HackMNC collects and organizes interview questions from
              <span className="text-foreground font-medium">
                {" "}publicly available sources
              </span>, including:
            </p>

            <ul className="grid sm:grid-cols-2 gap-3 list-disc pl-5 text-sm text-muted-foreground">
              <li>Public LeetCode discussion threads</li>
              <li>Interview experiences on Reddit and Quora</li>
              <li>Open-source GitHub interview repositories</li>
              <li>Public interview blogs and write-ups</li>
            </ul>

            <p className="text-sm text-muted-foreground mt-4">
              The data is reviewed, deduplicated, and structured into
              company-wise and topic-wise lists. Updates typically happen every{" "}
              <span className="text-foreground font-medium">5–10 months</span>,
              based on newly available public information.
            </p>
          </div>

          {/* Why HackMNC */}
          <div>
            <h2 className="text-2xl font-semibold mb-6">Why HackMNC?</h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                {
                  title: "Focused Preparation",
                  desc: "Emphasis on questions actually reported in interviews.",
                },
                {
                  title: "Beginner Friendly",
                  desc: "Designed for freshers and early-career engineers.",
                },
                {
                  title: "Structured Learning",
                  desc: "Company-wise, topic-wise, and frequency-based lists.",
                },
                {
                  title: "Built from Experience",
                  desc: "Created by someone who understands the interview grind.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-xl border border-border bg-card p-5"
                >
                  <h3 className="font-medium mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Free & Disclaimer */}
          <div className="grid sm:grid-cols-2 gap-8">
            <div className="rounded-xl border border-border p-6 bg-card/50">
              <h3 className="font-semibold mb-2">Free & Accessible</h3>
              <p className="text-sm text-muted-foreground">
                HackMNC is currently completely free to use, with the goal of
                keeping interview preparation accessible without paywalls.
              </p>
            </div>

            <div className="rounded-xl border border-border p-6 bg-card/50">
              <h3 className="font-semibold mb-2">Disclaimer</h3>
              <p className="text-sm text-muted-foreground">
                HackMNC is an independent educational platform and is not
                affiliated with or endorsed by any company mentioned.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border py-20 px-4 bg-card/30">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-4">
            Make your DSA preparation easier
          </h2>
          <p className="text-muted-foreground mb-8">
            Practice company-wise interview questions trusted by thousands of
            candidates.
          </p>

          <Link
            href="/companies"
            className="inline-flex items-center justify-center rounded-lg bg-primary px-8 py-3 text-sm font-medium text-primary-foreground hover:opacity-90 transition"
          >
            Explore Companies →
          </Link>
        </div>
      </section>
    </main>
  );
}
