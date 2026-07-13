import { ContactSupportDialog } from "@/features/contact/support/contact-support-dialog";
import Link from "next/link";
import { Typography } from "../../components/nowts/typography";
import { buttonVariants } from "../../components/ui/button";

export function Page404() {
  return (
    <main className="flex h-full flex-col items-center justify-center gap-8">
      <div className="space-y-3 text-center">
        <Typography variant="code">404</Typography>
        <Typography variant="h1">Page introuvable</Typography>
        <Typography>
          Désolé, nous n’avons pas trouvé la page que vous recherchez.
        </Typography>
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
