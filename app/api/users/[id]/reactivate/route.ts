import { db } from "@/lib/db";
import { authorize } from "@/settings/authorization";
import { NextRequest } from "next/server";

export async function PATCH(req: NextRequest) {
  const authError = await authorize(req, "/api/users/:id/reactivate");
  if (authError) return authError;

  const segments = req.nextUrl.pathname.split("/");
  const id = segments[segments.length - 2];

  try {
    const user = await db.user.update({
      where: { id },
      data: { isActive: true },
    });

    return new Response(
      JSON.stringify({ message: "Utilisateur réactivé", user }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Erreur lors de la réactivation de l'utilisateur :", error);
    return new Response(JSON.stringify({ error: "Erreur serveur" }), {
      status: 500,
    });
  }
}
