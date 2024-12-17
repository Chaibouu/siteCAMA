"use server";

import { SignupSchema } from "@/schemas";

export const signup = async (data: {
  name: string;
  email: string;
  password: string;
}) => {
  const validatedData = SignupSchema.safeParse(data);

  if (!validatedData.success) {
    return {
      error: validatedData.error.issues
        .map((issue) => issue.message)
        .join(", "),
    };
  }

  const { name, email, password } = validatedData.data;

  try {
    // Appeler l'API signup
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/signup`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      // Afficher l'erreur envoyée par le backend
      return { error: result.error || "Erreur lors de l'inscription" };
    }

    return { success: "Inscription réussie. Veuillez vérifier votre email." };
  } catch (error) {
    console.error("Erreur dans signupAction:", error);
    return { error: "Erreur serveur" };
  }
};
