import { buttonVariants } from "@/components/ui/button";
import { Header } from "@/features/layout/header";
import {
  Layout,
  LayoutContent,
  LayoutDescription,
  LayoutHeader,
  LayoutTitle,
} from "@/features/page/layout";
import { SiteConfig } from "@/site-config";
import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: `Bienvenue | ${SiteConfig.title}`,
  description:
    "Bienvenue sur votre nouveau compte ! Tout est prêt pour commencer à collecter des avis.",
};

/**
 * This page is show when a user login. You can add an onboarding process here.
 */
export default function Page(props: PageProps<"/auth/new-user">) {
  return (
    <Suspense fallback={null}>
      <NewUserPage {...props} />
    </Suspense>
  );
}

async function NewUserPage(props: PageProps<"/auth/new-user">) {
  const searchParams = await props.searchParams;
  const callbackUrl =
    typeof searchParams.callbackUrl === "string"
      ? searchParams.callbackUrl
      : "/dashboard";

  redirect(callbackUrl);

  return (
    <>
      <Header />
      <Layout>
        <LayoutHeader>
          <LayoutTitle>Connexion réussie</LayoutTitle>
          <LayoutDescription>
            Vous pouvez maintenant utiliser l’application
          </LayoutDescription>
        </LayoutHeader>
        <LayoutContent>
          <Link href="/" className={buttonVariants({ size: "lg" })}>
            Commencer
          </Link>
        </LayoutContent>
      </Layout>
    </>
  );
}
