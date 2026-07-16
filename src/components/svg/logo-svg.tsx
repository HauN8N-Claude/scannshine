import { SiteConfig } from "@/site-config";
import Image from "next/image";
import type { ComponentPropsWithoutRef } from "react";

type LogoProps = Omit<
  ComponentPropsWithoutRef<typeof Image>,
  "src" | "alt" | "width" | "height"
> & { size?: number };

/**
 * Logo de la marque. Rend l'icône officielle (`SiteConfig.appIcon`) plutôt
 * qu'un SVG inline : une seule source de vérité pour le logo sur toute l'app
 * (landing, navigation, header de contenu, pages d'auth).
 * Pour changer le logo partout : remplacer `public/images/icon.png`.
 */
export const LogoSvg = ({ size = 32, ...props }: LogoProps) => {
  return (
    <Image
      src={SiteConfig.appIcon}
      alt={SiteConfig.title}
      width={size}
      height={size}
      {...props}
    />
  );
};
