import { db } from "@/lib/db";
import { authorize } from "@/settings/authorization";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const authError = await authorize(req, "/api/niveau");
  if (authError) return authError;

  try {
    const niveau = await db.niveau.findMany({
      where: { isDeleted: false },
      select: {
        id: true,
        name: true,
      },
    });

    return NextResponse.json({ niveau }, { status: 200 });
  } catch (error) {
    console.error("Erreur lors de la récupération des niveaux :", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const authError = await authorize(req, "/api/niveau");
  if (authError) return authError;

  try {
    const body = await req.json();
    const { name} = body;
    if (!name) {
      return NextResponse.json({ error: "Le nom est requis" }, { status: 400 });
    }

    const niveau = await db.niveau.create({
      data: {
        name
      },
    });

    return NextResponse.json(
      { niveau, message: "Le niveau a été crée avec succès" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erreur lors de la création du niveau :", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
