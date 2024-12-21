"use client"
import React from 'react'
import FormulaireDeContact from './FormulaireDeContact'
import MapContact from './MapContact'

const SectionContact = () => {
    return (
        <div className='container mb-5 pb-5 border border-Es_primary rounded relative mt-24 pt-10'>
           <a href="/page#contact" className=" text-decoration-none"> <h2 className=' text-Es_primary text-3xl p-2 bg-white absolute top-[-27px]'>Contacts</h2></a>
            <div className='md:flex md:items-center md:justify-around '>
                <div className='md:w-1/2 md:me-4'><MapContact /></div>
                <div className='md:w-1/2 '><FormulaireDeContact /></div>
            </div>
        </div>
    )
}

export default SectionContact