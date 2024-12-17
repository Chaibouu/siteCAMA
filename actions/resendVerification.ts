"use server";

export const resendVerification = async (email: string) => {
  try {
    // Appeler l'API resend-verification
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/resend-verification`,
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
          result.error || "Erreur lors de l'envoi de l'email de vérification",
      };
    }

    return { success: "Email de vérification renvoyé avec succès" };
  } catch (error) {
    console.error("Erreur dans resendVerificationAction:", error);
    return { error: "Erreur serveur" };
  }
};
