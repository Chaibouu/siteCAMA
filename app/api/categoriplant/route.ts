import { db } from "@/lib/db";
import { authorize } from "@/settings/authorization";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const authError = await authorize(req, "/api/categoriplant");
  if (authError) return authError;

  try {
    const categoriplant = await db.category.findMany({
      where: { isDeleted: false },
      select: {
        id: true,
        name: true,
      },
    });

    return NextResponse.json({ categoriplant }, { status: 200 });
  } catch (error) {
    console.error("Erreur lors de la récupération des catégories de plante :", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const authError = await authorize(req, "/api/categoriplant");
  if (authError) return authError;

  try {
    const body = await req.json();
    const { name, description} = body;
    if (!name) {
      return NextResponse.json({ error: "Le nom est requis" }, { status: 400 });
    }

    // Vérification si une categorie de plante avec le même nom existe (même supprimé)
    const existingCategoriPlant = await db.category.findFirst({
      where: { name }, // Recherche par nom
    });

    if (existingCategoriPlant) {
      if (existingCategoriPlant.isDeleted) {
        // Si la categorie de plante existe mais est supprimé, on peut le réactiver
        const reactivatedCategoriPlant = await db.category.update({
          where: { id: existingCategoriPlant.id },
          data: { isDeleted: false }, // Réactivation
        });

        return NextResponse.json(
          { categoriplant: reactivatedCategoriPlant, message: "La categorie de plante a été crée avec succès" },
          { status: 200 }
        );
      } else {
        // Si le categoriplant existe déjà et n'est pas supprimé
        return NextResponse.json(
          { error: "Une categorie de plante avec ce nom existe déjà" },
          { status: 409 } // Code 409 : Conflit
        );
      }
    }

    const categoriplant = await db.category.create({
      data: {
        name,
      },
    });

    return NextResponse.json(
      { categoriplant, message: "La categorie de plante a été crée avec succès" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erreur lors de la création de la categorie de plante :", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
