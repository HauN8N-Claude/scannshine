"use client";

import { Layout, LayoutContent } from "@/features/page/layout";
import { SiteConfig } from "@/site-config";
import { MessageSquareText } from "lucide-react";
import Link from "next/link";

export function Footer() {
  const feedbackHref = `mailto:${SiteConfig.supportEmail}?subject=${encodeURIComponent(
    "Mon avis sur ScanNShine",
  )}&body=${encodeURIComponent(
    "Bonjour,\n\nVoici mon retour sur ScanNShine :\n\n",
  )}`;

  return (
    <footer className="bg-background border-t pb-8">
      <Layout className="my-14">
        <LayoutContent>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-col gap-3">
              <h3 className="text-lg font-semibold tracking-tight">
                {SiteConfig.title}
              </h3>
              <p className="text-muted-foreground max-w-xs text-sm">
                {SiteConfig.description}
              </p>
            </div>

            <div className="flex flex-col gap-3 md:items-end md:text-right">
              <a
                href={feedbackHref}
                className="text-primary inline-flex items-center gap-2 text-sm font-medium hover:underline"
              >
                <MessageSquareText className="size-4" />
                Une question, une idée ? Donnez-nous votre avis
              </a>
              <div className="text-muted-foreground flex items-center gap-3 text-sm">
                <Link
                  href="/legal/terms"
                  className="hover:text-foreground hover:underline"
                >
                  Conditions générales
                </Link>
                <span aria-hidden>·</span>
                <Link
                  href="/legal/privacy"
                  className="hover:text-foreground hover:underline"
                >
                  Confidentialité
                </Link>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-muted-foreground text-sm">
                  {SiteConfig.company.address}
                </p>
                <p className="text-muted-foreground text-sm">
                  © 2026 {SiteConfig.company.name}. Tous droits réservés.
                </p>
              </div>
            </div>
          </div>
        </LayoutContent>
      </Layout>
    </footer>
  );
}
