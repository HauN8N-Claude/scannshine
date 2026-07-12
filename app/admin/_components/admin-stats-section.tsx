"use cache";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";
import { DollarSign, QrCode, Store, Users } from "lucide-react";
import { cacheLife } from "next/dist/server/use-cache/cache-life";

// Prix mensuel ScanNShine en EUR (3 990 XPF). Source de vérité fine : Dodo Payments.
const MONTHLY_PRICE_EUR = 33.5;

export async function AdminStatsSection() {
  cacheLife("hours");

  const [totalBusinesses, totalScans, payingBusinesses] = await Promise.all([
    prisma.business.count(),
    prisma.scanEvent.count({ where: { type: "SCAN" } }),
    prisma.business.count({
      where: { subscriptionStatus: { in: ["ACTIVE", "TRIALING"] } },
    }),
  ]);

  const mrrFormatted = new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(payingBusinesses * MONTHLY_PRICE_EUR);

  const stats = [
    {
      title: "Commerces",
      value: totalBusinesses.toLocaleString("fr-FR"),
      description: "Commerces inscrits",
      icon: Store,
    },
    {
      title: "Scans",
      value: totalScans.toLocaleString("fr-FR"),
      description: "QR scannés (total)",
      icon: Users,
    },
    {
      title: "Abonnés actifs",
      value: payingBusinesses.toLocaleString("fr-FR"),
      description: "Essais + abonnements actifs",
      icon: QrCode,
    },
    {
      title: "MRR estimé",
      value: mrrFormatted,
      description: "Abonnés actifs × 33,50 €",
      icon: DollarSign,
    },
  ];

  return (
    <>
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-muted-foreground text-xs font-medium">
                {stat.title}
              </CardTitle>
              <Icon className="text-muted-foreground size-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-muted-foreground text-xs">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </>
  );
}
