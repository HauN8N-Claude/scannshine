import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

/**
 * Déclencheurs 2 et 3 de l'upsell « Fichier clients + Email & SMS ».
 *
 * Le CRM est le seul endroit où le gérant voit son fichier se remplir : c'est
 * là que l'offre répond à un besoin qu'il ressent déjà. Le message s'intensifie
 * avec la taille de la base (les deux paliers sont exclusifs, jamais de doublon) :
 *  - déclencheur 2 : le 1er contact est capté (la promesse devient concrète) ;
 *  - déclencheur 3 : la base est assez grosse pour qu'une campagne ait du sens.
 *
 * Bandeau discret et non bloquant (pas de redirection forcée : le gérant est en
 * train de consulter ses contacts, on ne lui coupe pas son action).
 */

const THRESHOLD = 20;

export const UpsellBanner = ({ contactCount }: { contactCount: number }) => {
  if (contactCount < 1) return null;

  const reachedThreshold = contactCount >= THRESHOLD;

  return (
    <Link
      href="/offre-crm-sms"
      className={`flex items-center gap-3 rounded-lg border p-3 text-sm transition-colors ${
        reachedThreshold
          ? "border-primary/40 bg-primary/5 hover:bg-primary/10"
          : "bg-muted/50 hover:bg-muted border-dashed"
      }`}
    >
      <Sparkles
        className={`size-4 shrink-0 ${reachedThreshold ? "text-primary" : "text-muted-foreground"}`}
        aria-hidden
      />
      <span className="text-muted-foreground flex-1">
        {reachedThreshold ? (
          <>
            <span className="text-foreground font-medium">
              {contactCount} clients dans votre fichier.
            </span>{" "}
            Un email bon plan et vous les faites revenir — activez l&rsquo;option
            Email &amp; SMS.
          </>
        ) : (
          <>
            <span className="text-foreground font-medium">
              Votre fichier clients démarre.
            </span>{" "}
            Faites revenir vos clients par email, sans payer de pub — découvrez
            l&rsquo;option.
          </>
        )}
      </span>
      <ArrowRight className="text-muted-foreground size-4 shrink-0" aria-hidden />
    </Link>
  );
};
