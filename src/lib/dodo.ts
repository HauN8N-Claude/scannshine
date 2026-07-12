import DodoPayments from "dodopayments";
import { env } from "./env";

/**
 * Client Dodo Payments (Merchant of Record — supporte les marchands de
 * Polynésie française, contrairement à Stripe). ADR-001.
 */

export const SCANNSHINE_PLAN = {
  priceXpf: 3990,
  priceEur: 33.5,
  trialDays: 7,
  // 1 € = 119,33 XPF (parité fixe) — on affiche le XPF, on facture l'EUR (ADR-002)
  displayPrice: "3 990 XPF/mois",
  displayPriceDetail: "≈ 33,50 €, débité en euros",
} as const;

export const isDodoConfigured = (): boolean =>
  Boolean(env.DODO_PAYMENTS_API_KEY && env.DODO_PRODUCT_ID);

let cachedClient: DodoPayments | null = null;

export const getDodoClient = (): DodoPayments => {
  if (!env.DODO_PAYMENTS_API_KEY) {
    throw new Error(
      "DODO_PAYMENTS_API_KEY manquant — configurez Dodo Payments dans .env",
    );
  }
  cachedClient ??= new DodoPayments({
    bearerToken: env.DODO_PAYMENTS_API_KEY,
    environment: env.DODO_PAYMENTS_ENVIRONMENT ?? "test_mode",
  });
  return cachedClient;
};
