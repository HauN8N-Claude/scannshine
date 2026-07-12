import { generateQrSvg, getCollectUrl } from "@/lib/qr";
import { StepQrActions } from "./step-qr-actions";

export const StepQr = async ({
  slug,
  businessName,
}: {
  slug: string;
  businessName: string;
}) => {
  const qrSvg = await generateQrSvg(slug);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col items-center gap-3 rounded-2xl border bg-white p-6">
        <div
          className="w-full max-w-55 [&>svg]:h-auto [&>svg]:w-full"
          // SVG généré côté serveur par la lib qrcode — contenu sûr
          dangerouslySetInnerHTML={{ __html: qrSvg }}
        />
        <p className="text-muted-foreground text-center text-sm">
          Scannez-le pour tester — il pointe vers la page de {businessName}
        </p>
        <p className="text-muted-foreground text-center text-xs break-all">
          {getCollectUrl(slug)}
        </p>
      </div>

      <StepQrActions slug={slug} />
    </div>
  );
};
