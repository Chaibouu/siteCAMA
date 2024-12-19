"use client"
import React, { useState } from 'react'
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../ui/form';
import { Input } from '../../ui/input';
import { Button } from '../../ui/button';
import Configs from '@/configs/Configs';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { putCategoriPlant } from '@/actions/CategoriPlant';
import { CategoriPlantSchema } from '@/schemas/Forms';

interface categoriplant {
    id: string;
    name: string;
}
interface UpdateCategoriPlantProps {
    categoriplant : categoriplant;
    // onClose: () => void; // Fonction pour fermer le dialog
}

const UpdateCategoriPlant = ({categoriplant}:UpdateCategoriPlantProps) => {
    const [isPending, setIsPending] = useState(false);
    const queryClient = useQueryClient();
    
    const mutation = useMutation({
        mutationFn: putCategoriPlant,
        onSuccess: (data) => {
        if (data.message) {
            queryClient.invalidateQueries({ queryKey: ['categoriplants'] });
            setIsPending(false)
            toast(data.message, {
                position: 'top-right',
                style: {
                    backgroundColor: '#0eda0e',
                    color: 'white'
                }
            });
        } else if(data.error){
            toast.error(data.error, {
                position: 'top-right',
                });
        }
        // onClose(); // Fermer le dialog après succès
        document.getElementById('close')?.click()
        // window.location.reload();
        },
        onError: (error:any) => {
        setIsPending(false)
        toast(`Erreur : ${error.message}`, {
            position: 'top-right',
            style: {
                backgroundColor: 'red',
                color: 'white'
            }
        });
        },
    });

    const defaultValue = {
        name : categoriplant.name || '',
    }

    const form = useForm<z.infer<typeof CategoriPlantSchema>>({
    resolver: zodResolver(CategoriPlantSchema),
    defaultValues: defaultValue
    })
    console.log(form.watch());
    console.log(form.formState.errors);

    const onSubmit = async (data: z.infer<typeof CategoriPlantSchema>) => {
        setIsPending(true);
        let body = {
            id: categoriplant.id,
            body:{
            name: data.name,
          }
        }
        
        mutation.mutate(body)

    }

    
  return (
    <div>
        <Form {...form}>
            <div><h1 className="text-2xl text-slate-500 font-bold text-center">Modifier une Catégorie</h1></div>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className='space-y-4'>
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                        <FormItem className=''>
                            <FormLabel className='mt-2 text-lg text-slate-400 min-w-[200px]'>Catégorie<b className="text-red-500">*</b></FormLabel>
                            <FormControl>
                                <Input
                                {...field}
                                type="text"
                                placeholder="Veuillez saisir une Catégorie"
                                disabled={isPending}
                                className="bg-white"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                </div>
                <div>
                    <Button
                        type="submit"
                        disabled={isPending}
                        className={`w-full bg-nt__primary mt-8 text-white ${isPending ? "opacity-50 bg-slate-400 mt-8 cursor-not-allowed" : "bg-slate-800 mt-8 hover:bg-slate-600"}`}
                        style={{backgroundColor: Configs.SecondariColor}}
                    >
                        {isPending ? (
                            <svg
                                className="animate-spin h-5 w-5 text-white mx-auto"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                ></circle>
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                                ></path>
                            </svg>
                        ) : (
                            "Modifier une Catégorie"
                        )}
                    </Button>
                </div>
          </form> 
      </Form>
      
    </div>
  )
}

export default UpdateCategoriPlant
