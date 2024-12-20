"use client"
import React from 'react'
import { useSession } from "@/context/SessionContext";
import ButtonAddUser from '@/components/Buttons/ButtonAddUser';

const page = () => {
  const { user, isAuthenticated } = useSession();

  return (
    <div>  
      Utilisateur
      <div className='flex items-center justify-end my-4'><ButtonAddUser/></div>
    </div>
  )
}

export default page