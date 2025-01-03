import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LoginButton } from "@/components/auth/login-button";
import appConfig from "@/settings";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { Links } from "@/settings/navigation";
import Boutique from "@/components/main/Boutique";
import About from "@/components/main/About";
import Footer from "@/components/main/Footer";
import Slider from "@/components/main/Slider";
import { images, partenaires, realisations } from "@/configs/Configs";
import Services from "@/components/main/Service";
import Contact from "@/components/main/Contact";
import RealisationsSection from "@/components/main/Realisation";
import PartenairesSection from "@/components/main/Partenaires";
import Head from "next/head"; // Import pour les métadonnées

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"]
})

export default function Home() {
  return (
    <>
      <Head>
        {/* Titre pour le référencement */}
        <title>Accueil | Mon Site Web - Vente de Semences & Suivi des Champs</title>
        <meta
          name="description"
          content="Découvrez notre boutique de semences, nos services de suivi des champs, et nos réalisations. Contactez-nous pour un accompagnement sur mesure."
        />

        {/* Métadonnées pour les moteurs de recherche */}
        <meta name="keywords" content="semences, plantes, jardin, jardinier, suivi des champs, agriculture, boutique en ligne, services agricoles, partenaires, réalisations" />
        <meta name="author" content="CAMA, C.A.M.A, Compagnie Africaine pour la modernisation de l'agriculture" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        {/* Open Graph pour les réseaux sociaux */}
        <meta property="og:title" content="Accueil | Mon Site Web - Vente de Semences & Suivi des Champs" />
        <meta
          property="og:description"
          content="Explorez notre boutique en ligne pour des semences de qualité, découvrez nos services agricoles et parcourez nos projets réalisés."
        />
        <meta property="og:image" content="/logoo.png" />
        <meta property="og:url" content="https://CAMA.com" />
        <meta property="og:type" content="website" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Accueil | Mon Site Web - Vente de Semences & Suivi des Champs" />
        <meta
          name="twitter:description"
          content="Découvrez notre boutique de semences et nos services de suivi des champs pour améliorer votre production agricole."
        />
        <meta name="twitter:image" content="/logoo.png" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Navbar Links={Links}/>
        {/* <main className="flex h-full flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-green-800"></main> */}
        <div className="scroll-mt-20 my-20" id="accueil"><Slider images={images}/></div>
        <div className="scroll-mt-20 my-20" id="propos"><About/></div>
        <div className="scroll-mt-20 my-20" id="service"><Services/></div>
        <div className="scroll-mt-20 my-20" id="boutique"><Boutique/></div>
        <div className="scroll-mt-20 my-20" id="realisation"><RealisationsSection realisations={realisations} /></div>
        <div className="scroll-mt-20 my-20" id="partenaire"><PartenairesSection partenaires={partenaires} /></div>
        <div className="scroll-mt-20 my-20" id="contact"><Contact/></div>
        <Footer/>
      </main>
    </>
  )
}
