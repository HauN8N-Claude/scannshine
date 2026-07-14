import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MetaStartTrialTracker } from "@/features/analytics/meta-start-trial-tracker";
import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/features/page/layout";
import { getRequiredUser } from "@/lib/auth/auth-user";
import { prisma } from "@/lib/prisma";
import { getBusinessByUserId } from "@/query/business/get-business";
import type { StatsPeriod } from "@/query/business/get-stats";
import { getBusinessStats } from "@/query/business/get-stats";
import {
  ChartLine,
  MessageCircleWarning,
  MousePointerClick,
  QrCode,
  TrendingDown,
  TrendingUp,
  Users,
} from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { ScansChart } from "./scans-chart";

export default function Page(props: PageProps<"/dashboard">) {
  return (
    <Suspense fallback={null}>
      <DashboardPage {...props} />
    </Suspense>
  );
}

const parsePeriod = (raw: string | string[] | undefined): StatsPeriod => {
  const value = Array.isArray(raw) ? raw[0] : raw;
  if (value === "7") return 7;
  if (value === "90") return 90;
  return 30;
};

const TrendBadge = ({
  current,
  previous,
}: {
  current: number;
  previous: number;
}) => {
  if (previous === 0 && current === 0) return null;
  // Pas de base de comparaison (période précédente vide) : un pourcentage
  // (+100 %) serait trompeur quelle que soit l'ampleur. On affiche « nouveau ».
  if (previous === 0) {
    return (
      <span className="flex items-center gap-1 text-xs text-emerald-600">
        <TrendingUp className="size-3" aria-hidden />
        nouveau
      </span>
    );
  }
  const delta = Math.round(((current - previous) / previous) * 100);
  const isUp = delta >= 0;
  const Icon = isUp ? TrendingUp : TrendingDown;
  return (
    <span
      className={`flex items-center gap-1 text-xs ${isUp ? "text-emerald-600" : "text-red-500"}`}
    >
      <Icon className="size-3" aria-hidden />
      {isUp ? "+" : ""}
      {delta}%
    </span>
  );
};

async function DashboardPage(props: PageProps<"/dashboard">) {
  const user = await getRequiredUser();
  const business = await getBusinessByUserId(user.id);

  if (!business) {
    redirect("/onboarding");
  }

  const searchParams = await props.searchParams;
  const period = parsePeriod(searchParams.periode);
  const isCheckoutReturn = searchParams.paiement === "ok";
  const stats = await getBusinessStats(business.id, period);

  const [latestFeedbacks, totalScansAllTime] = await Promise.all([
    prisma.feedbackPrivate.findMany({
      where: { businessId: business.id },
      orderBy: { createdAt: "desc" },
      take: 3,
      select: {
        id: true,
        message: true,
        rating: true,
        createdAt: true,
        isRead: true,
      },
    }),
    prisma.scanEvent.count({
      where: { businessId: business.id, type: "SCAN" },
    }),
  ]);

  const kpis = [
    {
      title: "Scans",
      value: stats.scans,
      previous: stats.previous.scans,
      description: "Clients qui ont scanné votre QR",
      icon: QrCode,
    },
    {
      title: "Clics vers Google",
      value: stats.clicks,
      previous: stats.previous.clicks,
      description: "Clients envoyés vers votre fiche Google",
      icon: MousePointerClick,
    },
    {
      title: "Retours privés",
      value: stats.feedbacks,
      previous: stats.previous.feedbacks,
      description: "Mécontentements captés en privé",
      icon: MessageCircleWarning,
    },
    {
      title: "Contacts captés",
      value: stats.contacts,
      previous: stats.previous.contacts,
      description: "Clients inscrits à vos bons plans",
      icon: Users,
    },
  ];

  return (
    <Layout size="lg">
      {isCheckoutReturn ? <MetaStartTrialTracker /> : null}
      <LayoutHeader>
        <LayoutTitle>Tableau de bord</LayoutTitle>
      </LayoutHeader>
      <LayoutContent className="flex flex-col gap-6">
        <Tabs value={String(period)}>
          <TabsList>
            <TabsTrigger value="7" asChild>
              <Link href="/dashboard?periode=7">7 jours</Link>
            </TabsTrigger>
            <TabsTrigger value="30" asChild>
              <Link href="/dashboard?periode=30">30 jours</Link>
            </TabsTrigger>
            <TabsTrigger value="90" asChild>
              <Link href="/dashboard?periode=90">90 jours</Link>
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {totalScansAllTime === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center gap-4 py-12 text-center">
              <QrCode className="text-muted-foreground size-10" aria-hidden />
              <div className="flex flex-col gap-1">
                <p className="font-semibold">
                  Votre QR attend son premier scan&nbsp;!
                </p>
                <p className="text-muted-foreground text-sm">
                  Imprimez votre affiche et posez-la en caisse — chaque client
                  qui passe devient un avis Google potentiel.
                </p>
              </div>
              <Link href="/qr" className={buttonVariants()}>
                Télécharger mon affiche
              </Link>
            </CardContent>
          </Card>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {kpis.map((kpi) => (
                <Card key={kpi.title}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-muted-foreground text-xs font-medium">
                      {kpi.title}
                    </CardTitle>
                    <kpi.icon
                      className="text-muted-foreground size-4"
                      aria-hidden
                    />
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold">{kpi.value}</span>
                      <TrendBadge
                        current={kpi.value}
                        previous={kpi.previous}
                      />
                    </div>
                    <p className="text-muted-foreground text-xs">
                      {kpi.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <ScansChart daily={stats.daily} />
          </>
        )}

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-base">
              <ChartLine className="size-4" aria-hidden />
              Derniers retours privés
            </CardTitle>
            <Link
              href="/feedbacks"
              className="text-muted-foreground text-sm underline underline-offset-4"
            >
              Tout voir
            </Link>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            {latestFeedbacks.length === 0 ? (
              <p className="text-muted-foreground text-sm">
                Aucun retour négatif — c'est bon signe&nbsp;!
              </p>
            ) : (
              latestFeedbacks.map((feedback) => (
                <div
                  key={feedback.id}
                  className="flex flex-col gap-1 rounded-lg border p-3"
                >
                  <div className="text-muted-foreground flex items-center gap-2 text-xs">
                    {feedback.rating ? <span>{feedback.rating}/5</span> : null}
                    <span>
                      {feedback.createdAt.toLocaleDateString("fr-FR")}
                    </span>
                    {!feedback.isRead ? (
                      <span className="font-medium text-red-500">
                        Non lu
                      </span>
                    ) : null}
                  </div>
                  <p className="line-clamp-2 text-sm">{feedback.message}</p>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </LayoutContent>
    </Layout>
  );
}
