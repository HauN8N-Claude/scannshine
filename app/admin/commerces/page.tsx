import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/features/page/layout";
import type { SubStatus } from "@/generated/prisma";
import { getRequiredAdmin } from "@/lib/auth/auth-user";
import { prisma } from "@/lib/prisma";
import {
  createSearchParamsCache,
  parseAsInteger,
  parseAsString,
} from "nuqs/server";
import { CommercesList } from "./_components/commerces-list";
import type { CommerceRow } from "./_components/commerces-list";

const searchParamsCache = createSearchParamsCache({
  q: parseAsString.withDefault(""),
  statut: parseAsString.withDefault(""),
  page: parseAsInteger.withDefault(1),
});

const PAGE_SIZE = 20;

const VALID_STATUSES: SubStatus[] = [
  "ONBOARDING",
  "TRIALING",
  "ACTIVE",
  "PAST_DUE",
  "CANCELLED",
];

// Chargement hors composant : fonctions impures (dates) interdites en render.
async function getCommercesData(q: string, statut: string, page: number) {
  const statusFilter = VALID_STATUSES.includes(statut as SubStatus)
    ? { subscriptionStatus: statut as SubStatus }
    : {};

  const searchFilter = q
    ? {
        OR: [
          { name: { contains: q, mode: "insensitive" as const } },
          { slug: { contains: q, mode: "insensitive" as const } },
          {
            user: {
              email: { contains: q, mode: "insensitive" as const },
            },
          },
          {
            user: {
              name: { contains: q, mode: "insensitive" as const },
            },
          },
        ],
      }
    : {};

  const where = { ...statusFilter, ...searchFilter };

  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

  const [businesses, total, counts] = await Promise.all([
    prisma.business.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
      select: {
        id: true,
        name: true,
        slug: true,
        brandColor: true,
        subscriptionStatus: true,
        trialEndsAt: true,
        cancelledAt: true,
        createdAt: true,
        user: {
          select: { name: true, email: true },
        },
      },
    }),
    prisma.business.count({ where }),
    prisma.business.groupBy({
      by: ["subscriptionStatus"],
      _count: { _all: true },
    }),
  ]);

  // Scans (30 j) uniquement pour les commerces de la page affichée.
  // Volontairement PAS de métrique « avis générés » ici : elle appartient
  // au dashboard du client, pas à la vue owner.
  const scans = await prisma.scanEvent.groupBy({
    by: ["businessId"],
    where: {
      type: "SCAN",
      businessId: { in: businesses.map((business) => business.id) },
      createdAt: { gte: thirtyDaysAgo },
    },
    _count: { _all: true },
  });
  const scansByBusiness = new Map(
    scans.map((group) => [group.businessId, group._count._all]),
  );

  const rows: CommerceRow[] = businesses.map((business) => ({
    id: business.id,
    name: business.name,
    slug: business.slug,
    brandColor: business.brandColor,
    subscriptionStatus: business.subscriptionStatus,
    trialEndsAt: business.trialEndsAt,
    cancelledAt: business.cancelledAt,
    createdAt: business.createdAt,
    ownerName: business.user.name,
    ownerEmail: business.user.email,
    scans30d: scansByBusiness.get(business.id) ?? 0,
  }));

  const countByStatus = new Map(
    counts.map((group) => [group.subscriptionStatus, group._count._all]),
  );
  const summary = {
    total: counts.reduce((sum, group) => sum + group._count._all, 0),
    active: countByStatus.get("ACTIVE") ?? 0,
    trialing: countByStatus.get("TRIALING") ?? 0,
    pastDue: countByStatus.get("PAST_DUE") ?? 0,
    cancelled: countByStatus.get("CANCELLED") ?? 0,
    onboarding: countByStatus.get("ONBOARDING") ?? 0,
  };

  return { rows, summary, total };
}

export default async function Page(props: PageProps<"/admin/commerces">) {
  await getRequiredAdmin();

  const { q, statut, page } = await searchParamsCache.parse(
    props.searchParams,
  );
  const { rows, summary, total } = await getCommercesData(q, statut, page);

  return (
    <Layout size="lg">
      <LayoutHeader>
        <LayoutTitle>Commerces</LayoutTitle>
      </LayoutHeader>

      <LayoutContent>
        <CommercesList
          rows={rows}
          summary={summary}
          total={total}
          limit={PAGE_SIZE}
          currentPage={page}
        />
      </LayoutContent>
    </Layout>
  );
}
