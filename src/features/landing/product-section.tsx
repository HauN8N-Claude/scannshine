import { Typography } from "@/components/nowts/typography";
import { Nfc, QrCode, Star, Sticker } from "lucide-react";
import Image from "next/image";
import { SectionLayout } from "./section-layout";

const PRODUCT_STEPS = [
  {
    icon: Sticker,
    title: "Collez la plaque là où ça compte",
    description:
      "Sur le comptoir, à la caisse, sur la table : la plaque adhésive se pose en deux minutes et reste en place. Pas de câble, pas de batterie, rien à recharger.",
  },
  {
    icon: Nfc,
    title: "Le client approche son téléphone…",
    description:
      "La puce NFC intégrée ouvre directement votre page d'avis Google, comme un paiement sans contact. Aucune application à installer.",
  },
  {
    icon: QrCode,
    title: "…ou scanne le QR code",
    description:
      "Les deux chemins sont sur la même plaque : NFC pour les téléphones récents, QR code pour tous les autres. Personne n'est laissé de côté.",
  },
  {
    icon: Star,
    title: "L'avis arrive sur votre fiche Google",
    description:
      "Le client note et écrit son avis en 30 secondes, à chaud, pendant que l'envie est là. Votre fiche s'enrichit d'un avis authentique.",
  },
] as const;

const PRODUCT_BADGES = [
  "Compatible iPhone & Android",
  "Sans application",
  "Sans batterie",
  "Lien modifiable à distance",
] as const;

export const ProductSection = () => {
  return (
    <SectionLayout
      size="lg"
      className="flex flex-col items-center gap-10"
      containerClassName="scroll-mt-20"
      id="produit"
    >
      <div className="flex flex-col items-center gap-3 text-center">
        <Typography variant="h2" className="text-3xl text-balance sm:text-4xl">
          Comment fonctionne le produit
        </Typography>
        <Typography variant="large" className="text-muted-foreground">
          Une plaque NFC + QR code, posée sur votre comptoir. C'est tout.
        </Typography>
      </div>
      <div className="grid w-full items-center gap-10 lg:grid-cols-2">
        <div className="relative mx-auto w-full max-w-md">
          <Image
            src="/images/plaque-nfc.jpg"
            alt="Plaque NFC et QR code ScanNShine posée sur un comptoir, prête à recevoir les avis Google"
            width={640}
            height={640}
            className="w-full rounded-2xl border object-cover shadow-lg"
          />
        </div>
        <div className="flex flex-col gap-6">
          {PRODUCT_STEPS.map((step) => (
            <div key={step.title} className="flex items-start gap-4">
              <div className="bg-primary/10 text-primary flex size-12 shrink-0 items-center justify-center rounded-full">
                <step.icon className="size-6" aria-hidden />
              </div>
              <div className="flex flex-col gap-1">
                <Typography variant="h3" className="text-lg">
                  {step.title}
                </Typography>
                <Typography variant="muted">{step.description}</Typography>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-3">
        {PRODUCT_BADGES.map((badge) => (
          <span
            key={badge}
            className="bg-card text-muted-foreground rounded-full border px-4 py-1.5 text-sm"
          >
            {badge}
          </span>
        ))}
      </div>
      <Typography variant="muted" className="max-w-2xl text-center text-balance">
        Votre plaque est livrée programmée et testée, reliée à votre fiche
        Google. Si votre fiche change un jour, le lien est mis à jour à
        distance — sans changer la plaque.
      </Typography>
    </SectionLayout>
  );
};
