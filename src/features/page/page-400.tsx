import { ContactSupportDialog } from "@/features/contact/support/contact-support-dialog";
import Link from "next/link";
import type { PropsWithChildren } from "react";
import { Typography } from "../../components/nowts/typography";
import { buttonVariants } from "../../components/ui/button";

type Page400Props = PropsWithChildren<{
  title?: string;
}>;

export function Page400(props: Page400Props) {
  return (
    <main className="flex flex-col items-center gap-8">
      <div className="max-w-lg space-y-3 text-center">
        <Typography variant="code">400</Typography>
        <Typography variant="h1">
          {props.title ?? "Requête invalide"}
        </Typography>
        {props.children ?? (
          <Typography>
            Il semble que nous rencontrions des difficultés techniques. Pas
            d’inquiétude, notre équipe s’en occupe. En attendant, essayez de
            rafraîchir la page ou revenez un peu plus tard.
          </Typography>
        )}
      </div>
      <div className="flex items-center gap-4">
        <Link href="/" className={buttonVariants({ variant: "invert" })}>
          Retour à l’accueil
        </Link>
        <ContactSupportDialog />
      </div>
    </main>
  );
}
