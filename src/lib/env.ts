import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

/**
 * This is the schema for the environment variables.
 *
 * Please import **this** file and use the `env` variable
 */
export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    GITHUB_CLIENT_ID: z.string().optional(),
    GITHUB_CLIENT_SECRET: z.string().optional(),
    GOOGLE_CLIENT_ID: z.string().optional(),
    GOOGLE_CLIENT_SECRET: z.string().optional(),
    RESEND_API_KEY: z.string().optional(),
    RESEND_AUDIENCE_ID: z.string().optional(),
    EMAIL_FROM: z.string().min(1),
    NODE_ENV: z.enum(["development", "production", "test"]),
    DODO_PAYMENTS_API_KEY: z.string().optional(),
    DODO_PAYMENTS_WEBHOOK_KEY: z.string().optional(),
    DODO_PAYMENTS_ENVIRONMENT: z.enum(["test_mode", "live_mode"]).optional(),
    DODO_PRODUCT_ID: z.string().optional(),
    // Secret partagé avec Vercel Cron : Vercel l'envoie en `Authorization:
    // Bearer <CRON_SECRET>` sur les appels planifiés. Tant qu'il est absent, la
    // route de cron renvoie 503 (fail-closed).
    CRON_SECRET: z.string().optional(),
    CI: z.coerce.boolean().optional(),
  },
  /**
   * If you add `client` environment variables, you need to add them to
   * `experimental__runtimeEnv` as well.
   */
  client: {
    NEXT_PUBLIC_EMAIL_CONTACT: z.string().min(1),
    // Vide ("") tant que le pixel n'est pas créé — le composant ne rend rien dans ce cas
    NEXT_PUBLIC_META_PIXEL_ID: z.string().optional(),
  },
  experimental__runtimeEnv: {
    NEXT_PUBLIC_EMAIL_CONTACT: process.env.NEXT_PUBLIC_EMAIL_CONTACT,
    NEXT_PUBLIC_META_PIXEL_ID: process.env.NEXT_PUBLIC_META_PIXEL_ID,
  },
});
