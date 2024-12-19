'use client'
import { Button } from "@/components/ui/button"
import {Dialog,DialogContent,DialogDescription,DialogFooter,DialogHeader,DialogTitle,DialogTrigger,} from "@/components/ui/dialog"
import React from "react"
import { UserRole } from "@prisma/client"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { Trash2 } from "lucide-react"

interface deleteProps{
  id: string,
  title?: string, 
  deleteFnct: (id: string) => Promise<any>
}

const Delete = ({id, title, deleteFnct}:deleteProps) => {

    const [load, setLoad] = React.useState(false)
    const queryClient = useQueryClient();



      const mutation = useMutation({
        mutationFn: deleteFnct,
        onSuccess: (data) => {
          setLoad(false);
          if (data.message) {
            queryClient.invalidateQueries({ queryKey: [title] });
            // toast.success(data.message, {
            //   position: 'top-right',
            // });
            toast(data.message, {
                position: 'top-right',
                style: {
                    backgroundColor: '#0eda0e',
                    color: 'white'
                }
            });
          } else if(data.error){
              toast(`Erreur : ${data.error}`, {
                  position: 'top-right',
                  style: {
                    backgroundColor: "red",
                    color: "white",
                  },
              });
              document.getElementById("close")?.click();
          }
          // Fermer le modal
          document.getElementById('close')?.click()
        },
        onError: (error: Error) => {
          setLoad(false);
      
          toast(`Erreur : ${error.message}`, {
            position: "top-right",
            style: {
              backgroundColor: "red",
              color: "white",
            },
          });
        },
      });


      const handleDelete = () => {
        setLoad(true);
        mutation.mutate(id); 
      };
      


  return (
    <Dialog>
    <DialogTrigger asChild>
      {/* <Button variant={'destructive'}>Supprimer</Button> */}
      <Trash2 className="cursor-pointer" color="#ea2a2a" />
    </DialogTrigger>
    <DialogContent className="sm:max-w-[435px]">
      <DialogHeader className="">
        <DialogTitle>Supprimer {title}</DialogTitle>
        <DialogDescription className="my-4">
          veulliez confirmer la suppression !!!
        </DialogDescription>
      </DialogHeader>
    <div className="flex justify-end">
        <Button variant={'destructive'} disabled={load} onClick={handleDelete}>{load ? '....' : 'Supprimer'}</Button>
    </div>
    </DialogContent>
  </Dialog>
  )
}

export default Delete
