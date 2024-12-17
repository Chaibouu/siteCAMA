"use server";

import { cookies } from "next/headers";
import { refreshUserToken } from "@/lib/user";

export const logout = async () => {
  try {
    const cookieStore = cookies();

    // Récupérer les tokens d'accès et de rafraîchissement
    let accessToken = cookieStore.get("accessToken")?.value;
    const refreshToken = cookieStore.get("refreshToken")?.value;

    if (!accessToken && refreshToken) {
      // Tenter de rafraîchir l'accessToken si le refreshToken est disponible
      const refreshResponse = await refreshUserToken(refreshToken);
      if (refreshResponse.accessToken) {
        accessToken = refreshResponse.accessToken; // Utiliser le nouveau token
      }
    }

    // Si aucun accessToken n'est présent même après la tentative de rafraîchissement
    if (!accessToken) {
      return { error: "Impossible de se déconnecter, token d'accès manquant." };
    }

    // Appeler l'API logout et envoyer le token d'accès
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/logout`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: accessToken }),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      // Afficher l'erreur envoyée par le backend
      return { error: result.error || "Erreur lors de la déconnexion" };
    }

    // Supprimer les cookies d'accès et de rafraîchissement
    cookieStore.set("accessToken", "", { maxAge: -1, path: "/" });
    cookieStore.set("refreshToken", "", { maxAge: -1, path: "/" });

    return { success: "Déconnexion réussie" };
  } catch (error) {
    console.error("Erreur dans logoutAction:", error);
    return { error: "Erreur serveur" };
  }
};
