import { nanoid } from "nanoid";
import { auth } from "../src/lib/auth";
import { logger } from "../src/lib/logger";
import { prisma } from "../src/lib/prisma";

const DEMO_EMAIL = "demo@scannshine.com";
const DEMO_PASSWORD = "DemoScannshine2026!";

async function main() {
  const user = await prisma.user.findUnique({ where: { email: DEMO_EMAIL } });
  if (!user) throw new Error(`User ${DEMO_EMAIL} not found — run the seed first`);

  const ctx = await auth.$context;
  const hash = await ctx.password.hash(DEMO_PASSWORD);

  const existing = await prisma.account.findFirst({
    where: { userId: user.id, providerId: "credential" },
  });

  if (existing) {
    await prisma.account.update({
      where: { id: existing.id },
      data: { password: hash },
    });
    logger.info("🔑 Password updated for demo account");
  } else {
    await prisma.account.create({
      data: {
        id: nanoid(11),
        userId: user.id,
        providerId: "credential",
        accountId: user.id,
        password: hash,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
    logger.info("🔑 Credential account created for demo user");
  }
}

main()
  .catch((e) => {
    logger.error("❌", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
