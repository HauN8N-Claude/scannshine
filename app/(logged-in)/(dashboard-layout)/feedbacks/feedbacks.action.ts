"use server";

import { authAction } from "@/lib/actions/safe-actions";
import { ApplicationError } from "@/lib/errors/application-error";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const markFeedbackReadAction = authAction
  .inputSchema(z.object({ feedbackId: z.string().min(1) }))
  .action(async ({ parsedInput, ctx: { user } }) => {
    const feedback = await prisma.feedbackPrivate.findUnique({
      where: { id: parsedInput.feedbackId },
      select: { id: true, business: { select: { userId: true } } },
    });

    if (feedback?.business.userId !== user.id) {
      throw new ApplicationError("Retour introuvable.");
    }

    await prisma.feedbackPrivate.update({
      where: { id: feedback.id },
      data: { isRead: true },
    });

    revalidatePath("/feedbacks");

    return { done: true };
  });
