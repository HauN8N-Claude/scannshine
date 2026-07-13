import { logger } from "../src/lib/logger";
import { prisma } from "../src/lib/prisma";

/**
 * Utilitaire dev : bascule l'étape d'onboarding du business démo.
 * Usage : pnpm tsx --env-file=.env prisma/set-demo-step.ts <etape>
 * En dessous de l'étape 4, la fiche Google est vidée ; à l'étape 4 elle est restaurée.
 */
const step = Number(process.argv[2] ?? 4);

async function main() {
  await prisma.business.update({
    where: { slug: "demo-snack" },
    data:
      step < 4
        ? { onboardingStep: step, googlePlaceId: null, googleMapsUrl: null }
        : {
            onboardingStep: 4,
            googlePlaceId: "ChIJN1t_tDeuEmsRUsoyG83frY4",
            googleMapsUrl: "https://maps.app.goo.gl/demo",
          },
  });
  logger.info(`Business démo -> étape ${step}`);
}

main()
  .catch((error: unknown) => {
    logger.error("set-demo-step a échoué", error);
    process.exit(1);
  })
  .finally(async () => prisma.$disconnect());
