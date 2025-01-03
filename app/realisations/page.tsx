import Realisations from '@/components/main/Realisations'
import Navbar from '@/components/Navbar'
import { realisations } from '@/configs/Configs'
import { Linkss } from '@/settings/navigation'
import React from 'react'

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
