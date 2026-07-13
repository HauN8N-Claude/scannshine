"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { resolveActionResult } from "@/lib/actions/actions-utils";
import { useMutation } from "@tanstack/react-query";
import { ShieldCheck } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { startCheckoutAction } from "../billing/billing.action";

export const StepQrActions = ({ slug }: { slug: string }) => {
  const checkoutMutation = useMutation({
    mutationFn: async () => resolveActionResult(startCheckoutAction({})),
    onSuccess: (data) => {
      // Redirection vers le paiement Dodo (essai 7 jours, carte requise).
      window.location.href = data.checkoutUrl;
    },
    onError: (error) => toast.error(error.message),
  });

  return (
    <div className="flex flex-col gap-3">
      <Link
        href={`/r/${slug}`}
        target="_blank"
        className={buttonVariants({ variant: "outline", className: "w-full" })}
      >
        Voir ma page de collecte
      </Link>
      <Button
        className="w-full"
        disabled={checkoutMutation.isPending}
        onClick={() => checkoutMutation.mutate()}
      >
        {checkoutMutation.isPending
          ? "Redirection vers le paiement..."
          : "Activer mon abonnement — 7 jours gratuits"}
      </Button>
      <p className="text-muted-foreground flex items-center justify-center gap-1.5 text-center text-xs">
        <ShieldCheck className="size-3.5 shrink-0" />
        Aucun débit pendant les 7 jours d'essai. Sans engagement, annulable en
        deux clics. Paiement sécurisé.
      </p>
    </div>
  );
};
