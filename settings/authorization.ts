import { NextRequest, NextResponse } from "next/server";
import { getUserIdFromToken } from "@/lib/tokens";
import { db } from "@/lib/db";
import { permissions } from "./permissions";

export async function authorize(req: NextRequest, endpoint: string) {
  try {
    const token = req.headers.get("Authorization")?.split(" ")[1];
    if (!token) {
      return NextResponse.json({ error: "Token manquant" }, { status: 401 });
    }

    // Récupérer l'ID utilisateur depuis le token
    const userId = await getUserIdFromToken(token);
    if (!userId) {
      return NextResponse.json(
        { error: "Token invalide ou expiré" },
        { status: 403 }
      );
    }

    // Récupérer le rôle de l'utilisateur à partir de la base de données
    const user = await db.user.findUnique({
      where: { id: userId },
      select: { role: true, isDeleted: true, isActive: true },
    });

    if (!user || !user.role) {
      return NextResponse.json(
        { error: "Utilisateur introuvable ou sans rôle défini" },
        { status: 404 }
      );
    }
    if (user.isDeleted) {
      return NextResponse.json(
        { error: "Utilisateur supprimé" },
        { status: 403 }
      );
    }

    if (!user.isActive) {
      return NextResponse.json(
        { error: "Utilisateur désactivé" },
        { status: 403 }
      );
    }

    // Vérifier les permissions
    const endpointPermissions = permissions[endpoint];
    if (!endpointPermissions) {
      return NextResponse.json(
        { error: "Endpoint non configuré pour les permissions" },
        { status: 403 }
      );
    }

    const method = req.method as "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
    const permission = endpointPermissions.find(
      (perm) => perm.method === method
    );

    if (!permission || !permission.roles.includes(user.role)) {
      return NextResponse.json(
        { error: "Permission refusée pour cet utilisateur" },
        { status: 403 }
      );
    }

    return null; // Autorisation accordée
  } catch (error) {
    console.error("Erreur lors de l'autorisation :", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
