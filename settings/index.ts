import { db } from "@/lib/db";

const appConfig = {
  appName: "CAMA",
  websiteTitle: "CAMA",
  websiteDescription:"Pour tout vos besoin en plante et suivi des jardins",
  logoUrl: "/logoo.png",
  sidebarClearlogoUrl: "/sahel_coders_logo.png",
  adminSidebarColor: "#1C2434",
  mailOptions: {
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: true,
    auth: {
      user: process.env.MAIL_AUTH_USER,
      pass: process.env.MAIL_AUTH_PASSWORD,
    },
  },
  publicRoutes: ["/"],
  defaultLoginRedirect: "/dashboard",

  // Ajout d'une option pour autoriser ou non les connexions multiples
  allowMultipleSessions: false, // ou false pour invalider les anciennes sessions
  rateLimit: {
    windowMs: 10 * 1000, // Durée de la fenêtre en ms (10 seconds)
    max: 5, // Nombre maximum de requêtes par IP dans la fenêtre
  },
  // Configuration du Backoff progressif
  backoff: {
    maxAttempts: 15, // Nombre maximal de tentatives de connexion avant blocage
    backoffDelayFactor: 2, // Facteur de progression du backoff (multiplicateur)
  },
};

export interface AppConfig {
  appName: string;
  websiteTitle: string;
  websiteDescription: string;
  logoUrl: string;
  sidebarClearlogoUrl: string;
  adminSidebarColor: string;
  primaryColor: string;
  secondaryColor: string;
  buttonColor: string;
  fontFamily: string;
  fontSize: string;
  footerText: string;
  vert: string;
  orange: string;
}

export const loadAppConfig = async (): Promise<AppConfig> => {
  // const settings = await db.setting.findMany();

  // const settingsMap: Record<string, string> = settings.reduce<
  //   Record<string, string>
  // >((acc, setting) => {
  //   acc[setting.key] = setting.value;
  //   return acc;
  // }, {});

  return {
    appName: "CAMA",
    websiteTitle:  "CAMA",
    websiteDescription: "Compagnie Africaine pour la modernisation de l'agriculture",
    logoUrl:  "/logoo.png",
    sidebarClearlogoUrl: "/logoo.png",
    adminSidebarColor:  "#1C2434",
    primaryColor:  "#099058",
    secondaryColor:  "#F06E2F",
    buttonColor:  "#FF5722",
    fontFamily:  "Inter, sans-serif",
    fontSize:  "16px",
    footerText:  "Powered by CAMA",
    vert: "#099058",
    orange: "#F06E2F",
  };
};

export default appConfig;
