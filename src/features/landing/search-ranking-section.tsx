import { Typography } from "@/components/nowts/typography";
import { cn } from "@/lib/utils";
import { Search, Star } from "lucide-react";
import { SectionLayout } from "./section-layout";

const RESULTS = [
  {
    rank: 1,
    name: "Votre commerce",
    reviews: 214,
    rating: "4,8",
    highlight: true,
  },
  {
    rank: 2,
    name: "Le concurrent d'en face",
    reviews: 87,
    rating: "4,6",
    highlight: false,
  },
  {
    rank: 3,
    name: "L'autre, un peu plus loin",
    reviews: 12,
    rating: "4,9",
    highlight: false,
  },
] as const;

export const SearchRankingSection = () => {
  return (
    <SectionLayout
      variant="card"
      size="base"
      className="flex flex-col items-center gap-10"
      containerClassName="scroll-mt-20"
      id="classement"
    >
      <div className="flex flex-col items-center gap-3 text-center">
        <Typography variant="h2" className="text-3xl text-balance sm:text-4xl">
          Les 3 premiers raflent presque tous les clients
        </Typography>
        <Typography
          variant="large"
          className="text-muted-foreground max-w-2xl text-balance"
        >
          Votre futur client tape sa recherche, regarde les 3 premiers, et
          choisit. Il ne descend jamais en bas. Être dans les premiers, ça se
          joue au nombre d'avis.
        </Typography>
      </div>

      {/* Schéma : la liste de résultats Google. Le plus d'avis = tout en haut. */}
      <div className="bg-background w-full max-w-md rounded-2xl border p-4 shadow-lg">
        <div className="text-muted-foreground bg-muted/50 flex items-center gap-2 rounded-lg border px-3 py-2 text-sm">
          <Search className="size-4 shrink-0" aria-hidden />
          <span>snack près de moi</span>
        </div>

        <ul className="mt-3 flex flex-col gap-2">
          {RESULTS.map((r) => (
            <li
              key={r.rank}
              className={cn(
                "flex items-center gap-3 rounded-xl border p-3",
                r.highlight
                  ? "border-primary/40 bg-primary/5 ring-primary/10 ring-1"
                  : "border-border bg-card",
                r.rank === 3 && "opacity-70",
              )}
            >
              <span
                className={cn(
                  "grid size-7 shrink-0 place-items-center rounded-full text-sm font-bold",
                  r.highlight
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground",
                )}
              >
                {r.rank}
              </span>
              <div className="flex min-w-0 flex-1 flex-col">
                <span
                  className={cn(
                    "truncate font-semibold",
                    r.highlight ? "text-foreground" : "text-muted-foreground",
                  )}
                >
                  {r.name}
                </span>
                <span className="text-muted-foreground flex items-center gap-1.5 text-xs">
                  <Star
                    className="size-3.5 fill-amber-400 text-amber-400"
                    aria-hidden
                  />
                  {r.rating}
                  <span aria-hidden>·</span>
                  <strong className="text-foreground/80 font-semibold">
                    {r.reviews} avis
                  </strong>
                </span>
              </div>
              {r.highlight && (
                <span className="bg-primary/10 text-primary rounded-full px-2 py-0.5 text-xs font-semibold">
                  En tête
                </span>
              )}
            </li>
          ))}
        </ul>

        <div className="text-muted-foreground mt-3 border-t border-dashed pt-3 text-center text-xs">
          ↓ plus bas — personne ne descend jusqu'ici
        </div>
      </div>

      <Typography
        variant="small"
        className="text-muted-foreground max-w-2xl text-center text-balance"
      >
        Peu d'avis = tout en bas = invisible. La plaquette ScanNShine remplit
        votre fiche d'avis et vous fait remonter là où on vous voit.
      </Typography>
    </SectionLayout>
  );
};
