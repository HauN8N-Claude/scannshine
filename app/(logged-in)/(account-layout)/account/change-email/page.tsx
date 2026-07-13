"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form, useForm } from "@/features/form/tanstack-form";
import { authClient, useSession } from "@/lib/auth-client";
import { unwrapSafePromise } from "@/lib/promises";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { z } from "zod";

const ChangeEmailFormSchema = z.object({
  newEmail: z.string().email("Veuillez saisir une adresse e-mail valide"),
});

type ChangeEmailFormType = z.infer<typeof ChangeEmailFormSchema>;

export default function ChangeEmailPage() {
  const router = useRouter();
  const session = useSession();

  const changeEmailMutation = useMutation({
    mutationFn: async (values: ChangeEmailFormType) => {
      return unwrapSafePromise(
        authClient.changeEmail({
          newEmail: values.newEmail,
        }),
      );
    },
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success(
        "E-mail de vérification envoyé. Consultez votre boîte de réception.",
      );
      router.push("/account");
    },
  });

  const form = useForm({
    schema: ChangeEmailFormSchema,
    defaultValues: {
      newEmail: session.data?.user.email ?? "",
    },
    onSubmit: async (values) => {
      await changeEmailMutation.mutateAsync(values);
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Changer d’e-mail</CardTitle>
        <CardDescription>
          Saisissez votre nouvelle adresse e-mail. Nous vous enverrons un lien
          de vérification pour confirmer le changement.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form form={form} className="space-y-4">
          <form.AppField name="newEmail">
            {(field) => (
              <field.Field>
                <field.Label>Nouvel e-mail</field.Label>
                <field.Content>
                  <field.Input
                    type="email"
                    placeholder="nouvel-email@exemple.com"
                  />
                  <field.Message />
                </field.Content>
              </field.Field>
            )}
          </form.AppField>
          <form.SubmitButton className="w-full">
            Changer d’e-mail
          </form.SubmitButton>
        </Form>
      </CardContent>
    </Card>
  );
}
