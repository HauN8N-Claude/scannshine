"use server";

import { authAction } from "@/lib/actions/safe-actions";
import { ApplicationError } from "@/lib/errors/application-error";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { BusinessInfoSchema } from "../../onboarding/onboarding.schema";

/**
 * Met à jour le branding du commerce. Le slug ne change JAMAIS après
 * création : les QR déjà imprimés en dépendent.
 */
export const updateBusinessInfoAction = authAction
  .inputSchema(BusinessInfoSchema)
  .action(async ({ parsedInput, ctx: { user } }) => {
    const business = await prisma.business.findUnique({
      where: { userId: user.id },
      select: { id: true },
    });

    if (!business) {
      throw new ApplicationError("Commerce introuvable.");
    }

    await prisma.business.update({
      where: { id: business.id },
      data: {
        name: parsedInput.name,
        brandColor: parsedInput.brandColor,
        logoUrl: parsedInput.logoUrl ?? null,
      },
    });

    revalidatePath("/settings");

    return { done: true };
  });
