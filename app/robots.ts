import { SiteConfig } from "@/site-config";
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/auth/",
          "/onboarding",
          "/dashboard",
          "/qr",
          "/feedbacks",
          "/crm",
          "/settings",
          "/billing",
          "/account",
          "/orgs/",
          "/admin/",
          "/offre-crm-sms",
          "/posts",
          "/home",
        ],
      },
    ],
    sitemap: `${SiteConfig.prodUrl}/sitemap.xml`,
  };
}
