"use cache";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SCANNSHINE_PLAN } from "@/lib/dodo";
import { prisma } from "@/lib/prisma";
import { Clock, CreditCard, DollarSign, Store } from "lucide-react";
import { cacheLife } from "next/dist/server/use-cache/cache-life";

export async function AdminStatsSection() {
  cacheLife("hours");

  const [totalBusinesses, activeBusinesses, trialingBusinesses] =
    await Promise.all([
      prisma.business.count(),
      // MRR = abonnés PAYANTS uniquement (ACTIVE). Les essais (TRIALING) ne
      // paient pas encore → comptés à part, jamais dans le revenu.
      prisma.business.count({ where: { subscriptionStatus: "ACTIVE" } }),
      prisma.business.count({ where: { subscriptionStatus: "TRIALING" } }),
    ]);

  const mrrFormatted = new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(activeBusinesses * SCANNSHINE_PLAN.priceEur);

  const stats = [
    {
      title: "Commerces",
      value: totalBusinesses.toLocaleString("fr-FR"),
      description: "Commerces inscrits",
      icon: Store,
    },
    {
      title: "Abonnés payants",
      value: activeBusinesses.toLocaleString("fr-FR"),
      description: "Abonnements actifs",
      icon: CreditCard,
    },
    {
      title: "Essais en cours",
      value: trialingBusinesses.toLocaleString("fr-FR"),
      description: "En période d'essai (7 j)",
      icon: Clock,
    },
    {
      title: "MRR",
      value: mrrFormatted,
      description: `Abonnés payants × ${SCANNSHINE_PLAN.priceEur.toLocaleString("fr-FR", { style: "currency", currency: "EUR" })}`,
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
