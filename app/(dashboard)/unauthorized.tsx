import { useSession } from "@/context/SessionContext";
import { Home } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

 
  export default function Unauthorized() {
    
    return (
      <div className='w-full h-full flex items-center justify-center'>
        <div className='relative'>
            <Image src="/Unauthorized.png" alt="Not-Found" width={500} height={300}/>
            <div className="absolute bottom-0 w-full flex items-center justify-center">
                <Link href="/dashboard" className='border-2 rounded-md py-2 px-4 flex items-center gap-2 bg-[#1FAF3C] text-slate-200'> <Home/> Retour à l'Acceuil</Link>
            </div>
        </div>
    </div>
    )
  }
  