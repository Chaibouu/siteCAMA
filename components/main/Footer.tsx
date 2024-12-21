"use client"
import Image from 'next/image';
import React, { useState } from 'react';
import { Icon } from '@iconify/react';

const Footer = () => {

        const [email, setEmail] = useState('');
      
        const handleInputChange = (e:any) => {
          setEmail(e.target.value);
        };
      
        const handleSubmit = (e:any) => {
          e.preventDefault();
          // Ajoutez ici le code pour gérer la soumission du formulaire
          console.log('Email submitted:', email);
        };


    return (
        <>
            <div className=" bg-Es_primary pt-1">
                <div  className="flex items-center justify-around">
                    <div>
                        <Image
                            alt="Ecole supérieur de Statistique et Informatique"
                            src={"/FooterLogo.png"}
                            width={200}
                            height={200}
                        />
                    </div>
                    <div className={`flex flex-col space-y-2`}>
                        <div className={`flex items-center`}>
                            <Icon icon="mdi:telephone"  className={`me-4 text-white text-xl`}/> 
                            <span className='text-white'>+227 886474747</span>
                        </div>
                        <div className={`flex items-center`}>
                            <Icon icon="mdi:email-multiple" className={`me-4 text-white text-xl`}/>
                            <span className='text-white'>essi.niger@gmail.com</span>
                        </div>
                        <div className={`flex items-center`}>
                            <Icon icon="gis:position-man" className={`me-4 text-white text-xl`}/> 
                            <span className='text-white'>Quartier Jangorzo</span>
                        </div>
                        <div className={`flex items-center`}>
                            <Icon icon="zondicons:globe" className={`me-4 text-white text-xl`}/> 
                            <span className='text-white'>http://www.essi.ne</span>
                        </div>
                        
                    </div>
                    <div className={`flex flex-col space-y-2 text-white`} >
                        <a href=''>Conditions générales</a>
                        <a href=''>Politique de confidentialité </a>
                        <a href=''>Politique en matière de cookies</a>
                        <a href=''>Notification de droits d'auteur</a>
                    </div>
                    <div>
                        <div className={`space-y-2 mt-2`} >
                            <span className='my-4'>
                                <h4 className='mb-Z text-white underline'>SUIVEZ-NOUS</h4>
                                <p>Inscrivez-vous à notre newsletter pour <br /> être tenu au courant de nos nouveautés!
                                </p>
                            </span>
                            <div>
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3 d-flex">
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={handleInputChange}
                                        className="form-control p-1"
                                        placeholder="Email*"
                                        aria-label="Recipient's username"
                                        aria-describedby="basic-addon2"
                                        required
                                    />
                                    <button type="submit" className="p-1 bg-black text-ms rounded-lg text-white px-2 ms-2" id="basic-addon2">
                                        Envoyez
                                    </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className='flex items-center justify-around text-[30px] my-4'>
                             <Icon className='me-4 cursor-pointer' icon="devicon:linkedin" />
                             <Icon className='me-4 cursor-pointer' icon="devicon:facebook" />
                             <Icon className='me-4 cursor-pointer' icon="devicon:twitter" />
                             <Icon className='me-4 cursor-pointer' icon="logos:whatsapp-icon" />
                             <Icon className='me-4 cursor-pointer' icon="skill-icons:instagram" />
                        </div>
                    </div>
                </div>
                <div className=' w-full text-center text-white text-[12px]'>
                    <p>Copyright  © 2024-Essi . Tous droits réservés.</p>
                </div>
            </div>
        </>
    );
};

export default Footer;