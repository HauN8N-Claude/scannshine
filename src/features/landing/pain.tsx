import { Typography } from "@/components/nowts/typography";
import { cn } from "@/lib/utils";
import { Star, TrendingDown, TrendingUp } from "lucide-react";
import { SectionLayout } from "./section-layout";

const Stars = ({
  filled,
  tone,
}: {
  filled: number;
  tone: "muted" | "gold";
}) => (
  <div className="flex items-center gap-0.5" aria-hidden>
    {Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        className={cn(
          "size-4",
          index < filled
            ? tone === "gold"
              ? "fill-amber-400 text-amber-400"
              : "fill-muted-foreground/40 text-muted-foreground/40"
            : "text-muted-foreground/30",
        )}
      />
    ))}
  </div>
);

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
        <Typography
          variant="large"
          className="text-muted-foreground text-center text-balance"
        >
          Sur Google, ce qui fait la différence, c'est le nombre d'avis et leur
          fraîcheur. Voici les deux profils que voient vos futurs clients.
        </Typography>

        <div className="mt-2 grid w-full items-stretch gap-4 md:grid-cols-2">
          {/* Commerce sans système d'avis — dé-emphase (neutre) */}
          <div className="border-border/60 bg-muted/40 flex flex-col gap-4 rounded-xl border p-5 lg:p-6">
            <div className="flex flex-col gap-2">
              <Typography
                variant="small"
                className="text-muted-foreground flex items-center gap-2 font-semibold tracking-wide uppercase"
              >
                <TrendingDown className="size-4" aria-hidden />
                Sans système d'avis
              </Typography>
              <div className="flex items-center gap-2">
                <Stars filled={3} tone="muted" />
                <span className="text-muted-foreground text-2xl font-bold">
                  3,4
                </span>
              </div>
              <Typography variant="muted">
                ≈ 12 avis · le dernier il y a 8 mois
              </Typography>
            </div>
            <ul className="text-muted-foreground ml-4 flex list-disc flex-col gap-2 text-base lg:text-lg">
              <li>
                Peu d'avis, et la plupart datent d'il y a des mois : la fiche
                paraît à l'abandon
              </li>
              <li>
                Seuls les clients mécontents prennent le temps d'en laisser un
              </li>
              <li>
                La note stagne, et Google fait descendre la fiche dans les
                résultats
              </li>
              <li>
                Les futurs clients comparent et choisissent le commerce mieux
                noté
              </li>
            </ul>
          </div>

          {/* Commerce avec des avis récents — état désirable (bleu primary) */}
          <div className="border-primary/30 bg-primary/5 ring-primary/5 flex flex-col gap-4 rounded-xl border p-5 ring-1 lg:p-6">
            <div className="flex flex-col gap-2">
              <Typography
                variant="small"
                className="text-primary flex items-center gap-2 font-semibold tracking-wide uppercase"
              >
                <TrendingUp className="size-4" aria-hidden />
                Avec des avis récents, en nombre
              </Typography>
              <div className="flex items-center gap-2">
                <Stars filled={5} tone="gold" />
                <span className="text-2xl font-bold">4,8</span>
              </div>
              <Typography variant="muted">
                200+ avis · plusieurs cette semaine
              </Typography>
            </div>
            <ul className="text-foreground/80 marker:text-primary ml-4 flex list-disc flex-col gap-2 text-base lg:text-lg">
              <li>
                Chaque client satisfait laisse un avis en 30 secondes, sur place
              </li>
              <li>Des avis frais arrivent en continu, et Google adore ça</li>
              <li>La note monte, et la fiche remonte dans les résultats</li>
              <li>Vous devenez le commerce le mieux noté du quartier</li>
            </ul>
          </div>
        </div>

        <Typography
          variant="small"
          className="text-muted-foreground mt-2 text-center text-balance"
        >
          La plaquette ScanNShine, posée sur votre comptoir, est ce qui fait
          passer votre fiche de l'un à l'autre.
        </Typography>
      </div>
    </SectionLayout>
  );
};
