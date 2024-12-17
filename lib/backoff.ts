import appConfig from "@/settings";
import { db } from "@/lib/db";

// Fonction pour calculer le délai de backoff en fonction du nombre de tentatives échouées
export function getBackoffDelay(retryCount: number): number {
  const { backoffDelayFactor } = appConfig.backoff;

  // Calcul du délai en fonction du nombre de tentatives et du facteur multiplicatif
  const delay = Math.pow(backoffDelayFactor, retryCount) * 1000; // Progression exponentielle
  return delay;
}

// Fonction pour récupérer le nombre de tentatives échouées
export async function getFailedAttempts(userId: string): Promise<number> {
  return await db.failedLoginAttempt.count({
    where: {
      userId,
    },
  });
}

// Fonction pour incrémenter le nombre de tentatives échouées pour un utilisateur
export async function incrementFailedAttempt(userId: string): Promise<void> {
  await db.failedLoginAttempt.create({
    data: {
      userId,
    },
  });
}

// Fonction pour calculer le temps restant avant de pouvoir réessayer de se connecter
export function getRemainingTime(retryCount: number): number {
  const { backoffDelayFactor } = appConfig.backoff;

  const delay = Math.pow(backoffDelayFactor, retryCount) * 1000;
  return delay;
}

// Fonction pour réinitialiser les tentatives échouées
export async function resetFailedAttempts(userId: string): Promise<void> {
  await db.failedLoginAttempt.deleteMany({
    where: {
      userId,
    },
  });
}
