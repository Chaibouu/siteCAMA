import { z } from "zod";

export const filiereSchema = z.object({
  name: z.string({required_error: "Le nom de la filière est requis"}),
});


export const cycleSchema = z.object({
  name: z.string({required_error: "Le nom de la filière est requis"}),
});


export const niveauSchema = z.object({
  name: z.string({required_error: "Le nom de la filière est requis"}),
});


export const regimeSchema = z.object({
  name: z.string({required_error: "Le nom de la filière est requis"}),
});


export const matiereSchema = z.object({
  name: z.string({required_error: "Le nom de la filière est requis"}),
});