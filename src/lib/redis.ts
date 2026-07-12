import Redis from "ioredis";

type RedisLike = Pick<
  Redis,
  "get" | "setex" | "del" | "keys" | "sadd" | "smembers"
>;

/**
 * In-memory fallback used when REDIS_URL is not set (local dev without Redis).
 * Implements only the subset of commands the app uses: get, setex, del, keys,
 * sadd, smembers. Do NOT rely on it in production — set REDIS_URL there.
 */
const createMemoryRedis = (): RedisLike => {
  const store = new Map<string, { value: string; expiresAt: number | null }>();
  const sets = new Map<string, Set<string>>();

  const isExpired = (key: string) => {
    const entry = store.get(key);
    if (entry?.expiresAt && entry.expiresAt < Date.now()) {
      store.delete(key);
      return true;
    }
    return false;
  };

  const patternToRegex = (pattern: string) =>
    new RegExp(
      `^${pattern.replace(/[.+^${}()|[\]\\]/g, "\\$&").replaceAll("*", ".*")}$`,
    );

  return {
    get: async (key: string) => {
      if (isExpired(key)) return null;
      return store.get(key)?.value ?? null;
    },
    setex: async (key: string, seconds: number, value: string | number) => {
      store.set(key, {
        value: String(value),
        expiresAt: Date.now() + seconds * 1000,
      });
      return "OK";
    },
    del: async (...keys: string[]) => {
      let count = 0;
      for (const key of keys.flat()) {
        if (store.delete(key)) count++;
        if (sets.delete(key)) count++;
      }
      return count;
    },
    keys: async (pattern: string) => {
      const regex = patternToRegex(pattern);
      const all = [...store.keys(), ...sets.keys()];
      return all.filter((key) => regex.test(key) && !isExpired(key));
    },
    sadd: async (key: string, ...members: (string | number)[]) => {
      const set = sets.get(key) ?? new Set<string>();
      let added = 0;
      for (const member of members.flat()) {
        const value = String(member);
        if (!set.has(value)) {
          set.add(value);
          added++;
        }
      }
      sets.set(key, set);
      return added;
    },
    smembers: async (key: string) => [...(sets.get(key) ?? [])],
  } as RedisLike;
};

const createRedisClient = (): RedisLike => {
  if (!process.env.REDIS_URL) {
    if (process.env.NODE_ENV === "production") {
      throw new Error(
        "REDIS_URL environment variable is required in production. Please set it in your .env file.",
      );
    }
    // eslint-disable-next-line no-console -- logger tslog non importé ici pour garder le module léger (utilisé par le proxy)
    console.warn(
      "[redis] REDIS_URL not set — using in-memory fallback (dev only).",
    );
    return createMemoryRedis();
  }

  return new Redis(process.env.REDIS_URL, {
    maxRetriesPerRequest: 3,
    retryStrategy: (times) => {
      if (times > 3) {
        return null;
      }
      return Math.min(times * 50, 2000);
    },
    lazyConnect: false,
  });
};

export const redisClient = createRedisClient() as Redis;
