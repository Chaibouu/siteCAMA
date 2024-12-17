import { headers } from "next/headers";

// Fonction pour récupérer l'adresse IP
export function getIp() {
  const forwardedFor = headers().get("x-forwarded-for");
  const realIp = headers().get("x-real-ip");

  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }
  if (realIp) {
    return realIp.trim();
  }
  return null;
}

// Fonction pour récupérer les informations de géolocalisation à partir de l'adresse IP
export async function getGeoLocation(ip: string | null) {
  if (!ip) {
    return null;
  }

  try {
    const response = await fetch(`http://ip-api.com/json/${ip}`);
    const data = await response.json();

    if (data.status === "success") {
      return {
        latitude: data.lat,
        longitude: data.lon,
        city: data.city,
        country: data.country,
      };
    }
    return null;
  } catch (error) {
    console.error(
      "Erreur lors de la récupération de la géolocalisation:",
      error
    );
    return null;
  }
}
