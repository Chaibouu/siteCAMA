import { db } from "@/lib/db";
import { authorize } from "@/settings/authorization";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const authError = await authorize(req, "/api/filiere");
  if (authError) return authError;

  try {
    const filiere = await db.filiere.findMany({
      where: { isDeleted: false },
      select: {
        id: true,
        name: true,
      },
    });

    return NextResponse.json({ filiere }, { status: 200 });
  } catch (error) {
    console.error("Erreur lors de la récupération des filières :", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const authError = await authorize(req, "/api/filiere");
  if (authError) return authError;

  try {
    const body = await req.json();
    const { name} = body;
    if (!name) {
      return NextResponse.json({ error: "Le nom est requis" }, { status: 400 });
    }

    const filiere = await db.filiere.create({
      data: {
        name
      },
    });

    return NextResponse.json(
      { filiere, message: "La filière a été crée avec succès" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erreur lors de la création de la filière :", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
