"use client";

import { Button } from "@/components/ui/button";
import { resolveActionResult } from "@/lib/actions/actions-utils";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { openPortalAction, startCheckoutAction } from "./billing.action";

export const StartCheckoutButton = ({ label }: { label: string }) => {
  const mutation = useMutation({
    mutationFn: async () => resolveActionResult(startCheckoutAction({})),
    onSuccess: ({ checkoutUrl }) => {
      window.location.href = checkoutUrl;
    },
    onError: (error) => toast.error(error.message),
  });

  return (
    <Button
      className="w-full"
      size="lg"
      disabled={mutation.isPending}
      onClick={() => mutation.mutate()}
    >
      {mutation.isPending ? "Redirection..." : label}
    </Button>
  );
};

export const OpenPortalButton = ({ label }: { label: string }) => {
  const mutation = useMutation({
    mutationFn: async () => resolveActionResult(openPortalAction({})),
    onSuccess: ({ portalUrl }) => {
      window.location.href = portalUrl;
    },
    onError: (error) => toast.error(error.message),
  });

  return (
    <Button
      variant="outline"
      className="w-full"
      disabled={mutation.isPending}
      onClick={() => mutation.mutate()}
    >
      {mutation.isPending ? "Ouverture..." : label}
    </Button>
  );
};
