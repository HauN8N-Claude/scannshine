"use client";

import { useEffect, useRef } from "react";
import { trackMetaEvent } from "./meta-pixel";

/**
 * Envoie StartTrial au retour du checkout Dodo réussi
 * (return_url `/dashboard?paiement=ok`, cf. billing.action.ts).
 * Retire ensuite le paramètre `paiement` de l'URL pour ne pas
 * renvoyer l'événement à chaque rechargement de la page.
 */
export const MetaStartTrialTracker = () => {
  const hasTracked = useRef(false);

  useEffect(() => {
    if (hasTracked.current) return;
    hasTracked.current = true;

    trackMetaEvent("StartTrial");

    const url = new URL(window.location.href);
    url.searchParams.delete("paiement");
    window.history.replaceState(window.history.state, "", url);
  }, []);

  return null;
};
