import { z } from "zod";

export const LoginCredentialsFormScheme = z
  .object({
    name: z.string().min(2, "Indiquez votre nom (2 caractères minimum)"),
    email: z.string().email("Adresse e-mail invalide"),
    password: z.string().min(8, "8 caractères minimum"),
    verifyPassword: z.string().min(8, "8 caractères minimum"),
    image: z.string().optional(),
  })
  // Erreur affichée en ligne sous « Confirmer le mot de passe », plus seulement
  // via un toast au submit.
  .refine((data) => data.password === data.verifyPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["verifyPassword"],
  });

export type LoginCredentialsFormType = z.infer<
  typeof LoginCredentialsFormScheme
>;
