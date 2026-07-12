"use server";

import { authAction } from "@/lib/actions/safe-actions";
import { ApplicationError } from "@/lib/errors/application-error";
import { formatId } from "@/lib/format/id";
import { resolvePlaceId, validateManualPlaceId } from "@/lib/place-id";
import { prisma } from "@/lib/prisma";
import { customAlphabet } from "nanoid";
import { z } from "zod";
import {
  BusinessInfoSchema,
  ConfirmPlaceSchema,
  GoogleLinkSchema,
} from "./onboarding.schema";

const slugSuffix = customAlphabet("1234567890abcdef", 4);

const buildUniqueSlug = async (name: string): Promise<string> => {
  const base = formatId(name).slice(0, 40) || "commerce";
  const existing = await prisma.business.findUnique({
    where: { slug: base },
    select: { id: true },
  });
  return existing ? `${base}-${slugSuffix()}` : base;
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

    const slug = await buildUniqueSlug(parsedInput.name);
    const business = await prisma.business.create({
      data: {
        userId: user.id,
        name: parsedInput.name,
        slug,
        brandColor: parsedInput.brandColor,
        logoUrl: parsedInput.logoUrl ?? null,
        onboardingStep: 2,
      },
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

/** Écran 3 : termine l'onboarding (le checkout est proposé mais ne bloque pas). */
export const completeOnboardingAction = authAction
  .inputSchema(z.object({}))
  .action(async ({ ctx: { user } }) => {
    const business = await prisma.business.findUnique({
      where: { userId: user.id },
      select: { id: true, googlePlaceId: true },
    });

    if (!business?.googlePlaceId) {
      throw new ApplicationError("Connectez d'abord votre fiche Google.");
    }

    await prisma.business.update({
      where: { id: business.id },
      data: { onboardingStep: 4 },
    });

    return { done: true };
  });
