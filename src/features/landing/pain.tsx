"use client";

import { Typography } from "@/components/nowts/typography";
import { SectionLayout } from "./section-layout";

export const PainSection = () => {
  return (
    <SectionLayout
      variant="card"
      size="base"
      className="flex flex-col items-center justify-center gap-4"
    >
      <div className="flex w-full flex-col items-center gap-3 lg:gap-4 xl:gap-6">
        <Typography variant="h1" className="text-center">
          12 avis quand votre concurrent en a 200&nbsp;?
        </Typography>
        <Typography variant="large" className="text-center">
          Vos clients contents partent sans rien écrire. Les mécontents, eux,
          trouvent toujours le temps.
        </Typography>
        <div className="flex items-start gap-4 max-lg:flex-col">
          <div className="flex-1 rounded-lg bg-red-500/20 p-4 lg:p-6">
            <Typography variant="h3" className="text-red-500">
              😞 Sans ScanNShine
            </Typography>
            <ul className="text-foreground/80 mt-4 ml-4 flex list-disc flex-col gap-2 text-lg">
              <li>Demander un avis de vive voix, c'est gênant</li>
              <li>Le client dit oui... et oublie 10 minutes après</li>
              <li>Seuls les mécontents laissent un avis</li>
              <li>Les touristes choisissent le concurrent mieux noté</li>
            </ul>
          </div>
          <div className="flex-1 rounded-lg bg-green-500/20 p-4 lg:p-6">
            <Typography variant="h3" className="text-green-500">
              😎 Avec ScanNShine
            </Typography>
            <ul className="text-foreground/80 mt-4 ml-4 flex list-disc flex-col gap-2 text-lg">
              <li>Le QR est en caisse, il travaille tout seul</li>
              <li>Le client scanne et note en 30 secondes</li>
              <li>Les mécontents vous écrivent en privé, pas sur Google</li>
              <li>Vous suivez vos scans et vos avis chaque semaine</li>
            </ul>
          </div>
        </div>
      </div>
    </SectionLayout>
  );
};
