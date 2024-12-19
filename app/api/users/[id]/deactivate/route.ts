import { db } from "@/lib/db";
import { authorize } from "@/settings/authorization";
import { NextRequest } from "next/server";

export async function PATCH(req: NextRequest) {
  const authError = await authorize(req, "/api/users/:id/deactivate");
  if (authError) return authError;

  const segments = req.nextUrl.pathname.split("/");
  const id = segments[segments.length - 2];

  try {
    const user = await db.user.update({
      where: { id },
      data: { isActive: false },
    });
    // Rechercher et supprimer toutes les sessions pour cet utilisateur
    await db.session.deleteMany({
      where: { userId: id },
    });

    return new Response(
      JSON.stringify({ message: "Utilisateur désactivé", user }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Erreur lors de la désactivation de l'utilisateur :", error);
    return new Response(JSON.stringify({ error: "Erreur serveur" }), {
      status: 500,
    });
  }
}
