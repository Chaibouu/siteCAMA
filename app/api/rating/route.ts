import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

// export async function POST(req: NextRequest) {
//   try {
//     const { plantId, value, userId } = await req.json();

//     // Validation des entrées
//     if (!plantId || !value) {
//       return NextResponse.json({ error: "Plante et note requises" }, { status: 400 });
//     }
//     if (value < 1 || value > 5) {
//       return NextResponse.json({ error: "La note doit être entre 1 et 5" }, { status: 400 });
//     }

//     // Créer une note
//     await db.rating.create({
//       data: {
//         value,
//         plantId,
//         userId,
//       },
//     });

//     // Recalculer la note moyenne
//     const ratings = await db.rating.findMany({ where: { plantId } });
//     const avgRating = ratings.reduce((sum, rating) => sum + rating.value, 0) / ratings.length;

//     // Mettre à jour la note moyenne de la plante
//     await db.plant.update({
//       where: { id: plantId },
//       data: { rating: avgRating },
//     });

//     return NextResponse.json({ message: "Note ajoutée avec succès", avgRating }, { status: 201 });
//   } catch (error) {
//     console.error("Erreur :", error);
//     return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
//   }
// }
export async function POST(req: NextRequest) {
    try {
      const { plantId, value, userId } = await req.json();
  
      // Validation des entrées
      if (!plantId || !value) {
        return NextResponse.json({ error: "Plante et note requises" }, { status: 400 });
      }
  
      if (value < 1 || value > 5) {
        return NextResponse.json({ error: "La note doit être entre 1 et 5" }, { status: 400 });
      }
  
      // Création de la note
      await db.rating.create({
        data: {
          value,
          plantId,
          userId,
        },
      });
  
      // Recalcul de la moyenne des notes
      const ratings = await db.rating.findMany({ where: { plantId } });
      const avgRating = ratings.reduce((sum, rating) => sum + rating.value, 0) / ratings.length;
  
      // Mise à jour de la moyenne des notes pour la plante
      await db.plant.update({
        where: { id: plantId },
        data: { rating: avgRating },
      });
  
      return NextResponse.json({ message: "Note ajoutée avec succès", avgRating }, { status: 201 });
    } catch (error) {
      console.error("Erreur :", error);
      return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
    }
  }
  