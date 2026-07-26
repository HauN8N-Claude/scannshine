import { Typography } from "@/components/nowts/typography";
import { cn } from "@/lib/utils";
import { Clock, House, Zap } from "lucide-react";
import { SectionLayout } from "./section-layout";

const MOMENTS = [
  {
    icon: Zap,
    tag: "Le bon moment",
    tagClass: "bg-primary text-primary-foreground",
    title: "À la caisse, tout de suite",
    description:
      "Il vient de payer, le sourire est là et son téléphone est déjà dans sa main. Vous êtes en face : un geste, et il note en 30 secondes. C'est la seule minute où un avis arrive vraiment.",
    cardClass: "border-primary/40 bg-primary/5 ring-primary/10 ring-1",
    opacity: "",
    accent: true,
  },
  {
    icon: Clock,
    tag: "Une heure après",
    tagClass: "bg-muted text-muted-foreground",
    title: "L'élan est retombé",
    description:
      "Il est reparti, il pense à autre chose. L'envie de partager est déjà passée, et vous n'êtes plus là pour le lui rappeler.",
    cardClass: "border-border bg-card",
    opacity: "opacity-80",
    accent: false,
  },
  {
    icon: House,
    tag: "Le soir, chez lui",
    tagClass: "bg-muted text-muted-foreground",
    title: "C'est perdu",
    description:
      "Écrire un avis devient un effort sans intérêt pour lui — il a mille autres choses à faire. Même content, il ne le fera jamais.",
    cardClass: "border-border bg-card",
    opacity: "opacity-60",
    accent: false,
  },
] as const;

export const HowItWorksSection = () => {
  return (
    <SectionLayout
      size="lg"
      className="flex flex-col items-center gap-10"
      containerClassName="scroll-mt-20"
      id="comment-ca-marche"
    >
      <div className="flex flex-col items-center gap-3 text-center">
        <Typography variant="h2" className="text-3xl text-balance sm:text-4xl">
          Le meilleur moment pour un avis, c'est tout de suite
        </Typography>
        <Typography
          variant="large"
          className="text-muted-foreground max-w-2xl text-balance"
        >
          Pas le soir, pas par message. À la caisse ou juste après la
          prestation — là, et seulement là, votre client passe à l'action.
        </Typography>
      </div>

      <div className="grid w-full gap-4 md:grid-cols-3 md:items-stretch">
        {MOMENTS.map((m) => (
          <div
            key={m.title}
            className={cn(
              "flex flex-col gap-4 rounded-2xl border p-6",
              m.cardClass,
              m.opacity,
            )}
          >
            <div className="flex items-center justify-between gap-2">
              <div
                className={cn(
                  "flex size-12 items-center justify-center rounded-full",
                  m.accent
                    ? "bg-primary/10 text-primary"
                    : "bg-muted text-muted-foreground",
                )}
              >
                <m.icon className="size-6" aria-hidden />
              </div>
              <span
                className={cn(
                  "rounded-full px-2.5 py-0.5 text-xs font-semibold",
                  m.tagClass,
                )}
              >
                {m.tag}
              </span>
            </div>
            <Typography variant="h3" className="text-lg text-balance">
              {m.title}
            </Typography>
            <Typography variant="muted">{m.description}</Typography>
          </div>
        ))}
      </div>

      <Typography variant="large" className="max-w-2xl text-center text-balance">
        C'est pour ça que la plaquette reste posée en caisse : elle capte l'avis
        pile dans ce moment-là, à chaque client — pendant que vous, vous
        travaillez.
      </Typography>
    </SectionLayout>
  );
};
