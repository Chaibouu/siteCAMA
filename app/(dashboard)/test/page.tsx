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
    </div>
  )
}

export default page