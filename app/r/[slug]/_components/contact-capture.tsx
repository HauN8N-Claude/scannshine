"use client";

import { Button } from "@/components/ui/button";
import { Form, useForm } from "@/features/form/tanstack-form";
import { resolveActionResult } from "@/lib/actions/actions-utils";
import { useMutation } from "@tanstack/react-query";
import { PartyPopper } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { saveContactAction } from "../funnel.action";
import { ContactCaptureClientSchema } from "../funnel.schema";

export const ContactCapture = ({
  slug,
  businessName,
}: {
  slug: string;
  businessName: string;
}) => {
  const [dismissed, setDismissed] = useState(false);
  const [saved, setSaved] = useState(false);

  const mutation = useMutation({
    mutationFn: async (values: {
      name?: string;
      phone?: string;
      email?: string;
      consent: boolean;
    }) =>
      resolveActionResult(
        saveContactAction({
          slug,
          name: values.name,
          phone: values.phone,
          email: values.email,
          consent: values.consent as true,
        }),
      ),
    onSuccess: () => setSaved(true),
    onError: (error) => toast.error(error.message),
  });

  const form = useForm({
    schema: ContactCaptureClientSchema,
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      consent: false as unknown as true,
    },
    onSubmit: async (values) => {
      await mutation.mutateAsync(values);
    },
  });

  if (dismissed) return null;

  if (saved) {
    return (
      <div className="flex items-center justify-center gap-2 rounded-2xl border border-neutral-200 bg-white p-4 text-sm text-neutral-600">
        <PartyPopper className="size-4" aria-hidden />
        C'est noté — à bientôt chez {businessName}&nbsp;!
      </div>
    );
  }

  return (
    <Form
      form={form}
      className="flex w-full flex-col gap-3 rounded-2xl border border-neutral-200 bg-white p-4 text-left shadow-sm"
    >
      <p className="text-sm font-semibold text-neutral-800">
        🎁 Recevez les bons plans de {businessName}
      </p>

      <form.AppField name="name">
        {(field) => (
          <field.Field>
            <field.Content>
              <field.Input
                placeholder="Votre prénom (optionnel)"
                autoComplete="given-name"
              />
              <field.Message />
            </field.Content>
          </field.Field>
        )}
      </form.AppField>

      <form.AppField name="phone">
        {(field) => (
          <field.Field>
            <field.Content>
              <field.Input
                placeholder="Votre vini (ex : 87 12 34 56)"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
              />
              <field.Message />
            </field.Content>
          </field.Field>
        )}
      </form.AppField>

      <form.AppField name="email">
        {(field) => (
          <field.Field>
            <field.Content>
              <field.Input
                placeholder="ou votre email"
                type="email"
                autoComplete="email"
              />
              <field.Message />
            </field.Content>
          </field.Field>
        )}
      </form.AppField>

      <form.AppField name="consent">
        {(field) => (
          <field.Field>
            <field.Content>
              <div className="flex items-start gap-2">
                <field.Checkbox className="mt-0.5" />
                <field.Label className="text-xs font-normal text-neutral-500">
                  J'accepte de recevoir les offres et actualités de{" "}
                  {businessName} par SMS et/ou e-mail. Je peux me désinscrire à
                  tout moment (STOP par SMS, lien de désinscription par e-mail).
                </field.Label>
              </div>
              <field.Message />
            </field.Content>
          </field.Field>
        )}
      </form.AppField>

      <div className="flex gap-2">
        <form.SubmitButton className="flex-1">Je m'inscris</form.SubmitButton>
        <Button
          type="button"
          variant="ghost"
          onClick={() => setDismissed(true)}
        >
          Non merci
        </Button>
      </div>
    </Form>
  );
};
