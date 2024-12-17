import { db } from "@/lib/db";
import { authorize } from "@/settings/authorization";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const authError = await authorize(req, "/api/filiere/:id");
  if (authError) return authError;

  const id = req.nextUrl.pathname.split("/").pop();

  if (!id) {
    return NextResponse.json(
      { error: "L'identifiant de la filière est requis" },
      { status: 400 }
    );
  }

  try {
    const filiere = await db.filiere.findFirst({
      where: {
        id,
        isDeleted: false, // Ne rechercher que parmi les filières non supprimés
      },
      select: {
        id: true,
        name: true,
      },
    });

    if (!filiere) {
      return NextResponse.json(
        { error: "Filière non trouvé ou supprimé" },
        { status: 404 }
      );
    }

    return NextResponse.json({ filiere }, { status: 200 });
  } catch (error) {
    console.error("Erreur lors de la récupération de la  filière :", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const authError = await authorize(req, "/api/filiere/:id");
  if (authError) return authError;

  const id = req.nextUrl.pathname.split("/").pop();

  if (!id) {
    return NextResponse.json(
      { error: "L'identifiant de la filière est requis" },
      { status: 400 }
    );
  }

  try {
    const body = await req.json();
    let { name, dailyRate } = body;

    if (!name || typeof name !== "string") {
      return NextResponse.json(
        { error: "Le nom est requis et doit être une chaîne de caractères" },
        { status: 400 }
      );
    }

    const filiereExists = await db.filiere.findFirst({
      where: {
        id,
        isDeleted: false,
      },
    });

    if (!filiereExists) {
      return NextResponse.json(
        { error: "filière non trouvé ou supprimé" },
        { status: 404 }
      );
    }

    const filiere = await db.filiere.update({
      where: { id },
      data: {
        name,
      },
    });

    return NextResponse.json(
      { message: "Filière mis à jour avec succès", filiere },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erreur lors de la mise à jour du filière :", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const authError = await authorize(req, "/api/filiere/:id");
  if (authError) return authError;

  const id = req.nextUrl.pathname.split("/").pop();

  if (!id) {
    return NextResponse.json(
      { error: "L'identifiant de la filière est requis" },
      { status: 400 }
    );
  }

  try {
    const filiereExists = await db.filiere.findFirst({
      where: {
        id,
        isDeleted: false,
      },
    });

    if (!filiereExists) {
      return NextResponse.json(
        { error: "Filière non trouvé ou déjà supprimé" },
        { status: 404 }
      );
    }

    const filiere = await db.filiere.update({
      where: { id },
      data: { isDeleted: true },
    });

    return NextResponse.json(
      { message: "Filière supprimé avec succès", filiere },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erreur lors de la suppression logique de la filière :", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
