'use client'
import React, { useState } from 'react'
import { Button } from '../ui/button'
import { Plus, UserPlus } from 'lucide-react'
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog'
import Configs from '@/configs/Configs'
import AddCategoriPlant from '../Forms/Add/AddCategoriPlant'



export default function ButtonAddCategoriPlant() {
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
                  <Plus /> Ajouter une Catégorie
              </Button>
            </DialogTrigger>
            <DialogContent> 
                <AddCategoriPlant onClose={handleClose}/>
            </DialogContent>
        </Dialog> 
  )
}
