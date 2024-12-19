import { z } from "zod";

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
