"use server";

import { getUserInfo, refreshUserToken } from "@/lib/user";
import { cookies } from "next/headers";

export const getUser = async () => {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;

  // Si le refreshToken est absent, retourner une erreur
  if (!refreshToken) {
    return { error: "Token de rafraîchissement manquant" };
  }

  // Si l'accessToken est présent, essayer de le déchiffrer
  if (accessToken) {
    try {
      // Utiliser le token pour récupérer les informations de l'utilisateur
      const userData = await getUserInfo(accessToken);
      if (!userData.error) {
        return { user: userData };
      } else {
        return { error: userData.error };
      }
    } catch (error) {
      console.error("Erreur lors de la vérification du token d'accès:", error);
    }
  }

  // Si l'`accessToken` est absent ou invalide, tenter de rafraîchir le token d'accès
  try {
    const { accessToken: newAccessToken, accessTokenExpiresAt } =
      await refreshUserToken(refreshToken);

    const userData = await getUserInfo(newAccessToken);
    // Mettre à jour uniquement l'accessToken dans les cookies, car le refreshToken est déjà là
    if (!userData.error) {
      const tokenInfo = {
        accessToken: newAccessToken,
        expiresAt: accessTokenExpiresAt,
      };

      return { user: userData, tokenInfo };
    } else {
      return { error: userData.error };
    }
  } catch (error) {
    console.error("Erreur lors du rafraîchissement du token:", error);
    return { error: "Erreur lors du rafraîchissement" };
  }
};
