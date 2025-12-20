import Link from "next/link";

export default function NotFound() {
  return (
    <main className=" flex items-center justify-center bg-background px-4">
      <div className="max-w-md w-full text-center">
        <div className="inline-flex items-center justify-center rounded-xl bg-muted px-4 py-1.5 mb-6">
          <span className="text-sm font-mono text-muted-foreground">
            404 • Page Not Found
          </span>
        </div>

        <h1 className="text-4xl font-bold tracking-tight text-foreground mb-3">
          This page doesn’t exist
        </h1>

        <p className="text-sm text-muted-foreground mb-8 leading-relaxed">
          The page you’re looking for might have been removed, renamed, or never
          existed. Let’s get you back to preparing smarter.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90 transition"
          >
            Go to Home
          </Link>

          <Link
            href="/companies"
            className="inline-flex items-center justify-center rounded-lg border border-border px-5 py-2.5 text-sm font-medium text-foreground hover:bg-accent transition"
          >
            Solve Questions
          </Link>
        </div>

        <p className="mt-10 text-xs text-muted-foreground">
          © {new Date().getFullYear()} HackMNC · Free DSA Interview Prep
        </p>
      </div>
    </main>
  );
}
