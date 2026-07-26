"use client";

import { Button } from "@/components/ui/button";
import { resolveActionResult } from "@/lib/actions/actions-utils";
import { useMutation } from "@tanstack/react-query";
import { Download } from "lucide-react";
import { toast } from "sonner";
import { startGuideCheckoutAction } from "./guide-checkout.action";

/**
 * Bouton d'achat du guide : déclenche le checkout Dodo (paiement unique) et
 * redirige vers la page Dodo. Désactivé pendant la redirection (anti-double-clic).
 */
export const GuideCheckoutButton = ({
  label,
  className,
  withIcon = false,
}: {
  label: string;
  className?: string;
  withIcon?: boolean;
}) => {
  const mutation = useMutation({
    mutationFn: async () => resolveActionResult(startGuideCheckoutAction({})),
    onSuccess: ({ checkoutUrl }) => {
      window.location.href = checkoutUrl;
    },
    onError: (error) => toast.error(error.message),
  });

  return (
    <Button
      size="lg"
      className={className}
      disabled={mutation.isPending}
      onClick={() => mutation.mutate()}
    >
      {withIcon ? <Download className="size-4" aria-hidden /> : null}
      {mutation.isPending ? "Redirection…" : label}
    </Button>
  );
};
