import { NextResponse } from "next/server";
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";
import { ResendVerificationSchema } from "@/schemas";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { error: "L'adresse email est requise" },
        { status: 400 }
      );
    }
    // Validation des données avec Zod
    const parsedData = ResendVerificationSchema.safeParse({ email });
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

    // Si l'utilisateur est désactivé par l'administrateur (et non juste pour cause de non-vérification)
    if (!user.isActive && user.emailVerified) {
      return NextResponse.json(
        {
          error:
            "Votre compte est désactivé. Veuillez contacter l'administrateur.",
        },
        { status: 403 }
      );
    }

    // Si l'utilisateur a déjà vérifié son email
    if (user.emailVerified) {
      return NextResponse.json(
        { message: "Votre email est déjà vérifié." },
        { status: 200 }
      );
    }

    // Générer un nouveau token de vérification
    const verificationToken = await generateVerificationToken(
      user.email as string
    );

    // Envoyer un nouvel email de vérification
    await sendVerificationEmail(user.email as string, verificationToken);

    return NextResponse.json(
      { message: "Un nouvel email de vérification a été envoyé." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email de vérification :", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
