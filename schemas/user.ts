import { z } from "zod";

export const FileSchema = z
  .instanceof(File)
  .refine(
    (file) => file.size <= 5 * 1024 * 1024, // Limite de taille de 5 Mo
    { message: "Le fichier doit être inférieur à 5 Mo" }
  )
  .refine(
    (file) => ["image/png", "image/jpeg", "image/jpg"].includes(file.type), // Types autorisés
    { message: "Format de fichier non supporté. Utilisez PNG ou JPEG." }
  );

export const createUserSchema = z.object({
  name: z
    .string({
      message: "Le nom est requis",
    })
    .min(3, "Le nom doit comporter au moins 3 caractères"),
  email: z
    .string({
      message: "L'adresse email est requise",
    })
    .email("L'email doit être valide"),
  phone: z.string().optional(),
  designation: z
    .string({
      message: "La désignation est obligatoire",
    })
    .min(2, "La désignation doit comporter au moins 2 caractères"),

  // .optional(),
  address: z.string().optional(),
  dateOfBirth: z
    .date({
      required_error: "La date de naissance est requise",
    })
    .optional(),
  hiredAt: z
    .date({
      required_error: "La date d'embauche est requise",
    })
    .optional(),
  image: z.string().url("L'image doit être une URL valide").optional(),
  role: z.enum([
    "USER",
    "ADMIN",
  ]),
  isActive: z.boolean().optional(),
  isDeleted: z.boolean().optional(),
  codeInfo: z
    .string({
      message: "Le code info est requis",
    })
    .min(3, "Le code info doit comporter au moins 3 caractères"),
  gradeId: z.string({
    message: "Le grade est requis",
  }),
});

export const updateUserSchema = z.object({
  name: z.string().optional(),
  phone: z.string().optional(),
  designation: z.string().optional(),
  address: z.string().optional(),
  dateOfBirth: z
    .date({
      required_error: "La date de naissance est requise",
    })
    .optional(),
  hiredAt: z
    .date({
      required_error: "La date d'embauche est requise",
    })
    .optional(),
  // image: z.string().url("L'image doit être une URL valide").optional(),
  signature: FileSchema.optional(),
  role: z
    .enum([
      "USER",
      "ADMIN",
    ])
    .optional(),
  isActive: z.boolean().optional(),
  isDeleted: z.boolean().optional(),
  gradeId: z
    .string({
      message: "Le grade est requis",
    })
    .optional(),
  codeInfo: z.string().min(1, "Le code info est requis").optional(),
});
