"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form, useForm } from "@/features/form/tanstack-form";
import AvatarUpload from "@/features/images/avatar-upload";
import { uploadUserImageAction } from "@/features/images/upload-image.action";
import { resolveActionResult } from "@/lib/actions/actions-utils";
import { cn } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  BRAND_COLOR_PRESETS,
  BusinessInfoSchema,
} from "../../onboarding/onboarding.schema";
import { updateBusinessInfoAction } from "./settings.action";

export const SettingsForm = ({
  defaultValues,
}: {
  defaultValues: {
    name: string;
    brandColor: string;
    logoUrl: string | null;
  };
}) => {
  const router = useRouter();

  const uploadLogoMutation = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append("files", file);
      return resolveActionResult(uploadUserImageAction({ formData }));
    },
    onSuccess: (url) => form.setFieldValue("logoUrl", url),
    onError: (error) => toast.error(error.message),
  });

  const saveMutation = useMutation({
    mutationFn: async (values: {
      name: string;
      brandColor: string;
      logoUrl?: string | null;
    }) => resolveActionResult(updateBusinessInfoAction(values)),
    onSuccess: () => {
      toast.success("Réglages enregistrés");
      router.refresh();
    },
    onError: (error) => toast.error(error.message),
  });

  const form = useForm({
    schema: BusinessInfoSchema,
    defaultValues: {
      name: defaultValues.name,
      brandColor: defaultValues.brandColor,
      logoUrl: defaultValues.logoUrl,
    },
    onSubmit: async (values) => {
      await saveMutation.mutateAsync(values);
    },
  });

  return (
    <Form form={form}>
      <Card>
        <CardHeader>
          <CardTitle>Mon commerce</CardTitle>
          <CardDescription>
            Nom, logo et couleur de votre page de collecte et de vos affiches.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          <form.AppField name="logoUrl">
            {(field) => (
              <div className="flex flex-col items-start gap-2">
                <AvatarUpload
                  onChange={(file) => uploadLogoMutation.mutate(file)}
                  onRemove={() => field.setValue(null)}
                  initialFile={field.state.value ?? undefined}
                  isPending={uploadLogoMutation.isPending}
                />
              </div>
            )}
          </form.AppField>

          <form.AppField name="name">
            {(field) => (
              <field.Field>
                <field.Label>Nom du commerce</field.Label>
                <field.Content>
                  <field.Input />
                  <field.Message />
                </field.Content>
              </field.Field>
            )}
          </form.AppField>

          <form.AppField name="brandColor">
            {(field) => (
              <field.Field>
                <field.Label>Couleur</field.Label>
                <field.Content>
                  <div className="flex items-center gap-2">
                    {BRAND_COLOR_PRESETS.map((color) => (
                      <button
                        key={color}
                        type="button"
                        aria-label={`Couleur ${color}`}
                        onClick={() => field.setValue(color)}
                        className={cn(
                          "size-8 rounded-full border-2 transition-transform",
                          field.state.value === color
                            ? "border-foreground scale-110"
                            : "border-transparent",
                        )}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                    <input
                      type="color"
                      aria-label="Couleur personnalisée"
                      value={field.state.value}
                      onChange={(event) => field.setValue(event.target.value)}
                      className="size-8 cursor-pointer rounded-full border p-0.5"
                    />
                  </div>
                  <field.Message />
                </field.Content>
              </field.Field>
            )}
          </form.AppField>
        </CardContent>
        <CardFooter>
          <form.SubmitButton>Enregistrer</form.SubmitButton>
        </CardFooter>
      </Card>
    </Form>
  );
};
