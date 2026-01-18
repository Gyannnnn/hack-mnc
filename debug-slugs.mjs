import Slugger from "github-slugger";

const slugger = new Slugger();

const headings = [
  "Round 1: The Online Assessment (OA)",
  "Round 2: Technical Interview - 1 (The Foundation Check)",
  "Round 3: Technical Interview - 2 (The Depth & Details)",
  "Final Suggestions & Where to Focus",
];

function manualSlug(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

console.log(" Comparing Slugs:");
console.log("Text | Github Slugger (rehype-slug) | Manual (lib/mdx.ts)");
console.log("--- | --- | ---");

headings.forEach((text) => {
  slugger.reset();
  // rehype-slug re-uses slugger for a file context.
  // Here we reset to check individual mappings unless we want to test uniqueness sequence.

  const ghSlug = slugger.slug(text);
  const mySlug = manualSlug(text);

  const match = ghSlug === mySlug ? "MATCH" : "MISMATCH";
  console.log(`"${text}" | ${ghSlug} | ${mySlug} | ${match}`);
});
