import { Fields, Files, IncomingForm } from 'formidable';
import { db } from "@/lib/db";
import { authorize } from "@/settings/authorization";
import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export const config = {
  api: {
    bodyParser: false, // Désactiver le body parser par défaut
  },
};

export async function GET(req: NextRequest) {
  const authError = await authorize(req, "/api/plant");
  if (authError) return authError;

  try {
    const plant = await db.plant.findMany({
      where: { isDeleted: false },
      select: {
        id: true,
        name: true,
        price: true,
        category: true,
        imageUrl: true,
      },
    });

    return NextResponse.json({ plant }, { status: 200 });
  } catch (error) {
    console.error("Erreur lors de la récupération des plantes :", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

// export async function POST(req: NextRequest) {
//   const authError = await authorize(req, "/api/plant");
//   if (authError) return authError;

//   try {
//     const body = await req.json();
//     const { name, price, category} = body;

//     if (!name) {
//       return NextResponse.json({ error: "Le nom est requis" }, { status: 400 });
//     }
//     if (!price) {
//       return NextResponse.json({ error: "Le prix est requis" }, { status: 400 });
//     }
//     if (!category) {
//       return NextResponse.json({ error: "La categorie est requis" }, { status: 400 });
//     }

//     // Vérification si un plant avec le même nom existe (même supprimé)
//     const existingPlant = await db.plant.findFirst({
//       where: { name }, // Recherche par nom
//     });

//     if (existingPlant) {
//       if (existingPlant.isDeleted) {
//         // Si le plant existe mais est supprimé, on peut le réactiver
//         const reactivatedPlant = await db.plant.update({
//           where: { id: existingPlant.id },
//           data: { isDeleted: false }, // Réactivation
//         });

//         return NextResponse.json(
//           { plant: reactivatedPlant, message: "La plante a été crée avec succès" },
//           { status: 200 }
//         );
//       } else {
//         // Si le plant existe déjà et n'est pas supprimé
//         return NextResponse.json(
//           { error: "Une plante avec ce nom existe déjà" },
//           { status: 409 } // Code 409 : Conflit
//         );
//       }
//     }

//     const plant = await db.plant.create({
//       data: {
//         name,
//         price,
//         category,
//       },
//     });

//     return NextResponse.json(
//       { plant, message: "La plante a été crée avec succès" },
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error("Erreur lors de la création de la plante :", error);
//     return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
//   }
// }

export async function POST(req: NextRequest) {
  const authError = await authorize(req, "/api/plant");
  if (authError) return authError;

  try {
    const contentType = req.headers.get("content-type") || "";

    // Vérifier si la requête contient un multipart/form-data
    if (!contentType.includes("multipart/form-data")) {
      return NextResponse.json({ error: "Le format multipart/form-data est requis" }, { status: 400 });
    }

    // Lire le corps de la requête
    const formData = await req.formData();
    const name = formData.get("name")?.toString();
    const price = formData.get("price")?.toString();
    const categoryId = formData.get("categoryId")?.toString();
    const image = formData.get("image") as File | null;

    if (!name) {
      return NextResponse.json({ error: "Le nom est requis" }, { status: 400 });
    }
    if (!price) {
      return NextResponse.json({ error: "Le prix est requis" }, { status: 400 });
    }
    if (!categoryId) {
      return NextResponse.json({ error: "La catégorie est requise" }, { status: 400 });
    }
    if (!image) {
      return NextResponse.json({ error: "L'image est requise" }, { status: 400 });
    }

    // Vérification si un plant avec le même nom existe (même supprimé)
    const existingPlant = await db.plant.findFirst({
      where: { name },
    });

    if (existingPlant) {
      if (existingPlant.isDeleted) {
        const reactivatedPlant = await db.plant.update({
          where: { id: existingPlant.id },
          data: { isDeleted: false },
        });

        return NextResponse.json(
          { plant: reactivatedPlant, message: "La plante a été réactivée avec succès" },
          { status: 200 }
        );
      } else {
        return NextResponse.json(
          { error: "Une plante avec ce nom existe déjà" },
          { status: 409 }
        );
      }
    }

    // Enregistrer l'image dans un dossier local
    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    await fs.mkdir(uploadsDir, { recursive: true }); // Créer le dossier s'il n'existe pas

    const filePath = path.join(uploadsDir, `${Date.now()}-${image.name}`);
    // const buffer = Buffer.from(await image.arrayBuffer());
    // await fs.writeFile(filePath, buffer);
    const arrayBuffer = await image.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer); // Convertir en Uint8Array
    await fs.writeFile(filePath, uint8Array); // Compatible avec fs.writeFile


    // Enregistrer la plante dans la base de données
    const plant = await db.plant.create({
      data: {
        name,
        price,
        categoryId,
        imageUrl: `/uploads/${path.basename(filePath)}`, // URL relative de l'image
      },
    });

    return NextResponse.json(
      { plant, message: "La plante a été créée avec succès" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erreur lors de la création de la plante :", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}