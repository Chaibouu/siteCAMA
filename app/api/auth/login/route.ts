import { NextResponse, userAgent } from "next/server";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { createEncryptedJWT, generateVerificationToken } from "@/lib/tokens";
import { createSession } from "@/data/session";
import appConfig from "@/settings";
import { sendVerificationEmail } from "@/lib/mail";
import { getGeoLocation, getIp } from "@/utils/user-agent";
import {
  getBackoffDelay,
  getFailedAttempts,
  incrementFailedAttempt,
  resetFailedAttempts,
} from "@/lib/backoff";
import { LoginSchema } from "@/schemas";

export async function POST(req: Request) {
  try {
    const { email, password, rememberMe } = await req.json();

    // Vérification des champs manquants
    if (!email) {
      return NextResponse.json(
        { error: "L'email est requis" },
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
    const parsedData = LoginSchema.safeParse({ email, password });

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
        { status: 401 }
      );
    }

    // Vérification de la confirmation de l'email
    if (!user.emailVerified) {
      const verificationToken = await generateVerificationToken(
        user.email as string
      );
      await sendVerificationEmail(user.email as string, verificationToken);

      return NextResponse.json(
        {
          error:
            "Veuillez vérifier votre email avant de vous connecter. Un nouvel email de vérification a été envoyé.",
        },
        { status: 403 }
      );
    }

    // Vérification de l'activation du compte
    if (!user.isActive) {
      return NextResponse.json(
        { error: "Votre compte est désactivé. Contactez l'administrateur." },
        { status: 403 }
      );
    }

    // Gestion des tentatives échouées
    const failedAttempts = await getFailedAttempts(user.id);
    if (failedAttempts >= appConfig.backoff.maxAttempts) {
      const delay = getBackoffDelay(failedAttempts);

      // Récupérer la dernière tentative échouée
      const lastFailedAttempt = await db.failedLoginAttempt.findFirst({
        where: { userId: user.id },
        orderBy: { attemptAt: "desc" },
      });

      // Calcul du temps écoulé depuis la dernière tentative
      const timeSinceLastAttempt = lastFailedAttempt?.attemptAt
        ? Date.now() - new Date(lastFailedAttempt.attemptAt).getTime()
        : 0;
      const remainingTime = delay - timeSinceLastAttempt;

      if (remainingTime > 0) {
        const minutes = Math.ceil(remainingTime / 60000);
        const message = `Trop de tentatives échouées. Veuillez réessayer dans ${minutes} minute(s).`;
        return NextResponse.json({ error: message }, { status: 429 });
      }
    }

    // Vérification du mot de passe
    const isPasswordValid = await bcrypt.compare(
      password,
      user.password as string
    );
    if (!isPasswordValid) {
      // Incrémenter le compteur de tentatives échouées
      await incrementFailedAttempt(user.id);

      return NextResponse.json(
        { error: "Mot de passe incorrect" },
        { status: 401 }
      );
    }

    // Réinitialisation des tentatives échouées en cas de succès
    await resetFailedAttempts(user.id);

    // Gestion des connexions multiples selon la configuration
    if (!appConfig.allowMultipleSessions) {
      await db.session.deleteMany({
        where: { userId: user.id },
      });
    }

    // Génération des tokens d'accès et de rafraîchissement
    const payload = { userId: user.id, email: user.email };
    const accessToken = createEncryptedJWT(payload, "1h");
    const refreshToken = crypto.randomBytes(64).toString("hex");

    // Création de la session en base de données
    await createSession({
      userId: user.id,
      sessionToken: accessToken,
      refreshToken,
      expires: new Date(Date.now() + 60 * 60 * 1000), // 1h pour le token d'accès
      refreshTokenExpires: rememberMe
        ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 jours
        : new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 jours
      lastActivity: new Date(),
    });

    // Extraction des informations du user-agent et géolocalisation
    const { device, browser, os } = userAgent(req);
    const ipAddress = getIp();
    const geoInfo = await getGeoLocation(ipAddress);

    // Stocker les informations de l'appareil et de géolocalisation dans la table UserDevice
    await db.userDevice.create({
      data: {
        userId: user.id,
        device: `${device.vendor || "Inconnu"} ${device.model || "Inconnu"}`,
        os: `${os.name || "Inconnu"} ${os.version || ""}`,
        browser: `${browser.name || "Inconnu"} ${browser.version || ""}`,
        ipAddress: ipAddress || "IP inconnue",
        latitude: geoInfo?.latitude || null,
        longitude: geoInfo?.longitude || null,
        city: geoInfo?.city || "Ville inconnue",
        country: geoInfo?.country || "Pays inconnu",
      },
    });

    // Renvoyer les tokens au client
    return NextResponse.json({
      message: "Connexion réussie",
      accessToken,
      refreshToken,
    });
  } catch (error) {
    console.error("Erreur lors de la connexion :", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
