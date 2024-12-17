"use server";

import { cookies } from "next/headers";

// Action pour créer des cookies dynamiquement
export const setMultipleCookies = async (
  cookieData: {
    name: string;
    value: string;
    options?: {
      httpOnly?: boolean;
      secure?: boolean;
      maxAge?: number;
      path?: string;
      sameSite?: "lax" | "strict" | "none";
    };
  }[]
) => {
  const cookieStore = cookies();

  // Boucler sur les cookies et les définir
  cookieData.forEach(({ name, value, options }) => {
    cookieStore.set(name, value, {
      httpOnly: options?.httpOnly ?? true, // Par défaut, httpOnly est à true
      secure: options?.secure ?? process.env.NODE_ENV === "production", // Utiliser HTTPS en prod
      maxAge: options?.maxAge ?? 60 * 60, // Par défaut, 1 heure
      path: options?.path ?? "/", // Par défaut, accessible sur tout le site
      sameSite: options?.sameSite ?? "strict", // Par défaut, sameSite est strict
    });
  });

  return { success: "Cookies définis avec succès" };
};
