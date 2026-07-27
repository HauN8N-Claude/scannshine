import { Typography } from "@/components/nowts/typography";
import { SectionLayout } from "@/features/landing/section-layout";
import { Search, Sparkles, Star } from "lucide-react";
import { GuideCheckoutButton } from "./guide-checkout-button";

/** Logo Google officiel (4 couleurs) — identifie la recherche « à l'ancienne ». */
const GoogleG = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 48 48" className={className} role="img" aria-label="Google">
    <path
      fill="#EA4335"
      d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
    />
    <path
      fill="#4285F4"
      d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
    />
    <path
      fill="#FBBC05"
      d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
    />
    <path
      fill="#34A853"
      d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
    />
  </svg>
);

/** Pastille « IA » — glyphe dégradé qui évoque un assistant type ChatGPT. */
const AiMark = ({ className = "" }: { className?: string }) => (
  <span
    className={`inline-flex items-center justify-center rounded-md bg-gradient-to-br from-sky-500 via-indigo-500 to-fuchsia-500 text-white ${className}`}
    aria-hidden
  >
    <Sparkles className="size-[62%]" />
  </span>
);

const STATS = [
  {
    n: "37 %",
    l: "des clients commencent déjà leurs recherches par une IA plutôt que par Google",
  },
  {
    n: "60 %",
    l: "des adultes ont déjà cherché via une IA — 74 % chez les moins de 30 ans (vos futurs touristes)",
  },
  {
    n: "58 %",
    l: "des réponses de ChatGPT sur les commerces locaux citent des avis clients",
  },
];

const DOSSIER = [
  "Comment les IA choisissent quel commerce recommander",
  "Les signaux à renforcer sur votre fiche pour en faire partie",
  "Le test à refaire chaque mois pour vérifier que vous ressortez",
];

