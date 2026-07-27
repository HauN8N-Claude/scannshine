"use client";

import { buttonVariants } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useEffect, useState } from "react";

/**
 * Barre d'action collante — MOBILE UNIQUEMENT (`lg:hidden`).
 *
 * Sur une LP longue, le lead scrolle bien au-delà du hero sans jamais avoir le
 * bouton « Commander » sous le pouce. Cette barre le garde à portée en
 * permanence : elle apparaît une fois le hero passé et s'efface près du bas de
 * page pour ne pas masquer le CTA final (tarif + footer).
 */
export const StickyMobileCta = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY;
      const viewport = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      const nearBottom = scrolled + viewport >= docHeight - 720;
      // Apparaît une fois le hero franchi, disparaît avant le CTA final.
      setVisible(scrolled > 560 && !nearBottom);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 28 }}
          className="fixed inset-x-0 bottom-0 z-50 lg:hidden"
        >
          <div className="bg-background/95 border-t px-4 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] shadow-[0_-4px_16px_-6px_rgba(0,0,0,0.15)] backdrop-blur-md">
            <div className="mx-auto flex max-w-md items-center justify-between gap-3">
              <div className="flex flex-col leading-tight">
                <span className="text-base font-bold">
                  4 990 XPF
                  <span className="text-muted-foreground ml-1 text-xs font-normal">
                    paiement unique
                  </span>
                </span>
                <span className="text-muted-foreground text-xs">
                  Livrée prête à poser
                </span>
              </div>
              <Link
                href="/commander"
                className={buttonVariants({
                  size: "lg",
                  className: "shrink-0",
                })}
              >
                Commander
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
