import { createHash } from "crypto";
import { headers } from "next/headers";

/**
 * Hash anonyme et éphémère du visiteur (IP + User-Agent) pour dédupliquer
 * les scans sur une fenêtre courte. Aucune donnée personnelle stockée en clair.
 */
export const getVisitorHash = async (): Promise<string> => {
  const headerList = await headers();
  const ip =
    headerList.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    headerList.get("x-real-ip") ??
    "unknown";
  const userAgent = headerList.get("user-agent") ?? "unknown";
  return createHash("sha256").update(`${ip}|${userAgent}`).digest("hex");
};
