import type { NextConfig } from "next";
import { SiteConfig } from "./src/site-config";

const nextConfig: NextConfig = {
  experimental: {
    authInterrupts: true,
  },
  cacheComponents: true,
  typedRoutes: true,
  /**
   * Canonicalisation : www -> apex (308 permanent).
   * Indispensable côté fonctionnel : Better Auth ne fait confiance qu'à
   * l'origine de production (l'apex). Sans cette redirection, une inscription
   * lancée depuis www.scannshine.com est rejetée en 403. Règle aussi le
   * contenu dupliqué côté SEO (un seul domaine canonique).
   */
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: `www.${SiteConfig.domain}` }],
        destination: `${SiteConfig.prodUrl}/:path*`,
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "*.public.blob.vercel-storage.com",
      },
    ],
  },
};

export default nextConfig;
