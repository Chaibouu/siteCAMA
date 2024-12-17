import { db } from "@/lib/db";

import { Session } from "@prisma/client"; // Importer les types Prisma générés automatiquement

// Correction de la fonction avec typage adéquat
export const createSession = async (sessionData: Omit<Session, "id">) => {
  return await db.session.create({
    data: sessionData,
  });
};

// Supprimer une session utilisateur
export const deleteSession = async (sessionToken: string) => {
  return await db.session.deleteMany({ where: { sessionToken } });
};

// Récupérer une session par token de rafraîchissement
export const getSessionByRefreshToken = async (refreshToken: string) => {
  return await db.session.findUnique({ where: { refreshToken } });
};
