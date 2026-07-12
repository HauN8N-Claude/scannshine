"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { resolveActionResult } from "@/lib/actions/actions-utils";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { completeOnboardingAction } from "./onboarding.action";

export const StepQrActions = ({ slug }: { slug: string }) => {
  const router = useRouter();

  const completeMutation = useMutation({
    mutationFn: async () => resolveActionResult(completeOnboardingAction({})),
    onSuccess: () => {
      router.push("/dashboard?bienvenue=1");
      router.refresh();
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
        disabled={completeMutation.isPending}
        onClick={() => completeMutation.mutate()}
      >
        {completeMutation.isPending
          ? "Finalisation..."
          : "Accéder à mon tableau de bord"}
      </Button>
      <p className="text-muted-foreground text-center text-xs">
        Votre essai gratuit de 7 jours démarre maintenant — le paiement se
        configure depuis le tableau de bord.
      </p>
    </div>
  );
};
