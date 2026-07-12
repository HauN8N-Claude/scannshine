"use client";

import { Layout, LayoutContent } from "@/features/page/layout";
import { SiteConfig } from "@/site-config";

export function Footer() {
  return (
    <footer className="bg-background border-t pb-8">
      <Layout className="my-14">
        <LayoutContent>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-col gap-3">
              <h3 className="text-lg font-semibold tracking-tight">
                {SiteConfig.title}
              </h3>
              <p className="text-muted-foreground max-w-xs text-sm">
                {SiteConfig.description}
              </p>
            </div>

            <div className="flex flex-col gap-1 md:text-right">
              <p className="text-muted-foreground text-sm">
                {SiteConfig.company.address}
              </p>
              <p className="text-muted-foreground text-sm">
                © 2026 {SiteConfig.company.name}. Tous droits réservés.
              </p>
            </div>
          </div>
        </LayoutContent>
      </Layout>
    </footer>
  );
}
