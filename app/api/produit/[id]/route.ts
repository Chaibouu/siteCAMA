import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { authorize } from "@/settings/authorization";
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import { storage } from "@/firebase/firebase";

// Récupérer un produit par ID
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const authError = await authorize(req, "/api/produit");
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
// export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
//   const authError = await authorize(req, "/api/produit");
//   if (authError) return authError;

//   const { id } = params;

//   try {
//     const contentType = req.headers.get("content-type") || "";

//     // Vérifier si la requête contient un multipart/form-data
//     if (!contentType.includes("multipart/form-data")) {
//       return NextResponse.json(
//         { error: "Le format multipart/form-data est requis" },
//         { status: 400 }
//       );
//     }

//     const formData = await req.formData();
//     const name = formData.get("name")?.toString();
//     const price = formData.get("price")?.toString();
//     const categoryId = formData.get("categoryId")?.toString();
//     const image = formData.get("image") as File | null;

//     if (!name && !price && !categoryId && !image) {
//       return NextResponse.json(
//         { error: "Aucune donnée à mettre à jour" },
//         { status: 400 }
//       );
//     }

//     const produit = await db.produit.findUnique({
//       where: { id },
//     });

//     if (!produit || produit.isDeleted) {
//       return NextResponse.json(
//         { error: "Produit introuvable" },
//         { status: 404 }
//       );
//     }

//     let imageUrl = produit.imageUrl;

//     if (image) {
//       if (produit.imageUrl) {
//         const oldImageRef = ref(storage, decodeURIComponent(produit.imageUrl.replace(/.*\/produits\//, "")));
//         await deleteObject(oldImageRef).catch((error) => {
//           console.warn("Erreur lors de la suppression de l'ancienne image :", error);
//         });
//       }

//       const folderName = "produits";
//       const timestamp = Date.now();
//       const safeFilename = `${timestamp}-${encodeURIComponent(image.name)}`;
//       const storageRef = ref(storage, `${folderName}/${safeFilename}`);
//       const uint8Array = new Uint8Array(await image.arrayBuffer());

//       await new Promise<void>((resolve, reject) => {
//         const uploadTask = uploadBytesResumable(storageRef, uint8Array);

//         uploadTask.on(
//           "state_changed",
//           null,
//           (error) => reject(new Error("Échec de l'upload de l'image : " + error.message)),
//           () => resolve()
//         );
//       });

//       imageUrl = await getDownloadURL(storageRef);
//     }

//     const updatedProduit = await db.produit.update({
//       where: { id },
//       data: {
//         ...(name && { name }),
//         ...(price && { price: parseFloat(price) }),
//         ...(categoryId && { categoryId }),
//         ...(imageUrl && { imageUrl }),
//       },
//     });

//     return NextResponse.json(
//       { produit: updatedProduit, message: "Produit mis à jour avec succès" },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Erreur lors de la mise à jour du produit :", error);
//     return NextResponse.json(
//       { error: "Erreur serveur" },
//       { status: 500 }
//     );
//   }
// }

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    const authError = await authorize(req, "/api/produit");
    if (authError) return authError;
  
    const { id } = params;
  
    try {
      const contentType = req.headers.get("content-type") || "";
  
      // Vérifier si la requête contient un multipart/form-data
      if (!contentType.includes("multipart/form-data")) {
        return NextResponse.json(
          { error: "Le format multipart/form-data est requis" },
          { status: 400 }
        );
      }
  
      const formData = await req.formData();
      const name = formData.get("name")?.toString();
      const price = formData.get("price")?.toString();
      const categoryId = formData.get("categoryId")?.toString();
      const image = formData.get("image") as File | null;
  
      if (!name && !price && !categoryId && !image) {
        return NextResponse.json(
          { error: "Aucune donnée à mettre à jour" },
          { status: 400 }
        );
      }
  
      const produit = await db.produit.findUnique({
        where: { id },
      });
  
      if (!produit || produit.isDeleted) {
        return NextResponse.json(
          { error: "Produit introuvable" },
          { status: 404 }
        );
      }
  
      let imageUrl = produit.imageUrl;
  
      if (image) {
        if (produit.imageUrl) {
          const oldImageRef = ref(storage, decodeURIComponent(produit.imageUrl.replace(/.*\/produits\//, "")));
          await deleteObject(oldImageRef).catch((error) => {
            console.warn("Erreur lors de la suppression de l'ancienne image :", error);
          });
        }
  
        const folderName = "produits";
        const timestamp = Date.now();
        const safeFilename = `${timestamp}-${encodeURIComponent(image.name)}`;
        const storageRef = ref(storage, `${folderName}/${safeFilename}`);
        const uint8Array = new Uint8Array(await image.arrayBuffer());
  
        await new Promise<void>((resolve, reject) => {
          const uploadTask = uploadBytesResumable(storageRef, uint8Array);
  
          uploadTask.on(
            "state_changed",
            null,
            (error) => reject(new Error("Échec de l'upload de l'image : " + error.message)),
            () => resolve()
          );
        });
  
        imageUrl = await getDownloadURL(storageRef);
      }
  
      // Nettoyer les données avant mise à jour
      const cleanData = (data: Record<string, any>) =>
        Object.fromEntries(
          Object.entries(data).filter(([_, value]) => value !== undefined)
        );
  
      const updateData = cleanData({
        name,
        price: price ? parseFloat(price) : undefined,
        categoryId: categoryId || null,
        imageUrl,
      });
  
      const updatedProduit = await db.produit.update({
        where: { id },
        data: updateData,
      });
  
      return NextResponse.json(
        { produit: updatedProduit, message: "Produit mis à jour avec succès" },
        { status: 200 }
      );
    } catch (error) {
      console.error("Erreur lors de la mise à jour du produit :", error);
      return NextResponse.json(
        { error: "Erreur serveur" },
        { status: 500 }
      );
    }
  }

// Supprimer un produit (logiquement)
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const authError = await authorize(req, "/api/produit");
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
