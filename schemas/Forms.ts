import { z } from "zod";



export const UserSchema = z.object({
  name: z.string().min(1, "Le nom est requis"), // Chaîne non vide
  email: z.string().email("L'email n'est pas valide"), // Email valide
  phone: z
    .string()
    .regex(/^[0-9]+$/, "Le téléphone doit contenir uniquement des chiffres")
    .min(8, "Le numéro de téléphone doit avoir au moins 8 chiffres"),
  designation: z.string().min(1, "La désignation est requise"), // Chaîne non vide
  address: z.string().optional(), // Chaîne facultative
  // dateOfBirth: z
  //   .string()
  //   .regex(
  //     /^\d{4}-\d{2}-\d{2}$/,
  //     "La date de naissance doit être au format AAAA-MM-JJ"
  //   ), // Format date ISO
  // image: z.string().url("L'image doit être une URL valide").optional(), // URL facultative
  // role: z.string().min(1, "Le rôle est requis"), // Chaîne non vide
  image: z
  .instanceof(File) // Valide si c'est une instance de `File`
  .optional(), // Facultatif si une image peut ne pas être incluse
  isActive: z.boolean().optional(),
  isDeleted: z.boolean().optional(),
  role: z.enum([
    "USER",
    "ADMIN",
  ]),
  dateOfBirth: z
  .date({
    required_error: "La date de naissance est requise",
  })
  .optional(),
});




export const CategoriPlantSchema = z.object({
  name: z.string({required_error: "Le nom de la catégorie de la plante est requis"}),
});


// export const PlantSchema = z.object({
//   name: z.string({required_error: "Le nom de la plante est requis"}),
//   price: z.string({required_error: "Le prix de la plante est requis"}),
//   categori: z.string({required_error: "Le prix de la plante est requis"}),
//   imageUrl: z.string({required_error: "L'image de la plante est requis"}),
// });

export const PlantSchema = z.object({
  name: z.string().min(1, "Le nom est requis"),
  price: z.string().min(1, "Le prix est requis"),
  categoryId: z.string().min(1, "La catégorie est requise"),
  imageUrl: z
    .instanceof(File) // Valide si c'est une instance de `File`
    .optional(), // Facultatif si une image peut ne pas être incluse
});
