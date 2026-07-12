import { createHash } from "crypto";
import { headers } from "next/headers";

/**
 * Hash anonyme et éphémère du visiteur (IP + User-Agent) pour dédupliquer
 * les scans sur une fenêtre courte. Aucune donnée personnelle stockée en clair.
 */
/**
 * Extrait l'IP réelle du client. `x-forwarded-for` est une liste
 * `client, proxy1, proxy2…` : la valeur de GAUCHE est fournie par le client et
 * donc falsifiable. On prend le hop le plus à DROITE (celui ajouté par notre
 * proxy de confiance — Vercel), non contrôlable par le client.
 */
const getClientIp = (xff: string | null, realIp: string | null): string => {
  if (xff) {
    const hops = xff
      .split(",")
      .map((part) => part.trim())
      .filter(Boolean);
    if (hops.length > 0) return hops[hops.length - 1];
  }
  return realIp ?? "unknown";
};

export const getVisitorHash = async (): Promise<string> => {
  const headerList = await headers();
  const ip = getClientIp(
    headerList.get("x-forwarded-for"),
    headerList.get("x-real-ip"),
  );
  const userAgent = headerList.get("user-agent") ?? "unknown";
  return createHash("sha256").update(`${ip}|${userAgent}`).digest("hex");
};
