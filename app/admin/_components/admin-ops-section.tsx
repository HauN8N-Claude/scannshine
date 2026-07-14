"use cache";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { dayjs } from "@/lib/dayjs";
import { AlarmClock, TrendingDown, UserPlus, ZapOff } from "lucide-react";
import { cacheLife } from "next/dist/server/use-cache/cache-life";
import type { OpsBusiness } from "./admin-ops-data";
import { getOpsSnapshot } from "./admin-ops-data";

const MAX_ROWS = 6;

const OpsMetric = ({
  label,
  value,
  hint,
  icon: Icon,
}: {
  label: string;
  value: string;
  hint: string;
  icon: typeof AlarmClock;
}) => (
  <div className="bg-muted/40 flex flex-col gap-1 rounded-lg border p-3">
    <div className="text-muted-foreground flex items-center gap-2 text-xs">
      <Icon className="size-4" aria-hidden />
      {label}
    </div>
    <span className="text-2xl font-bold tabular-nums">{value}</span>
    <span className="text-muted-foreground text-xs">{hint}</span>
  </div>
);

const BusinessRow = ({
  business,
  right,
}: {
  business: OpsBusiness;
  right: string;
}) => (
  <div className="flex items-center justify-between gap-3 border-b py-2 last:border-b-0">
    <div className="flex min-w-0 flex-col">
      <a
        href={`/r/${business.slug}`}
        target="_blank"
        rel="noreferrer"
        className="truncate text-sm font-medium hover:underline"
      >
        {business.name}
      </a>
      <a
        href={`mailto:${business.ownerEmail}`}
        className="text-muted-foreground truncate text-xs hover:underline"
      >
        {business.ownerEmail}
      </a>
    </div>
    <span className="text-muted-foreground shrink-0 text-xs tabular-nums">
      {right}
    </span>
  </div>
);

const OpsList = ({
  title,
  icon: Icon,
  businesses,
  emptyLabel,
  renderRight,
}: {
  title: string;
  icon: typeof AlarmClock;
  businesses: OpsBusiness[];
  emptyLabel: string;
  renderRight: (business: OpsBusiness) => string;
}) => (
  <div className="flex flex-col gap-2">
    <div className="flex items-center gap-2 text-sm font-medium">
      <Icon className="text-muted-foreground size-4" aria-hidden />
      {title}
      <span className="text-muted-foreground tabular-nums">
        ({businesses.length})
      </span>
    </div>
    {businesses.length === 0 ? (
      <p className="text-muted-foreground text-sm">{emptyLabel}</p>
    ) : (
      <div className="flex flex-col">
        {businesses.slice(0, MAX_ROWS).map((business) => (
          <BusinessRow
            key={business.id}
            business={business}
            right={renderRight(business)}
          />
        ))}
        {businesses.length > MAX_ROWS ? (
          <span className="text-muted-foreground pt-2 text-xs">
            + {businesses.length - MAX_ROWS} autre
            {businesses.length - MAX_ROWS > 1 ? "s" : ""}
          </span>
        ) : null}
      </div>
    )}
  </div>
);

export async function AdminOpsSection() {
  cacheLife("hours");

  const snapshot = await getOpsSnapshot();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">À suivre</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        <div className="grid gap-3 sm:grid-cols-3">
          <OpsMetric
            icon={TrendingDown}
            label="Churn du mois"
            value={
              snapshot.churnRatePct === null
                ? "—"
                : `${snapshot.churnRatePct} %`
            }
            hint={`${snapshot.cancelledThisMonth} annulation${snapshot.cancelledThisMonth > 1 ? "s" : ""} ce mois`}
          />
          <OpsMetric
            icon={UserPlus}
            label="Inscriptions non finalisées"
            value={snapshot.onboardingCount.toLocaleString("fr-FR")}
            hint="Bloquées avant paiement"
          />
          <OpsMetric
            icon={ZapOff}
            label="Commerces inactifs"
            value={snapshot.inactiveBusinesses.length.toLocaleString("fr-FR")}
            hint="0 scan sur 30 j"
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <OpsList
            title="Essais qui expirent bientôt"
            icon={AlarmClock}
            businesses={snapshot.expiringTrials}
            emptyLabel="Aucun essai n'expire dans les 3 prochains jours."
            renderRight={(business) =>
              business.trialEndsAt
                ? dayjs(business.trialEndsAt).format("DD/MM")
                : "—"
            }
          />
          <OpsList
            title="Commerces inactifs (abonnés / essais)"
            icon={ZapOff}
            businesses={snapshot.inactiveBusinesses}
            emptyLabel="Tous les abonnés et essais ont scanné sur 30 j."
            renderRight={(business) =>
              business.status === "ACTIVE" ? "Abonné" : "En essai"
            }
          />
        </div>
      </CardContent>
    </Card>
  );
}
