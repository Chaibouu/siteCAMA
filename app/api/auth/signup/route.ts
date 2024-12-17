import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail"; // Fonction pour envoyer l'email de vérification
import { SignupSchema } from "@/schemas";

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    if (!name) {
      return NextResponse.json({ error: "Le nom est requis" }, { status: 400 });
    }
    if (!email) {
      return NextResponse.json(
        { error: "L'adresse email est requise" },
        { status: 400 }
      );
    }
    if (!password) {
      return NextResponse.json(
        { error: "Le mot de passe est requis" },
        { status: 400 }
      );
    }

    // Validation des données avec Zod
    const parsedData = SignupSchema.safeParse({ name, email, password });

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

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return NextResponse.json(
        { error: "L'email est déjà utilisé" },
        { status: 400 }
      );
    }

    // Hacher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Générer un token de vérification signé avec RSA
    const verificationToken = await generateVerificationToken(email);
    // console.log(verificationToken);
    // Créer l'utilisateur dans la base de données
    await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        isActive: false,
        emailVerified: null,
      },
    });
    // Envoyer un email avec le token de vérification
    await sendVerificationEmail(email, verificationToken);

    // Répondre avec un message de succès
    return NextResponse.json(
      {
        message:
          "Inscription réussie. Veuillez vérifier votre email pour confirmer votre compte.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erreur lors de l'inscription :", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
