// import { NextResponse } from "next/server";
// import { generatePasswordResetToken } from "@/lib/tokens";
// import { getUserByEmail } from "@/data/user";
// import { sendPasswordResetEmail } from "@/lib/mail";
// import { PasswordResetSchema } from "@/schemas";

// export async function POST(req: Request) {
//   try {
//     const { email } = await req.json();

//     // Vérifier si l'email est fourni
//     if (!email) {
//       return NextResponse.json({ error: "Email requis" }, { status: 400 });
//     }
//     // Validation des données avec Zod
//     const parsedData = PasswordResetSchema.safeParse({ email });

//     // Si la validation échoue, renvoyer les erreurs de Zod
//     if (!parsedData.success) {
//       return NextResponse.json(
//         {
//           error: parsedData.error.issues
//             .map((issue) => issue.message)
//             .join(", "),
//         },
//         { status: 400 }
//       );
//     }
//     // Recherche de l'utilisateur par email
//     const user = await getUserByEmail(email);
//     if (!user) {
//       return NextResponse.json(
//         { error: "Utilisateur non trouvé" },
//         { status: 404 }
//       );
//     }

//     // Générer un token de réinitialisation sécurisé
//     const resetToken = await generatePasswordResetToken(user.email as string);

//     // Envoyer un email avec le lien de réinitialisation de mot de passe
//     await sendPasswordResetEmail(user.email as string, resetToken);

//     return NextResponse.json(
//       { message: "Email de réinitialisation envoyé" },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error(
//       "Erreur lors de la réinitialisation du mot de passe :",
//       error
//     );
//     return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
//   }
// }
import { NextResponse } from "next/server";
import { generatePasswordResetToken } from "@/lib/tokens";
import { getUserByEmail } from "@/data/user";
import { sendPasswordResetEmail } from "@/lib/mail";
import { PasswordResetSchema } from "@/schemas";

export async function POST(req: Request) {
  try {
    console.log("Début du traitement de la requête POST /api/auth/forgot-password");

    // Étape 1 : Extraction des données
    const { email } = await req.json();
    console.log("Email reçu :", email);

    // Étape 2 : Validation avec Zod
    const parsedData = PasswordResetSchema.safeParse({ email });
    if (!parsedData.success) {
      console.error("Échec de validation Zod :", parsedData.error.format());
      return NextResponse.json(
        {
          error: "Email invalide : " + parsedData.error.issues.map((issue) => issue.message).join(", "),
        },
        { status: 400 }
      );
    }

    // Étape 3 : Vérification si l'utilisateur existe
    const user = await getUserByEmail(email);
    if (!user) {
      console.warn("Aucun utilisateur trouvé pour cet email :", email);
      return NextResponse.json(
        { error: "Aucun utilisateur trouvé avec cet email" },
        { status: 404 }
      );
    }

    console.log("Utilisateur trouvé :", user.email);

    // Étape 4 : Génération du token de réinitialisation
    const resetToken = await generatePasswordResetToken(user.email);
    console.log("Token de réinitialisation généré avec succès.");

    // Étape 5 : Envoi de l'email
    await sendPasswordResetEmail(user.email, resetToken);
    console.log("Email de réinitialisation envoyé à :", user.email);

    // Étape 6 : Réponse de succès
    return NextResponse.json(
      { message: "Email de réinitialisation envoyé avec succès" },
      { status: 200 }
    );
  } catch (error: any) {
    // Gestion des erreurs globales
    console.error("Erreur serveur lors du traitement :", error.message, error.stack);
    return NextResponse.json(
      { error: "Une erreur interne est survenue. Veuillez réessayer plus tard." },
      { status: 500 }
    );
  }
}
