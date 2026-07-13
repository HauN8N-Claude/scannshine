"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { dialogManager } from "@/features/dialog-manager/dialog-manager";
import { LoadingButton } from "@/features/form/submit-button";
import { authClient } from "@/lib/auth-client";
import { unwrapSafePromise } from "@/lib/promises";
import { useMutation } from "@tanstack/react-query";
import { AlertTriangle, Building2, UserX2 } from "lucide-react";
import { toast } from "sonner";

export default function DeleteProfilePage() {
  const deleteAccountMutation = useMutation({
    mutationFn: async () => {
      return unwrapSafePromise(
        authClient.deleteUser({
          callbackURL: "/goodbye",
        }),
      );
    },
  });

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <AlertTriangle className="text-destructive size-5" />
          <CardTitle className="text-xl font-semibold">
            Supprimer le compte
          </CardTitle>
        </div>
        <CardDescription className="text-muted-foreground text-base">
          Cette action supprimera définitivement votre compte et toutes les
          données associées
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-card rounded-lg border p-4">
          <div className="flex items-start gap-4">
            <UserX2 className="text-muted-foreground mt-0.5 size-5" />
            <div className="space-y-1">
              <p className="leading-none font-medium">Données personnelles</p>
              <p className="text-muted-foreground text-sm">
                Toutes vos informations personnelles et vos paramètres seront
                définitivement effacés
              </p>
            </div>
          </div>
        </div>
        <div className="bg-card rounded-lg border p-4">
          <div className="flex items-start gap-4">
            <Building2 className="text-muted-foreground mt-0.5 size-5" />
            <div className="space-y-1">
              <p className="leading-none font-medium">
                Données d’organisation
              </p>
              <p className="text-muted-foreground text-sm">
                Si vous êtes propriétaire d’une organisation, toutes ses données
                seront supprimées et les abonnements résiliés
              </p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end border-t pt-4">
        <LoadingButton
          variant="destructive"
          size="lg"
          loading={deleteAccountMutation.isPending}
          onClick={() => {
            dialogManager.confirm({
              title: "Supprimer votre compte ?",
              description:
                "Voulez-vous vraiment supprimer votre compte ?",
              confirmText: "Supprimer",
              action: {
                label: "Supprimer",
                onClick: async () => {
                  await deleteAccountMutation.mutateAsync();
                  toast.success("Votre demande de suppression a été prise en compte.", {
                    description:
                      "Consultez votre boîte e-mail pour la suite des instructions.",
                  });
                },
              },
            });
          }}
        >
          Supprimer
        </LoadingButton>
      </CardFooter>
    </Card>
  );
}
