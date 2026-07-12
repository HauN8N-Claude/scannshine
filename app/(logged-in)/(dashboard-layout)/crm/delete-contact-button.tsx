"use client";

import { Button } from "@/components/ui/button";
import { dialogManager } from "@/features/dialog-manager/dialog-manager";
import { resolveActionResult } from "@/lib/actions/actions-utils";
import { useMutation } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { deleteContactAction } from "./crm.action";

export const DeleteContactButton = ({
  contactId,
  contactLabel,
}: {
  contactId: string;
  contactLabel: string;
}) => {
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: async () =>
      resolveActionResult(deleteContactAction({ contactId })),
    onSuccess: () => {
      toast.success("Contact supprimé");
      router.refresh();
    },
    onError: (error) => toast.error(error.message),
  });

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label={`Supprimer ${contactLabel}`}
      onClick={() => {
        dialogManager.confirm({
          title: "Supprimer ce contact ?",
          description: `${contactLabel} sera définitivement retiré de votre base. Cette action est irréversible (droit à l'effacement).`,
          variant: "destructive",
          action: {
            label: "Supprimer",
            onClick: () => {
              mutation.mutate();
            },
          },
        });
      }}
    >
      <Trash2 className="size-4" aria-hidden />
    </Button>
  );
};
