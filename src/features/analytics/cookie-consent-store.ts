"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

/**
 * Consentement aux traceurs non essentiels (mesure d'audience / publicité).
 * RGPD/CNIL : opt-in préalable — aucun traceur non essentiel (ex. pixel Meta)
 * ne se charge tant que `consent !== "accepted"`. Le refus est aussi simple
 * que l'acceptation, et le choix est révocable (action `reopen`).
 */
export type CookieConsent = "accepted" | "refused";

type CookieConsentStore = {
  consent: CookieConsent | null;
  /** Passe à true une fois la valeur relue depuis le localStorage (anti-flash). */
  hydrated: boolean;
  setConsent: (consent: CookieConsent) => void;
  /** Rouvre la bannière pour permettre de revenir sur son choix. */
  reopen: () => void;
};

export const useCookieConsent = create<CookieConsentStore>()(
  persist(
    (set) => ({
      consent: null,
      hydrated: false,
      setConsent: (consent) => set({ consent }),
      reopen: () => set({ consent: null }),
    }),
    {
      name: "sns-cookie-consent",
      partialize: (state) => ({ consent: state.consent }),
      onRehydrateStorage: () => (state) => {
        if (state) state.hydrated = true;
      },
    },
  ),
);
