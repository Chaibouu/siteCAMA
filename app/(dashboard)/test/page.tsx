"use client"
import React from 'react'
import { useSession } from "@/context/SessionContext";
// import { getUser } from '@/actions/getUser';

const page = 
// async 
() => {
  const { user, isAuthenticated } = useSession();
  // const user = await getUser();

  return (
    <div>  
      {
        JSON.stringify(user)
      }
      <div>
        <h1>titre de la page test</h1>
      </div>
    </div>
  )
}

export default page