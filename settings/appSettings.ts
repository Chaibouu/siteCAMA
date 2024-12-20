interface BackoffConfig {
  maxAttempts: number;
  backoffDelayFactor: number;
}
interface RateLimitConfig {
  windowMs: number;
  max: number;
}
interface MailOptions {
  host: string | undefined;
  port: string | undefined;
  secure: boolean;
  auth: {
    user: string | undefined;
    pass: string | undefined;
  };
}

export interface AppSettings {
  backoff: BackoffConfig;
  allowMultipleSessions: boolean;
  rateLimit: RateLimitConfig;
  maxRetryAttempts: number;
  adminEmail: string;
  mailOptions: MailOptions;
}

const appSettings: AppSettings = {
  allowMultipleSessions: false, // ou false pour invalider les anciennes sessions
  // Configuration du Backoff progressif
  backoff: {
    maxAttempts: 5, // Nombre maximal de tentatives de connexion avant blocage
    backoffDelayFactor: 2, // Facteur de progression du backoff (multiplicateur)
  },
  rateLimit: {
    windowMs: 10 * 1000, // Durée de la fenêtre en ms (10 seconds)
    max: 5, // Nombre maximum de requêtes par IP dans la fenêtre
  },
  maxRetryAttempts: 5,
  adminEmail: "moctaryonli@gmail.com",
  mailOptions: {
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: true,
    auth: {
      user: process.env.MAIL_AUTH_USER,
      pass: process.env.MAIL_AUTH_PASSWORD,
    },
  },
};

export default appSettings;
