/**
 * Résolution d'un lien Google Maps (collé par le gérant) vers un Place ID,
 * pour construire le lien d'avis Google. Aucune clé API nécessaire (ADR-003).
 *
 * Formats supportés :
 * - Liens courts partagés : https://maps.app.goo.gl/xxx, https://goo.gl/maps/xxx, https://g.co/kgs/xxx
 * - URLs longues desktop : https://www.google.com/maps/place/Nom+Du+Commerce/@-17.5,-149.5,17z/data=...!1s0x...:0x...!...19sChIJxxxx...
 * - URLs avec paramètre explicite : ?placeid=ChIJ... ou ?place_id=ChIJ...
 */

export type PlaceIdResult =
  | { placeId: string; businessName?: string }
  | { error: "UNRESOLVED" };

const MAX_REDIRECTS = 5;
const FETCH_TIMEOUT_MS = 5000;

const SHORT_LINK_HOSTS = [
  "maps.app.goo.gl",
  "goo.gl",
  "g.co",
  "maps.google.com",
  "www.google.com",
  "google.com",
  "www.google.fr",
  "google.fr",
];

const PLACE_ID_REGEX = /(ChIJ[A-Za-z0-9_-]{10,})/;
const MANUAL_PLACE_ID_REGEX = /^(ChIJ|GhIJ|EiC|Ei[A-Za-z0-9])[A-Za-z0-9_-]{8,}$/;

export const validateManualPlaceId = (value: string): boolean => {
  const trimmed = value.trim();
  return MANUAL_PLACE_ID_REGEX.test(trimmed) && trimmed.length >= 16;
};

export const buildWriteReviewUrl = (placeId: string): string =>
  `https://search.google.com/local/writereview?placeid=${encodeURIComponent(placeId)}`;

const extractBusinessName = (url: string): string | undefined => {
  const match = /\/maps\/place\/([^/@?]+)/.exec(url);
  if (!match) return undefined;
  try {
    const decoded = decodeURIComponent(match[1]).replaceAll("+", " ").trim();
    return decoded.length > 0 ? decoded : undefined;
  } catch {
    return undefined;
  }
};

const extractPlaceIdFromUrl = (rawUrl: string): string | null => {
  let url: URL;
  try {
    url = new URL(rawUrl);
  } catch {
    return null;
  }

  const explicit =
    url.searchParams.get("placeid") ?? url.searchParams.get("place_id");
  if (explicit && PLACE_ID_REGEX.test(explicit)) {
    return PLACE_ID_REGEX.exec(explicit)?.[1] ?? null;
  }

  let decoded = rawUrl;
  try {
    decoded = decodeURIComponent(rawUrl);
  } catch {
    // keep raw
  }

  // Les URLs longues encodent le Place ID dans le segment data (ex: !19sChIJ... ou 1sChIJ...)
  const match = PLACE_ID_REGEX.exec(decoded) ?? PLACE_ID_REGEX.exec(rawUrl);
  return match?.[1] ?? null;
};

const isAllowedHost = (rawUrl: string): boolean => {
  try {
    const { hostname } = new URL(rawUrl);
    return SHORT_LINK_HOSTS.some(
      (host) => hostname === host || hostname.endsWith(`.${host}`),
    );
  } catch {
    return false;
  }
};

const fetchWithTimeout = async (url: string): Promise<Response> => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    return await fetch(url, {
      redirect: "manual",
      signal: controller.signal,
      headers: {
        // Google renvoie parfois une page interstitielle aux user-agents inconnus
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36",
      },
    });
  } finally {
    clearTimeout(timeout);
  }
};

/**
 * Suit les redirections d'un lien court Google Maps et retourne l'URL finale.
 */
const followRedirects = async (startUrl: string): Promise<string | null> => {
  let currentUrl = startUrl;

  for (let hop = 0; hop < MAX_REDIRECTS; hop++) {
    let response: Response;
    try {
      // eslint-disable-next-line no-await-in-loop -- suivi séquentiel de redirections, chaque hop dépend du précédent
      response = await fetchWithTimeout(currentUrl);
    } catch {
      return null;
    }

    if (response.status >= 300 && response.status < 400) {
      const location = response.headers.get("location");
      if (!location) return currentUrl;
      currentUrl = new URL(location, currentUrl).toString();
      // L'URL de destination contient souvent déjà le Place ID — inutile de la re-fetcher
      if (extractPlaceIdFromUrl(currentUrl)) return currentUrl;
      continue;
    }

    // Certaines pages Google embarquent l'URL canonique dans le HTML
    if (response.ok && !extractPlaceIdFromUrl(currentUrl)) {
      try {
        // eslint-disable-next-line no-await-in-loop -- lecture du body de la réponse finale uniquement
        const html = await response.text();
        const canonical =
          /<meta[^>]+content="0;\s*url=([^"]+)"/i.exec(html)?.[1] ??
          /"(https:\/\/www\.google\.com\/maps\/place\/[^"]+)"/.exec(html)?.[1];
        if (canonical) {
          const unescaped = canonical.replaceAll("\\u003d", "=").replaceAll("\\u0026", "&");
          if (extractPlaceIdFromUrl(unescaped)) return unescaped;
        }
      } catch {
        // ignore body read errors
      }
    }

    return currentUrl;
  }

  return currentUrl;
};

export const resolvePlaceId = async (
  rawInput: string,
): Promise<PlaceIdResult> => {
  const input = rawInput.trim();

  // Le gérant a peut-être collé directement un Place ID
  if (validateManualPlaceId(input)) {
    return { placeId: input };
  }

  let normalized = input;
  if (!/^https?:\/\//i.test(normalized)) {
    normalized = `https://${normalized}`;
  }

  if (!isAllowedHost(normalized)) {
    return { error: "UNRESOLVED" };
  }

  // 1. Tentative directe sur l'URL fournie
  const direct = extractPlaceIdFromUrl(normalized);
  if (direct) {
    return { placeId: direct, businessName: extractBusinessName(normalized) };
  }

  // 2. Suivre les redirections (liens courts maps.app.goo.gl, g.co...)
  const finalUrl = await followRedirects(normalized);
  if (!finalUrl) {
    return { error: "UNRESOLVED" };
  }

  const resolved = extractPlaceIdFromUrl(finalUrl);
  if (resolved) {
    return { placeId: resolved, businessName: extractBusinessName(finalUrl) };
  }

  return { error: "UNRESOLVED" };
};
