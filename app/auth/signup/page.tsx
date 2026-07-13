import { Loader } from "@/components/nowts/loader";
import { Typography } from "@/components/nowts/typography";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getUser } from "@/lib/auth/auth-user";
import { SiteConfig } from "@/site-config";
import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { SignUpCredentialsForm } from "./sign-up-credentials-form";

export const metadata: Metadata = {
  title: `Créer un compte | ${SiteConfig.title}`,
  description:
    "Créez votre compte pour commencer à collecter des avis Google pour votre établissement.",
};

export default function Page() {
  return (
    <Suspense fallback={null}>
      <AuthSignInPage />
    </Suspense>
  );
}

async function AuthSignInPage() {
  const user = await getUser();

  if (user) {
    redirect("/dashboard");
  }

  return (
    <Card className="mx-auto w-full max-w-md lg:max-w-lg lg:p-6">
      <CardHeader className="flex flex-col items-center justify-center gap-1">
        <Avatar className="mb-4 rounded-sm">
          <AvatarImage src={SiteConfig.appIcon} alt="app logo" />
          <AvatarFallback>
            {SiteConfig.title.substring(0, 1).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <CardTitle>Créer un compte sur {SiteConfig.title}</CardTitle>
        <CardDescription>
          Quelques informations suffisent pour commencer.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Suspense fallback={<Loader />}>
          <SignUpCredentialsForm />
        </Suspense>

        <Typography variant="muted" className="mt-4 text-xs">
          Vous avez déjà un compte ?{" "}
          <Typography variant="link" as={Link} href="/auth/signin">
            Se connecter
          </Typography>
        </Typography>
      </CardContent>
    </Card>
  );
}
