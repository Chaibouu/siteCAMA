export const refreshUserToken = async (refreshToken: string) => {
  const refreshResponse = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/refresh`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
    }
  );

  if (!refreshResponse.ok) {
    return { error: "Impossible de rafraîchir le token" };
  }
  return await refreshResponse.json();
};

export const getUserInfo = async (accessToken: string) => {
  // Utiliser le nouveau token d'accès pour récupérer les informations de l'utilisateur
  const userResponse = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/profile`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`, // Utiliser le nouveau token d'accès
      },
    }
  );

  if (!userResponse.ok) {
    return {
      error:
        "Impossible de récupérer les informations de l'utilisateur après rafraîchissement",
    };
  }
  return await userResponse.json();
};
