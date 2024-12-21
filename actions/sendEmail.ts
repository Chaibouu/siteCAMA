"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";

import { db } from "@/lib/db";
import { SendEmailSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";
import { sendVerificationEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/tokens";

export const sendEmail = async (values: z.infer<typeof SendEmailSchema>) => {
  const validatedFields = SendEmailSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { nom, prenom, email, message } = validatedFields.data;
 




  return { success: "Email envoyer avec succès!" };
};