import { db } from "@/lib/db";
import { updateUserSchema } from "@/schemas/user";
import { authorize } from "@/settings/authorization";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const authError = await authorize(req, "/api/users/:id");
  if (authError) return authError;

  const id = req.nextUrl.pathname.split("/").pop(); // Récupérer l'ID depuis l'URL

  try {
    const user = await db.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        designation: true,
        address: true,
        dateOfBirth: true,
        hiredAt: true,
        isActive: true,
        role: true,
        Grade: true,
        codeInfo: true,
      },
    });

    if (!user) {
      return new Response(JSON.stringify({ error: "Utilisateur non trouvé" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify({ user }), { status: 200 });
  } catch (error) {
    console.error("Erreur lors de la récupération de l'utilisateur :", error);
    return new Response(JSON.stringify({ error: "Erreur serveur" }), {
      status: 500,
    });
  }
}

export async function PUT(req: NextRequest) {
  const authError = await authorize(req, "/api/users/:id");
  if (authError) return authError;

  const id = req.nextUrl.pathname.split("/").pop(); // Récupérer l'ID depuis l'URL

  try {
    const body = await req.json();
    body.dateOfBirth = body.dateOfBirth
      ? new Date(body.dateOfBirth)
      : undefined;
    body.hiredAt = body.hiredAt ? new Date(body.hiredAt) : undefined;
    // Valider les données avec Zod
    const parsedData = updateUserSchema.parse(body);
    const role = parsedData?.role;
    // Vérification pour DIR_RH et DIR_FINANCE
    if (role && ["DIR_RH", "DIR_FINANCE"].includes(role)) {
      const roleLabel =
        role === "DIR_RH"
          ? "Le Directeur des Ressources Humaines"
          : "Le Directeur Financier et Comptable";

      const existingUser = await db.user.findFirst({
        where: {
          role,
          NOT: { id },
        },
      });

      if (existingUser) {
        return NextResponse.json(
          {
            error: `${roleLabel} existe déjà. Un seul utilisateur peut être assigné à ce rôle.`,
          },
          { status: 400 }
        );
      }
    }

    // Mettre à jour l'utilisateur
    const updatedUser = await db.user.update({
      where: { id },
      data: parsedData,
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        designation: true,
        address: true,
        dateOfBirth: true,
        hiredAt: true,
        isActive: true,
        role: true,
        codeInfo: true,
      },
    });

    return new Response(
      JSON.stringify({
        message: "Utilisateur mis à jour avec succès",
        user: updatedUser,
      }),
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Error && error.name === "ZodError") {
      return new Response(
        JSON.stringify({
          error: "Erreur de validation des données",
        }),
        { status: 400 }
      );
    }

    console.error("Erreur lors de la mise à jour de l'utilisateur :", error);
    return new Response(JSON.stringify({ error: "Erreur serveur" }), {
      status: 500,
    });
  }
}

export async function DELETE(req: NextRequest) {
  const authError = await authorize(req, "/api/users/:id");
  if (authError) return authError;

  const id = req.nextUrl.pathname.split("/").pop(); // Récupérer l'ID depuis l'URL

  try {
    const updatedUser = await db.user.update({
      where: { id },
      data: {
        isDeleted: true,
        email: `deleted-${id}@example.com`, // Prévention des collisions d'email
      },
    });

    // Rechercher et supprimer toutes les sessions pour cet utilisateur
    await db.session.deleteMany({
      where: { userId: id },
    });

    return new Response(
      JSON.stringify({
        message: "Utilisateur supprimé avec succès",
        user: updatedUser,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Erreur lors de la suppression logique :", error);
    return new Response(JSON.stringify({ error: "Erreur serveur" }), {
      status: 500,
    });
  }
}
