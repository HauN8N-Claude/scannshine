import { Typography } from "@/components/nowts/typography";
import { Clock, Frown, MapPin, MessageSquareOff } from "lucide-react";
import { SectionLayout } from "./section-layout";

const PROBLEMS = [
  {
    icon: MessageSquareOff,
    title: "« C'était super, à la prochaine ! »",
    description:
      "Le client content vous le dit en face... puis repart sans rien écrire. Dix minutes après, c'est oublié — et votre fiche Google n'en garde aucune trace.",
  },
  {
    icon: MapPin,
    title: "Le touriste choisit sur Google Maps",
    description:
      "Il compare deux adresses en 30 secondes et va chez celle qui a 200 avis. Même si la vôtre est meilleure. Ce n'est pas une question de qualité, c'est une question d'avis.",
  },
  {
    icon: Frown,
    title: "Le mécontent, lui, trouve le temps",
    description:
      "Il ne dit rien en partant. Il l'écrit directement sur votre fiche Google, devant tout le monde. Un seul avis 1 étoile pèse plus lourd que dix clients ravis restés silencieux.",
  },
  {
    icon: Clock,
    title: "Demander un avis, ça passe toujours après",
    description:
      "Entre la caisse, les fournisseurs et le service, courir après les avis n'arrive jamais en haut de la pile. Et le demander de vive voix, c'est gênant — alors on ne le fait pas.",
  },
] as const;

export const ProblemSection = () => {
  return (
    <SectionLayout
      size="base"
      className="flex flex-col items-center gap-10"
      id="problemes"
    >
      <div className="flex flex-col items-center gap-3 text-center">
        <Typography variant="h2" className="text-3xl text-balance sm:text-4xl">
          Vous faites du bon travail. Google ne le montre pas.
        </Typography>
        <Typography variant="large" className="text-muted-foreground">
          Quatre situations que tous les gérants du fenua connaissent.
        </Typography>
      </div>
      <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2">
        {PROBLEMS.map((problem) => (
          <div
            key={problem.title}
            className="bg-card flex flex-col gap-3 rounded-2xl border p-6"
          >
            <div className="bg-destructive/10 text-destructive flex size-12 items-center justify-center rounded-full">
              <problem.icon className="size-6" aria-hidden />
            </div>
            <Typography variant="h3" className="text-lg">
              {problem.title}
            </Typography>
            <Typography variant="muted">{problem.description}</Typography>
          </div>
        ))}
      </div>
      <Typography variant="large" className="max-w-2xl text-center text-balance">
        Pendant ce temps, votre fiche Google ne raconte pas la vérité sur votre
        commerce. Et chaque jour qui passe, l'écart se creuse.
      </Typography>
    </SectionLayout>
  );
};
