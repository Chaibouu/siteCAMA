import React, { ReactNode } from 'react'
import { FilePenLine, Plus, UserPlus } from 'lucide-react'
import Configs from '@/configs/Configs'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import UpdateCycle from '@/components/Forms/Update/UpdateCycle'

interface UpdateProps {
    id?: string; 
    children?: ReactNode; 
  }

export default function Update({children}:UpdateProps) {
    
  return (
        <Dialog >
            <DialogTrigger asChild>
              <Button className='flex items-center gap-2'>
                <FilePenLine />
              </Button>
            </DialogTrigger>
            <DialogContent> 
                 {children} {/* <UpdateCycle id={id}/> */}
            </DialogContent>
        </Dialog> 
  )
}
