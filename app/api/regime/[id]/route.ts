import { db } from "@/lib/db";
import { authorize } from "@/settings/authorization";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const authError = await authorize(req, "/api/regime/:id");
  if (authError) return authError;

  const id = req.nextUrl.pathname.split("/").pop();

  if (!id) {
    return NextResponse.json(
      { error: "L'identifiant du regime est requis" },
      { status: 400 }
    );
  }

  try {
    const regime = await db.regime.findFirst({
      where: {
        id,
        isDeleted: false, // Ne rechercher que parmi les regimes non supprimés
      },
      select: {
        id: true,
        name: true,
      },
    });

    if (!regime) {
      return NextResponse.json(
        { error: "regime non trouvé ou supprimé" },
        { status: 404 }
      );
    }

    return NextResponse.json({ regime }, { status: 200 });
  } catch (error) {
    console.error("Erreur lors de la récupération du regime :", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const authError = await authorize(req, "/api/regime/:id");
  if (authError) return authError;

  const id = req.nextUrl.pathname.split("/").pop();

  if (!id) {
    return NextResponse.json(
      { error: "L'identifiant du regime est requis" },
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

    const regimeExists = await db.regime.findFirst({
      where: {
        id,
        isDeleted: false,
      },
    });

    if (!regimeExists) {
      return NextResponse.json(
        { error: "regime non trouvé ou supprimé" },
        { status: 404 }
      );
    }

    const regime = await db.regime.update({
      where: { id },
      data: {
        name,
      },
    });

    return NextResponse.json(
      { message: "regime mis à jour avec succès", regime },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erreur lors de la mise à jour du regime :", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const authError = await authorize(req, "/api/regime/:id");
  if (authError) return authError;

  const id = req.nextUrl.pathname.split("/").pop();

  if (!id) {
    return NextResponse.json(
      { error: "L'identifiant du regime est requis" },
      { status: 400 }
    );
  }

  try {
    const regimeExists = await db.regime.findFirst({
      where: {
        id,
        isDeleted: false,
      },
    });

    if (!regimeExists) {
      return NextResponse.json(
        { error: "regime non trouvé ou déjà supprimé" },
        { status: 404 }
      );
    }

    const regime = await db.regime.update({
      where: { id },
      data: { isDeleted: true },
    });

    return NextResponse.json(
      { message: "regime supprimé avec succès", regime },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erreur lors de la suppression logique du regime :", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
