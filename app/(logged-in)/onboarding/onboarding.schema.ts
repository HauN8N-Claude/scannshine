import { z } from "zod";

export const BusinessInfoSchema = z.object({
  name: z
    .string()
    .min(2, "Le nom de votre commerce (2 caractères minimum)")
    .max(80, "Nom trop long"),
  brandColor: z
    .string()
    .regex(/^#[0-9a-fA-F]{6}$/, "Couleur invalide"),
  // URL https uniquement (issue de l'upload Vercel Blob) — évite qu'un logo
  // pointe vers une ressource externe de tracking affichée aux clients.
  logoUrl: z
    .string()
    .url()
    .startsWith("https://", "Le logo doit être une URL sécurisée")
    .nullable()
    .optional(),
});

export type BusinessInfoType = z.infer<typeof BusinessInfoSchema>;

export const GoogleLinkSchema = z.object({
  mapsUrl: z
    .string()
    .min(4, "Collez le lien de votre fiche Google Maps"),
});

export type GoogleLinkType = z.infer<typeof GoogleLinkSchema>;

export const ConfirmPlaceSchema = z.object({
  placeId: z.string().min(16, "Identifiant invalide"),
  mapsUrl: z.string().optional(),
});

export const BRAND_COLOR_PRESETS = [
  "#0ea5e9", // lagon
  "#f59e0b", // soleil
  "#10b981", // fenua
  "#ef4444", // hibiscus
  "#8b5cf6", // orchidée
  "#0f172a", // nuit
] as const;
