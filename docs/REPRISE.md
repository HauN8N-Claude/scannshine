# État du chantier — point de reprise (2026-07-12)

## Où on en est

**14/15 tâches d'implémentation terminées.** Le code est complet, typecheck ✅, lint ✅ (0 erreur), 116 tests unitaires ✅. Il reste la fin de la T15 : smoke-test HTTP des pages, puis commit final.

### Fait (code écrit, typechecké, testé)

| Zone | Détail |
|---|---|
| Setup | `.env` créé, Redis optionnel en dev (fallback in-memory `src/lib/redis.ts`), emails logués sans clé Resend (`src/lib/mail/send-email.ts`), site-config ScanNShine |
| Purge Stripe | Package retiré, webhook/billing/admin MRR supprimés, `env.ts` nettoyé, CI passée sur secrets Dodo |
| Prisma | Modèles `Business`, `ScanEvent`, `FeedbackPrivate`, `Contact` (+ enums) dans `prisma/schema/schema.prisma`, seed démo (`demo@scannshine.com`, business `/r/demo-snack`, 322 events) |
| Place ID | `src/lib/place-id.ts` + 12 tests (`__tests__/place-id.test.ts`) |
| Funnel public | `app/r/[slug]/` : page brandée zéro-JS, `/go` (log + redirect Google), `/feedback` (formulaire privé + email), `/club` (capture contact), rate-limit in-memory, dédup scans 1 h |
| Onboarding | `app/(logged-in)/onboarding/` : 3 écrans (infos+logo Blob, lien Maps→PlaceID avec fallback manuel, QR prêt) |
| Dodo Payments | `src/lib/dodo.ts`, webhook `app/api/webhooks/dodo/route.ts` (adaptateur officiel, idempotent), checkout+portail `app/(logged-in)/billing/`, gating dashboard (TRIALING/ACTIVE), page /r jamais bloquée (grâce 7 j) |
| Dashboard | `app/(logged-in)/(dashboard-layout)/` : layout+sidebar, stats (KPI + AreaChart, périodes 7/30/90 j), feedbacks (lu/non-lu, WhatsApp/tel/mail), CRM (recherche, export CSV BOM, suppression RGPD), QR (plein écran + PDF chevalet A5/sticker via @react-pdf/renderer), settings (branding + fiche Google + abonnement) |
| Landing | `app/page.tsx` réécrite en FR : hero, pain, comment-ça-marche, pricing 3 990 XPF, FAQ 6 questions (conformité Google en tête) |

## Reste à faire (fin de T15)

1. **Smoke-test HTTP** : relancer le dev server et vérifier `/`, `/r/demo-snack`, `/r/demo-snack/feedback`, `/r/inexistant` (404), `/auth/signin` répondent 200/404 correctement — la dernière correction (`resend.ts` : `||` au lieu de `??` pour la clé vide) n'a **pas encore été vérifiée au runtime**
2. Parcours manuel : signup → onboarding → dashboard (nécessite un navigateur)
3. Revue adversariale (`-x` du workflow APEX) puis résolution des findings
4. Commit final + push

## Comment relancer l'environnement local

```bash
cd scannshine
npx prisma dev          # base Postgres locale (terminal dédié) — l'URL est déjà dans .env (port 51214)
pnpm dev                # serveur Next (localhost:3000)
# si le schéma a changé : npx prisma db push && pnpm prisma:seed
```

- **Compte démo seed** : `demo@scannshine.com` (pas de mot de passe — créer un compte via signup pour tester le parcours complet)
- **Funnel démo** : http://localhost:3000/r/demo-snack

## Pièges connus (déjà rencontrés)

- Les vars `.env` vides (`""`) ne sont PAS `undefined` → utiliser `||` pas `??` pour les fallbacks (corrigé dans `resend.ts`, à garder en tête ailleurs)
- Si le proxy crashe au boot (erreur module-eval), le hot-reload ne le relance pas → tuer le process (port 3000) et relancer `pnpm dev`
- `pnpm lint` (avec --fix) convertit les CRLF→LF : le lancer avant tout commit
- Règle projet : ne jamais lancer `prisma migrate` (l'utilisateur gère) — en local jetable, `prisma db push` est utilisé
- Premier chargement d'une page en dev : compilation Turbopack > 60 s possible

## Clés à fournir avant la prod (checklist utilisateur)

- `DATABASE_URL` (Neon) + migration initiale à générer/appliquer par l'utilisateur
- `REDIS_URL` (requis en prod)
- `RESEND_API_KEY` + domaine vérifié (SPF/DKIM) + `EMAIL_FROM`
- `DODO_PAYMENTS_API_KEY`, `DODO_PAYMENTS_WEBHOOK_KEY`, `DODO_PRODUCT_ID` (produit 33,50 €/mois, trial 7 j, à créer dans le dashboard Dodo — test puis live après KYC)
- `BLOB_READ_WRITE_TOKEN` (Vercel Blob, pour les logos)
- Webhook Dodo à pointer sur `https://{domaine}/api/webhooks/dodo`
