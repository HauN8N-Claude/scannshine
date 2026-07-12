import { SiteConfig } from "@/site-config";
import QRCode from "qrcode";

/**
 * URL publique du funnel d'un commerce.
 * En dev, NEXT_PUBLIC_URL / BETTER_AUTH_URL pointent sur localhost.
 */
export const getCollectUrl = (slug: string): string => {
  const baseUrl =
    process.env.NODE_ENV === "production"
      ? SiteConfig.prodUrl
      : (process.env.BETTER_AUTH_URL ?? "http://localhost:3000");
  return `${baseUrl}/r/${slug}`;
};

/**
 * Génère le QR code du funnel en SVG (string).
 * Toujours noir sur blanc avec quiet zone — la scannabilité prime sur l'esthétique.
 */
export const generateQrSvg = async (slug: string): Promise<string> => {
  return QRCode.toString(getCollectUrl(slug), {
    type: "svg",
    errorCorrectionLevel: "M",
    margin: 2,
    color: { dark: "#000000", light: "#ffffff" },
  });
};

/**
 * Variante PNG data-URL (utilisée dans les PDF).
 */
export const generateQrPngDataUrl = async (
  slug: string,
  size = 600,
): Promise<string> => {
  return QRCode.toDataURL(getCollectUrl(slug), {
    errorCorrectionLevel: "M",
    margin: 2,
    width: size,
    color: { dark: "#000000", light: "#ffffff" },
  });
};
