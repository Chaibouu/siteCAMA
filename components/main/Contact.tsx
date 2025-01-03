"use client"
import React from 'react'
import FormulaireDeContact from './FormulaireDeContact'
import MapContact from './MapContact'

const Contact = () => {
    return (
        <div className="max-w-[1100px] mx-auto">
            <div className='container mb-5 pb-5 border border-SecondaryCol rounded relative mt-24 pt-10'>
            <a href="/page#contact" className=" text-decoration-none"> <h2 className=' text-SecondaryCol text-4xl p-2 font-bold bg-white absolute top-[-27px] dark:text-PrimaryCol dark:bg-[#020817]'>Contacts</h2></a>
                <div className='md:flex md:items-center md:justify-around '>
                    <div className='md:w-1/2 md:me-4'><MapContact /></div>
                    <div className='md:w-1/2 '><FormulaireDeContact /></div>
                </div>
            </div>
        </div>
    )
}

export default Contact