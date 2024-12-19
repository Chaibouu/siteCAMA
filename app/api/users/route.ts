import { db } from "@/lib/db";
import { authorize } from "@/settings/authorization";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { createUserSchema } from "@/schemas/user";
import { generateSecurePassword } from "@/utils/password";
import { sendGeneratedPasswordEmail } from "@/lib/mail";

export async function GET(req: NextRequest) {
  const authError = await authorize(req, "/api/users");
  if (authError) return authError;

  try {
    const users = await db.user.findMany({
      where: { isDeleted: false },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        designation: true,
        address: true,
        dateOfBirth: true,
        hiredAt: true,
        isActive: true,
        role: true,
        codeInfo: true,
        Grade: true,
      },
    });

    return NextResponse.json({ users }, { status: 200 });
  } catch (error) {
    console.error("Erreur lors de la récupération des utilisateurs :", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const authError = await authorize(req, "/api/users");
  if (authError) return authError;

  try {
    const body = await req.json();
    // Convertir les champs de date (string) en objets Date avant validation
    const parsedBody = {
      ...body,
      dateOfBirth: body.dateOfBirth ? new Date(body.dateOfBirth) : undefined,
      hiredAt: body.hiredAt ? new Date(body.hiredAt) : undefined,
    };
    // Validation des données avec Zod
    const parsedData = createUserSchema.safeParse(parsedBody);
    if (!parsedData.success) {
      return new Response(
        JSON.stringify({
          error: parsedData.error.issues
            .map((issue) => issue.message)
            .join(", "),
        }),
        { status: 400 }
      );
    }

    const {
      name,
      email,
      phone,
      designation,
      address,
      dateOfBirth,
      hiredAt,
      image,
      role,
      isActive,
      isDeleted,
      gradeId,
      codeInfo,
    } = parsedData.data;

    // Vérification pour DIR_RH et DIR_FINANCE
    if (["DIR_RH", "DIR_FINANCE"].includes(role)) {
      const roleLabel =
        role === "DIR_RH"
          ? "Le Directeur des Ressources Humaines"
          : "Le Directeur Financier et Comptable";

      const existingUser = await db.user.findFirst({
        where: {
          role,
        },
      });

      if (existingUser) {
        return NextResponse.json(
          {
            error: `${roleLabel} existe déjà. Un seul utilisateur peut être assigné à ce rôle.`,
          },
          { status: 400 }
        );
      }
    }

    // Générer un mot de passe sécurisé
    const plainPassword = generateSecurePassword();
    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    // Créer l'utilisateur dans la base de données
    const newUser = await db.user.create({
      data: {
        name,
        email,
        phone,
        designation,
        address,
        dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
        hiredAt: hiredAt ? new Date(hiredAt) : null,
        image,
        password: hashedPassword,
        role,
        isActive,
        isDeleted,
        gradeId,
        codeInfo,
        emailVerified: new Date(),
      },
    });

    // Envoyer le mot de passe généré par email
    await sendGeneratedPasswordEmail(email, plainPassword);

    return new Response(
      JSON.stringify({
        message:
          "L'utilisateur a été créé avec succès et un email lui a été envoyé",
        user: newUser,
      }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Erreur lors de la création de l'utilisateur :", error);
    return new Response(JSON.stringify({ error: "Erreur serveur" }), {
      status: 500,
    });
  }
}
