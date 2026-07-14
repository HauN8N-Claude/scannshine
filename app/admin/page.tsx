import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/features/page/layout";
import { getRequiredAdmin } from "@/lib/auth/auth-user";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { AdminChartsSection } from "./_components/admin-charts-section";
import { AdminChartsSkeleton } from "./_components/admin-charts-skeleton";
import { AdminOpsSection } from "./_components/admin-ops-section";
import { AdminStatsSection } from "./_components/admin-stats-section";
import { AdminStatsSkeleton } from "./_components/admin-stats-skeleton";

export default function Page() {
  return (
    <Suspense fallback={null}>
      <AdminPage />
    </Suspense>
  );
}

async function AdminPage() {
  await getRequiredAdmin();

  return (
    <Layout size="lg">
      <LayoutHeader>
        <LayoutTitle>Tableau de bord</LayoutTitle>
      </LayoutHeader>
      <LayoutContent>
        <div className="flex flex-col gap-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Suspense fallback={<AdminStatsSkeleton />}>
              <AdminStatsSection />
            </Suspense>
          </div>
          <Suspense fallback={<Skeleton className="h-72 w-full" />}>
            <AdminOpsSection />
          </Suspense>
          <Suspense fallback={<AdminChartsSkeleton />}>
            <AdminChartsSection />
          </Suspense>
        </div>
      </LayoutContent>
    </Layout>
  );
}
