import {
  Document,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";

/**
 * Gabarits PDF imprimables. Le QR reste noir sur blanc avec quiet zone
 * (scannabilité avant esthétique) et les gabarits restent lisibles en N&B.
 */

type TemplateProps = {
  businessName: string;
  brandColor: string;
  qrPngDataUrl: string;
  collectUrl: string;
};

const A5 = { width: 419.53, height: 595.28 }; // 148 × 210 mm en points
const STICKER = { width: 283.46, height: 283.46 }; // 100 × 100 mm

const styles = StyleSheet.create({
  chevaletPage: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#ffffff",
    padding: 28,
  },
  headerBand: {
    width: "100%",
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 12,
    alignItems: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: 700,
    color: "#ffffff",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 13,
    color: "#111111",
    textAlign: "center",
    marginTop: 14,
  },
  stars: {
    fontSize: 20,
    textAlign: "center",
    marginTop: 4,
  },
  qrBox: {
    backgroundColor: "#ffffff",
    padding: 8,
    borderWidth: 2,
    borderColor: "#111111",
    borderRadius: 12,
  },
  businessName: {
    fontSize: 16,
    fontWeight: 700,
    color: "#111111",
    textAlign: "center",
  },
  footer: {
    fontSize: 8,
    color: "#888888",
    textAlign: "center",
  },
  stickerPage: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
    padding: 14,
    gap: 8,
  },
  stickerText: {
    fontSize: 11,
    fontWeight: 700,
    color: "#111111",
    textAlign: "center",
  },
});

export const ChevaletPdf = ({
  businessName,
  brandColor,
  qrPngDataUrl,
}: TemplateProps) => (
  <Document title={`Chevalet avis Google — ${businessName}`}>
    <Page size={[A5.width, A5.height]} style={styles.chevaletPage}>
      <View style={{ ...styles.headerBand, backgroundColor: brandColor }}>
        <Text style={styles.title}>Votre avis compte !</Text>
      </View>

      <View style={{ alignItems: "center" }}>
        <Text style={styles.subtitle}>Scannez pour nous noter</Text>
        <Text style={styles.stars}>★★★★★</Text>
      </View>

      <View style={styles.qrBox}>
        <Image src={qrPngDataUrl} style={{ width: 220, height: 220 }} />
      </View>

      <Text style={styles.businessName}>{businessName}</Text>

      <Text style={styles.footer}>
        Merci pour votre visite — votre avis nous aide énormément · ScanNShine
      </Text>
    </Page>
  </Document>
);

export const StickerPdf = ({ businessName, qrPngDataUrl }: TemplateProps) => (
  <Document title={`Autocollant avis Google — ${businessName}`}>
    <Page size={[STICKER.width, STICKER.height]} style={styles.stickerPage}>
      <Text style={styles.stickerText}>Scannez, donnez votre avis ★</Text>
      <Image src={qrPngDataUrl} style={{ width: 170, height: 170 }} />
      <Text style={{ ...styles.stickerText, fontSize: 9 }}>
        {businessName}
      </Text>
    </Page>
  </Document>
);
