import { notFound } from "next/navigation";

// Exists because not-found.tsx in a locale folder does not auto-catch 404 routes. This forces it to do so, and preserves i18n translations as well
export default function notFoundWorkaround() {
  notFound();
}
