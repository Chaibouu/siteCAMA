// Fonction pour vérifier les autorisations de l'utilisateur
export function isUserAuthorized(
  userRole: string,
  allowedRoles: string[]
): boolean {
  return allowedRoles.includes(userRole);
}
