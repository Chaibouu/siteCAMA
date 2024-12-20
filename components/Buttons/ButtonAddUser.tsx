'use client'
import React, { useState } from 'react'
import { Button } from '../ui/button'
import { Plus, UserPlus } from 'lucide-react'
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog'
import Configs from '@/configs/Configs'
import AddUser from '../Forms/Add/AddUser'



export default function ButtonAddUser() {
  const [isOpen, setIsOpen] = useState(false); // État pour ouvrir/fermer le dialog

  const handleClose = () => {
    setIsOpen(false); // Ferme le dialog
  };

  return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button 
                className='flex items-center gap-2' 
                style={{backgroundColor: Configs.SecondariColor}}
                onClick={() => setIsOpen(true)} // Ouvrir le dialog
              >
                  <UserPlus /> Ajouter un Utilisateur
              </Button>
            </DialogTrigger>
            <DialogContent> 
                <AddUser onClose={handleClose} />
            </DialogContent>
        </Dialog> 
  )
}
