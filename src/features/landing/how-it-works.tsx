import { Typography } from "@/components/nowts/typography";
import { MessageCircleHeart, QrCode, Smile, Sparkles, Star } from "lucide-react";
import { SectionLayout } from "./section-layout";

const STEPS = [
  {
    icon: Smile,
    title: "1. Votre client est satisfait",
    description:
      "La prestation se termine, le sourire est là. C'est maintenant que tout se joue — pas demain, pas par message.",
  },
  {
    icon: Star,
    title: "2. C'est le moment de demander",
    description:
      "Un avis se demande à chaud, dans la minute qui suit. Plus besoin de trouver les mots : le QR code fait la demande à votre place.",
  },
  {
    icon: QrCode,
    title: "3. Il scanne votre QR code",
    description:
      "Tendez le chevalet ou votre téléphone. Le client scanne, note en 30 secondes — rien à télécharger, rien à taper.",
  },
  {
    icon: Sparkles,
    title: "4. L'avis brille sur votre fiche Google",
    description:
      "Son avis s'affiche sur votre fiche Google, votre note grimpe, et les prochains clients vous choisissent vous.",
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
          La méthode pour récolter vos avis
        </Typography>
        <Typography variant="large" className="text-muted-foreground">
          Quatre étapes, zéro compétence technique.
        </Typography>
      </div>
      <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {STEPS.map((step) => (
          <div
            key={step.title}
            className="bg-card flex flex-col items-center gap-3 rounded-2xl border p-6 text-center"
          >
            <div className="bg-primary/10 text-primary flex size-12 items-center justify-center rounded-full">
              <step.icon className="size-6" aria-hidden />
            </div>
            <Typography variant="h3" className="text-lg text-balance">
              {step.title}
            </Typography>
            <Typography variant="muted">{step.description}</Typography>
          </div>
        ))}
      </div>
      <div className="text-muted-foreground flex max-w-2xl items-start gap-2 text-center max-md:flex-col max-md:items-center">
        <MessageCircleHeart
          className="text-primary mt-0.5 size-5 shrink-0"
          aria-hidden
        />
        <Typography variant="muted" className="text-balance">
          Et si le client n'est pas satisfait ? Son message vous arrive en
          privé, par email — vous réglez le souci directement avec lui. Le lien
          vers votre fiche Google reste visible pour tous, rien n'est filtré.
        </Typography>
      </div>
    </SectionLayout>
  );
};
