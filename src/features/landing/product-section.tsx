import { Typography } from "@/components/nowts/typography";
import { Nfc, Star, Sticker, TrendingUp } from "lucide-react";
import Image from "next/image";
import { SectionLayout } from "./section-layout";

const PRODUCT_STEPS = [
  {
    icon: Sticker,
    title: "Collez la plaquette là où ça compte",
    description:
      "Sur le comptoir, à la caisse, sur la table : elle se colle en deux minutes et reste en place. Pas de câble, pas de batterie, rien à recharger.",
  },
  {
    icon: Nfc,
    title: "Le client approche son téléphone",
    description:
      "Comme pour un paiement sans contact : il pose son téléphone sur la plaquette et votre page d'avis Google s'ouvre toute seule. Rien à installer, rien à taper.",
  },
  {
    icon: Star,
    title: "Il laisse son avis en 30 secondes",
    description:
      "Sur place, à chaud, pendant que l'envie est là. Quelques étoiles, deux phrases, c'est envoyé — avant même qu'il ait rangé son téléphone.",
  },
  {
    icon: TrendingUp,
    title: "Votre fiche Google grimpe",
    description:
      "Un avis authentique de plus à chaque client content. Votre note monte, votre fiche ressort sur Google Maps, et les prochains clients vous choisissent vous.",
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
      className="relative flex flex-col items-center gap-10"
      containerClassName="relative isolate scroll-mt-20 overflow-hidden"
      id="produit"
    >
      {/* Carte NFC en filigrane — décorative, le copy reste le point focal */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 hidden select-none md:block"
      >
        <Image
          src="/images/carte-nfc-3d.png"
          alt=""
          width={720}
          height={720}
          className="absolute top-1/2 right-[-8%] w-[46rem] max-w-none -translate-y-1/2 rotate-12 opacity-[0.06]"
        />
      </div>
      <div className="flex flex-col items-center gap-3 text-center">
        <Typography variant="h2" className="text-3xl text-balance sm:text-4xl">
          Comment fonctionne le produit
        </Typography>
        <Typography variant="large" className="text-muted-foreground">
          Une plaquette posée sur votre comptoir. C'est tout.
        </Typography>
      </div>
      <div className="grid w-full items-center gap-10 lg:grid-cols-2">
        <div className="relative mx-auto w-full max-w-md">
          <Image
            src="/images/plaque-nfc.png"
            alt="Plaquette ScanNShine posée sur un comptoir, prête à recevoir les avis Google"
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
        Votre plaquette est livrée prête à l'emploi, reliée à votre fiche
        Google et testée. Si votre fiche change un jour, on la met à jour à
        distance — sans changer la plaquette.
      </Typography>
    </SectionLayout>
  );
};
