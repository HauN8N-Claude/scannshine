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
      subject: `🛒 Commande plaque NFC — ${businessName} (${commune})`,
      text: lines.join("\n"),
      html: `<pre style="font-family:inherit">${lines.join("<br/>")}</pre>`,
      ...(email ? { replyTo: email } : {}),
    });

    return { message: "Votre demande a bien été envoyée." };
  });
