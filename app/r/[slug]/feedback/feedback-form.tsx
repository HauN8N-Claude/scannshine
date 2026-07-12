"use client";

import { Form, useForm } from "@/features/form/tanstack-form";
import { resolveActionResult } from "@/lib/actions/actions-utils";
import { cn } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { ContactCapture } from "../_components/contact-capture";
import { submitFeedbackAction } from "../funnel.action";
import { FeedbackFormSchema, type FeedbackFormType } from "../funnel.schema";

const RATINGS = [1, 2, 3, 4, 5] as const;

export const FeedbackForm = ({
  slug,
  businessName,
  googleReviewUrl,
}: {
  slug: string;
  businessName: string;
  googleReviewUrl: string | null;
}) => {
  const [submitted, setSubmitted] = useState(false);
  const [rating, setRating] = useState<number | null>(null);

  const mutation = useMutation({
    mutationFn: async (values: Omit<FeedbackFormType, "slug" | "rating">) =>
      resolveActionResult(
        submitFeedbackAction({ ...values, slug, rating }),
      ),
    onSuccess: () => setSubmitted(true),
    onError: (error) => toast.error(error.message),
  });

  const form = useForm({
    schema: FeedbackFormSchema.omit({ slug: true, rating: true }),
    defaultValues: {
      message: "",
      contactName: "",
      contactPhone: "",
      contactEmail: "",
    },
    onSubmit: async (values) => {
      await mutation.mutateAsync(values);
    },
  });

  if (submitted) {
    return (
      <div className="flex w-full flex-col items-center gap-6 text-center">
        <p className="text-2xl" aria-hidden>
          🙏
        </p>
        <h2 className="text-xl font-bold text-neutral-900">
          Merci pour votre franchise
        </h2>
        <p className="text-sm text-neutral-600">
          Votre message a été transmis directement au patron de {businessName}.
          Il vous lira personnellement.
        </p>

        <ContactCapture slug={slug} businessName={businessName} />

        {googleReviewUrl ? (
          <a
            href={googleReviewUrl}
            className="text-sm text-neutral-400 underline underline-offset-4"
          >
            Laisser un avis Google
          </a>
        ) : null}
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-6">
      <div className="flex flex-col gap-2 text-center">
        <h1 className="text-xl font-bold text-neutral-900">
          Dites-nous ce qui n'a pas été
        </h1>
        <p className="text-sm text-neutral-600">
          Votre message part directement au patron — il ne sera pas publié.
        </p>
      </div>

      <div className="flex justify-center gap-2">
        {RATINGS.map((value) => (
          <button
            key={value}
            type="button"
            aria-label={`Ressenti ${value} sur 5`}
            aria-pressed={rating === value}
            onClick={() => setRating(rating === value ? null : value)}
            className={cn(
              "size-11 rounded-full border text-lg transition-colors",
              rating !== null && value <= rating
                ? "border-amber-400 bg-amber-100"
                : "border-neutral-200 bg-white",
            )}
          >
            ⭐
          </button>
        ))}
      </div>

      <Form form={form} className="flex flex-col gap-4">
        <form.AppField name="message">
          {(field) => (
            <field.Field>
              <field.Content>
                <field.Textarea
                  placeholder="Racontez-nous ce qui s'est passé..."
                  rows={5}
                />
                <field.Message />
              </field.Content>
            </field.Field>
          )}
        </form.AppField>

        <details className="rounded-xl border border-neutral-200 bg-white p-3 text-sm text-neutral-600">
          <summary className="cursor-pointer font-medium">
            Laisser mes coordonnées pour être recontacté (optionnel)
          </summary>
          <div className="mt-3 flex flex-col gap-3">
            <form.AppField name="contactName">
              {(field) => (
                <field.Field>
                  <field.Content>
                    <field.Input
                      placeholder="Votre prénom"
                      autoComplete="given-name"
                    />
                    <field.Message />
                  </field.Content>
                </field.Field>
              )}
            </form.AppField>
            <form.AppField name="contactPhone">
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
            <form.AppField name="contactEmail">
              {(field) => (
                <field.Field>
                  <field.Content>
                    <field.Input
                      placeholder="Votre email"
                      type="email"
                      autoComplete="email"
                    />
                    <field.Message />
                  </field.Content>
                </field.Field>
              )}
            </form.AppField>
          </div>
        </details>

        <form.SubmitButton className="w-full rounded-2xl py-6 text-base">
          Envoyer au patron
        </form.SubmitButton>
      </Form>

      {googleReviewUrl ? (
        <a
          href={googleReviewUrl}
          className="text-center text-sm text-neutral-400 underline underline-offset-4"
        >
          Laisser un avis Google
        </a>
      ) : null}
    </div>
  );
};
