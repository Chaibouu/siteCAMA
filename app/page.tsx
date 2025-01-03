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
import { images, realisations } from "@/configs/Configs";
import Services from "@/components/main/Service";
import Contact from "@/components/main/Contact";
import RealisationsSection from "@/components/main/Realisation";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"]
})

export default function Home() {
  return (
    <main>
      <Navbar Links={Links}/>
      {/* <main className="flex h-full flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-green-800"></main> */}
      <div className="my-10" id="header"><Slider images={images}/></div>
      <div className="my-30" id="propos"><About/></div>
      <div className="my-30" id="propos"><Services/></div>
      <div className="my-30" id="boutique"><Boutique/></div>
      <div><RealisationsSection realisations={realisations} /></div>
      <div className="my-30" id="contact"><Contact/></div>
      <Footer/>
    </main>
  )
}
