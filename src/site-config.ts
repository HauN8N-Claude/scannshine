export const SiteConfig = {
  title: "ScanNShine",
  description:
    "Transformez vos clients satisfaits en avis Google — le QR code pensé pour les commerces de Polynésie française.",
  prodUrl: "https://scannshine.com",
  appId: "scannshine",
  domain: "scannshine.com",
  appIcon: "/images/icon.png",
  company: {
    name: "ScanNShine",
    address: "Papeete, Polynésie française",
  },
  brand: {
    primary: "#0ea5e9",
  },
  team: {
    image: "/images/icon.png",
    website: "https://scannshine.com",
    twitter: "https://twitter.com/scannshine",
    name: "ScanNShine",
  },
  features: {
    /**
     * If enable, you need to specify the logic of upload here : src/features/images/uploadImageAction.tsx
     * You can use Vercel Blob Storage : https://vercel.com/docs/storage/vercel-blob
     * Or you can use Cloudflare R2 : https://mlv.sh/cloudflare-r2-tutorial
     * Or you can use AWS S3 : https://mlv.sh/aws-s3-tutorial
     */
    enableImageUpload: true as boolean,
    /**
     * If enable, the user will be redirected to `/dashboard` when he visits the landing page at `/`
     * The logic is located in proxy.ts
     */
    enableLandingRedirection: true as boolean,
  },
};
