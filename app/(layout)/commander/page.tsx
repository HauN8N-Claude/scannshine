import GridBackground from "@/components/nowts/grid-background";
import { Typography } from "@/components/nowts/typography";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { orderPlaqueAction } from "@/features/order/order-plaque.action";
import { OrderPlaqueSchema } from "@/features/order/order-plaque.schema";
import { serverToast } from "@/lib/server-toast";
import { SiteConfig } from "@/site-config";
import { PhoneCall, ShieldCheck, Truck } from "lucide-react";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Commander ma plaquette — ScanNShine",
  description:
    "Commandez votre plaquette ScanNShine. Laissez vos coordonnées, on vous rappelle pour vérifier votre fiche Google et organiser la livraison à Tahiti.",
  alternates: {
    canonical: `${SiteConfig.prodUrl}/commander`,
  },
};

const NEXT_STEPS = [
  {
    icon: PhoneCall,
    title: "On vous rappelle",
    description:
      "Au numéro indiqué, pour confirmer votre commande et répondre à vos questions.",
  },
  {
    icon: ShieldCheck,
    title: "On vérifie votre fiche Google ensemble",
    description:
      "Bonne fiche, bon nom, bonne adresse — la plaquette est préparée et testée avant de partir.",
  },
  {
    icon: Truck,
    title: "On vous livre en main propre",
    description:
      "La plaquette arrive prête à coller. Si vous êtes absent, on s'arrange avec la personne de secours que vous nous indiquez.",
  },
] as const;

