import { NextResponse } from "next/server";
import { getUserIdFromToken } from "@/lib/tokens";
import { getUserById } from "@/data/user";
import { headers } from "next/headers";

// Forcer le rendu dynamique
export const dynamic = "force-dynamic";
export async function GET() {
  try {
    // Récupérer le token d'accès depuis les cookies ou l'en-tête Authorization
    const headersList = headers();
    const token = headersList.get("Authorization")?.split(" ")[1];
    if (!token) {
      return NextResponse.json({ error: "Token manquant" }, { status: 401 });
    }

    // Vérifier et récupérer l'ID utilisateur depuis le token
    const userId = await getUserIdFromToken(token);

    if (!userId) {
      return NextResponse.json(
        { error: "Token invalide ou expiré" },
        { status: 403 }
      );
    }

    // Récupérer l'utilisateur à partir de l'ID
    const user = await getUserById(userId);

    if (!user) {
      return NextResponse.json(
        { error: "Utilisateur non trouvé" },
        { status: 404 }
      );
    }

    // Retourner les informations de l'utilisateur
    return NextResponse.json({ user });
  } catch (error) {
    console.error(
      "Erreur lors de la récupération du profil utilisateur:",
      error
    );
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
