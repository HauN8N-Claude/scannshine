/**
 * Rate-limit léger in-memory (pas de Redis au MVP — ADR-004).
 * Suffisant pour protéger le formulaire de feedback public d'un abus simple.
 * Note : par instance serveur — acceptable pour le volume attendu.
 */

type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

const cleanup = () => {
  const now = Date.now();
  for (const [key, bucket] of buckets) {
    if (bucket.resetAt < now) buckets.delete(key);
  }
};

/**
 * @returns true si la requête est autorisée, false si la limite est atteinte
 */
export const checkRateLimit = (
  key: string,
  { max, windowMs }: { max: number; windowMs: number },
): boolean => {
  if (buckets.size > 10_000) cleanup();

  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || bucket.resetAt < now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }

  if (bucket.count >= max) {
    return false;
  }

  bucket.count++;
  return true;
};
