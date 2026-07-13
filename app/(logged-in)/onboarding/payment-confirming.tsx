"use client";

import { Loader } from "@/components/nowts/loader";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

/**
 * Affiché au retour du checkout Dodo tant que le webhook n'a pas encore activé
 * l'abonnement. Rafraîchit la page toutes les 3 s ; dès que le business passe
 * TRIALING/ACTIVE, la page serveur redirige vers le dashboard.
 */
export const PaymentConfirming = () => {
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      router.refresh();
    }, 3000);
    return () => clearInterval(interval);
  }, [router]);

  return (
    <div className="flex flex-col items-center gap-4 rounded-2xl border p-8 text-center">
      <Loader className="size-8" />
      <div className="flex flex-col gap-1">
        <p className="font-medium">Nous confirmons votre paiement…</p>
        <p className="text-muted-foreground text-sm">
          Votre tableau de bord s'ouvre dans quelques secondes. Ne fermez pas
          cette page.
        </p>
      </div>
    </div>
  );
};
