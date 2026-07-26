"use server";

import { action } from "@/lib/actions/safe-actions";
import { env } from "@/lib/env";
import { sendEmail } from "@/lib/mail/send-email";
import { OrderPlaqueSchema } from "./order-plaque.schema";

export const orderPlaqueAction = action
  .inputSchema(OrderPlaqueSchema)
  .action(async ({ parsedInput }) => {
    const {
      businessName,
      contactName,
      phone,
      email,
      commune,
      deliveryAddress,
      callTime,
      backupName,
      backupPhone,
      notes,
    } = parsedInput;

    const lines = [
      `Commerce : ${businessName}`,
      `Contact : ${contactName}`,
      `Téléphone : ${phone}`,
      `Email : ${email ?? "—"}`,
      `Commune / île : ${commune}`,
      `Adresse de livraison : ${deliveryAddress}`,
      `Meilleur créneau d'appel : ${callTime ?? "—"}`,
      ``,
      `Contact en cas d'absence (livraison) :`,
      `  Nom : ${backupName}`,
      `  Téléphone : ${backupPhone}`,
      ``,
      `Notes : ${notes ?? "—"}`,
    ];

    await sendEmail({
      to: env.NEXT_PUBLIC_EMAIL_CONTACT,
      subject: `🛒 Commande plaquette ScanNShine — ${businessName} (${commune})`,
      text: lines.join("\n"),
      html: `<pre style="font-family:inherit">${lines.join("<br/>")}</pre>`,
      ...(email ? { replyTo: email } : {}),
    });

    // Mini-CRM : une ligne par lead dans Airtable. Ne doit jamais faire
    // échouer la commande — l'email ci-dessus reste la source de secours.
    if (env.AIRTABLE_API_KEY && env.AIRTABLE_BASE_ID) {
      const table = encodeURIComponent(env.AIRTABLE_TABLE_NAME ?? "Leads");
      try {
        const response = await fetch(
          `https://api.airtable.com/v0/${env.AIRTABLE_BASE_ID}/${table}`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${env.AIRTABLE_API_KEY}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              records: [
                {
                  fields: {
                    Commerce: businessName,
                    Contact: contactName,
                    "Téléphone": phone,
                    Email: email ?? "",
                    "Commune / île": commune,
                    "Adresse livraison": deliveryAddress,
                    "Créneau d'appel": callTime ?? "",
                    "Contact secours": backupName,
                    "Téléphone secours": backupPhone,
                    Notes: notes ?? "",
                    Statut: "Nouveau",
                  },
                },
              ],
              typecast: true,
            }),
          },
        );
        if (!response.ok) {
          console.error(
            "Airtable lead sync failed",
            response.status,
            await response.text(),
          );
        }
      } catch (error) {
        console.error("Airtable lead sync failed", error);
      }
    }

    // Mini-CRM Google Sheets : POST vers un webhook Apps Script qui ajoute la
    // ligne au Sheet. Même règle : ne bloque jamais la commande.
    if (env.GSHEET_WEBHOOK_URL) {
      try {
        // Content-Type text/plain : évite le preflight CORS et le rejet des
        // POST par Apps Script (qui lit de toute façon e.postData.contents).
        const response = await fetch(env.GSHEET_WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "text/plain;charset=utf-8" },
          body: JSON.stringify(parsedInput),
        });
        // Un webhook Apps Script d'un compte Google Workspace redirige l'URL
        // générique (/macros/s/) vers l'URL de domaine (/a/macros/<domaine>/) ;
        // fetch suit la redirection en GET et perd le corps → aucune ligne
        // écrite. Utiliser directement l'URL /a/macros/<domaine>/ dans l'env.
        if (!response.ok || response.redirected) {
          console.error(
            "GSheet lead sync failed",
            response.status,
            response.redirected ? "(redirected — use the /a/macros URL)" : "",
            (await response.text()).slice(0, 200),
          );
        }
      } catch (error) {
        console.error("GSheet lead sync failed", error);
      }
    }

    return { message: "Votre demande a bien été envoyée." };
  });
