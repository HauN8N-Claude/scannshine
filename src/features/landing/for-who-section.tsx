import { Typography } from "@/components/nowts/typography";
import { CheckCircle2 } from "lucide-react";
import { SectionLayout } from "./section-layout";

const PROFILES = [
  {
    title: "Tu as un commerce avec du passage",
    description:
      "Snack, salon, boutique, garage, roulotte, pension… Chaque jour, des clients passent ta porte et repartent contents. Il ne manque qu'une chose : que ça se voie sur Google.",
  },
  {
    title: "Tes clients sont contents, mais ta fiche ne le dit pas",
    description:
      "Tu sers des centaines de clients, et ta fiche affiche une poignée d'avis qui datent. Ta note ne raconte pas la réalité de ton travail — et c'est elle que les gens regardent.",
  },
  {
    title: "Tu n'as ni le temps ni l'envie de quémander",
    description:
      "Courir après les avis, relancer, supplier « tu me mettras un petit avis ? »… très peu pour toi. Tu veux un outil posé sur le comptoir qui travaille tout seul, pendant que tu bosses.",
  },
  {
    title: "Tu veux capter les touristes et les nouveaux clients",
    description:
      "Ceux qui ne te connaissent pas encore te choisissent sur Google Maps, à la note et au nombre d'avis. Tu veux que ce soit toi qu'ils trouvent — pas le concurrent d'à côté.",
  },
] as const;

export const ForWhoSection = () => {
  return (
    <SectionLayout
      size="base"
      className="flex flex-col items-center gap-10"
      containerClassName="scroll-mt-20"
      id="pour-qui"
    >
      <div className="flex flex-col items-center gap-3 text-center">
        <Typography variant="h2" className="text-3xl text-balance sm:text-4xl">
          Notre solution est faite pour toi si...
        </Typography>
        <Typography variant="large" className="text-muted-foreground">
          Quatre situations. Si tu te reconnais dans une seule, tu es au bon
          endroit.
        </Typography>
      </div>
      <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2">
        {PROFILES.map((profile) => (
          <div
            key={profile.title}
            className="bg-card flex flex-col gap-3 rounded-2xl border p-6"
          >
            <div className="bg-primary/10 text-primary flex size-12 items-center justify-center rounded-full">
              <CheckCircle2 className="size-6" aria-hidden />
            </div>
            <Typography variant="h3" className="text-lg">
              {profile.title}
            </Typography>
            <Typography variant="muted">{profile.description}</Typography>
          </div>
        ))}
      </div>
    </SectionLayout>
  );
};
