import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import appConfig from "@/settings";
import { Toaster } from "@/components/ui/sonner";
import { SessionProvider } from "@/context/SessionContext";
import { getUser } from "@/actions/getUser";
import ReactQueryProvider from "./ReactQueryProvider";
import Navbar from "@/components/Navbar";
import { Links } from "@/settings/navigation";
import Head from "next/head";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: appConfig.websiteTitle,
  description: appConfig.websiteDescription,
  keywords: ["semences","plantes","jardin","jardinier","Projet Agricoles","Agriculture aux Niger","suivi des champs","agriculture",
             "boutique en ligne","services agricoles","partenaires","réalisations",],
  authors: [{ name: "CAMA, C.A.M.A, Compagnie Africaine pour la modernisation de l'agriculture" }],
  viewport: "width=device-width, initial-scale=1.0",
  openGraph: {
    title: "Accueil | C.A.M.A - Vente de Semences & Suivi des Champs",
    description:
      "Explorez notre boutique en ligne pour des semences de qualité, découvrez nos services agricoles et parcourez nos projets réalisés.",
    url: "https://CAMA.com",
    type: "website",
    images: [
      {
        url: "/logoo.png",
        width: 1200,
        height: 630,
        alt: "Logo de CAMA",
      },
    ],
  }
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const {user} = await getUser();
  return (
    <>
      {/* <Head>
        <title>Accueil | Mon Site Web - Vente de Semences & Suivi des Champs</title>
        <meta
          name="description"
          content="Découvrez notre boutique de semences, nos services de suivi des champs, et nos réalisations. Contactez-nous pour un accompagnement sur mesure."
        />

        <meta name="keywords" content="semences, plantes, jardin, jardinier, suivi des champs, agriculture, boutique en ligne, services agricoles, partenaires, réalisations" />
        <meta name="author" content="CAMA, C.A.M.A, Compagnie Africaine pour la modernisation de l'agriculture" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <meta property="og:title" content="Accueil | Mon Site Web - Vente de Semences & Suivi des Champs" />
        <meta
          property="og:description"
          content="Explorez notre boutique en ligne pour des semences de qualité, découvrez nos services agricoles et parcourez nos projets réalisés."
        />
        <meta property="og:image" content="/logoo.png" />
        <meta property="og:url" content="https://CAMA.com" />
        <meta property="og:type" content="website" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Accueil | Mon Site Web - Vente de Semences & Suivi des Champs" />
        <meta
          name="twitter:description"
          content="Découvrez notre boutique de semences et nos services de suivi des champs pour améliorer votre production agricole."
        />
        <meta name="twitter:image" content="/logoo.png" />

        <link rel="icon" href="/favicon.ico" />
      </Head> */}
      <SessionProvider user={user?.user}>
        <html lang="en">
          <ReactQueryProvider>
            <Toaster position="top-right"/>
            {/* <Navbar Links={Links}/> */}
            <body className={inter.className}>{children}</body>
          </ReactQueryProvider>
        </html>
    </SessionProvider>
    </>
  );
}
