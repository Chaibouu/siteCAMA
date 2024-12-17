import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { verifyEncryptedJWT } from "@/lib/tokens"; // Utiliser la fonction pour déchiffrer le JWT

export async function POST(req: Request) {
  try {
    // Récupérer le token depuis le corps de la requête
    const { token } = await req.json();

    if (!token) {
      return NextResponse.json(
        { error: "Token d'accès manquant" },
        { status: 400 }
      );
    }

    // Décrypter et vérifier le token
    const decryptedToken = verifyEncryptedJWT(token);
    if (!decryptedToken) {
      return NextResponse.json(
        { error: "Token d'accès invalide ou non décryptable" },
        { status: 400 }
      );
    }

    // Extraire l'ID utilisateur du token décrypté
    const { userId } = decryptedToken as { userId: string };

    // Rechercher et supprimer toutes les sessions pour cet utilisateur
    await db.session.deleteMany({
      where: { userId },
    });

    // Réponse de succès
    return NextResponse.json(
      { message: "Déconnexion réussie" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erreur lors de la déconnexion :", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
