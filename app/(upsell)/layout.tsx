import { Footer } from "@/features/layout/footer";
import { SiteConfig } from "@/site-config";
import Image from "next/image";
import Link from "next/link";
import type { PropsWithChildren } from "react";
import { CountdownBanner } from "./offre-crm-sms/countdown";

/**
 * Layout dédié aux pages d'upsell : header épuré (logo centré uniquement, pas
 * de navigation ni de bouton de connexion — page de vente focalisée) + barre de
 * compte à rebours pleine largeur. L'URL des pages reste inchangée.
 */
export default function UpsellLayout({ children }: PropsWithChildren) {
  return (
    <div className="relative flex min-h-full flex-col">
      <header className="flex h-16 w-full items-center justify-center border-b px-4">
        <Link
          href="/"
          className="flex items-center gap-2"
          aria-label={SiteConfig.title}
        >
          <Image
            src={SiteConfig.appIcon}
            alt={SiteConfig.title}
            width={32}
            height={32}
            className="size-8"
          />
          <span className="text-lg font-bold">{SiteConfig.title}</span>
        </Link>
      </header>

      <CountdownBanner />

      <div className="min-h-full flex-1">{children}</div>

      <Footer />
    </div>
  );
}
