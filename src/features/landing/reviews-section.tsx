import { Typography } from "@/components/nowts/typography";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { SectionLayout } from "./section-layout";

// ⚠️ PLACEHOLDER — avis illustratifs à remplacer par de VRAIS témoignages
// clients, avec leur accord. Publier de faux avis nominatifs est trompeur et
// contraire aux CGV (avis authentiques). À faire dès les premiers clients.
const REVIEWS = [
  {
    // Bénéfice 1 : acquisition / visibilité (touristes qui trouvent le commerce)
    quote:
      "En trois mois, on est passés de 40 à plus de 150 avis. Les touristes tombent sur nous **avant** les autres snacks du coin — la salle est pleine le midi.",
    name: "Vaimiti",
    role: "Snack, Punaauia",
    initialClass: "bg-sky-500/15 text-sky-700 dark:text-sky-400",
  },
  {
    // Bénéfice 2 : simplicité / zéro effort (persona peu techno, occupée)
    quote:
      "Je suis nulle en informatique et pourtant c'était prêt en **cinq minutes**. Mes clientes scannent en partant, je n'ai rien à faire — ça tourne tout seul.",
    name: "Hina",
    role: "Salon de coiffure, Papeete",
    initialClass: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400",
  },
  {
    // Bénéfice 3 : protection de la e-réputation (retour privé vs 1 étoile)
    quote:
      "Un client mécontent m'a écrit **en privé** au lieu de me coller une étoile. J'ai réglé le souci, il est revenu content. Ça m'a évité un avis qui fait fuir.",
    name: "Teva",
    role: "Pension de famille, Moorea",
    initialClass: "bg-amber-500/15 text-amber-700 dark:text-amber-400",
  },
] as const;

const Stars = () => (
  <div className="flex gap-0.5" aria-label="5 étoiles sur 5">
    {Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className="size-4 fill-amber-400 text-amber-400"
        aria-hidden
      />
    ))}
  </div>
);

export const ReviewsSection = () => {
  return (
    <SectionLayout size="base" className="flex flex-col items-center gap-10">
      <div className="flex flex-col items-center gap-3 text-center">
        <Typography className="text-primary font-extrabold uppercase">
          Ils l&rsquo;utilisent
        </Typography>
        <Typography variant="h2" className="text-3xl text-balance sm:text-4xl">
          Des commerces du fenua, déjà plus visibles
        </Typography>
      </div>

      <div className="grid w-full max-w-5xl grid-cols-1 gap-6 md:grid-cols-3">
        {REVIEWS.map((review) => (
          <Card key={review.name} className="flex h-full flex-col">
            <CardContent className="flex flex-1 flex-col gap-4 pt-6">
              <Stars />
              <Typography
                variant="p"
                className="!mt-0 flex-1 [&_strong]:text-foreground [&_strong]:font-semibold"
              >
                «&nbsp;
                {review.quote.split("**").map((part, i) =>
                  i % 2 === 1 ? <strong key={i}>{part}</strong> : part,
                )}
                &nbsp;»
              </Typography>
              <div className="flex items-center gap-3">
                <span
                  aria-hidden
                  className={`flex size-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${review.initialClass}`}
                >
                  {review.name[0]}
                </span>
                <div className="flex flex-col">
                  <Typography variant="small">{review.name}</Typography>
                  <Typography variant="muted">{review.role}</Typography>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </SectionLayout>
  );
};
