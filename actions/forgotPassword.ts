"use server";

import { PasswordResetSchema } from "@/schemas";

export const forgotPassword = async (data: { email: string }) => {
  const validatedData = PasswordResetSchema.safeParse(data);

  if (!validatedData.success) {
    return {
      error: validatedData.error.issues
        .map((issue) => issue.message)
        .join(", "),
    };
  }

  const { email } = validatedData.data;

  try {
    // Appeler l'API forgot-password
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/forgot-password`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      // Afficher l'erreur envoyée par le backend
      return {
        error:
          result.error || "Erreur lors de la réinitialisation du mot de passe",
      };
    }

    return {
      success: "Un email de réinitialisation de mot de passe a été envoyé.",
    };
  } catch (error) {
    console.error("Erreur dans forgotPasswordAction:", error);
    return { error: "Erreur serveur" };
  }
};
