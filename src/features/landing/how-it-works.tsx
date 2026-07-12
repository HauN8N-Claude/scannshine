import { Typography } from "@/components/nowts/typography";
import { MessageCircleHeart, QrCode, Star } from "lucide-react";
import { SectionLayout } from "./section-layout";

const STEPS = [
  {
    icon: QrCode,
    title: "1. Le client scanne",
    description:
      "Votre QR code est en caisse, sur la table ou sur votre téléphone. Le client le scanne en partant.",
  },
  {
    icon: Star,
    title: "2. Il donne son avis",
    description:
      "Il arrive sur une page à vos couleurs. Satisfait ? Direction votre fiche Google pour laisser ses étoiles.",
  },
  {
    icon: MessageCircleHeart,
    title: "3. Vous êtes protégé",
    description:
      "Un client mécontent ? Son message vous arrive en privé, par email — vous le rattrapez avant l'avis public.",
  },
] as const;

export const HowItWorksSection = () => {
  return (
    <SectionLayout
      size="base"
      className="flex flex-col items-center gap-10"
      id="comment-ca-marche"
    >
      <div className="flex flex-col items-center gap-3 text-center">
        <Typography variant="h2" className="text-3xl sm:text-4xl">
          Comment ça marche
        </Typography>
        <Typography variant="large" className="text-muted-foreground">
          Prêt en 10 minutes, sans compétence technique.
        </Typography>
      </div>
      <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-3">
        {STEPS.map((step) => (
          <div
            key={step.title}
            className="bg-card flex flex-col items-center gap-3 rounded-2xl border p-6 text-center"
          >
            <div className="bg-primary/10 text-primary flex size-12 items-center justify-center rounded-full">
              <step.icon className="size-6" aria-hidden />
            </div>
            <Typography variant="h3" className="text-lg">
              {step.title}
            </Typography>
            <Typography variant="muted">{step.description}</Typography>
          </div>
        ))}
      </div>
    </SectionLayout>
  );
};
