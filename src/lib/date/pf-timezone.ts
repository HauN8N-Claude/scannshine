/**
 * Helpers de dates dans le fuseau de la Polynésie française (Pacific/Tahiti,
 * UTC-10, sans heure d'été).
 *
 * En production le serveur tourne en UTC : sans ce décalage, les évènements du
 * soir local (scans, inscriptions) basculent dans le mauvais jour / mois.
 * Toute borne temporelle « journée » ou « mois » côté produit DOIT passer par
 * ces helpers plutôt que par `new Date().setHours(0,0,0,0)` (fuseau serveur).
 */
export const PF_OFFSET_MS = 10 * 60 * 60 * 1000;

/** Minuit local PF du jour de `date`, exprimé en UTC. */
export const startOfDayPF = (date: Date): Date => {
  const shifted = new Date(date.getTime() - PF_OFFSET_MS);
  shifted.setUTCHours(0, 0, 0, 0);
  return new Date(shifted.getTime() + PF_OFFSET_MS);
};

/** Premier jour du mois local PF à minuit, exprimé en UTC. */
export const startOfMonthPF = (date: Date): Date => {
  const shifted = new Date(date.getTime() - PF_OFFSET_MS);
  shifted.setUTCDate(1);
  shifted.setUTCHours(0, 0, 0, 0);
  return new Date(shifted.getTime() + PF_OFFSET_MS);
};

/** Clé de jour `YYYY-MM-DD` dans le fuseau PF. */
export const toDayKeyPF = (date: Date): string => {
  const local = new Date(date.getTime() - PF_OFFSET_MS);
  const year = local.getUTCFullYear();
  const month = String(local.getUTCMonth() + 1).padStart(2, "0");
  const day = String(local.getUTCDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};
