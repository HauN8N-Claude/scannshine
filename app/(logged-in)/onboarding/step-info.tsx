"use client";

import { Form, useForm } from "@/features/form/tanstack-form";
import AvatarUpload from "@/features/images/avatar-upload";
import { uploadUserImageAction } from "@/features/images/upload-image.action";
import { resolveActionResult } from "@/lib/actions/actions-utils";
import { cn } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { saveBusinessInfoAction } from "./onboarding.action";
import {
  BRAND_COLOR_PRESETS,
  BusinessInfoSchema,
} from "./onboarding.schema";

export const StepInfo = ({
  defaultValues,
}: {
  defaultValues: {
    name: string;
    brandColor: string;
    logoUrl: string | null;
  } | null;
}) => {
  const router = useRouter();

  const uploadLogoMutation = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append("files", file);
      return resolveActionResult(uploadUserImageAction({ formData }));
    },
    onSuccess: (url) => {
      form.setFieldValue("logoUrl", url);
      toast.success("Logo ajouté !");
    },
    onError: (error) => toast.error(error.message),
  });

  const saveMutation = useMutation({
    mutationFn: async (values: {
      name: string;
      brandColor: string;
      logoUrl?: string | null;
    }) => resolveActionResult(saveBusinessInfoAction(values)),
    onSuccess: () => {
      router.push("/onboarding?etape=2");
      router.refresh();
    },
    onError: (error) => toast.error(error.message),
  });

  const form = useForm({
    schema: BusinessInfoSchema,
    defaultValues: {
      name: defaultValues?.name ?? "",
      brandColor: defaultValues?.brandColor ?? BRAND_COLOR_PRESETS[0],
      logoUrl: defaultValues?.logoUrl ?? null,
    },
    onSubmit: async (values) => {
      await saveMutation.mutateAsync(values);
    },
  });

  return (
    <Form form={form} className="flex flex-col gap-6">
      <form.AppField name="logoUrl">
        {(field) => (
          <div className="flex flex-col items-center gap-2">
            <AvatarUpload
              onChange={(file) => uploadLogoMutation.mutate(file)}
              onRemove={() => field.setValue(null)}
              initialFile={field.state.value ?? undefined}
              isPending={uploadLogoMutation.isPending}
            />
            <p className="text-muted-foreground text-xs">
              Votre logo (optionnel)
            </p>
          </div>
        )}
      </form.AppField>

      <form.AppField name="name">
        {(field) => (
          <field.Field>
            <field.Label>Le nom de votre commerce</field.Label>
            <field.Content>
              <field.Input placeholder="Ex : Snack Chez Maeva" />
              <field.Message />
            </field.Content>
          </field.Field>
        )}
      </form.AppField>

      <form.AppField name="brandColor">
        {(field) => (
          <field.Field>
            <field.Label>Votre couleur</field.Label>
            <field.Content>
              <div className="flex items-center gap-2">
                {BRAND_COLOR_PRESETS.map((color) => (
                  <button
                    key={color}
                    type="button"
                    aria-label={`Couleur ${color}`}
                    onClick={() => field.setValue(color)}
                    className={cn(
                      "size-9 rounded-full border-2 transition-transform",
                      field.state.value === color
                        ? "scale-110 border-foreground"
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
                  className="size-9 cursor-pointer rounded-full border p-1"
                />
              </div>
              <field.Message />
            </field.Content>
          </field.Field>
        )}
      </form.AppField>

      <form.SubmitButton className="w-full">Continuer</form.SubmitButton>
    </Form>
  );
};
