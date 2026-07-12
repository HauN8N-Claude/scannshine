"use server";

import { authAction } from "@/lib/actions/safe-actions";
import { ApplicationError } from "@/lib/errors/application-error";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";

/** Suppression d'un contact (droit à l'effacement RGPD). */
export const deleteContactAction = authAction
  .inputSchema(z.object({ contactId: z.string().min(1) }))
  .action(async ({ parsedInput, ctx: { user } }) => {
    const contact = await prisma.contact.findUnique({
      where: { id: parsedInput.contactId },
      select: { id: true, business: { select: { userId: true } } },
    });

    if (contact?.business.userId !== user.id) {
      throw new ApplicationError("Contact introuvable.");
    }

    await prisma.contact.delete({ where: { id: contact.id } });

    revalidatePath("/crm");

    return { done: true };
  });