export const GuideAiSection = () => {
  return (
    <SectionLayout
      variant="card"
      size="lg"
      className="flex flex-col gap-12"
      containerClassName="scroll-mt-20"
      id="ia"
    >
      <div className="flex flex-col items-center gap-3 text-center">
        <Typography
          variant="small"
          className="text-primary flex items-center gap-2 font-semibold tracking-wide uppercase"
        >
          <Sparkles className="size-4" aria-hidden />
          Le futur de la recherche, déjà commencé
        </Typography>
        <Typography variant="h2" className="text-3xl text-balance sm:text-4xl">
          Demain, vos clients ne chercheront plus. Ils demanderont.
        </Typography>
        <Typography
          variant="large"
          className="text-muted-foreground max-w-2xl text-balance"
        >
          De plus en plus de gens ne tapent plus des mots-clés sur Google : ils
          posent une question complète à une intelligence artificielle, comme
          ChatGPT. Et l'IA ne donne pas une liste — elle donne UNE
          recommandation.
        </Typography>
      </div>

      {/* AVANT / AUJOURD'HUI */}
      <div className="grid w-full items-stretch gap-4 md:grid-cols-2">
        {/* Avant — recherche classique (dé-emphase) */}
        <div className="border-border/60 bg-muted/40 flex flex-col gap-3 rounded-2xl border p-6">
          <Typography
            variant="small"
            className="text-muted-foreground flex items-center gap-2 font-semibold tracking-wide uppercase"
          >
            <GoogleG className="size-4" />
            Avant · sur Google
          </Typography>
          <div className="bg-background flex items-center gap-3 rounded-full border px-4 py-2.5 shadow-sm">
            <GoogleG className="size-4 shrink-0" />
            <span className="text-foreground/80 text-sm">snack Papeete</span>
            <Search
              className="text-muted-foreground/60 ml-auto size-4 shrink-0"
              aria-hidden
            />
          </div>
          <Typography variant="muted">
            Le client tape des mots-clés et compare une liste de résultats. Vous
            avez une chance d'apparaître si votre fiche est bien classée.
          </Typography>
        </div>

        {/* Aujourd'hui — une question à l'IA (état désirable) */}
        <div className="border-primary/30 bg-primary/5 ring-primary/5 flex flex-col gap-4 rounded-2xl border p-6 ring-1">
          <Typography
            variant="small"
            className="text-primary flex items-center gap-2 font-semibold tracking-wide uppercase"
          >
            <AiMark className="size-4" />
            Aujourd'hui · avec une IA
          </Typography>
          {/* Mini-conversation façon assistant IA */}
          <div className="flex flex-col gap-2.5">
            <div className="bg-background ml-auto max-w-[85%] rounded-2xl rounded-br-sm border px-4 py-2.5 text-sm">
              « Quel est le meilleur snack à Papeete pour déjeuner, avec de bons
              avis récents ? »
            </div>
            <div className="bg-primary/10 border-primary/20 mr-auto max-w-[90%] rounded-2xl rounded-bl-sm border px-4 py-3 text-sm">
              <span className="text-primary flex items-center gap-1.5 text-xs font-semibold">
                <AiMark className="size-4" /> Assistant IA
              </span>
              <span className="mt-1 block">
                Je vous recommande{" "}
                <strong className="text-foreground">Votre Commerce</strong> —{" "}
                <Star
                  className="inline size-3.5 fill-amber-400 text-amber-400 align-text-bottom"
                  aria-hidden
                />{" "}
                4,8, plus de 200 avis récents, très apprécié pour…
              </span>
            </div>
          </div>
          <Typography variant="muted">
            L'IA cite un seul nom. Soit c'est le vôtre, soit c'est celui du
            concurrent. Il n'y a pas de deuxième page.
          </Typography>
        </div>
      </div>

      {/* LE PONT : d'où l'IA tire ses réponses */}
      <div className="bg-background/60 mx-auto flex max-w-3xl flex-col gap-3 rounded-2xl border p-6 text-center lg:p-8">
        <Typography variant="h3" className="text-xl text-balance">
          Les IA ne devinent pas. Elles recommandent ce qu'elles lisent.
        </Typography>
        <Typography variant="muted" className="text-balance">
          Et ce qu'elles lisent en premier, c'est votre{" "}
          <strong className="text-foreground">fiche Google</strong> et vos{" "}
          <strong className="text-foreground">avis</strong>. Soigner votre fiche
          ne vous rend donc pas seulement visible sur Google aujourd'hui — ça
          vous rend recommandable par les IA demain.{" "}
          <strong className="text-foreground">Un seul travail, deux vitrines.</strong>
        </Typography>
      </div>

      {/* CHIFFRES */}
      <div className="grid w-full gap-4 sm:grid-cols-3">
        {STATS.map((s) => (
          <div
            key={s.n}
            className="bg-background/60 flex flex-col items-center gap-2 rounded-2xl border p-6 text-center"
          >
            <span className="text-primary text-4xl font-bold">{s.n}</span>
            <Typography variant="muted" className="text-sm text-balance">
              {s.l}
            </Typography>
          </div>
        ))}
      </div>

      {/* ENJEU + TEST IA */}
      <div className="grid w-full items-stretch gap-4 lg:grid-cols-2">
        <div className="border-primary/40 bg-primary text-primary-foreground flex flex-col justify-center gap-2 rounded-2xl p-6 lg:p-8">
          <Typography variant="h3" className="text-xl text-balance">
            Pas d'avis = invisible. Pour Google comme pour l'IA.
          </Typography>
          <Typography className="text-primary-foreground/80 text-balance">
            Une analyse de 800 000 réponses d'IA l'a montré : les commerces avec
            peu d'avis n'apparaissent presque jamais dans les recommandations.
          </Typography>
        </div>
        <div className="border-primary/30 bg-background/60 flex flex-col justify-center gap-2 rounded-2xl border p-6 lg:p-8">
          <Typography
            variant="small"
            className="text-primary font-semibold tracking-wide uppercase"
          >
            Faites le test, maintenant
          </Typography>
          <Typography variant="large" className="text-base font-medium text-balance">
            Ouvrez ChatGPT et demandez : « Quel est le meilleur [votre métier] à
            [votre commune] ? »
          </Typography>
          <Typography variant="muted" className="text-balance">
            Vous y êtes ? Ou c'est votre concurrent ? En Polynésie, presque
            personne ne prépare encore sa fiche pour l'IA : celui qui s'y met
            maintenant prend une avance difficile à rattraper.
          </Typography>
        </div>
      </div>

      {/* CE QUE LE DOSSIER IA DONNE + CTA */}
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
        <div className="flex flex-col gap-3">
          <Typography variant="large" className="font-semibold text-balance">
            Le guide contient un dossier spécial IA qui vous explique, simplement :
          </Typography>
          <ul className="mx-auto flex max-w-xl flex-col gap-2 text-left">
            {DOSSIER.map((d) => (
              <li key={d} className="flex items-start gap-2.5">
                <Sparkles
                  className="text-primary mt-0.5 size-4 shrink-0"
                  aria-hidden
                />
                <Typography variant="small" className="font-normal">
                  {d}
                </Typography>
              </li>
            ))}
          </ul>
        </div>
        <GuideCheckoutButton
          label="Ne laissez pas l'IA recommander vos concurrents"
          withIcon
        />
      </div>
    </SectionLayout>
  );
};
