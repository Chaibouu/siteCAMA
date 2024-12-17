"use server";

export async function verifyUserToken(token: string) {
  try {
    // Vérifier si le token est présent
    if (!token) {
      return { error: "Le token est manquant" };
    }
    // Envoyer une requête à /api/auth/verify avec le token
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/verify`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      }
    );

    // Vérifier si la requête a réussi
    if (!response.ok) {
      const errorData = await response.json();
      return { error: errorData.error };
    }

    const responseData = await response.json();

    // Si le compte a été vérifié avec succès
    return { success: responseData.message };
  } catch (error) {
    console.error("Erreur lors de la vérification du token :", error);
    return { error: "Erreur serveur. Veuillez réessayer plus tard." };
  }
}
