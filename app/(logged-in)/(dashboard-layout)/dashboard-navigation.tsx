import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Layout } from "@/features/page/layout";
import { prisma } from "@/lib/prisma";
import type { PropsWithChildren } from "react";
import { DashboardSidebar } from "./dashboard-sidebar";

export async function DashboardNavigation({
  businessId,
  businessName,
  brandColor,
  children,
}: PropsWithChildren<{
  businessId: string;
  businessName: string;
  brandColor: string;
}>) {
  const unreadFeedbacks = await prisma.feedbackPrivate.count({
    where: { businessId, isRead: false },
  });

  return (
    <SidebarProvider>
      <DashboardSidebar
        businessName={businessName}
        brandColor={brandColor}
        unreadFeedbacks={unreadFeedbacks}
      />
      <SidebarInset className="border-border border">
        <header className="flex h-16 shrink-0 items-center gap-2">
          <Layout size="lg">
            <SidebarTrigger
              variant="outline"
              className="size-8 cursor-pointer"
            />
          </Layout>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
