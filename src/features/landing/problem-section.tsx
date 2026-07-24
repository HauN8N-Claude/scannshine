import { Typography } from "@/components/nowts/typography";
import { Clock, Frown, MapPin, MessageSquareOff } from "lucide-react";
import { SectionLayout } from "./section-layout";

const PROBLEMS = [
  {
    icon: MessageSquareOff,
    title: "Vos clients satisfaits ne laissent pas d'avis",
    description:
      "Un client content paie et s'en va. Sans rien au comptoir pour capter son avis à ce moment-là, il est perdu. Votre fiche Google stagne alors que les clients satisfaits défilent chez vous toute la journée.",
  },
  {
    icon: MapPin,
    title: "Le mieux noté prend le client",
    description:
      "Sur Google Maps, le choix se fait à la note et au nombre d'avis. Moins d'avis que le concurrent d'à côté = moins de clients. Même si votre travail est meilleur.",
  },
  {
    icon: Frown,
    title: "Votre note ne dit pas la vérité",
    description:
      "Les mécontents écrivent, les satisfaits non. Résultat mécanique : votre fiche publique est pire que votre commerce réel.",
  },
  {
    icon: Clock,
    title: "Un avis se joue dans la minute",
    description:
      "C'est au moment de payer, sur place, que le client est prêt à noter. Passé la porte, c'est terminé. Sans outil à cet instant précis, l'avis est perdu.",
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
