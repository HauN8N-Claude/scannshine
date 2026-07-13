import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import {
  admin,
  emailOTP,
  lastLoginMethod,
  organization,
} from "better-auth/plugins";
import { ac, roles } from "./auth/auth-permissions";

import { sendEmail } from "@/lib/mail/send-email";
import { SiteConfig } from "@/site-config";
import MarkdownEmail from "@email/markdown.email";
import { setupResendCustomer } from "./auth/auth-config-setup";
import { env } from "./env";
import { logger } from "./logger";
import { prisma } from "./prisma";
import { getServerUrl } from "./server-url";
type SocialProvidersType = Parameters<typeof betterAuth>[0]["socialProviders"];

export const SocialProviders: SocialProvidersType = {};

if (env.GITHUB_CLIENT_ID && env.GITHUB_CLIENT_SECRET) {
  SocialProviders.github = {
    clientId: env.GITHUB_CLIENT_ID,
    clientSecret: env.GITHUB_CLIENT_SECRET,
  };
}

if (env.GOOGLE_CLIENT_ID && env.GOOGLE_CLIENT_SECRET) {
  SocialProviders.google = {
    clientId: env.GOOGLE_CLIENT_ID,
    clientSecret: env.GOOGLE_CLIENT_SECRET,
  };
}

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  baseURL: getServerUrl(),
  session: {
    expiresIn: 60 * 60 * 24 * 20, // 20 days
    updateAge: 60 * 60 * 24 * 7, // Refresh session every 7 days
  },
  rateLimit: {
    // Disable rate limiting in CI
    enabled: env.CI ? false : undefined,
  },
  databaseHooks: {
    user: {
      create: {
        after: async (user, _req) => {
          // ScanNShine est mono-établissement (1 user = 1 Business). On ne crée
          // plus d'organisation fantôme à l'inscription (les orgs NOW.TS sont
          // dormantes). Le commerce est créé pendant l'onboarding.
          await setupResendCustomer(user);
        },
      },
    },
  },
  advanced: {
    cookiePrefix: SiteConfig.appId,
  },
  emailAndPassword: {
    enabled: true,
    async sendResetPassword({ user, url }) {
      await sendEmail({
        to: user.email,
        subject: "Réinitialisez votre mot de passe",
        html: MarkdownEmail({
          preview: `Réinitialisez votre mot de passe pour ${SiteConfig.title}`,
          markdown: `
          Bonjour,

          Vous avez demandé la réinitialisation de votre mot de passe.

          [Cliquez ici pour réinitialiser votre mot de passe](${url})
          `,
        }),
      });
    },
  },
  user: {
    changeEmail: {
      enabled: true,
      sendChangeEmailConfirmation: async ({
        newEmail,
        url,
      }: {
        newEmail: string;
        url: string;
      }) => {
        await sendEmail({
          to: newEmail,
          subject: "Changement d’adresse e-mail",
          html: MarkdownEmail({
            preview: `Changez votre adresse e-mail pour ${SiteConfig.title}`,
            markdown: `
            Bonjour,

            Vous avez demandé à changer votre adresse e-mail.

            [Cliquez ici pour vérifier votre nouvelle adresse e-mail](${url})
            `,
          }),
        });
      },
    },
    deleteUser: {
      enabled: true,
      sendDeleteAccountVerification: async ({ user, token }) => {
        const url = `${getServerUrl()}/auth/confirm-delete?token=${token}&callbackUrl=/auth/goodbye`;
        await sendEmail({
          to: user.email,
          subject: "Suppression de votre compte",
          html: MarkdownEmail({
            preview: `Supprimez votre compte ${SiteConfig.title}`,
            markdown: `
            Bonjour,

            Vous avez demandé la suppression de votre compte.

            [Cliquez ici pour confirmer la suppression du compte](${url})
            `,
          }),
        });
      },
    },
  },
  emailVerification: {
    sendVerificationEmail: async ({ user, url }) => {
      await sendEmail({
        to: user.email,
        subject: "Vérifiez votre adresse e-mail",
        html: MarkdownEmail({
          preview: `Vérifiez votre e-mail pour ${SiteConfig.title}`,
          markdown: `
          Bonjour,

          Bienvenue sur ${SiteConfig.title} ! Veuillez vérifier votre adresse e-mail.

          [Cliquez ici pour vérifier votre e-mail](${url})
          `,
        }),
      });
    },
  },
  socialProviders: SocialProviders,
  plugins: [
    organization({
      ac: ac,
      roles: roles,
      organizationLimit: 5,
      membershipLimit: 10,
      // ScanNShine mono-établissement : pas d'org auto à l'inscription.
      autoCreateOrganizationOnSignUp: false,

      async sendInvitationEmail({ id, email }) {
        const inviteLink = `${getServerUrl()}/orgs/accept-invitation/${id}`;
        await sendEmail({
          to: email,
          subject: "Vous êtes invité à rejoindre une organisation",
          html: MarkdownEmail({
            preview: `Rejoignez une organisation sur ${SiteConfig.title}`,
            markdown: `
            Bonjour,

            Vous avez été invité à rejoindre une organisation sur ${SiteConfig.title}.

            [Cliquez ici pour accepter l’invitation](${inviteLink})
            `,
          }),
        });
      },
    }),
    emailOTP({
      sendVerificationOTP: async ({ email, otp }) => {
        logger.debug("Sending OTP", { email, otp });
        await sendEmail({
          to: email,
          subject: `Votre code de connexion à ${SiteConfig.title}`,
          html: MarkdownEmail({
            preview: `Votre code de connexion à ${SiteConfig.title}`,
            markdown: `
            Bonjour,

            Votre code de connexion : **${otp}**

            [Ou cliquez ici pour vous connecter automatiquement](${getServerUrl()}/auth/signin/otp?email=${email}&otp=${otp})
            `,
          }),
        });
      },
    }),
    admin({}),
    lastLoginMethod({}),
    // Warning: always last plugin
    nextCookies(),
  ],
});
