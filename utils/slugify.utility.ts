export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .normalize("NFKD")                
    .replace(/[^\w\s-]/g, "")         
    .replace(/\s+/g, "-")             
    .replace(/-+/g, "-");              
}


const LOWERCASE_WORDS = new Set([
  "and",
  "or",
  "of",
  "to",
  "in",
  "on",
  "for",
  "with",
  "at",
  "by",
  "from",
]);

export function decodeSlug(slug: string): string {
  return slug
    .split("-")
    .filter(Boolean)
    .map((word, index) => {
      if (index !== 0 && LOWERCASE_WORDS.has(word)) {
        return word; // keep lowercase
      }
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
}
