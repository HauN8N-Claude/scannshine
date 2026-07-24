import { Typography } from "@/components/nowts/typography";
import { MapPin, Plane, Search, TrendingUp } from "lucide-react";
import { SectionLayout } from "./section-layout";

const REASONS = [
  {
    icon: Search,
    title: "C'est votre vitrine, avant votre vitrine",
    description:
      "Avant de pousser votre porte, le client vous a déjà cherché sur Google. Ce qu'il y trouve — votre note, vos avis, leur fraîcheur — décide s'il vient chez vous ou chez le voisin.",
  },
  {
    icon: MapPin,
    title: "Google Maps classe avec les avis",
    description:
      "Le nombre d'avis, la note et leur régularité comptent parmi les critères qui font remonter une fiche dans les résultats locaux. Plus d'avis récents, c'est plus de visibilité — sans payer de publicité.",
  },
  {
    icon: Plane,
    title: "Les touristes ne connaissent que Maps",
    description:
      "Un visiteur de passage n'a ni habitudes ni bouche-à-oreille ici. Il compare deux fiches en 30 secondes et va vers la mieux notée. À Tahiti, c'est une clientèle entière qui se joue sur vos avis.",
  },
  {
    icon: TrendingUp,
    title: "Un avis travaille pour vous pour toujours",
    description:
      "Une publicité s'arrête quand vous arrêtez de payer. Un avis Google reste, se cumule avec les suivants et continue de convaincre vos futurs clients des années après.",
  },
] as const;

export const WhyReviewsSection = () => {
  return (
    <SectionLayout
      size="base"
      className="flex flex-col items-center gap-10"
      containerClassName="scroll-mt-20"
      id="pourquoi-les-avis"
    >
      <div className="flex flex-col items-center gap-3 text-center">
        <Typography variant="h2" className="text-3xl text-balance sm:text-4xl">
          Pourquoi les avis Google sont importants ?
        </Typography>
        <Typography variant="large" className="text-muted-foreground">
          Parce qu'aujourd'hui, votre réputation se lit avant de se vivre.
        </Typography>
      </div>
      <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2">
        {REASONS.map((reason) => (
          <div
            key={reason.title}
            className="bg-card flex flex-col gap-3 rounded-2xl border p-6"
          >
            <div className="bg-primary/10 text-primary flex size-12 items-center justify-center rounded-full">
              <reason.icon className="size-6" aria-hidden />
            </div>
            <Typography variant="h3" className="text-lg">
              {reason.title}
            </Typography>
            <Typography variant="muted">{reason.description}</Typography>
          </div>
        ))}
      </div>
      <Typography variant="large" className="max-w-2xl text-center text-balance">
        La bonne nouvelle : récolter des avis n'est pas une question de chance.
        C'est une question d'outil, posé au bon endroit, au bon moment.
      </Typography>
    </SectionLayout>
  );
};
