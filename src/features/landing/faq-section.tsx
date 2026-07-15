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
  faq: Faq[];
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
            Convaincu ? Testez-le sur votre commerce, gratuitement.
          </Typography>
          <Typography variant="muted">
            7 jours offerts, sans engagement. En 3 minutes, votre QR est prêt à
            transformer vos clients satisfaits en avis Google.
          </Typography>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <Link
              href="/auth/signup"
              className={buttonVariants({ size: "lg" })}
            >
              Commencer — 7 jours gratuits
            </Link>
            <a
              href={`mailto:${SiteConfig.supportEmail}?subject=${encodeURIComponent(
                "Une question sur ScanNShine",
              )}`}
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
