"use server";

import { resetPasswordSchema } from "@/schemas";

export const resetPassword = async (data: {
  token: string;
  newPassword: string;
}) => {
  const validatedData = resetPasswordSchema.safeParse(data);

  if (!validatedData.success) {
    return {
      error: validatedData.error.issues
        .map((issue) => issue.message)
        .join(", "),
    };
  }

  const { token, newPassword } = validatedData.data;

  try {
    // Appeler l'API reset-password
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/reset-password`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword }),
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

    return { success: "Mot de passe réinitialisé avec succès." };
  } catch (error) {
    console.error("Erreur dans resetPasswordAction:", error);
    return { error: "Erreur serveur" };
  }
};
