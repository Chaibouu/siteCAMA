"use server";

import { cookies } from "next/headers";

export const refresh = async () => {
  try {
    const cookieStore = cookies();
    const refreshToken = cookieStore.get("refreshToken")?.value;

    if (!refreshToken) {
      return { error: "Token de rafraîchissement manquant" };
    }

    // Appeler l'API de rafraîchissement
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/refresh`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken }),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      // Afficher l'erreur envoyée par le backend
      return { error: result.error || "Impossible de rafraîchir le token" };
    }

    const { accessToken, accessTokenExpiresAt } = result;

    // Mettre à jour le cookie avec le nouveau token d'accès
    cookieStore.set("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      maxAge: accessTokenExpiresAt / 1000,
      path: "/",
      sameSite: "strict",
    });

    return { success: "Token rafraîchi avec succès" };
  } catch (error) {
    console.error("Erreur dans refreshAction:", error);
    return { error: "Erreur serveur" };
  }
};
