import { NextRequest, NextResponse } from "next/server";
import appConfig from "@/settings";

const rateLimitMap = new Map<string, { count: number; lastRequest: number }>();

export async function applyRateLimit(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") || req.ip || "127.0.0.1";
  const { max, windowMs } = appConfig.rateLimit;

  // Vérifier si l'IP a déjà fait des requêtes
  if (!rateLimitMap.has(ip)) {
    rateLimitMap.set(ip, { count: 1, lastRequest: Date.now() });
  } else {
    const requestInfo = rateLimitMap.get(ip)!;

    // Nettoyer les anciennes IPs pour éviter l'accumulation de données
    cleanUpRateLimitMap(windowMs);

    // Si la dernière requête est encore dans la fenêtre de temps
    if (Date.now() - requestInfo.lastRequest < windowMs) {
      requestInfo.count += 1;

      // Bloquer si la limite est atteinte
      if (requestInfo.count > max) {
        return NextResponse.json(
          { error: "Trop de requêtes, veuillez réessayer plus tard." },
          { status: 429 }
        );
      }
    } else {
      // Réinitialiser le compteur si la fenêtre est écoulée
      requestInfo.count = 1;
    }

    requestInfo.lastRequest = Date.now();
  }

  return null; // Permettre la requête si la limite n'est pas atteinte
}

// Fonction pour nettoyer les IPs dont la fenêtre est expirée
function cleanUpRateLimitMap(windowMs: number) {
  const now = Date.now();
  // Utilisation de Array.from() pour convertir les entrées de la Map en tableau
  for (const [ip, requestInfo] of Array.from(rateLimitMap.entries())) {
    if (now - requestInfo.lastRequest > windowMs) {
      rateLimitMap.delete(ip);
    }
  }
}
