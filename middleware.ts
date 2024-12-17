import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
} from "@/routes";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getUser } from "./actions/getUser";
import { applyRateLimit } from "./lib/rateLimit";
import { isRouteProtected } from "./utils/is-route-protected";
export async function middleware(req: NextRequest) {
  const { nextUrl } = req;

  // Vérification des routes
  const isApiRoute = nextUrl.pathname.startsWith("/api"); // API routes
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix); // Auth API routes
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname); // Public routes
  const isAuthRoute = authRoutes.includes(nextUrl.pathname); // Auth-related pages (login, register, etc.)

  // Appliquer un "rate limit" uniquement sur les routes d'authentification
  if (isApiAuthRoute) {
    const rateLimitResponse = await applyRateLimit(req);
    if (rateLimitResponse) {
      return rateLimitResponse; // Retourner la réponse si le rate limit est dépassé
    }
    return NextResponse.next(); // Continuer l'exécution si le rate limit n'est pas dépassé
  }

  // **Cas API :** Récupérer les tokens directement depuis l'en-tête d'authentification
  if (isApiRoute) {
    const authorizationHeader = req.headers.get("Authorization");
    const accessToken = authorizationHeader?.split(" ")[1];

    // Si c'est une API d'authentification, pas besoin de vérifier le token
    if (isApiAuthRoute) {
      return NextResponse.next();
    }

    // Si c'est une API protégée, vérifier le token dans l'en-tête
    if (!isPublicRoute && !accessToken) {
      return NextResponse.json(
        { error: "Token d'accès manquant ou non valide" },
        { status: 401 }
      );
    }

    return NextResponse.next();
  }

  // **Cas Frontend** : Utiliser les cookies pour récupérer l'accessToken et vérifier l'authentification

  // On récupère les informations de l'utilisateur à partir du token dans le cookie
  const result = await getUser();

  // Si un nouveau token est généré après rafraîchissement, mettre à jour le cookie
  if (result?.tokenInfo) {
    const response = NextResponse.next();

    // Mise à jour de l'accessToken dans le cookie
    response.cookies.set({
      name: "accessToken",
      value: result.tokenInfo.accessToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: result.tokenInfo.expiresAt,
      path: "/",
      sameSite: "lax",
    });

    return response;
  }

  // Si l'utilisateur est connecté
  const isLoggedIn = !!result?.user && !result.error;
  const userRole = result?.user?.user?.role;

  // **Vérification des rôles pour les routes protégées**
  const protectedRoute = isRouteProtected(userRole, nextUrl.pathname);

  // Si l'utilisateur n'est pas autorisé à accéder à la route
  if (isLoggedIn && protectedRoute) {
    return NextResponse.redirect(new URL("/unauthorized", nextUrl));
  }

  // **Auth Routes** : Rediriger les utilisateurs connectés loin des pages de login, etc.
  if (isAuthRoute && isLoggedIn) {
    return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
  }

  // **Protected Routes par défaut** : Si ce n'est pas une route publique ou d'authentification, elle est protégée
  if (!isPublicRoute && !isAuthRoute && !isLoggedIn) {
    let callbackUrl = nextUrl.pathname;
    if (nextUrl.search) {
      callbackUrl += nextUrl.search;
    }
    const encodedCallbackUrl = encodeURIComponent(callbackUrl);

    return NextResponse.redirect(
      new URL(`/auth/login?callbackUrl=${encodedCallbackUrl}`, nextUrl)
    );
  }

  // **Public Routes** : Accès libre aux routes publiques
  if (isPublicRoute) {
    return NextResponse.next();
  }

  // **Toutes les autres routes** : Si aucune autre règle ne s'applique, laisser passer
  return NextResponse.next();
}

// Configuration pour matcher les routes nécessaires
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
