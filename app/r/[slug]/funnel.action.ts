"use server";

import { action } from "@/lib/actions/safe-actions";
import { ApplicationError } from "@/lib/errors/application-error";
import { sendEmail } from "@/lib/mail/send-email";
import { prisma } from "@/lib/prisma";
import { checkRateLimit } from "@/lib/rate-limit";
import { logScanEvent } from "@/lib/scan-events";
import { getServerUrl } from "@/lib/server-url";
import { getVisitorHash } from "@/lib/visitor-hash";
import { getBusinessBySlug } from "@/query/business/get-business";
import MarkdownEmail from "@email/markdown.email";
import {
  ContactCaptureSchema,
  FeedbackFormSchema,
  normalizePhone,
} from "./funnel.schema";

/**
 * Neutralise le contenu fourni par un visiteur anonyme avant de l'injecter dans
 * l'email markdown du gérant : échappe les caractères de contrôle markdown pour
 * empêcher l'injection de liens/images (phishing, pixels de tracking).
 */
const escapeMarkdown = (value: string): string =>
  value.replace(/[\\`*_{}[\]()#+\-!<>|]/g, "\\$&");

/** Message multi-ligne rendu sûr dans un blockquote (chaque ligne préfixée). */
const toBlockquote = (value: string): string =>
  escapeMarkdown(value)
    .split(/\r?\n/)
    .map((line) => `> ${line}`)
    .join("\n");

export const submitFeedbackAction = action
  .inputSchema(FeedbackFormSchema)
  .action(async ({ parsedInput }) => {
    const visitorHash = await getVisitorHash();

    if (
      !checkRateLimit(`feedback:${visitorHash}`, {
        max: 5,
        windowMs: 60 * 60 * 1000,
      })
    ) {
      throw new ApplicationError(
        "Vous avez déjà envoyé plusieurs messages. Merci de réessayer un peu plus tard.",
      );
    }

    const business = await getBusinessBySlug(parsedInput.slug);
    if (!business) {
      throw new ApplicationError("Commerce introuvable.");
    }

    // Plafond GLOBAL par commerce, indépendant du visiteur : borne l'envoi
    // d'emails au gérant même si le hash visiteur est contourné (anti-bombing).
    if (
      !checkRateLimit(`feedback-business:${business.id}`, {
        max: 30,
        windowMs: 60 * 60 * 1000,
      })
    ) {
      throw new ApplicationError(
        "Trop de messages reçus pour l'instant. Merci de réessayer plus tard.",
      );
    }

    const feedback = await prisma.feedbackPrivate.create({
      data: {
        businessId: business.id,
        message: parsedInput.message,
        rating: parsedInput.rating ?? null,
        contactName: parsedInput.contactName || null,
        contactPhone: parsedInput.contactPhone
          ? normalizePhone(parsedInput.contactPhone)
          : null,
        contactEmail: parsedInput.contactEmail || null,
      },
    });

    await logScanEvent({
      businessId: business.id,
      type: "FEEDBACK_PRIVATE",
      visitorHash,
    });

    const owner = await prisma.business.findUnique({
      where: { id: business.id },
      select: { user: { select: { email: true } } },
    });

    if (owner?.user.email) {
      const contactLines = [
        parsedInput.contactName &&
          `- Nom : ${escapeMarkdown(parsedInput.contactName)}`,
        parsedInput.contactPhone &&
          `- Téléphone : ${escapeMarkdown(parsedInput.contactPhone)}`,
        parsedInput.contactEmail &&
          `- Email : ${escapeMarkdown(parsedInput.contactEmail)}`,
      ]
        .filter(Boolean)
        .join("\n");

      await sendEmail({
        to: owner.user.email,
        subject: `Un client de ${business.name} a laissé un retour privé`,
        html: MarkdownEmail({
          preview: "Un client a laissé un retour privé — lisez-le avant qu'il ne devienne un avis public.",
          markdown: `
Bonjour,

Un client vient de laisser un **retour privé** sur ${business.name}${
            parsedInput.rating ? ` (ressenti : ${parsedInput.rating}/5)` : ""
          } :

${toBlockquote(parsedInput.message)}

${contactLines ? `**Ses coordonnées :**\n${contactLines}\n` : "Il n'a pas laissé de coordonnées.\n"}

Ce message est privé : il n'apparaît pas sur Google. C'est l'occasion de rattraper ce client avant qu'il ne poste un avis public.

[Voir tous vos retours privés](${getServerUrl()}/feedbacks)
          `,
        }),
      });
    }

    return { feedbackId: feedback.id };
  });

export const saveContactAction = action
  .inputSchema(ContactCaptureSchema)
  .action(async ({ parsedInput }) => {
    const visitorHash = await getVisitorHash();

    if (
      !checkRateLimit(`contact:${visitorHash}`, {
        max: 5,
        windowMs: 60 * 60 * 1000,
      })
    ) {
      throw new ApplicationError("Merci de réessayer un peu plus tard.");
    }

    const business = await getBusinessBySlug(parsedInput.slug);
    if (!business) {
      throw new ApplicationError("Commerce introuvable.");
    }

    const phone = parsedInput.phone ? normalizePhone(parsedInput.phone) : null;
    const email = parsedInput.email || null;
    const name = parsedInput.name || null;

    if (phone) {
      await prisma.contact.upsert({
        where: {
          businessId_phone: { businessId: business.id, phone },
        },
        update: {
          name: name ?? undefined,
          email: email ?? undefined,
        },
        create: {
          businessId: business.id,
          name,
          phone,
          email,
          consentAt: new Date(),
        },
      });
    } else {
      const existing = await prisma.contact.findFirst({
        where: { businessId: business.id, email },
        select: { id: true },
      });
      if (existing) {
        await prisma.contact.update({
          where: { id: existing.id },
          data: { name: name ?? undefined },
        });
      } else {
        await prisma.contact.create({
          data: {
            businessId: business.id,
            name,
            phone: null,
            email,
            consentAt: new Date(),
          },
        });
      }
    }

    return { saved: true };
  });
