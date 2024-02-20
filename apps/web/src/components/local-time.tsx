"use client";

import { formatDate } from "date-fns";

/**
 * Renders the local time based on the provided timestamp.
 * @param {string | Date} timestamp - The timestamp to be formatted.
 * @param {string} [formatStr="yyyy.MM.dd HH:mm"] - The format string for the timestamp.
 * @param {boolean} [showTimezone=false] - Whether to display the timezone along with the formatted date.
 * @returns {string | null} - The formatted local time or null if running in a non-browser environment.
 *
 * Import using dynimic to avoid running on the server
 * @example
 * const LocalTime = dynamic(() => import("@components/local-time"), {ssr: false});
 *
 */
export default function LocalTime({
  timestamp,
  formatStr = "yyyy.MM.dd HH:mm",
  showTimezone = false,
}: {
  timestamp: string | Date;
  formatStr?: string;
  showTimezone?: boolean;
}) {
  if (typeof window === "undefined") return null;

  const formattedDate = formatDate(timestamp, formatStr);

  if (!showTimezone) return formattedDate;

  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  return `${formattedDate} (${timezone})`;
}
