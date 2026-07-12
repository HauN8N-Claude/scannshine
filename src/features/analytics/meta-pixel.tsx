"use client";

import { env } from "@/lib/env";
import Script from "next/script";

declare global {
   
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

type MetaPixelEvent = "CompleteRegistration" | "StartTrial";

/**
 * Envoie un événement standard au pixel Meta (cf. docs/meta-ads.md §6).
 * No-op si le pixel n'est pas chargé (env absente, bloqueur de pub...).
 */
export const trackMetaEvent = (event: MetaPixelEvent) => {
  window.fbq?.("track", event);
};

/**
 * Charge le script du pixel Meta et envoie le PageView initial.
 * Rendu dans le layout racine. Ne rend rien si NEXT_PUBLIC_META_PIXEL_ID
 * est absente ou vide ("" en env non renseignée).
 */
export const MetaPixel = () => {
  const pixelId = env.NEXT_PUBLIC_META_PIXEL_ID;

  if (!pixelId) {
    return null;
  }

  return (
    <Script id="meta-pixel" strategy="afterInteractive">
      {`!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${pixelId}');
fbq('track', 'PageView');`}
    </Script>
  );
};
