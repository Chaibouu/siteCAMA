import { db } from "@/lib/db";

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({ where: { email } });

    return user;
  } catch {
    return null;
  }
};

// export const getUserById = async (id: string) => {
//   try {
//     const user = await db.user.findUnique({ where: { id } });

//     return user;
//   } catch {
//     return null;
//   }
// };

export async function getUserById(userId: string) {
  try {
    // Récupérer les informations de l'utilisateur depuis la base de données
    const user = await db.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isActive: true,
        image: true,
      },
    });

    if (!user) {
      throw new Error("Utilisateur non trouvé");
    }

    return user;
  } catch (error) {
    console.error("Erreur lors de la récupération de l'utilisateur:", error);
    return null;
  }
}
