import { Typography } from "@/components/nowts/typography";
import { ThumbsDown, ThumbsUp } from "lucide-react";
import { SectionLayout } from "./section-layout";

export const PainSection = () => {
  return (
    <SectionLayout
      variant="card"
      size="base"
      className="flex flex-col items-center justify-center gap-4"
    >
      <div className="flex w-full flex-col items-center gap-3 lg:gap-4 xl:gap-6">
        <Typography
          variant="h2"
          className="text-center text-3xl text-balance sm:text-4xl"
        >
          12 avis quand votre concurrent en a 200&nbsp;?
        </Typography>
        <Typography variant="large" className="text-center text-balance">
          Ce déséquilibre n'est pas une fatalité. Voici ce qui change avec une
          plaque posée sur votre comptoir.
        </Typography>
        <div className="flex items-start gap-4 max-lg:flex-col">
          <div className="flex-1 rounded-lg bg-red-500/20 p-4 lg:p-6">
            <Typography
              variant="h3"
              className="flex items-center gap-2 text-red-500"
            >
              <ThumbsDown className="size-5" aria-hidden />
              Sans ScanNShine
            </Typography>
            <ul className="text-foreground/80 mt-4 ml-4 flex list-disc flex-col gap-2 text-base lg:text-lg">
              <li>Votre note stagne pendant que le concurrent engrange</li>
              <li>Les seuls avis qui tombent sont les mauvais</li>
              <li>Vous découvrez les problèmes une fois publiés sur Google</li>
              <li>Votre fiche fait fuir au lieu d'attirer</li>
            </ul>
          </div>
          <div className="flex-1 rounded-lg bg-green-500/20 p-4 lg:p-6">
            <Typography
              variant="h3"
              className="flex items-center gap-2 text-green-500"
            >
              <ThumbsUp className="size-5" aria-hidden />
              Avec ScanNShine
            </Typography>
            <ul className="text-foreground/80 mt-4 ml-4 flex list-disc flex-col gap-2 text-base lg:text-lg">
              <li>La plaque est en caisse, elle travaille toute seule</li>
              <li>Le client approche son téléphone et note en 30 secondes</li>
              <li>Chaque client satisfait devient un avis de plus</li>
              <li>Votre fiche grimpe, les nouveaux clients vous trouvent</li>
            </ul>
          </div>
        </div>
      </div>
    </SectionLayout>
  );
};
