import { db } from "@/lib/db";

// Récupérer le token en fonction du tokenId
export const getVerificationTokenByTokenId = async (tokenId: string) => {
  try {
    const verificationToken = await db.verificationToken.findUnique({
      where: { tokenId }, // Cherche par tokenId
    });

    return verificationToken;
  } catch (error) {
    console.error(
      "Erreur lors de la récupération du token de vérification par tokenId :",
      error
    );
    return null;
  }
};

// Récupérer le token en fonction du token complet
export const getVerificationTokenByToken = async (token: string) => {
  try {
    const verificationToken = await db.verificationToken.findUnique({
      where: { token }, // Cherche par le token complet
    });

    return verificationToken;
  } catch (error) {
    console.error(
      "Erreur lors de la récupération du token de vérification par token complet :",
      error
    );
    return null;
  }
};

export const getVerificationTokenByEmail = async (email: string) => {
  try {
    const verificationToken = await db.verificationToken.findFirst({
      where: { email },
    });

    return verificationToken;
  } catch {
    return null;
  }
};
