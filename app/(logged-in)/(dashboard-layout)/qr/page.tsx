import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/features/page/layout";
import { getRequiredUser } from "@/lib/auth/auth-user";
import { generateQrSvg, getCollectUrl } from "@/lib/qr";
import { getBusinessByUserId } from "@/query/business/get-business";
import { FileDown, Smartphone, Sticker } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { FullscreenQr } from "./fullscreen-button";

export const metadata: Metadata = {
  title: "Mon QR code",
};

export default function Page() {
  return (
    <Suspense fallback={null}>
      <QrPage />
    </Suspense>
  );
}

async function QrPage() {
  const user = await getRequiredUser();
  const business = await getBusinessByUserId(user.id);

  if (!business) {
    redirect("/onboarding");
  }

  const qrSvg = await generateQrSvg(business.slug);

  return (
    <Layout size="lg">
      <LayoutHeader>
        <LayoutTitle>Mon QR code</LayoutTitle>
      </LayoutHeader>
      <LayoutContent className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Smartphone className="size-4" aria-hidden />
              QR de poche
            </CardTitle>
            <CardDescription>
              En déplacement ? Montrez cet écran à votre client, il scanne
              directement votre téléphone. Astuce : ajoutez cette page à
              l'écran d'accueil de votre téléphone.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-4">
            <FullscreenQr qrSvg={qrSvg} />
            <p className="text-muted-foreground text-center text-xs break-all">
              {getCollectUrl(business.slug)}
            </p>
            <Link
              href={`/r/${business.slug}`}
              target="_blank"
              className="text-muted-foreground text-sm underline underline-offset-4"
            >
              Voir ma page de collecte
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileDown className="size-4" aria-hidden />
              À imprimer
            </CardTitle>
            <CardDescription>
              Posez le chevalet en caisse ou collez l'autocollant sur le
              comptoir — chaque client qui passe devient un avis potentiel.
              L'impression noir et blanc fonctionne aussi.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <a
              href={`/api/pdf/${business.slug}?template=chevalet`}
              className={buttonVariants({ className: "w-full" })}
            >
              <FileDown className="size-4" aria-hidden />
              Chevalet A5 (caisse / table)
            </a>
            <a
              href={`/api/pdf/${business.slug}?template=sticker`}
              className={buttonVariants({
                variant: "outline",
                className: "w-full",
              })}
            >
              <Sticker className="size-4" aria-hidden />
              Autocollant 10 × 10 cm
            </a>
            <p className="text-muted-foreground text-xs">
              Conseil : imprimez chez un imprimeur local en plastifié — le QR
              doit rester net pour scanner à 1 mètre.
            </p>
          </CardContent>
        </Card>
      </LayoutContent>
    </Layout>
  );
}
