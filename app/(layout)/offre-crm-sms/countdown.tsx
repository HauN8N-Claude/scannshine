"use client";

import { Clock } from "lucide-react";
import { useEffect, useState } from "react";

const STORAGE_KEY = "sns-offre-crm-sms-deadline";
const DURATION_MS = 30 * 60 * 1000;

const getDeadline = () => {
  const stored = window.localStorage.getItem(STORAGE_KEY);
  const parsed = stored ? Number(stored) : NaN;
  if (!Number.isNaN(parsed) && parsed > Date.now()) return parsed;
  const deadline = Date.now() + DURATION_MS;
  window.localStorage.setItem(STORAGE_KEY, String(deadline));
  return deadline;
};

export const CountdownBanner = () => {
  const [remaining, setRemaining] = useState<number | null>(null);

  useEffect(() => {
    const deadline = getDeadline();
    const tick = () => setRemaining(Math.max(0, deadline - Date.now()));
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  const minutes =
    remaining === null ? 30 : Math.floor(remaining / 60000);
  const seconds =
    remaining === null ? 0 : Math.floor((remaining % 60000) / 1000);
  const expired = remaining !== null && remaining <= 0;

  return (
    <div className="bg-primary text-primary-foreground flex flex-col items-center justify-center gap-1 rounded-xl px-4 py-3 text-center sm:flex-row sm:gap-3">
      <span className="flex items-center gap-2 text-sm font-medium">
        <Clock className="size-4" aria-hidden />
        {expired
          ? "L'offre de lancement vient d'expirer pour cette session."
          : "Offre de lancement réservée — elle expire dans"}
      </span>
      {expired ? null : (
        <span
          className="text-lg font-bold tabular-nums"
          aria-live="polite"
        >
          {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
        </span>
      )}
    </div>
  );
};
