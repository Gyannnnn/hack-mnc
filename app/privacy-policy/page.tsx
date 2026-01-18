import { Shield, Lock, Eye, Mail, FileText } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Privacy Policy | HackMNC",
  description:
    "Privacy Policy for HackMNC explaining how user data is collected, used, and protected.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="w-full overflow-x-hidden pt-24 pb-20 bg-background">
      {/* Header */}
      <section className="relative px-4 border-b border-border/50 pb-16 mb-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center p-3 mb-6 bg-primary/10 rounded-full text-primary">
            <Shield className="w-6 h-6" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Privacy Policy
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            We value your trust. This policy outlines how we handle your data
            with transparency and care.
          </p>
          <p className="text-sm font-medium text-muted-foreground mt-8">
            Last updated: January 16, 2026
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-3xl mx-auto px-4 space-y-12">
        {/* Overview */}
        <div className="prose prose-zinc dark:prose-invert max-w-none">
          <div className="flex items-start gap-4">
            <div className="mt-1 p-2 rounded-lg bg-secondary/50 text-secondary-foreground">
              <Eye className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-3 mt-0">Overview</h2>
              <p className="text-muted-foreground leading-relaxed">
                HackMNC is an independent interview preparation platform created
                to help aspiring engineers practice data structures and
                algorithms more effectively. We respect your privacy and collect
                only the data necessary to operate and improve the platform.
              </p>
            </div>
          </div>
        </div>

        {/* Data Collection */}
        <div className="flex items-start gap-4">
          <div className="mt-1 p-2 rounded-lg bg-secondary/50 text-secondary-foreground">
            <FileText className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-semibold mb-3">
              Information We Collect
            </h2>
            <p className="text-muted-foreground mb-4">
              When you create an account or use HackMNC, we may collect:
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border border-border bg-card/40">
                <h3 className="font-medium mb-1">Identity Data</h3>
                <p className="text-sm text-muted-foreground">
                  Name, email address, and profile picture (via OAuth).
                </p>
              </div>
              <div className="p-4 rounded-xl border border-border bg-card/40">
                <h3 className="font-medium mb-1">Usage Data</h3>
                <p className="text-sm text-muted-foreground">
                  Progress tracking, problems solved, and interaction logs.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Auth & Security */}
        <div className="flex items-start gap-4">
          <div className="mt-1 p-2 rounded-lg bg-secondary/50 text-secondary-foreground">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-3">
              Authentication & Security
            </h2>
            <p className="text-muted-foreground mb-4">
              We use <strong className="text-foreground">Auth.js</strong> for
              secure authentication. Users can sign up using supported OAuth
              providers (like Google/GitHub). We do not store passwords directly
              for OAuth users.
            </p>
            <p className="text-muted-foreground">
              While we implement industry-standard security measures, no method
              of transmission is 100% secure.
            </p>
          </div>
        </div>

        <div className="h-px bg-border/50" />

        {/* Third Party Services */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Third-Party Services</h2>
          <div className="grid gap-4">
            <div className="p-4 rounded-xl bg-muted/20 border border-border flex items-center justify-between">
              <div>
                <h3 className="font-medium">Google Analytics</h3>
                <p className="text-sm text-muted-foreground">
                  Used to understand platform usage patterns.
                </p>
              </div>
            </div>
            <div className="p-4 rounded-xl bg-muted/20 border border-border flex items-center justify-between">
              <div>
                <h3 className="font-medium">Google AdSense</h3>
                <p className="text-sm text-muted-foreground">
                  May serve ads based on browsing behavior.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="rounded-2xl border border-border bg-card/40 p-8 text-center">
          <h2 className="text-xl font-semibold mb-2">
            Have specific questions?
          </h2>
          <p className="text-muted-foreground mb-6">
            We are happy to answer any questions about our privacy practices.
          </p>
          <Link
            href="mailto:hackmnc.mail@gmail.com"
            className="inline-flex items-center gap-2 text-primary hover:underline font-medium bg-primary/10 px-4 py-2 rounded-full transition-colors"
          >
            <Mail className="w-4 h-4" />
            hackmnc.mail@gmail.com
          </Link>
        </div>
      </section>
    </main>
  );
}
