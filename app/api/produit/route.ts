import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { authorize } from "@/settings/authorization";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {storage} from "@/firebase/firebase"



export async function GET(req: NextRequest) {
  const authError = await authorize(req, "/api/produit");
  if (authError) return authError;

  try {
    const produit = await db.produit.findMany({
      where: { isDeleted: false },
      select: {
        id: true,
        name: true,
        price: true,
        category: true,
        imageUrl: true,
      },
    });

    return NextResponse.json({ produit }, { status: 200 });
  } catch (error) {
    console.error("Erreur lors de la récupération des produits :", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}




export async function POST(req: NextRequest) {
  const authError = await authorize(req, "/api/produit");
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

    // Vérification si une plante avec le même nom existe
    const existingPlant = await db.produit.findFirst({
      where: { name },
    });

    if (existingPlant) {
      if (existingPlant.isDeleted) {
        const reactivatedPlant = await db.produit.update({
          where: { id: existingPlant.id },
          data: { isDeleted: false },
        });

        return NextResponse.json(
          { produit: reactivatedPlant, message: "La plante a été réactivée avec succès" },
          { status: 200 }
        );
      } else {
        return NextResponse.json(
          { error: "Un produit avec ce nom existe déjà" },
          { status: 409 }
        );
      }
    }

    // **Envoyer l'image dans Firebase Storage**
    const folderName = "produits"; // Nom du dossier dans Firebase
    const timestamp = Date.now(); // Pour rendre les noms de fichiers uniques
    const filename = `${timestamp}-${image.name}`;
    const storageRef = ref(storage, `${folderName}/${filename}`);
    const arrayBuffer = await image.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);

    // Upload de l'image
    await new Promise<string>((resolve, reject) => {
      const uploadTask = uploadBytesResumable(storageRef, uint8Array);

      uploadTask.on(
        "state_changed",
        null, // Progression (facultatif)
        (error) => reject(error),
        () => resolve("Upload réussi")
      );
    });

    // Récupérer l'URL de téléchargement
    const imageUrl = await getDownloadURL(storageRef);

    // Enregistrer la plante dans la base de données
    const produit = await db.produit.create({
      data: {
        name,
        price,
        categoryId,
        imageUrl, // URL de l'image dans Firebase
      },
    });

    return NextResponse.json(
      { produit, message: "Le produit a été créée avec succès" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erreur lors de la création du produit :", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
