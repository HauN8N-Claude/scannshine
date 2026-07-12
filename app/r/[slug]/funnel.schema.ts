import { z } from "zod";

export const FeedbackFormSchema = z.object({
  slug: z.string().min(1),
  message: z
    .string()
    .min(10, "Dites-nous en un peu plus (10 caractères minimum)")
    .max(2000, "Message trop long (2000 caractères maximum)"),
  rating: z.number().int().min(1).max(5).nullable().optional(),
  contactName: z.string().max(100).optional().or(z.literal("")),
  contactPhone: z
    .string()
    .regex(
      /^(\+689\s?)?(87|88|89|40)\s?\d{2}\s?\d{2}\s?\d{2}$/,
      "Numéro polynésien invalide (ex : 87 12 34 56)",
    )
    .optional()
    .or(z.literal("")),
  contactEmail: z
    .string()
    .email("Adresse email invalide")
    .optional()
    .or(z.literal("")),
});

export type FeedbackFormType = z.infer<typeof FeedbackFormSchema>;

export const ContactCaptureSchema = z
  .object({
    slug: z.string().min(1),
    name: z.string().max(100).optional().or(z.literal("")),
    phone: z
      .string()
      .regex(
        /^(\+689\s?)?(87|88|89|40)\s?\d{2}\s?\d{2}\s?\d{2}$/,
        "Numéro polynésien invalide (ex : 87 12 34 56)",
      )
      .optional()
      .or(z.literal("")),
    email: z
      .string()
      .email("Adresse email invalide")
      .optional()
      .or(z.literal("")),
    consent: z.literal(true, {
      error: "Votre accord est nécessaire pour recevoir les bons plans",
    }),
  })
  .refine((data) => Boolean(data.phone) || Boolean(data.email), {
    message: "Laissez au moins un numéro ou un email",
    path: ["phone"],
  });

export type ContactCaptureType = z.infer<typeof ContactCaptureSchema>;

/** Normalise un mobile polynésien vers le format +689XXXXXXXX */
export const normalizePhone = (phone: string): string => {
  const digits = phone.replaceAll(/[^\d]/g, "");
  const local = digits.startsWith("689") ? digits.slice(3) : digits;
  return `+689${local}`;
};
