/**
 * Merge Tailwind class names safely.
 * Lightweight alternative to clsx + tailwind-merge for simple use cases.
 *
 * Usage: cn("base-class", condition && "conditional-class", "another-class")
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}
