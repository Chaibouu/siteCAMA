import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { authorize } from "@/settings/authorization";



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
      return NextResponse.json(
        { error: "Le format multipart/form-data est requis" },
        { status: 400 }
      );
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
      return NextResponse.json(
        { error: "La catégorie est requise" },
        { status: 400 }
      );
    }
    if (!image) {
      return NextResponse.json(
        { error: "L'image est requise" },
        { status: 400 }
      );
    }

    // Vérification si un produit avec le même nom existe
    const existingProduct = await db.produit.findFirst({
      where: { name },
    });

    if (existingProduct) {
      if (existingProduct.isDeleted) {
        const reactivatedProduct = await db.produit.update({
          where: { id: existingProduct.id },
          data: { isDeleted: false },
        });

        return NextResponse.json(
          { produit: reactivatedProduct, message: "Le produit a été réactivé avec succès" },
          { status: 200 }
        );
      } else {
        return NextResponse.json(
          { error: "Un produit avec ce nom existe déjà" },
          { status: 409 }
        );
      }
    }

    // Utiliser claudinary pour télécharger l'image
    const formDataa = new FormData();
    formDataa.append("file", image);
    formDataa.append("upload_preset", "site-cama");
    const res = await fetch("https://api.cloudinary.com/v1_1/duxfrfqd0/image/upload", {
      method: "POST",
      body: formDataa,
    });
    const data = await res.json();
    const imageUrl = data.secure_url;


    // Enregistrer le produit dans la base de données
    const produit = await db.produit.create({
      data: {
        name,
        price,
        categoryId,
        imageUrl, // URL de l'image dans Firebase
      },
    });

    return NextResponse.json(
      { produit, message: "Le produit a été créé avec succès" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erreur lors de la création du produit :", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
