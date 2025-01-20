import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { authorize } from "@/settings/authorization";
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import { storage } from "@/firebase/firebase";

// Récupérer un produit par ID
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const authError = await authorize(req, "/api/produit/:id");
  if (authError) return authError;

  const { id } = params;

  try {
    const produit = await db.produit.findUnique({
      where: { id },
    });

    if (!produit || produit.isDeleted) {
      return NextResponse.json(
        { error: "Produit introuvable" },
        { status: 404 }
      );
    }

    return NextResponse.json({ produit }, { status: 200 });
  } catch (error) {
    console.error("Erreur lors de la récupération du produit :", error);
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}

// Mettre à jour un produit (y compris l'image)
// export async function PUT(req: NextRequest) {
//   const authError = await authorize(req, "/api/produit/:id");
//   if (authError) return authError;

//   try {
//     const contentType = req.headers.get("content-type") || "";
//     console.log("Content-Type reçu :", contentType);
//     // Vérifier si la requête contient un multipart/form-data
//     if (!contentType.includes("multipart/form-data")) {
//       return NextResponse.json(
//         { error: "Le format multipart/form-data est requis" },
//         { status: 400 }
//       );
//     }

//     // Lire le corps de la requête
//     const formData = await req.formData();
//     const id = formData.get("id")?.toString(); // ID du produit à modifier
//     const name = formData.get("name")?.toString();
//     const price = formData.get("price")?.toString();
//     const categoryId = formData.get("categoryId")?.toString();
//     const image = formData.get("image") as File | null;

//     if (!id) {
//       return NextResponse.json(
//         { error: "L'identifiant du produit est requis" },
//         { status: 400 }
//       );
//     }

//     // Vérifier si le produit existe
//     const existingProduct = await db.produit.findUnique({
//       where: { id },
//     });

//     if (!existingProduct) {
//       return NextResponse.json(
//         { error: "Le produit n'existe pas" },
//         { status: 404 }
//       );
//     }

//     let imageUrl = existingProduct.imageUrl; // Conserver l'image actuelle par défaut

//     // Si une nouvelle image est fournie, télécharger sur Cloudinary
//     if (image) {
//       const formDataa = new FormData();
//       formDataa.append("file", image);
//       formDataa.append("upload_preset", "site-cama");

//       const res = await fetch(
//         "https://api.cloudinary.com/v1_1/duxfrfqd0/image/upload",
//         {
//           method: "POST",
//           body: formDataa,
//         }
//       );

//       const data = await res.json();
//       if (res.ok) {
//         imageUrl = data.secure_url; // Mettre à jour l'image avec la nouvelle URL
//       } else {
//         return NextResponse.json(
//           { error: "Échec du téléchargement de l'image" },
//           { status: 500 }
//         );
//       }
//     }

//     // Mettre à jour le produit dans la base de données
//     const updatedProduct = await db.produit.update({
//       where: { id },
//       data: {
//         name: name || undefined, // Mettre à jour uniquement si fourni
//         price: price || undefined, // Mettre à jour uniquement si fourni
//         categoryId: categoryId || undefined, // Mettre à jour uniquement si fourni
//         imageUrl: imageUrl || undefined, // Mettre à jour uniquement si une nouvelle image est téléchargée
//       },
//     });

//     return NextResponse.json(
//       { produit: updatedProduct, message: "Le produit a été modifié avec succès" },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Erreur lors de la modification du produit :", error);
//     return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
//   }
// }

export async function PUT(req: NextRequest) {
  const authError = await authorize(req, "/api/produit/:id");
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
    const productId = formData.get("id")?.toString(); // ID du produit à mettre à jour
    const name = formData.get("name")?.toString();
    const price = formData.get("price")?.toString();
    const categoryId = formData.get("categoryId")?.toString();
    const image = formData.get("image") as File | null;

    // Vérification de l'ID
    if (!productId) {
      return NextResponse.json(
        { error: "L'identifiant du produit est requis" },
        { status: 400 }
      );
    }

    // Vérifier si le produit existe
    const existingProduct = await db.produit.findUnique({
      where: { id: productId },
    });

    if (!existingProduct) {
      return NextResponse.json(
        { error: "Le produit n'existe pas" },
        { status: 404 }
      );
    }

    // Si une nouvelle image est fournie, téléchargez-la sur Cloudinary
    let imageUrl = existingProduct.imageUrl; // Conserver l'ancienne URL par défaut
    if (image) {
      const formDataCloudinary = new FormData();
      formDataCloudinary.append("file", image);
      formDataCloudinary.append("upload_preset", "site-cama");

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/duxfrfqd0/image/upload",
        {
          method: "POST",
          body: formDataCloudinary,
        }
      );

      const data = await res.json();
      imageUrl = data.secure_url; // Nouvelle URL de l'image
    }

    // Mettre à jour le produit dans la base de données
    const updatedProduct = await db.produit.update({
      where: { id: productId },
      data: {
        name: name || existingProduct.name, // Conserver l'ancien nom si aucun nouveau n'est fourni
        price: price || existingProduct.price,
        categoryId: categoryId || existingProduct.categoryId,
        imageUrl, // URL de l'image (mise à jour ou ancienne)
      },
    });

    return NextResponse.json(
      {
        produit: updatedProduct,
        message: "Le produit a été mis à jour avec succès",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erreur lors de la mise à jour du produit :", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

// Supprimer un produit (logiquement)
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const authError = await authorize(req, "/api/produit/:id");
  if (authError) return authError;

  const { id } = params;

  try {
    const produit = await db.produit.findUnique({
      where: { id },
    });

    if (!produit || produit.isDeleted) {
      return NextResponse.json(
        { error: "Produit introuvable" },
        { status: 404 }
      );
    }

    // Suppression logique (isDeleted à true)
    await db.produit.update({
      where: { id },
      data: { isDeleted: true },
    });

    return NextResponse.json(
      { message: "Produit supprimé avec succès" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erreur lors de la suppression du produit :", error);
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}
