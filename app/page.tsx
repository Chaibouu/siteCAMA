'use client'

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
