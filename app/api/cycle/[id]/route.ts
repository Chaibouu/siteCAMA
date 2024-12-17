import { db } from "@/lib/db";
import { authorize } from "@/settings/authorization";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const authError = await authorize(req, "/api/cycle/:id");
  if (authError) return authError;

  const id = req.nextUrl.pathname.split("/").pop();

  if (!id) {
    return NextResponse.json(
      { error: "L'identifiant du cycle est requis" },
      { status: 400 }
    );
  }

  try {
    const cycle = await db.cycle.findFirst({
      where: {
        id,
        isDeleted: false, // Ne rechercher que parmi les cycles non supprimés
      },
      select: {
        id: true,
        name: true,
      },
    });

    if (!cycle) {
      return NextResponse.json(
        { error: "cycle non trouvé ou supprimé" },
        { status: 404 }
      );
    }

    return NextResponse.json({ cycle }, { status: 200 });
  } catch (error) {
    console.error("Erreur lors de la récupération du  cycle :", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const authError = await authorize(req, "/api/cycle/:id");
  if (authError) return authError;

  const id = req.nextUrl.pathname.split("/").pop();

  if (!id) {
    return NextResponse.json(
      { error: "L'identifiant du cycle est requis" },
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

    const cycleExists = await db.cycle.findFirst({
      where: {
        id,
        isDeleted: false,
      },
    });

    if (!cycleExists) {
      return NextResponse.json(
        { error: "cycle non trouvé ou supprimé" },
        { status: 404 }
      );
    }

    const cycle = await db.cycle.update({
      where: { id },
      data: {
        name,
      },
    });

    return NextResponse.json(
      { message: "cycle mis à jour avec succès", cycle },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erreur lors de la mise à jour du cycle :", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const authError = await authorize(req, "/api/cycle/:id");
  if (authError) return authError;

  const id = req.nextUrl.pathname.split("/").pop();

  if (!id) {
    return NextResponse.json(
      { error: "L'identifiant du cycle est requis" },
      { status: 400 }
    );
  }

  try {
    const cycleExists = await db.cycle.findFirst({
      where: {
        id,
        isDeleted: false,
      },
    });

    if (!cycleExists) {
      return NextResponse.json(
        { error: "cycle non trouvé ou déjà supprimé" },
        { status: 404 }
      );
    }

    const cycle = await db.cycle.update({
      where: { id },
      data: { isDeleted: true },
    });

    return NextResponse.json(
      { message: "cycle supprimé avec succès", cycle },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erreur lors de la suppression logique du cycle :", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
