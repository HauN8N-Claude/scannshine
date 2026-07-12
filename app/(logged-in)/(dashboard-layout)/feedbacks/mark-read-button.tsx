"use client";

import { Button } from "@/components/ui/button";
import { resolveActionResult } from "@/lib/actions/actions-utils";
import { useMutation } from "@tanstack/react-query";
import { Check } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { markFeedbackReadAction } from "./feedbacks.action";

export const MarkReadButton = ({ feedbackId }: { feedbackId: string }) => {
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: async () =>
      resolveActionResult(markFeedbackReadAction({ feedbackId })),
    onSuccess: () => router.refresh(),
    onError: (error) => toast.error(error.message),
  });

  return (
    <Button
      variant="ghost"
      size="sm"
      disabled={mutation.isPending}
      onClick={() => mutation.mutate()}
    >
      <Check className="size-4" aria-hidden />
      Marquer lu
    </Button>
  );
};
