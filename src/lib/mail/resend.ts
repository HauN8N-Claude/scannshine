import { Resend } from "resend";
import { env } from "../env";
import type { MailAdapter } from "./send-email";

// En dev sans clé, le constructeur reçoit un placeholder : aucun appel réseau
// n'est fait (sendEmail bascule sur le console adapter, et les contacts Resend
// sont gardés par RESEND_AUDIENCE_ID).
export const resend = new Resend(env.RESEND_API_KEY || "re_dev_placeholder");

export const resendMailAdapter: MailAdapter = {
  send: async (params) => {
    const result = await resend.emails.send(params);

    if (result.error) {
      return { error: new Error(result.error.message), data: null };
    }

    return { error: null, data: { id: result.data.id } };
  },
};
