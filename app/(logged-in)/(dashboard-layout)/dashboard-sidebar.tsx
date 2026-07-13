"use client";

import { Badge } from "@/components/ui/badge";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { SidebarUserButton } from "@/features/sidebar/sidebar-user-button";
import { SiteConfig } from "@/site-config";
import { LifeBuoy } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getDashboardNavigation } from "./dashboard.links";

export function DashboardSidebar({
  businessName,
  brandColor,
  unreadFeedbacks,
}: {
  businessName: string;
  brandColor: string;
  unreadFeedbacks: number;
}) {
  const pathname = usePathname();
  const links = getDashboardNavigation();

  return (
    <Sidebar variant="inset">
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2 py-1.5">
          <div
            className="flex size-8 shrink-0 items-center justify-center rounded-lg text-sm font-bold text-white"
            style={{ backgroundColor: brandColor }}
          >
            {businessName.charAt(0).toUpperCase()}
          </div>
          <span className="truncate text-sm font-semibold">
            {businessName}
          </span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        {links.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.links.map((link) => (
                  <SidebarMenuItem key={link.href}>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === link.href}
                    >
                      <Link href={link.href}>
                        <link.Icon />
                        <span>{link.label}</span>
                        {link.href === "/feedbacks" && unreadFeedbacks > 0 ? (
                          <Badge
                            variant="destructive"
                            className="ml-auto h-5 min-w-5 rounded-full px-1.5"
                          >
                            {unreadFeedbacks}
                          </Badge>
                        ) : null}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter className="flex flex-col gap-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <a
                href={`mailto:${SiteConfig.supportEmail}?subject=${encodeURIComponent(
                  `Support ScanNShine — ${  businessName}`,
                )}`}
              >
                <LifeBuoy />
                <span>Support client</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarUserButton />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
