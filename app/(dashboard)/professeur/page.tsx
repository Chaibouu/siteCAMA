"use client"
import React from 'react'
import { useSession } from "@/context/SessionContext";

const page = () => {
  const { user, isAuthenticated } = useSession();

  return (
    <div>  
      Professeur
    </div>
  )
}

export default page