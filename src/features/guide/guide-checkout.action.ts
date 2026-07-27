"use server";

import { action } from "@/lib/actions/safe-actions";
import { getDodoClient } from "@/lib/dodo";
import { env } from "@/lib/env";
import { ApplicationError } from "@/lib/errors/application-error";
import { getServerUrl } from "@/lib/server-url";
import { z } from "zod";

/**
 * Checkout Dodo du guide (/guidepremium) : paiement UNIQUE (pas d'abonnement),
 * sans compte ni connexion — l'acheteur saisit son email sur la page Dodo.
 *
 * - `metadata.source = "guide"` : permet au webhook (onPaymentSucceeded) de
 *   distinguer un achat guide d'un paiement d'abonnement, et d'écrire le lead
 *   dans le CRM Google Sheet dédié.
 * - `return_url` → page d'upsell /guidepremium/merci (vers /commander).
 */
export const startGuideCheckoutAction = action
  .inputSchema(z.object({}))
  .action(async () => {
    if (!env.DODO_PAYMENTS_API_KEY || !env.DODO_GUIDE_PRODUCT_ID) {
      throw new ApplicationError(
        "Le paiement du guide n'est pas encore disponible. Réessayez bientôt.",
      );
    }

    const client = getDodoClient();
    const session = await client.checkoutSessions.create({
      product_cart: [{ product_id: env.DODO_GUIDE_PRODUCT_ID, quantity: 1 }],
      // EUR forcé : le XPF est arrimé à l'euro (ADR-002), jamais de conversion
      // USD flottante pour les clients polynésiens.
      billing_currency: "EUR",
      metadata: { source: "guide" },
      // Téléphone OBLIGATOIRE : indispensable pour la relance WhatsApp du lead.
      feature_flags: { require_phone_number: true },
      return_url: `${getServerUrl()}/guidepremium/merci`,
    });

    if (!session.checkout_url) {
      throw new ApplicationError(
        "Impossible de créer la session de paiement. Réessayez.",
      );
    }

    return { checkoutUrl: session.checkout_url };
  });
