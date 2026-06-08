/**
 * Convert a string into a URL-safe slug.
 * Example: slugify("Gaming PC — RTX 4090") → "gaming-pc-rtx-4090"
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
