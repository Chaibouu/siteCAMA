type Role = "USER" | "ADMIN";

interface Permission {
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  roles: Role[];
}

// Permissions définies pour chaque route
export const permissions: Record<string, Permission[]> = {
  "/api/users": [
    { method: "GET", roles: ["ADMIN", "USER"] }, // Seuls ADMIN et RH peuvent récupérer tous les utilisateurs
    { method: "POST", roles: ["ADMIN", "USER"] }, // Seul ADMIN peut créer un utilisateur
  ],
  "/api/users/:id": [
    { method: "GET", roles: ["ADMIN", "USER"] }, // Un utilisateur peut voir son propre profil, RH/ADMIN peuvent voir tous les profils
    { method: "PUT", roles: ["ADMIN", "USER"] }, // Mise à jour par ADMIN uniquement
    { method: "DELETE", roles: ["ADMIN", "USER"] }, // Suppression logique par ADMIN uniquement
  ],
  "/api/users/:id/deactivate": [
    { method: "PATCH", roles: ["ADMIN", "USER",] }, // Désactivation par ADMIN uniquement
  ],
  "/api/users/:id/reactivate": [
    { method: "PATCH", roles: ["ADMIN", "USER",] }, // Réactivation par ADMIN uniquement
  ],
  "/api/missions": [
    { method: "POST", roles: ["ADMIN", "USER"] },
    { method: "GET", roles: ["ADMIN", "USER"] },
  ],
  "/api/missions/:id": [
    { method: "GET", roles: ["ADMIN", "USER"] }, // Un utilisateur peut voir son propre profil, RH/ADMIN peuvent voir tous les profils
    { method: "PUT", roles: ["ADMIN", "USER"] }, // Mise à jour par ADMIN uniquement
    { method: "DELETE", roles: ["ADMIN", "USER"] },
    { method: "PATCH", roles: ["ADMIN"] }, // Suppression logique par ADMIN uniquement
  ],
  "/api/missions/:id/validate": [{ method: "PATCH", roles: ["ADMIN"] }],

  "/api/grades": [
    { method: "POST", roles: ["ADMIN", "USER"] },
    { method: "GET", roles: ["ADMIN", "USER"] },
  ],

  "/api/grades/:id": [
    { method: "PUT", roles: ["ADMIN", "USER"] },
    { method: "DELETE", roles: ["ADMIN", "USER"] },
  ],

  "/api/categoriplant": [
    { method: "POST", roles: ["ADMIN", "USER"] },
    { method: "GET", roles: ["ADMIN", "USER"] },
  ],

  "/api/categoriplant/:id": [
    { method: "PUT", roles: ["ADMIN", "USER"] },
    { method: "DELETE", roles: ["ADMIN", "USER"] },
  ],

  "/api/produit": [
    { method: "POST", roles: ["ADMIN", "USER"] },
    { method: "GET", roles: ["ADMIN", "USER"] },
  ],
  "/api/produit/:id": [
    { method: "PUT", roles: ["ADMIN", "USER"] },
    { method: "DELETE", roles: ["ADMIN", "USER"] },
  ],

  "/api/notifications": [{ method: "GET", roles: ["ADMIN"] }],
  "/api/notifications/:id": [{ method: "PATCH", roles: ["ADMIN"] }],
  "/api/missions/grouped": [{ method: "POST", roles: ["ADMIN"] }],
  "/api/files": [{ method: "GET", roles: ["ADMIN"] }],
};
