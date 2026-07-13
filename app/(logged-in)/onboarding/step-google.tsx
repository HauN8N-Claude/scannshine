"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Form, useForm } from "@/features/form/tanstack-form";
import { resolveActionResult } from "@/lib/actions/actions-utils";
import { useMutation } from "@tanstack/react-query";
import { CheckCircle2, CircleHelp, ExternalLink } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import {
  confirmGooglePlaceAction,
  resolveGoogleLinkAction,
} from "./onboarding.action";
import { GoogleLinkSchema } from "./onboarding.schema";

type ResolvedPlace = {
  placeId: string;
  businessName: string | null;
  mapsUrl: string;
};

export const StepGoogle = ({
  currentPlaceId,
  currentMapsUrl,
  successRedirect = "/onboarding?etape=3",
}: {
  currentPlaceId: string | null;
  currentMapsUrl: string | null;
  successRedirect?: string;
}) => {
  const router = useRouter();
  const [resolved, setResolved] = useState<ResolvedPlace | null>(
    currentPlaceId
      ? {
          placeId: currentPlaceId,
          businessName: null,
          mapsUrl: currentMapsUrl ?? "",
        }
      : null,
  );
  const [showManual, setShowManual] = useState(false);
  const [manualPlaceId, setManualPlaceId] = useState("");

  const resolveMutation = useMutation({
    mutationFn: async (values: { mapsUrl: string }) =>
      resolveActionResult(resolveGoogleLinkAction(values)),
    onSuccess: (data, variables) => {
      setResolved({ ...data, mapsUrl: variables.mapsUrl });
    },
    onError: (error) => {
      toast.error(error.message);
      setShowManual(true);
    },
  });

  const confirmMutation = useMutation({
    mutationFn: async (input: { placeId: string; mapsUrl?: string }) =>
      resolveActionResult(confirmGooglePlaceAction(input)),
    onSuccess: () => {
      // typedRoutes : la cible est dynamique (onboarding ou settings)
      router.push(successRedirect as Parameters<typeof router.push>[0]);
      router.refresh();
    },
    onError: (error) => toast.error(error.message),
  });

  const form = useForm({
    schema: GoogleLinkSchema,
    defaultValues: { mapsUrl: currentMapsUrl ?? "" },
    onSubmit: async (values) => {
      await resolveMutation.mutateAsync(values);
    },
  });

  return (
    <div className="flex flex-col gap-6">
      <Form form={form} className="flex flex-col gap-4">
        <form.AppField name="mapsUrl">
          {(field) => (
            <field.Field>
              <field.Label>
                Collez le lien de votre fiche Google Maps
              </field.Label>
              <field.Content>
                <field.Input
                  placeholder="https://maps.app.goo.gl/..."
                  inputMode="url"
                />
                <field.Message />
                <field.Description>
                  Ouvrez Google Maps → trouvez votre commerce → bouton
                  «&nbsp;Partager&nbsp;» → copiez le lien, et collez-le ici.
                </field.Description>
              </field.Content>
            </field.Field>
          )}
        </form.AppField>
        <form.SubmitButton className="w-full">
          Trouver ma fiche
        </form.SubmitButton>
      </Form>

      <div className="border-primary/40 bg-primary/5 flex flex-col gap-3 rounded-xl border p-4">
        <div className="flex items-start gap-2">
          <CircleHelp className="text-primary mt-0.5 size-5 shrink-0" aria-hidden />
          <div className="flex flex-col gap-0.5">
            <p className="text-sm font-medium">
              Vous n'avez pas encore de fiche Google ?
            </p>
            <p className="text-muted-foreground text-xs">
              Pas de panique : c'est gratuit et ça prend 15 minutes. On vous
              guide pas à pas, puis vous revenez ici finir votre inscription.
            </p>
          </div>
        </div>
        <Link
          href="/creer-fiche-google"
          target="_blank"
          className={buttonVariants({ variant: "outline", className: "w-full" })}
        >
          Créer ma fiche Google — guide pas à pas
          <ExternalLink className="size-4" aria-hidden />
        </Link>
      </div>

      {resolved ? (
        <Card>
          <CardContent className="flex flex-col gap-4 pt-6">
            <div className="flex items-start gap-3">
              <CheckCircle2
                className="mt-0.5 size-5 text-emerald-500"
                aria-hidden
              />
              <div className="flex flex-col gap-1">
                <p className="font-medium">
                  {resolved.businessName
                    ? `C'est bien « ${resolved.businessName} » ?`
                    : "Fiche Google trouvée !"}
                </p>
                <p className="text-muted-foreground text-xs break-all">
                  {resolved.placeId}
                </p>
              </div>
            </div>
            <Button
              className="w-full"
              disabled={confirmMutation.isPending}
              onClick={() =>
                confirmMutation.mutate({
                  placeId: resolved.placeId,
                  mapsUrl: resolved.mapsUrl || undefined,
                })
              }
            >
              {confirmMutation.isPending
                ? "Connexion..."
                : "Oui, connecter ma fiche"}
            </Button>
          </CardContent>
        </Card>
      ) : null}

      {showManual || resolved === null ? (
        <details
          className="rounded-xl border p-3 text-sm"
          open={showManual}
        >
          <summary className="text-muted-foreground cursor-pointer">
            Le lien ne fonctionne pas ? Saisie manuelle
          </summary>
          <div className="mt-3 flex flex-col gap-3">
            <p className="text-muted-foreground text-xs">
              Rendez-vous sur{" "}
              <a
                href="https://developers.google.com/maps/documentation/places/web-service/place-id"
                target="_blank"
                rel="noreferrer"
                className="underline"
              >
                l'outil Place ID de Google
              </a>
              , cherchez votre commerce, et copiez l'identifiant qui commence
              par «&nbsp;ChIJ&nbsp;».
            </p>
            <Input
              placeholder="ChIJ..."
              value={manualPlaceId}
              onChange={(event) => setManualPlaceId(event.target.value)}
            />
            <Button
              variant="outline"
              disabled={confirmMutation.isPending || manualPlaceId.length < 16}
              onClick={() => confirmMutation.mutate({ placeId: manualPlaceId })}
            >
              Connecter avec cet identifiant
            </Button>
          </div>
        </details>
      ) : null}
    </div>
  );
};
