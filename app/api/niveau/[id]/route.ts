import { db } from "@/lib/db";
import { authorize } from "@/settings/authorization";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const authError = await authorize(req, "/api/niveau/:id");
  if (authError) return authError;

  const id = req.nextUrl.pathname.split("/").pop();

  if (!id) {
    return NextResponse.json(
      { error: "L'identifiant du niveau est requis" },
      { status: 400 }
    );
  }

  try {
    const niveau = await db.niveau.findFirst({
      where: {
        id,
        isDeleted: false, // Ne rechercher que parmi les niveaux non supprimés
      },
      select: {
        id: true,
        name: true,
      },
    });

    if (!niveau) {
      return NextResponse.json(
        { error: "niveau non trouvé ou supprimé" },
        { status: 404 }
      );
    }

    return NextResponse.json({ niveau }, { status: 200 });
  } catch (error) {
    console.error("Erreur lors de la récupération du niveau :", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const authError = await authorize(req, "/api/niveau/:id");
  if (authError) return authError;

  const id = req.nextUrl.pathname.split("/").pop();

  if (!id) {
    return NextResponse.json(
      { error: "L'identifiant du niveau est requis" },
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

    const niveauExists = await db.niveau.findFirst({
      where: {
        id,
        isDeleted: false,
      },
    });

    if (!niveauExists) {
      return NextResponse.json(
        { error: "niveau non trouvé ou supprimé" },
        { status: 404 }
      );
    }

    const niveau = await db.niveau.update({
      where: { id },
      data: {
        name,
      },
    });

    return NextResponse.json(
      { message: "niveau mis à jour avec succès", niveau },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erreur lors de la mise à jour du niveau :", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const authError = await authorize(req, "/api/niveau/:id");
  if (authError) return authError;

  const id = req.nextUrl.pathname.split("/").pop();

  if (!id) {
    return NextResponse.json(
      { error: "L'identifiant du niveau est requis" },
      { status: 400 }
    );
  }

  try {
    const niveauExists = await db.niveau.findFirst({
      where: {
        id,
        isDeleted: false,
      },
    });

    if (!niveauExists) {
      return NextResponse.json(
        { error: "niveau non trouvé ou déjà supprimé" },
        { status: 404 }
      );
    }

    const niveau = await db.niveau.update({
      where: { id },
      data: { isDeleted: true },
    });

    return NextResponse.json(
      { message: "niveau supprimé avec succès", niveau },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erreur lors de la suppression logique du niveau :", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
