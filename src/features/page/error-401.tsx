import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { PropsWithChildren } from "react";
import { Typography } from "../../components/nowts/typography";
import { ContactSupportDialog } from "../contact/support/contact-support-dialog";

type Error401Props = PropsWithChildren<{
  title?: string;
}>;

export function Error401(props: Error401Props) {
  return (
    <Card className="w-full max-w-lg">
      <CardHeader className="flex flex-col">
        <Typography variant="code">401</Typography>
        <CardTitle>{props.title ?? "Accès non autorisé"}</CardTitle>
        <CardDescription>
          Vous n’avez pas la permission d’accéder à cette ressource. Veuillez
          vous connecter ou contacter votre administrateur si vous pensez qu’il
          s’agit d’une erreur.
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex flex-row gap-2">
        <ContactSupportDialog />
      </CardFooter>
    </Card>
  );
}
