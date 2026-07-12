---
task_id: 05
title: Formulaire feedback privé + email au gérant
status: pending
priority: P0
estimated_hours: 3
prd_features: ["Funnel d'avis ⭐ (routage insatisfait)"]
archi_sections: ["Le funnel public /r/{slug}", "emails/"]
depends_on: [04]
---

# Task 05: Formulaire feedback privé + email au gérant

## Context

La branche « insatisfait » du funnel : capter le mécontentement en privé avant qu'il ne devienne un avis 1★ public. Le gérant reçoit un email immédiat.

## Requirements

- [ ] Route `app/r/[slug]/feedback/page.tsx` : message libre (obligatoire), ressenti 1-5 (optionnel), nom/téléphone/email (optionnels) « pour qu'on puisse vous recontacter »
- [ ] Server action : créer `Feedback` + `ScanEvent(type: FEEDBACK_PRIVATE)` + envoyer l'email au gérant via Resend
- [ ] Template React Email `feedback-received.tsx` : message, ressenti, coordonnées si laissées, lien vers le dashboard
- [ ] Écran de remerciement après envoi — **avec le lien « Laisser un avis Google » toujours visible** (conformité UGC : on n'empêche jamais l'accès à Google)
- [ ] Rate-limit léger sur la soumission (max 5/heure par visitorHash) — in-memory, pas de Redis
- [ ] Validation Zod (message 10-2000 chars, email/téléphone formats)

## Technical Details

**Files to create/modify:**
- `app/r/[slug]/feedback/page.tsx` + `actions.ts`
- `emails/feedback-received.tsx`
- `src/lib/rate-limit.ts` — Map in-memory avec TTL

## Acceptance Criteria

- [ ] Soumettre un feedback depuis mobile → il apparaît en DB et l'email arrive au gérant (< 1 min)
- [ ] L'email contient le message et les coordonnées
- [ ] Le lien avis Google est présent sur le formulaire ET l'écran de remerciement
- [ ] La 6ᵉ soumission dans l'heure est bloquée avec message poli

## Notes

Ton de l'UI : chaleureux et local, pas corporate. « Dites-nous ce qui n'a pas été, le patron vous lira personnellement. »
