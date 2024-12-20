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
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { postPlant } from '@/actions/Plant';
import { PlantSchema, UserSchema } from '@/schemas/Forms';
import { fetchCategoriPlant } from '@/actions/CategoriPlant';
import Select from 'react-select';
import { postUsers } from '@/actions/users';

interface AddPlantProps {
    onClose: () => void; // Fonction pour fermer le dialog
}


const AddUser = ({ onClose }:AddPlantProps) => {
    const [isPending, setIsPending] = useState(false);
    const [isClearable, setIsClearable] = useState(true);
    const [isSearchable, setIsSearchable] = useState(true);
    const [isDisabled, setIsDisabled] = useState(false);
    const [BDate, setBDate] = React.useState<Date>()
    const queryClient = useQueryClient();
    

    const mutation = useMutation({
        mutationFn: postUsers,
        onSuccess: (data) => {
        if (data.message) {
            queryClient.invalidateQueries({ queryKey: ['users'] });
            setIsPending(false)
            setBDate(undefined)
            form.setValue('name', '')
            form.setValue('email', '')
            form.setValue('phone', '')
            form.setValue('address', '')
            form.setValue('designation', '')
            // form.setValue('dateOfBirth', '')
            // form.setValue('role', '')
            // form.setValue('role', "USER" | "ADMIN")
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
                    backgroundColor: '#f03e3e',
                    color: 'white'
                }
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
                backgroundColor: '#f03e3e',
                color: 'white'
            }
        });
        },
    });

    const defaultValue = {
        name:'',
        email:'',
        phone:'',
        designation:'',
        address:'',
        // dateOfBirth:'' ,
        // image: undefined as File | undefined,
        // role:'',

    };

    const options = [
        { value: 'USER', label: 'Utilisateur' },
        { value: 'ADMIN', label: 'Administrateur' },
    ]
      

    const form = useForm<z.infer<typeof UserSchema>>({
    resolver: zodResolver(UserSchema),
    defaultValues: defaultValue
    })
    console.log(form.watch());
    console.log(form.formState.errors);

    const onSubmit = async (data: z.infer<typeof UserSchema>) => {
        setIsPending(true);

        const formData = new FormData();
        // formData.append("name", data.name);
        // formData.append("email", data.email);
        // formData.append("phone", data.phone);
        // formData.append("designation", data.designation);
        // formData.append("address", data.address);
        // formData.append("dateOfBirth", data.dateOfBirth);
        // formData.append("role", data.role);
      
        // if (data.image instanceof File) {
        //   formData.append("image", data.image); // Ajouter directement l'image
        // }
          // Vérifiez que chaque champ est défini avant de l'ajouter à FormData
        if (data.name) {
            formData.append("name", data.name);
        }

        if (data.email) {
            formData.append("email", data.email);
        }

        if (data.phone) {
            formData.append("phone", data.phone);
        }

        if (data.designation) {
            formData.append("designation", data.designation);
        }

        if (data.address) {
            formData.append("address", data.address);
        }

        // if (data.dateOfBirth) {
        //     formData.append("dateOfBirth", data.dateOfBirth);
        // }

        if (data.image) {
            formData.append("image", data.image); // Fichier image (Blob)
        }

        if (data.role) {
            formData.append("role", data.role);
        }

        try {
        mutation.mutate(data)
        } catch (error:any) {
        toast(error)
        }
    }

    
  return (
    <div>
        <Form {...form}>
            <div><h1 className="text-2xl text-slate-500 font-bold text-center">Ajouter une Plante</h1></div>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="space-y-4">
                    {/* Champ : Nom */}
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel className="mt-2 text-lg text-slate-400 min-w-[200px]">
                            Nom <b className="text-red-500">*</b>
                            </FormLabel>
                            <FormControl>
                            <Input
                                {...field}
                                type="text"
                                placeholder="Veuillez saisir le nom"
                                disabled={isPending}
                                className="bg-white"
                            />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />

                    {/* Champ : Email */}
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel className="mt-2 text-lg text-slate-400 min-w-[200px]">
                            Email <b className="text-red-500">*</b>
                            </FormLabel>
                            <FormControl>
                            <Input
                                {...field}
                                type="email"
                                placeholder="Veuillez saisir l'email"
                                disabled={isPending}
                                className="bg-white"
                            />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />

                    {/* Champ : Téléphone */}
                    <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel className="mt-2 text-lg text-slate-400 min-w-[200px]">
                            Téléphone <b className="text-red-500">*</b>
                            </FormLabel>
                            <FormControl>
                            <Input
                                {...field}
                                type="text"
                                placeholder="Veuillez saisir le numéro de téléphone"
                                disabled={isPending}
                                className="bg-white"
                            />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />

                    {/* Champ : Désignation */}
                    <FormField
                        control={form.control}
                        name="designation"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel className="mt-2 text-lg text-slate-400 min-w-[200px]">
                            Désignation <b className="text-red-500">*</b>
                            </FormLabel>
                            <FormControl>
                            <Input
                                {...field}
                                type="text"
                                placeholder="Veuillez saisir la désignation"
                                disabled={isPending}
                                className="bg-white"
                            />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />

                    {/* Champ : Adresse */}
                    <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel className="mt-2 text-lg text-slate-400 min-w-[200px]">
                            Adresse
                            </FormLabel>
                            <FormControl>
                            <Input
                                {...field}
                                type="text"
                                placeholder="Veuillez saisir l'adresse"
                                disabled={isPending}
                                className="bg-white"
                            />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />

                    {/* Champ : Date de naissance */}
                    {/* <FormField
                        control={form.control}
                        name="dateOfBirth"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel className="mt-2 text-lg text-slate-400 min-w-[200px]">
                            Date de naissance
                            </FormLabel>
                            <FormControl>
                            <Input
                                {...field}
                                type="date"
                                // placeholder="Veuillez sélectionner la date de naissance"
                                disabled={isPending}
                                className="bg-white"
                            />

                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    /> */}
                    <FormField
                        control={form.control}
                        name="dateOfBirth"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel className="mt-2 text-lg text-slate-400 min-w-[200px]">
                                Date de naissance
                            </FormLabel>
                            <FormControl>
                                <Input
                                {...field}
                                type="date"
                                disabled={isPending}
                                className="bg-white"
                                value={field.value ? new Date(field.value).toISOString().split("T")[0] : ""} // Conversion de la date en format YYYY-MM-DD
                                onChange={(e) => field.onChange(e.target.value)} // Mettre à jour avec une chaîne
                                />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />


                    {/* Champ : Image */}
                    {/* <FormField
                        control={form.control}
                        name="image"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel className="mt-2 text-lg text-slate-400 min-w-[200px]">
                            Image
                            </FormLabel>
                            <FormControl>
                            <Input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                const file = e.target.files?.[0];
                                field.onChange(file);
                                }}
                                disabled={isPending}
                                className="bg-white"
                            />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    /> */}

                    {/* Champ : Rôle */}
                    <FormField
                        control={form.control}
                        name="role"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel className="mt-2 text-lg text-slate-400 min-w-[200px]">
                            Rôle <b className="text-red-500">*</b>
                            </FormLabel>
                            <FormControl>
                            {/* <Input
                                {...field}
                                type="text"
                                placeholder="Veuillez saisir le rôle"
                                disabled={isPending}
                                className="bg-white"
                            /> */}
                            <Select
                                options={options}
                                onChange={(selectedOption:any) => field.onChange(selectedOption.value)}
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
                            "Ajouter une Plante"
                        )}
                    </Button>
                </div>
          </form> 
      </Form>
      
    </div>
  )
}

export default AddUser
