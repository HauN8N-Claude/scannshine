-- CreateEnum
CREATE TYPE "SubStatus" AS ENUM ('ONBOARDING', 'TRIALING', 'ACTIVE', 'PAST_DUE', 'CANCELLED');

-- CreateEnum
CREATE TYPE "ScanType" AS ENUM ('SCAN', 'CLICK_GOOGLE', 'FEEDBACK_PRIVATE');

-- CreateTable
CREATE TABLE "business" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "logoUrl" TEXT,
    "brandColor" TEXT NOT NULL DEFAULT '#0ea5e9',
    "googlePlaceId" TEXT,
    "googleMapsUrl" TEXT,
    "dodoCustomerId" TEXT,
    "dodoSubscriptionId" TEXT,
    "subscriptionStatus" "SubStatus" NOT NULL DEFAULT 'ONBOARDING',
    "trialEndsAt" TIMESTAMP(3),
    "cancelledAt" TIMESTAMP(3),
    "onboardingStep" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "business_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "scan_event" (
    "id" TEXT NOT NULL,
    "businessId" TEXT NOT NULL,
    "type" "ScanType" NOT NULL,
    "visitorHash" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "scan_event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "feedback_private" (
    "id" TEXT NOT NULL,
    "businessId" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "rating" INTEGER,
    "contactName" TEXT,
    "contactPhone" TEXT,
    "contactEmail" TEXT,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "feedback_private_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contact" (
    "id" TEXT NOT NULL,
    "businessId" TEXT NOT NULL,
    "name" TEXT,
    "phone" TEXT,
    "email" TEXT,
    "consentAt" TIMESTAMP(3) NOT NULL,
    "source" TEXT NOT NULL DEFAULT 'collect_page',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "contact_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "business_userId_key" ON "business"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "business_slug_key" ON "business"("slug");

-- CreateIndex
CREATE INDEX "scan_event_businessId_createdAt_idx" ON "scan_event"("businessId", "createdAt");

-- CreateIndex
CREATE INDEX "scan_event_businessId_type_visitorHash_createdAt_idx" ON "scan_event"("businessId", "type", "visitorHash", "createdAt");

-- CreateIndex
CREATE INDEX "feedback_private_businessId_createdAt_idx" ON "feedback_private"("businessId", "createdAt");

-- CreateIndex
CREATE INDEX "contact_businessId_createdAt_idx" ON "contact"("businessId", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "contact_businessId_phone_key" ON "contact"("businessId", "phone");

-- AddForeignKey
ALTER TABLE "business" ADD CONSTRAINT "business_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "scan_event" ADD CONSTRAINT "scan_event_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "business"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "feedback_private" ADD CONSTRAINT "feedback_private_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "business"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contact" ADD CONSTRAINT "contact_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "business"("id") ON DELETE CASCADE ON UPDATE CASCADE;
