import React from 'react'
import { Button } from '../ui/button'
import { Plus, UserPlus } from 'lucide-react'
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog'
import AddCycle from '../Forms/Add/AddCycle'
import Configs from '@/configs/Configs'
// import Configs from '@/configs/config'



export default function ButtonAddCycle() {
  return (
        <Dialog >
            <DialogTrigger asChild>
              <Button 
                className='flex items-center gap-2' 
                style={{backgroundColor: Configs.SecondariColor}}
              >
                  <Plus /> Ajouter un Cycle
              </Button>
            </DialogTrigger>
            <DialogContent> 
                <AddCycle/>
            </DialogContent>
        </Dialog> 
  )
}
