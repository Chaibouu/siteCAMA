import Realisations from '@/components/main/Realisations'
import Navbar from '@/components/Navbar'
import { realisations } from '@/configs/Configs'
import appConfig from '@/settings'
import { Linkss } from '@/settings/navigation'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: appConfig.websiteTitle,
  description: appConfig.websiteDescription,
  keywords: ["semences","plantes","jardin","jardinier","Projet Agricoles","Agriculture aux Niger","suivi des champs","agriculture",
             "boutique en ligne","services agricoles","partenaires","réalisations",],
  authors: [{ name: "CAMA, C.A.M.A, Compagnie Africaine pour la modernisation de l'agriculture" }],
  viewport: "width=device-width, initial-scale=1.0",
  openGraph: {
    title: "Réalisations | C.A.M.A - Vente de Semences & Suivi des Champs",
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

export default function page() {
  return (
    <>
      <Navbar Links={Linkss}/>
      <section className='flex items-start justify-center mt-20'>
        <nav className='hidden w-1/4 md:block h-screen'>
            <div className='border border-gray-200 h-full rounded-lg p-4 m-2 sticky top-0'>

            </div>
        </nav>
        <div className='md:w-3/4'>
            <div className='p-4'>
                <Realisations realisations={realisations} />
            </div>
        </div>
      </section>
    </>
  )
}
