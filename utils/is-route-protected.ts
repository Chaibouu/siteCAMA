import { isUserAuthorized } from "@/utils/is-user-authorized";
import { adminNavigation } from "@/settings/navigation";

/**
 * Fonction pour vérifier si une route est protégée et si l'utilisateur est autorisé à y accéder
 * @param userRole - Le rôle de l'utilisateur actuel
 * @param pathname - Le chemin de la route actuelle
 * @returns true si l'utilisateur n'est pas autorisé à accéder à la route, false sinon
 */
export const isRouteProtected = (
  userRole: string,
  pathname: string
): boolean => {
  return adminNavigation.some((navItem) => {
    // Vérification pour les routes sans sous-routes
    if (navItem.path === pathname && navItem.allowedRoles) {
      return !isUserAuthorized(userRole, navItem.allowedRoles);
    }

    // Vérification pour les routes avec sous-routes
    if (navItem.children) {
      return navItem.children.some(
        (child) =>
          child.path === pathname &&
          isUserAuthorized(userRole, child.allowedRoles) // Vérifie si l'utilisateur est autorisé à accéder à la sous-route
      );
    }

    return false;
  });
};
