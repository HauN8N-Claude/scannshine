"use client";

import { Typography } from "@/components/nowts/typography";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { buttonVariants } from "@/components/ui/button";
import { SiteConfig } from "@/site-config";
import Link from "next/link";
import { ClientMarkdown } from "../markdown/client-markdown";
import { SectionLayout } from "./section-layout";

type Faq = {
  question: string;
  answer: string;
};

type FeaturesPreviewProps = {
  faq: readonly Faq[];
};

export const FAQSection = (props: FeaturesPreviewProps) => {
  return (
    <SectionLayout size="lg" className="flex gap-10 max-lg:flex-col">
      <div className="flex-1 space-y-2">
        <Typography className="text-primary font-extrabold uppercase">
          FAQ
        </Typography>
        <Typography variant="h2" className="text-3xl sm:text-4xl lg:text-5xl">
          Questions fréquentes
        </Typography>
      </div>
      <div className="flex flex-1 flex-col gap-6">
        <Accordion type="single" collapsible>
          {props.faq.map((e, i) => {
            return (
              <AccordionItem value={`item-${i}`} key={i}>
                <AccordionTrigger className="text-left text-lg">
                  {e.question}
                </AccordionTrigger>
                <AccordionContent className="text-base">
                  <ClientMarkdown>{e.answer}</ClientMarkdown>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>

        <div className="bg-card flex flex-col gap-3 rounded-2xl border p-6">
          <Typography variant="h3" className="text-lg">
            Convaincu ? Commandez votre plaquette.
          </Typography>
          <Typography variant="muted">
            4 990 XPF, paiement unique. Livrée en main propre, testée devant
            vous dans votre commerce — vous ne réglez qu'à ce moment-là.
          </Typography>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <Link href="/commander" className={buttonVariants({ size: "lg" })}>
              Commander ma plaquette
            </Link>
            <a
              href={SiteConfig.whatsapp.href}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({ variant: "ghost", size: "lg" })}
            >
              J&rsquo;ai encore une question
            </a>
          </div>
        </div>
      </div>
    </SectionLayout>
  );
};
