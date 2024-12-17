import { NextResponse } from "next/server";
import { generatePasswordResetToken } from "@/lib/tokens";
import { getUserByEmail } from "@/data/user";
import { sendPasswordResetEmail } from "@/lib/mail";
import { PasswordResetSchema } from "@/schemas";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    // Vérifier si l'email est fourni
    if (!email) {
      return NextResponse.json({ error: "Email requis" }, { status: 400 });
    }
    // Validation des données avec Zod
    const parsedData = PasswordResetSchema.safeParse({ email });

    // Si la validation échoue, renvoyer les erreurs de Zod
    if (!parsedData.success) {
      return NextResponse.json(
        {
          error: parsedData.error.issues
            .map((issue) => issue.message)
            .join(", "),
        },
        { status: 400 }
      );
    }
    // Recherche de l'utilisateur par email
    const user = await getUserByEmail(email);
    if (!user) {
      return NextResponse.json(
        { error: "Utilisateur non trouvé" },
        { status: 404 }
      );
    }

    // Générer un token de réinitialisation sécurisé
    const resetToken = await generatePasswordResetToken(user.email as string);

    // Envoyer un email avec le lien de réinitialisation de mot de passe
    await sendPasswordResetEmail(user.email as string, resetToken);

    return NextResponse.json(
      { message: "Email de réinitialisation envoyé" },
      { status: 200 }
    );
  } catch (error) {
    console.error(
      "Erreur lors de la réinitialisation du mot de passe :",
      error
    );
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
