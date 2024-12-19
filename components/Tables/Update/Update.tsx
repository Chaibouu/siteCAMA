import React, { ReactNode, useState } from 'react'
import { FilePenLine, Plus, UserPlus } from 'lucide-react'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'


interface UpdateProps {
    id?: string; 
    children?: ReactNode; 
  }

export default function Update({children}:UpdateProps) {

    const [isOpen, setIsOpen] = useState(false); // État pour ouvrir/fermer le dialog
  
    const handleClose = () => {
      setIsOpen(false); // Ferme le dialog
    };
    
  return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <FilePenLine className="cursor-pointer" color="#306ced"/>
            </DialogTrigger>
            <DialogContent> 
                 {children} {/* <UpdateCycle id={id}/> */}
            </DialogContent>
        </Dialog> 
  )
}
