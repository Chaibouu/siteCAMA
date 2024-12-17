"use server";

import { cookies } from "next/headers";
import { LoginSchema } from "@/schemas";
import { setMultipleCookies } from "./setMultipleCookies";

export const login = async (data: {
  email: string;
  password: string;
  rememberMe?: boolean;
}) => {
  // Valider les données avec Zod
  const validatedData = LoginSchema.safeParse(data);

  if (!validatedData.success) {
    return {
      error: validatedData.error.issues
        .map((issue) => issue.message)
        .join(", "),
    };
  }

  const { email, password, rememberMe } = validatedData.data;

  try {
    // Appeler l'API login
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/login`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, rememberMe }),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      // Afficher l'erreur envoyée par le backend
      return { error: result.error || "Erreur lors de la connexion" };
    }

    const { accessToken, refreshToken } = result;

    // Configuration des cookies pour les tokens
    const cookieStore = cookies();

    // Cookie pour le token d'accès
    await setMultipleCookies([
      {
        name: "accessToken",
        value: accessToken,
        options: {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          maxAge: 60 * 60, // 1 heure
          sameSite: "lax", // Cross-site permis
        },
      },
      {
        name: "refreshToken",
        value: refreshToken,
        options: {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          maxAge: rememberMe ? 30 * 24 * 60 * 60 : 7 * 24 * 60 * 60,
          sameSite: "lax", // Cross-site permis
        },
      },
    ]);

    return { success: "Connexion réussie" };
  } catch (error) {
    console.error("Erreur dans loginAction:", error);
    return { error: "Erreur serveur" };
  }
};
