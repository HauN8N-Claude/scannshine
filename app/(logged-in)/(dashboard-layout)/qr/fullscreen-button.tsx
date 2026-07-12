"use client";

import { Button } from "@/components/ui/button";
import { Maximize } from "lucide-react";
import { useRef } from "react";

export const FullscreenQr = ({ qrSvg }: { qrSvg: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex flex-col items-center gap-3">
      <div
        ref={containerRef}
        className="flex w-full max-w-70 items-center justify-center rounded-2xl bg-white p-4 [&>svg]:h-auto [&>svg]:w-full"
        // SVG généré côté serveur par la lib qrcode — contenu sûr
        dangerouslySetInnerHTML={{ __html: qrSvg }}
      />
      <Button
        variant="outline"
        onClick={() => {
          void containerRef.current?.requestFullscreen().catch(() => {
            // Fullscreen refusé (iOS Safari) — le QR reste utilisable tel quel
          });
        }}
      >
        <Maximize className="size-4" aria-hidden />
        Plein écran
      </Button>
    </div>
  );
};
