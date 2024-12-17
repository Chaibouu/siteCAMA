import { db } from "@/lib/db";
import { authorize } from "@/settings/authorization";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const authError = await authorize(req, "/api/matiere/:id");
  if (authError) return authError;

  const id = req.nextUrl.pathname.split("/").pop();

  if (!id) {
    return NextResponse.json(
      { error: "L'identifiant de la matière est requis" },
      { status: 400 }
    );
  }

  try {
    const matiere = await db.matiere.findFirst({
      where: {
        id,
        isDeleted: false, // Ne rechercher que parmi les matières non supprimés
      },
      select: {
        id: true,
        name: true,
      },
    });

    if (!matiere) {
      return NextResponse.json(
        { error: "matière non trouvé ou supprimé" },
        { status: 404 }
      );
    }

    return NextResponse.json({ matiere }, { status: 200 });
  } catch (error) {
    console.error("Erreur lors de la récupération de la matière :", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const authError = await authorize(req, "/api/matiere/:id");
  if (authError) return authError;

  const id = req.nextUrl.pathname.split("/").pop();

  if (!id) {
    return NextResponse.json(
      { error: "L'identifiant de la matière est requis" },
      { status: 400 }
    );
  }

  try {
    const body = await req.json();
    let { name } = body;

    if (!name || typeof name !== "string") {
      return NextResponse.json(
        { error: "Le nom est requis et doit être une chaîne de caractères" },
        { status: 400 }
      );
    }

    const matiereExists = await db.matiere.findFirst({
      where: {
        id,
        isDeleted: false,
      },
    });

    if (!matiereExists) {
      return NextResponse.json(
        { error: "matiere non trouvé ou supprimé" },
        { status: 404 }
      );
    }

    const matiere = await db.matiere.update({
      where: { id },
      data: {
        name,
      },
    });

    return NextResponse.json(
      { message: "matiere mis à jour avec succès", matiere },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la matière :", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const authError = await authorize(req, "/api/matiere/:id");
  if (authError) return authError;

  const id = req.nextUrl.pathname.split("/").pop();

  if (!id) {
    return NextResponse.json(
      { error: "L'identifiant de la matière est requis" },
      { status: 400 }
    );
  }

  try {
    const matiereExists = await db.matiere.findFirst({
      where: {
        id,
        isDeleted: false,
      },
    });

    if (!matiereExists) {
      return NextResponse.json(
        { error: "matiere non trouvé ou déjà supprimé" },
        { status: 404 }
      );
    }

    const matiere = await db.matiere.update({
      where: { id },
      data: { isDeleted: true },
    });

    return NextResponse.json(
      { message: "matiere supprimé avec succès", matiere },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erreur lors de la suppression logique de la matière :", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
