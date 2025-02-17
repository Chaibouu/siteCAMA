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
// import { postPlant } from '@/actions/Plant';
import { PlantSchema } from '@/schemas/Forms';
import { fetchCategoriPlant } from '@/actions/CategoriPlant';
import Select from 'react-select';
import { postProduit } from '@/actions/produit';

interface categoriplant {
    id: string;
    name: string;
    description: string;
}

interface AddPlantProps {
    onClose: () => void; // Fonction pour fermer le dialog
    categoriplants?:categoriplant[],
}


const AddPlant = ({ onClose, categoriplants }:AddPlantProps) => {
    const [isPending, setIsPending] = useState(false);
    const [isClearable, setIsClearable] = useState(true);
    const [isSearchable, setIsSearchable] = useState(true);
    const [isDisabled, setIsDisabled] = useState(false);
    const queryClient = useQueryClient();

    const CategoriPlant = async () => {
        let res = await fetchCategoriPlant()
        return res.categoriplant
    }
    
    const { data : datacategoriplants } = useQuery({
    queryKey: ["categoriplants"],
    queryFn: CategoriPlant,
    initialData: categoriplants,
    });
    

    const mutation = useMutation({
        mutationFn: postProduit,
        onSuccess: (data) => {
        if (data.message) {
            queryClient.invalidateQueries({ queryKey: ['produits'] });
            setIsPending(false)
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
        onClose(); // Fermer le dialog après succès
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
        name: "",
        price: "",
        categoryId: "",
        image: undefined as File | undefined, // Déclarez image comme étant `undefined` ou un fichier
    };
      

    const form = useForm<z.infer<typeof PlantSchema>>({
    resolver: zodResolver(PlantSchema),
    defaultValues: defaultValue
    })
    // console.log(form.watch());
    // console.log(form.formState.errors);

    const onSubmit = async (data: z.infer<typeof PlantSchema>) => {
        setIsPending(true);

        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("price", data.price);
        formData.append("categoryId", data.categoryId);
      
        if (data.imageUrl instanceof File) {
          formData.append("image", data.imageUrl); // Ajouter directement l'image
        }

        try {
        mutation.mutate(formData)
        } catch (error:any) {
        toast(error)
        }
    }

    
  return (
    <div>
        <Form {...form}>
            <div><h1 className="text-2xl text-slate-500 font-bold text-center">Ajouter un Produit</h1></div>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                 <div className="space-y-4">
                    {/* Champ : Nom */}
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel className="mt-2 text-lg text-slate-400 min-w-[200px]">
                            Produit <b className="text-red-500">*</b>
                            </FormLabel>
                            <FormControl>
                            <Input
                                {...field}
                                type="text"
                                placeholder="Veuillez saisir le nom du produit"
                                disabled={isPending}
                                className="bg-white"
                            />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />

                    {/* Champ : Prix */}
                    <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel className="mt-2 text-lg text-slate-400 min-w-[200px]">
                            Prix <b className="text-red-500">*</b>
                            </FormLabel>
                            <FormControl>
                            <Input
                                {...field}
                                type="number"
                                placeholder="Veuillez saisir le prix"
                                disabled={isPending}
                                className="bg-white"
                            />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />

                    {/* Champ : Catégorie */}
                    {/* <FormField
                        control={form.control}
                        name="categoryId"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel className="mt-2 text-lg text-slate-400 min-w-[200px]">
                            Catégorie <b className="text-red-500">*</b>
                            </FormLabel>
                            <FormControl>
                            <Input
                                {...field}
                                type="number"
                                placeholder="Veuillez saisir la catégorie"
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
                        name="categoryId" // Ce champ contiendra l'id sélectionné
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel className="mt-2 text-lg text-slate-400 min-w-[200px]">
                                Catégorie <b className="text-red-500">*</b>
                            </FormLabel>
                            <FormControl>
                                <Select
                                className="basic-single"
                                classNamePrefix="select"
                                placeholder="Veuillez sélectionner une catégorie"
                                isClearable
                                isSearchable
                                options={datacategoriplants?.map((category:any) => ({
                                    value: category.id, // La valeur sera l'id
                                    label: category.name, // Le libellé affiché sera le nom
                                }))}
                                isDisabled={isPending}
                                onChange={(selectedOption) => {
                                    field.onChange(selectedOption?.value || ""); // Mettez à jour la valeur avec l'id
                                }}
                                value={datacategoriplants
                                    ?.map((category:any) => ({
                                    value: category.id,
                                    label: category.name,
                                    }))
                                    .find((option:any) => option.value === field.value) || null} // Pré-sélectionne l'option si elle existe
                                />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Champ : Image */}
                    <FormField
                        control={form.control}
                        name="imageUrl"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel className="mt-2 text-lg text-slate-400 min-w-[200px]">
                                Image <b className="text-red-500">*</b>
                            </FormLabel>
                            <FormControl>
                                <Input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    field.onChange(file); // Passez le fichier à react-hook-form
                                }}
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
                            "Ajouter un produit"
                        )}
                    </Button>
                </div>
          </form> 
      </Form>
      
    </div>
  )
}

export default AddPlant