export default function CommanderPage() {
  return (
    <div className="bg-background relative isolate min-h-screen">
      <GridBackground
        size={20}
        color="color-mix(in srgb, var(--border) 30%, transparent)"
      />
      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
        <div className="bg-muted/10 relative flex items-center justify-end px-6 py-16 backdrop-blur-sm sm:py-24 lg:px-12">
          <div className="relative z-10 mx-auto w-full max-w-xl lg:mx-0 lg:max-w-lg">
            <Typography
              variant="h1"
              className="text-foreground text-4xl font-semibold tracking-tight text-pretty sm:text-5xl"
            >
              Commander ma plaquette
            </Typography>
            <Typography
              variant="p"
              className="text-muted-foreground mt-6 text-lg/8"
            >
              La plaquette ScanNShine — 4 990 XPF, paiement unique.
              Remplissez le formulaire, la suite se passe au téléphone, en
              français.
            </Typography>
            <dl className="text-muted-foreground mt-10 flex flex-col gap-6 text-base/7">
              {NEXT_STEPS.map((step) => (
                <div key={step.title} className="flex gap-x-4">
                  <dt className="flex-none">
                    <span className="sr-only">{step.title}</span>
                    <step.icon
                      aria-hidden="true"
                      className="text-primary h-6 w-6"
                    />
                  </dt>
                  <dd>
                    <span className="text-foreground font-semibold">
                      {step.title}
                    </span>
                    <br />
                    {step.description}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
        <form
          action={async (formData) => {
            "use server";

            const result = OrderPlaqueSchema.safeParse({
              businessName: formData.get("business-name"),
              contactName: formData.get("contact-name"),
              phone: formData.get("phone"),
              email: formData.get("email") ?? "",
              commune: formData.get("commune"),
              deliveryAddress: formData.get("delivery-address"),
              callTime: formData.get("call-time") ?? "",
              backupName: formData.get("backup-name"),
              backupPhone: formData.get("backup-phone"),
              notes: formData.get("notes") ?? "",
            });

            if (!result.success) {
              await serverToast(
                "Merci de vérifier les champs obligatoires",
                "error",
              );
              return;
            }

            await orderPlaqueAction(result.data);

            await serverToast(
              "Demande envoyée ! On vous rappelle très vite.",
              "success",
            );
            redirect("/commander/merci");
          }}
          className="flex w-full items-center justify-start px-6 pt-16 pb-16 sm:pt-24 lg:px-12"
        >
          <div className="w-full max-w-xl lg:mr-0 lg:max-w-lg">
            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <Label
                  htmlFor="business-name"
                  className="text-foreground block text-sm font-semibold"
                >
                  Nom du commerce *
                </Label>
                <div className="mt-2.5">
                  <Input
                    id="business-name"
                    name="business-name"
                    type="text"
                    required
                    placeholder="Snack Chez Teva"
                  />
                </div>
              </div>
              <div>
                <Label
                  htmlFor="contact-name"
                  className="text-foreground block text-sm font-semibold"
                >
                  Votre nom *
                </Label>
                <div className="mt-2.5">
                  <Input
                    id="contact-name"
                    name="contact-name"
                    type="text"
                    required
                    placeholder="Prénom et nom"
                  />
                </div>
              </div>
              <div>
                <Label
                  htmlFor="phone"
                  className="text-foreground block text-sm font-semibold"
                >
                  Votre téléphone (vini) *
                </Label>
                <div className="mt-2.5">
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    placeholder="87 12 34 56"
                  />
                </div>
              </div>
              <div>
                <Label
                  htmlFor="email"
                  className="text-foreground block text-sm font-semibold"
                >
                  Email (facultatif)
                </Label>
                <div className="mt-2.5">
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="vous@exemple.pf"
                  />
                </div>
              </div>
              <div>
                <Label
                  htmlFor="call-time"
                  className="text-foreground block text-sm font-semibold"
                >
                  Meilleur moment pour vous appeler
                </Label>
                <div className="mt-2.5">
                  <Input
                    id="call-time"
                    name="call-time"
                    type="text"
                    placeholder="Ex. : après 14h, avant le service…"
                  />
                </div>
              </div>
              <div>
                <Label
                  htmlFor="commune"
                  className="text-foreground block text-sm font-semibold"
                >
                  Commune / île *
                </Label>
                <div className="mt-2.5">
                  <Input
                    id="commune"
                    name="commune"
                    type="text"
                    required
                    placeholder="Punaauia, Tahiti"
                  />
                </div>
              </div>
              <div>
                <Label
                  htmlFor="delivery-address"
                  className="text-foreground block text-sm font-semibold"
                >
                  Adresse de livraison *
                </Label>
                <div className="mt-2.5">
                  <Input
                    id="delivery-address"
                    name="delivery-address"
                    type="text"
                    required
                    placeholder="Adresse ou point de repère du commerce"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <Typography
                  variant="p"
                  className="text-muted-foreground border-t pt-6 text-sm"
                >
                  <span className="text-foreground font-semibold">
                    En cas d'absence le jour de la livraison
                  </span>{" "}
                  — indiquez une personne de confiance (employé, associé,
                  famille) qu'on peut contacter pour remettre la plaquette et
                  encaisser le paiement.
                </Typography>
              </div>
              <div>
                <Label
                  htmlFor="backup-name"
                  className="text-foreground block text-sm font-semibold"
                >
                  Personne à contacter *
                </Label>
                <div className="mt-2.5">
                  <Input
                    id="backup-name"
                    name="backup-name"
                    type="text"
                    required
                    placeholder="Prénom et nom"
                  />
                </div>
              </div>
              <div>
                <Label
                  htmlFor="backup-phone"
                  className="text-foreground block text-sm font-semibold"
                >
                  Son téléphone *
                </Label>
                <div className="mt-2.5">
                  <Input
                    id="backup-phone"
                    name="backup-phone"
                    type="tel"
                    required
                    placeholder="87 12 34 56"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <Label
                  htmlFor="notes"
                  className="text-foreground block text-sm font-semibold"
                >
                  Un message pour nous ? (facultatif)
                </Label>
                <div className="mt-2.5">
                  <Textarea
                    id="notes"
                    name="notes"
                    rows={3}
                    placeholder="Horaires d'ouverture, précisions sur votre fiche Google…"
                  />
                </div>
              </div>
            </div>
            <div className="mt-8 flex flex-col gap-3">
              <Button type="submit" size="lg" className="w-full">
                Envoyer ma demande
              </Button>
              <p className="text-muted-foreground text-center text-xs">
                Aucun paiement en ligne : vous réglez à la livraison, une fois
                la plaquette testée devant vous. Vos coordonnées servent
                uniquement à traiter votre commande.
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
