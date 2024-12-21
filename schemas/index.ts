import * as z from "zod";
import { UserRole } from "@prisma/client";

export const SettingsSchema = z
  .object({
    name: z.optional(z.string()),
    isTwoFactorEnabled: z.optional(z.boolean()),
    role: z.enum([UserRole.ADMIN, UserRole.USER]),
    email: z.optional(z.string().email()),
    password: z.optional(z.string().min(6)),
    newPassword: z.optional(z.string().min(6)),
  })
  .refine(
    (data) => {
      if (data.password && !data.newPassword) {
        return false;
      }

      return true;
    },
    {
      message: "New password is required!",
      path: ["newPassword"],
    }
  )
  .refine(
    (data) => {
      if (data.newPassword && !data.password) {
        return false;
      }

      return true;
    },
    {
      message: "Password is required!",
      path: ["password"],
    }
  );

// Schéma pour l'action forgot-password
export const PasswordResetSchema = z.object({
  email: z.string().email({ message: "L'adresse email n'est pas valide" }),
});

// Schéma pour l'action reset-password
export const resetPasswordSchema = z.object({
  token: z.string().optional(),
  newPassword: z
    .string({
      message: "Le mot de passe est requis",
    })
    .min(8, {
      message: "Le mot de passe doit contenir au moins 8 caractères",
    }),
});

export const LoginSchema = z.object({
  email: z.string().email({
    message: "L'adresse email n'est pas valide",
  }),
  password: z
    .string({
      message: "Le mot de passe est requis",
    })
    .min(8, {
      message: "Le mot de passe doit contenir au moins 8 caractères",
    }),
  code: z.optional(z.string()),
  rememberMe: z.boolean().optional(),
});

export const SignupSchema = z.object({
  email: z.string().email({
    message: "L'adresse email n'est pas valide",
  }),
  password: z
    .string({
      message: "Le mot de passe est requis",
    })
    .min(8, {
      message: "Le mot de passe doit comporter au moins 8 caractères",
    }),
  name: z
    .string({
      message: "Le nom est requis",
    })
    .min(3, {
      message: "Le nom doit comporter au moins 3 caractères",
    }),
});

export const ResendVerificationSchema = z.object({
  email: z.string().email({
    message: "L'adresse email n'est pas valide",
  }),
});

export const ResetPasswordSchema = z.object({
  token: z.string({
    message: "Le token est requis",
  }),
  newPassword: z
    .string({
      message: "Le mot de passe est requis",
    })
    .min(8, {
      message: "Le mot de passe doit comporter au moins 8 caractères",
    }),
});

export const SendEmailSchema = z.object({
  nom: z.string().min(1,{
    message: "Veuillez entrer un Nom",
  }),
  prenom: z.string().min(1,{
    message: "Veuillez entrer un prénom",
  }),
  email: z.string().email({
    message: "Veuillez entrer votre Email",
  }),
  message: z.string().min(1,{
    message: "Veuillez entrer votre Message",
  }),
  
});
