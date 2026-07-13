"use client";

import { LoadingButton } from "@/features/form/submit-button";
import { authClient } from "@/lib/auth-client";
import { getCallbackUrl } from "@/lib/auth/auth-utils";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

export function SignInOtpPage() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const otp = searchParams.get("otp");
  const callbackUrl = searchParams.get("callbackUrl");

  useEffect(() => {
    const verifyOtp = async () => {
      if (!email || !otp) {
        toast.error("Paramètres e-mail ou code manquants");
        window.location.href = "/auth/signin?error=missing-params";
        return;
      }

      try {
        await authClient.signIn.emailOtp({
          email,
          otp,
        });

        toast.success("Connexion réussie");
        const redirectUrl = getCallbackUrl(callbackUrl ?? "/dashboard");
        window.location.href = redirectUrl;
      } catch {
        toast.error("Code invalide ou expiré");
        window.location.href = "/auth/signin?error=invalid-otp";
      }
    };

    void verifyOtp();
  }, [email, otp, callbackUrl]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <LoadingButton loading className="w-32">
          Vérification…
        </LoadingButton>
        <p className="text-muted-foreground text-sm">
          Veuillez patienter pendant la vérification de votre code
        </p>
      </div>
    </div>
  );
}
