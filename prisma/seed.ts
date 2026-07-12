import { logger } from "@/lib/logger";
import { faker } from "@faker-js/faker";
import { nanoid } from "nanoid";
import { prisma } from "../src/lib/prisma";

// Set seed for reproducibility
faker.seed(123);

const DEMO_EMAIL = "demo@scannshine.com";
const DEMO_SLUG = "demo-snack";

async function main() {
  logger.info("🌱 Seeding database...");

  const demoUser = await prisma.user.upsert({
    where: { email: DEMO_EMAIL },
    update: {},
    create: {
      id: nanoid(11),
      name: "Maeva Demo",
      email: DEMO_EMAIL,
      emailVerified: true,
      createdAt: faker.date.past(),
      updatedAt: new Date(),
    },
  });
  logger.info(`👤 Demo user: ${demoUser.email}`);

  const business = await prisma.business.upsert({
    where: { slug: DEMO_SLUG },
    update: {},
    create: {
      userId: demoUser.id,
      name: "Snack Chez Maeva",
      slug: DEMO_SLUG,
      brandColor: "#f59e0b",
      googlePlaceId: "ChIJN1t_tDeuEmsRUsoyG83frY4",
      googleMapsUrl: "https://maps.app.goo.gl/demo",
      subscriptionStatus: "TRIALING",
      trialEndsAt: faker.date.soon({ days: 7 }),
      onboardingStep: 4,
    },
  });
  logger.info(`🏪 Demo business: ${business.name} (/r/${business.slug})`);

  await prisma.scanEvent.deleteMany({ where: { businessId: business.id } });
  await prisma.feedbackPrivate.deleteMany({
    where: { businessId: business.id },
  });
  await prisma.contact.deleteMany({ where: { businessId: business.id } });

  // ~200 scans répartis sur 30 jours, avec entonnoir réaliste :
  // scan → ~55% cliquent vers Google, ~8% laissent un feedback privé
  const scanEvents: {
    businessId: string;
    type: "SCAN" | "CLICK_GOOGLE" | "FEEDBACK_PRIVATE";
    visitorHash: string;
    createdAt: Date;
  }[] = [];

  for (let i = 0; i < 200; i++) {
    const createdAt = faker.date.recent({ days: 30 });
    const visitorHash = faker.string.hexadecimal({ length: 32, prefix: "" });
    scanEvents.push({
      businessId: business.id,
      type: "SCAN",
      visitorHash,
      createdAt,
    });
    if (faker.datatype.boolean(0.55)) {
      scanEvents.push({
        businessId: business.id,
        type: "CLICK_GOOGLE",
        visitorHash,
        createdAt: new Date(createdAt.getTime() + 30_000),
      });
    } else if (faker.datatype.boolean(0.18)) {
      scanEvents.push({
        businessId: business.id,
        type: "FEEDBACK_PRIVATE",
        visitorHash,
        createdAt: new Date(createdAt.getTime() + 60_000),
      });
    }
  }

  await prisma.scanEvent.createMany({ data: scanEvents });
  logger.info(`📊 Created ${scanEvents.length} scan events`);

  await prisma.feedbackPrivate.createMany({
    data: [
      {
        businessId: business.id,
        message:
          "L'attente était vraiment longue ce midi, plus de 40 minutes pour deux poissons crus. Dommage parce que c'était bon.",
        rating: 2,
        contactName: "Teiva",
        contactPhone: "+68987123456",
        createdAt: faker.date.recent({ days: 5 }),
      },
      {
        businessId: business.id,
        message: "Le parking est compliqué, aucune place à midi.",
        rating: 3,
        createdAt: faker.date.recent({ days: 12 }),
      },
      {
        businessId: business.id,
        message:
          "La climatisation ne marchait pas et il faisait très chaud en salle.",
        rating: 2,
        contactEmail: "client@example.pf",
        isRead: true,
        createdAt: faker.date.recent({ days: 20 }),
      },
    ],
  });
  logger.info("💬 Created 3 private feedbacks");

  const contacts = Array.from({ length: 10 }, () => ({
    businessId: business.id,
    name: faker.person.firstName(),
    phone: `+689${faker.helpers.arrayElement(["87", "88", "89"])}${faker.string.numeric(6)}`,
    email: faker.datatype.boolean(0.4) ? faker.internet.email() : null,
    consentAt: faker.date.recent({ days: 30 }),
  }));
  await prisma.contact.createMany({ data: contacts, skipDuplicates: true });
  logger.info("📇 Created 10 contacts");

  logger.info("✅ Seeding completed!");
}

main()
  .catch((e) => {
    logger.error("❌ Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
