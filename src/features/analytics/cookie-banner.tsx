"use client";

import { Button } from "@/components/ui/button";
import { Cookie } from "lucide-react";
import Link from "next/link";
import { useCookieConsent } from "./cookie-consent-store";

/**
 * Bannière de consentement cookies (RGPD/CNIL).
 * S'affiche tant qu'aucun choix n'a été fait. « Refuser » et « Tout accepter »
 * ont le même poids visuel. Le pixel Meta ne se charge qu'après acceptation
 * (voir MetaPixel + useCookieConsent).
 */
export const CookieBanner = () => {
  const consent = useCookieConsent((state) => state.consent);
  const hydrated = useCookieConsent((state) => state.hydrated);
  const setConsent = useCookieConsent((state) => state.setConsent);

  // Ne rien afficher tant que le localStorage n'est pas relu (évite le flash),
  // ni si un choix a déjà été exprimé.
  if (!hydrated || consent !== null) {
    return null;
  }

  return (
    <div
      role="dialog"
      aria-label="Consentement aux cookies"
      className="fixed inset-x-0 bottom-0 z-100 p-4"
    >
      <div className="bg-card mx-auto flex max-w-3xl flex-col gap-4 rounded-2xl border p-5 shadow-lg sm:flex-row sm:items-center">
        <div className="flex flex-1 items-start gap-3">
          <Cookie
            className="text-primary mt-0.5 size-5 shrink-0"
            aria-hidden
          />
          <p className="text-muted-foreground text-sm">
            Nous utilisons des cookies de mesure d'audience et de publicité pour
            améliorer le service et nos annonces. Vous pouvez les accepter ou les
            refuser — le site fonctionne dans les deux cas. Détails dans notre{" "}
            <Link href="/legal/privacy" className="underline underline-offset-2">
              politique de confidentialité
            </Link>
            .
          </p>
        </div>
        <div className="flex shrink-0 gap-2 max-sm:flex-col">
          <Button
            variant="outline"
            className="max-sm:w-full"
            onClick={() => setConsent("refused")}
          >
            Refuser
          </Button>
          <Button
            className="max-sm:w-full"
            onClick={() => setConsent("accepted")}
          >
            Tout accepter
          </Button>
        </div>
      </div>
    </div>
  );
};
