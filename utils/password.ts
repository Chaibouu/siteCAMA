export function generateSecurePassword() {
  const length = 12;
  const charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+[]{}|;:,.<>?";
  let password = "";
  let hasLower = false,
    hasUpper = false,
    hasNumber = false,
    hasSpecial = false;

  while (
    !hasLower ||
    !hasUpper ||
    !hasNumber ||
    !hasSpecial ||
    password.length < length
  ) {
    const char = charset[Math.floor(Math.random() * charset.length)];
    if (/[a-z]/.test(char)) hasLower = true;
    if (/[A-Z]/.test(char)) hasUpper = true;
    if (/[0-9]/.test(char)) hasNumber = true;
    if (/[^a-zA-Z0-9]/.test(char)) hasSpecial = true;
    password += char;
  }

  return password;
}
