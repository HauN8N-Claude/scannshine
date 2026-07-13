"use server";

import { authAction } from "@/lib/actions/safe-actions";
import { ApplicationError } from "@/lib/errors/application-error";
import { formatId } from "@/lib/format/id";
import { Prisma } from "@/generated/prisma";
import { resolvePlaceId, validateManualPlaceId } from "@/lib/place-id";
import { prisma } from "@/lib/prisma";
import { customAlphabet } from "nanoid";
import {
  BusinessInfoSchema,
  ConfirmPlaceSchema,
  GoogleLinkSchema,
} from "./onboarding.schema";

const slugSuffix = customAlphabet("1234567890abcdef", 4);

const isUniqueViolation = (error: unknown): boolean =>
  error instanceof Prisma.PrismaClientKnownRequestError &&
  error.code === "P2002";

/**
 * Crée le commerce en gérant la collision de slug de façon atomique : on tente
 * le slug de base, puis on retente avec un suffixe frais tant que Prisma
 * remonte une violation d'unicité (P2002). Robuste face aux créations
 * concurrentes de deux commerces homonymes.
 */
const createBusinessWithUniqueSlug = async (
  data: {
    userId: string;
    name: string;
    brandColor: string;
    logoUrl: string | null;
  },
): Promise<{ id: string; slug: string }> => {
  const base = formatId(data.name).slice(0, 40) || "commerce";

  for (let attempt = 0; attempt < 5; attempt++) {
    const slug = attempt === 0 ? base : `${base}-${slugSuffix()}`;
    try {
      // eslint-disable-next-line no-await-in-loop -- retry séquentiel sur collision de slug, chaque tentative dépend de l'échec de la précédente
      const business = await prisma.business.create({
        data: { ...data, slug, onboardingStep: 2 },
        select: { id: true, slug: true },
      });
      return business;
    } catch (error) {
      // Slug déjà pris → on retente avec un nouveau suffixe.
      if (isUniqueViolation(error)) continue;
      throw error;
    }
  }

  throw new ApplicationError(
    "Impossible de générer un identifiant unique pour votre commerce. Réessayez.",
  );
};

/** Écran 1 : crée ou met à jour le commerce (nom, logo, couleur). */
export const saveBusinessInfoAction = authAction
  .inputSchema(BusinessInfoSchema)
  .action(async ({ parsedInput, ctx: { user } }) => {
    const existing = await prisma.business.findUnique({
      where: { userId: user.id },
      select: { id: true, onboardingStep: true },
    });

    if (existing) {
      const business = await prisma.business.update({
        where: { id: existing.id },
        data: {
          name: parsedInput.name,
          brandColor: parsedInput.brandColor,
          logoUrl: parsedInput.logoUrl ?? null,
          onboardingStep: Math.max(existing.onboardingStep, 2),
        },
      });
      return { businessId: business.id, slug: business.slug };
    }

    const business = await createBusinessWithUniqueSlug({
      userId: user.id,
      name: parsedInput.name,
      brandColor: parsedInput.brandColor,
      logoUrl: parsedInput.logoUrl ?? null,
    });
    return { businessId: business.id, slug: business.slug };
  });

/** Écran 2 : résout le lien Google Maps collé par le gérant. */
export const resolveGoogleLinkAction = authAction
  .inputSchema(GoogleLinkSchema)
  .action(async ({ parsedInput }) => {
    const result = await resolvePlaceId(parsedInput.mapsUrl);

    if ("error" in result) {
      throw new ApplicationError(
        "Impossible de retrouver votre fiche depuis ce lien. Vérifiez que c'est bien le lien de partage de votre fiche Google Maps, ou utilisez la saisie manuelle.",
      );
    }

    return {
      placeId: result.placeId,
      businessName: result.businessName ?? null,
    };
  });

/** Écran 2 (confirmation) : enregistre le Place ID validé par le gérant. */
export const confirmGooglePlaceAction = authAction
  .inputSchema(ConfirmPlaceSchema)
  .action(async ({ parsedInput, ctx: { user } }) => {
    if (!validateManualPlaceId(parsedInput.placeId)) {
      throw new ApplicationError("Cet identifiant de fiche Google est invalide.");
    }

    const business = await prisma.business.findUnique({
      where: { userId: user.id },
      select: { id: true, onboardingStep: true },
    });

    if (!business) {
      throw new ApplicationError("Complétez d'abord l'étape 1.");
    }

    await prisma.business.update({
      where: { id: business.id },
      data: {
        googlePlaceId: parsedInput.placeId,
        googleMapsUrl: parsedInput.mapsUrl ?? null,
        onboardingStep: Math.max(business.onboardingStep, 3),
      },
    });

    return { done: true };
  });

// L'onboarding ne se termine PLUS via une action gratuite : `onboardingStep`
// passe à 4 uniquement quand le webhook Dodo confirme l'abonnement (essai ou
// actif). Voir app/api/webhooks/dodo/route.ts. Le CTA de l'écran 3 lance le
// checkout (startCheckoutAction) — carte exigée.
