import { Typography } from "@/components/nowts/typography";
import Image from "next/image";
import { SectionLayout } from "./section-layout";

export const FounderSection = () => {
  return (
    <SectionLayout
      variant="card"
      size="base"
      className="flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-14"
    >
      <div className="relative mx-auto aspect-[4/5] w-full max-w-xs shrink-0 overflow-hidden rounded-2xl border sm:max-w-sm lg:mx-0 lg:w-80">
        <Image
          src="/images/fondateur.jpg"
          alt="Haumoana, fondateur de ScanNShine"
          fill
          sizes="(max-width: 1024px) 384px, 320px"
          className="object-cover object-top"
        />
      </div>
      <div className="flex flex-1 flex-col gap-4">
        <Typography className="text-primary font-extrabold uppercase">
          Le fondateur
        </Typography>
        <Typography variant="h2" className="text-3xl text-balance sm:text-4xl">
          Pourquoi j'ai créé ScanNShine
        </Typography>
        <Typography variant="p" className="text-muted-foreground !mt-0">
          Je vis et je travaille ici, en Polynésie. Et j'ai vu trop de bons
          commerces du fenua — des snacks, des salons, des prestataires qui
          font un travail impeccable — rester invisibles sur Google, pendant
          que des concurrents moins bons mais mieux notés récupèrent leurs
          clients.
        </Typography>
        <Typography variant="p" className="text-muted-foreground !mt-0">
          Le problème n'est jamais la qualité. C'est que le client content ne
          laisse pas d'avis : demander de vive voix est gênant, il oublie en
          sortant, et seuls les mécontents prennent le temps d'écrire.
          Résultat, votre fiche Google ne raconte pas la vérité sur votre
          commerce.
        </Typography>
        <Typography variant="p" className="text-muted-foreground !mt-0">
          J'ai créé ScanNShine pour régler ça, simplement : une plaquette
          posée en caisse qui demande l'avis à votre place, au bon moment.
          Vos clients contents deviennent enfin visibles, et votre note
          remonte semaine après semaine — sans y passer une minute de plus.
        </Typography>
        <div className="flex flex-col gap-1">
          <Typography variant="large">Haumoana</Typography>
          <Typography variant="muted">Fondateur de ScanNShine</Typography>
        </div>
      </div>
    </SectionLayout>
  );
};
