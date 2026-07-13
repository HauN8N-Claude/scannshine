import { SiteConfig } from "@/site-config";
import type { Metadata } from "next";
import { ForgetPasswordPage } from "./forget-password-page";

export const metadata: Metadata = {
  title: `Mot de passe oublié | ${SiteConfig.title}`,
  description:
    "Réinitialisez votre mot de passe en saisissant votre adresse e-mail.",
};

export default function ForgetPassword() {
  return <ForgetPasswordPage />;
}
