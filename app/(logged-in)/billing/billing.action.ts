"use server";

import { authAction } from "@/lib/actions/safe-actions";
import { getDodoClient, isDodoConfigured, SCANNSHINE_PLAN } from "@/lib/dodo";
import { env } from "@/lib/env";
import { ApplicationError } from "@/lib/errors/application-error";
import { prisma } from "@/lib/prisma";
import { getServerUrl } from "@/lib/server-url";
import { z } from "zod";

/**
 * Démarre le checkout Dodo : abonnement 33,50 €/mois (affiché 3 990 XPF)
 * avec 7 jours d'essai. Le webhook activera le compte automatiquement.
 */
export const startCheckoutAction = authAction
  .inputSchema(z.object({}))
  .action(async ({ ctx: { user } }) => {
    if (!isDodoConfigured()) {
      throw new ApplicationError(
        "Le paiement n'est pas encore configuré. Contactez le support.",
      );
    }

    const business = await prisma.business.findUnique({
      where: { userId: user.id },
      select: { id: true, name: true },
    });

    if (!business) {
      throw new ApplicationError("Configurez d'abord votre commerce.");
    }

    const client = getDodoClient();
    const session = await client.checkoutSessions.create({
      product_cart: [{ product_id: env.DODO_PRODUCT_ID ?? "", quantity: 1 }],
      subscription_data: {
        trial_period_days: SCANNSHINE_PLAN.trialDays,
      },
      customer: {
        email: user.email,
        name: business.name,
      },
      // EUR forcé : le XPF est arrimé à l'euro (1 € = 119,33 XPF), jamais de
      // conversion USD flottante pour les clients polynésiens (ADR-002).
      billing_currency: "EUR",
      metadata: { businessId: business.id },
      return_url: `${getServerUrl()}/dashboard?paiement=ok`,
    });

    if (!session.checkout_url) {
      throw new ApplicationError(
        "Impossible de créer la session de paiement. Réessayez.",
      );
    }

    return { checkoutUrl: session.checkout_url };
  });

/**
 * Ouvre le portail client Dodo (gestion CB, factures, annulation).
 */
export const openPortalAction = authAction
  .inputSchema(z.object({}))
  .action(async ({ ctx: { user } }) => {
    const business = await prisma.business.findUnique({
      where: { userId: user.id },
      select: { dodoCustomerId: true },
    });

    if (!business?.dodoCustomerId) {
      throw new ApplicationError(
        "Aucun abonnement trouvé. Démarrez d'abord votre abonnement.",
      );
    }

    const client = getDodoClient();
    const portal = await client.customers.customerPortal.create(
      business.dodoCustomerId,
    );

    return { portalUrl: portal.link };
  });
