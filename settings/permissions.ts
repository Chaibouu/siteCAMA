type Role = "USER" | "ADMIN" | "RH" | "FINANCE" | "DIRECTION";

interface Permission {
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  roles: Role[];
}

// Permissions définies pour chaque route
export const permissions: Record<string, Permission[]> = {
  "/api/users": [
    { method: "GET", roles: ["ADMIN", "RH", "USER"] }, // Seuls ADMIN et RH peuvent récupérer tous les utilisateurs
    { method: "POST", roles: ["ADMIN", "USER", "RH"] }, // Seul ADMIN peut créer un utilisateur
  ],
  "/api/users/:id": [
    { method: "GET", roles: ["ADMIN", "RH", "USER"] }, // Un utilisateur peut voir son propre profil, RH/ADMIN peuvent voir tous les profils
    { method: "PUT", roles: ["ADMIN", "USER", "RH"] }, // Mise à jour par ADMIN uniquement
    { method: "DELETE", roles: ["ADMIN", "USER", "RH"] }, // Suppression logique par ADMIN uniquement
  ],
  "/api/users/:id/deactivate": [
    { method: "PATCH", roles: ["ADMIN", "USER", "RH"] }, // Désactivation par ADMIN uniquement
  ],
  "/api/users/:id/reactivate": [
    { method: "PATCH", roles: ["ADMIN", "USER", "RH"] }, // Réactivation par ADMIN uniquement
  ],
  "/api/missions": [
    { method: "POST", roles: ["ADMIN", "USER", "RH"] },
    { method: "GET", roles: ["ADMIN", "USER", "RH"] },
  ],
  "/api/missions/:id": [
    { method: "GET", roles: ["ADMIN", "RH", "USER"] }, // Un utilisateur peut voir son propre profil, RH/ADMIN peuvent voir tous les profils
    { method: "PUT", roles: ["ADMIN", "USER", "RH"] }, // Mise à jour par ADMIN uniquement
    { method: "DELETE", roles: ["ADMIN", "USER", "RH"] },
    { method: "PATCH", roles: ["ADMIN", "RH"] }, // Suppression logique par ADMIN uniquement
  ],
  "/api/missions/:id/validate": [{ method: "PATCH", roles: ["ADMIN", "RH"] }],

  "/api/grades": [
    { method: "POST", roles: ["ADMIN", "USER", "RH"] },
    { method: "GET", roles: ["ADMIN", "USER", "RH"] },
  ],

  "/api/grades/:id": [
    { method: "PUT", roles: ["ADMIN", "USER", "RH"] },
    { method: "DELETE", roles: ["ADMIN", "USER", "RH"] },
  ],

  "/api/categories": [
    { method: "POST", roles: ["ADMIN", "USER", "RH"] },
    { method: "GET", roles: ["ADMIN", "USER", "RH"] },
  ],

  "/api/categories/:id": [
    { method: "PUT", roles: ["ADMIN", "USER", "RH"] },
    { method: "DELETE", roles: ["ADMIN", "USER", "RH"] },
  ],

  "/api/transport-modes": [
    { method: "POST", roles: ["ADMIN", "USER", "RH"] },
    { method: "GET", roles: ["ADMIN", "USER", "RH"] },
  ],

  "/api/transport-modes/:id": [
    { method: "PUT", roles: ["ADMIN", "USER", "RH"] },
    { method: "DELETE", roles: ["ADMIN", "USER", "RH"] },
  ],
  "/api/notifications": [{ method: "GET", roles: ["ADMIN", "RH"] }],
  "/api/notifications/:id": [{ method: "PATCH", roles: ["ADMIN", "RH"] }],
  "/api/missions/grouped": [{ method: "POST", roles: ["ADMIN", "RH"] }],
  "/api/files": [{ method: "GET", roles: ["ADMIN", "RH"] }],
};
