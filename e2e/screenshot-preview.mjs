// Capture de preview locale — landing (desktop+mobile) + funnel (mobile).
// Usage : node e2e/screenshot-preview.mjs
import { chromium } from "@playwright/test";

const BASE = "http://localhost:3000";
const OUT = process.env.SCREENSHOT_DIR ?? "e2e/screenshots";

const shots = [
  { url: `${BASE}/`, file: "landing-desktop.png", viewport: { width: 1280, height: 800 }, fullPage: true },
  { url: `${BASE}/`, file: "landing-mobile.png", viewport: { width: 375, height: 812 }, fullPage: true },
  { url: `${BASE}/r/demo-snack`, file: "funnel-mobile.png", viewport: { width: 375, height: 812 }, fullPage: false },
];

const browser = await chromium.launch();
for (const shot of shots) {
  const page = await browser.newPage({ viewport: shot.viewport });
  await page.goto(shot.url, { waitUntil: "networkidle", timeout: 120_000 });
  await page.waitForTimeout(1500);
  await page.screenshot({ path: `${OUT}/${shot.file}`, fullPage: shot.fullPage });
  console.log(`ok: ${shot.file}`);
  await page.close();
}
await browser.close();
