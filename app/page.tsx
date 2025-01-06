import { Poppins } from "next/font/google";
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
import { Metadata } from "next";
import appConfig from "@/settings";

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

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"]
})

export default  function Home() {
  return (
    <>
      
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
