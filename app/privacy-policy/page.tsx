import { MailIcon } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Privacy Policy | HackMNC",
  description:
    "Privacy Policy for HackMNC explaining how user data is collected, used, and protected.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="bg-background text-foreground">
      {/* Header */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-14">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            Privacy Policy
          </h1>
          <p className="text-muted-foreground text-sm leading-relaxed">
            This Privacy Policy explains how{" "}
            <strong className="text-foreground">HackMNC</strong> collects, uses,
            and protects your information when you use our platform.
          </p>
          <p className="text-xs text-muted-foreground mt-3">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* Overview */}
        <div>
          <h2 className="text-xl font-semibold mb-3">Overview</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            HackMNC is an independent interview preparation platform created to
            help aspiring engineers practice data structures and algorithms more
            effectively. We respect your privacy and collect only the data
            necessary to operate and improve the platform.
          </p>
        </div>

        {/* Data We Collect */}
        <div>
          <h2 className="text-xl font-semibold mb-3">Information We Collect</h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            When you create an account or use HackMNC, we may collect the
            following information:
          </p>

          <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
            <li>Name and email address</li>
            <li>Authentication details (via credentials or OAuth)</li>
            <li>Account-related data used for progress tracking</li>
          </ul>
        </div>

        {/* Authentication */}
        <div>
          <h2 className="text-xl font-semibold mb-3">Authentication</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            HackMNC uses modern authentication mechanisms powered by{" "}
            <strong className="text-foreground">Auth.js</strong>. Users can sign
            up using credentials or supported OAuth providers. Authentication
            data is used solely for account access and security.
          </p>
        </div>

        {/* Analytics */}
        <div>
          <h2 className="text-xl font-semibold mb-3">Analytics</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            We use <strong className="text-foreground">Google Analytics</strong>{" "}
            to understand how users interact with the platform. This helps us
            improve performance, usability, and content relevance. Analytics
            data is aggregated and does not directly identify individual users.
          </p>
        </div>

        {/* Ads */}
        <div>
          <h2 className="text-xl font-semibold mb-3">Advertising</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            HackMNC currently displays advertisements via{" "}
            <strong className="text-foreground">Google AdSense</strong>. Google
            may use cookies or similar technologies to show relevant ads based
            on your browsing behavior. HackMNC does not control how Google
            collects or uses this data.
          </p>
        </div>

        {/* Cookies */}
        <div>
          <h2 className="text-xl font-semibold mb-3">Cookies</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            HackMNC does not intentionally set custom cookies for tracking or
            profiling. Some cookies may be set automatically by authentication
            services, analytics providers, or advertising partners as part of
            normal operation.
          </p>
        </div>

        {/* Data Sharing */}
        <div>
          <h2 className="text-xl font-semibold mb-3">Data Sharing</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            We do not sell, trade, or share your personal information with third
            parties, except where required to operate core services such as
            authentication, analytics, or advertising.
          </p>
        </div>

        {/* Data Security */}
        <div>
          <h2 className="text-xl font-semibold mb-3">Data Security</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Reasonable technical and organizational measures are used to protect
            your data. However, no method of transmission or storage is 100%
            secure, and we cannot guarantee absolute security.
          </p>
        </div>

        {/* Audience */}
        <div>
          <h2 className="text-xl font-semibold mb-3">Intended Audience</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            HackMNC is intended for students, job seekers, and professionals
            preparing for software engineering interviews. The platform does not
            contain adult content.
          </p>
        </div>

        {/* Jurisdiction */}
        <div>
          <h2 className="text-xl font-semibold mb-3">Jurisdiction</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            HackMNC operates from India and complies with applicable Indian
            laws, including the Information Technology Act. Users from other
            regions acknowledge that their data may be processed in India.
          </p>
        </div>

        {/* Contact */}
        <div className="rounded-xl border border-border bg-card p-6">
          <h2 className="text-lg font-semibold mb-2">Contact</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            If you have any questions about this Privacy Policy or how your data
            is handled, you can contact us at:
          </p>
          <p className="mt-3 text-sm font-medium flex gap-2 items-center justify-center">
            <MailIcon />{" "}
            <Link
              href="mailto:hackmnc.mail@gmail.com"
              className="text-primary hover:underline"
            >
              hackmnc.mail@gmail.com
            </Link>
          </p>
        </div>

        {/* Footer CTA */}
        <div className="pt-6 border-t border-border text-sm text-muted-foreground">
          <p>
            By using HackMNC, you agree to this Privacy Policy. You can also
            read our{" "}
            <Link href="/about" className="text-primary hover:underline">
              About Us
            </Link>{" "}
            page to learn more about the platform.
          </p>
        </div>
      </section>
    </main>
  );
}
