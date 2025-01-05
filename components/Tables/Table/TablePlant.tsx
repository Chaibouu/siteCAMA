"use client";
import { useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";
import { DataTable } from "../DataTables/data-table";
import Delete from "../Delete/Delete";
import Update from "../Update/Update";
import Image from "next/image";
import UpdatePlant from "@/components/Forms/Update/UpdatePlant";
import { deleteProduit, fetchProduit } from "@/actions/produit";


interface categoriplant {
  id: string;
  name: string;
}
interface produit {
  id: string;
  name: string;
  price: string,
  category: categoriplant,
  imageUrl:  File | undefined, 
}

interface TableProps {
  title: string,
  subTitle: string,
  plants?:produit[],
}


const  TablePlant = ({title, subTitle, plants}: TableProps)=>{
 
  const Produit = async () => {
    let res = await fetchProduit()
    return res.produit
  }

  const { data } = useQuery({
    queryKey: ["produits"],
    queryFn: Produit,
    initialData: plants,
  });
  console.log(data);
  
  

   const columns: ColumnDef<produit>[] = [
    {
      accessorKey: "name",
      header: "Produit",
      cell: ({ row }) => (
        <div className="">{row.getValue("name")}</div>
      ),
    },
    {
      accessorKey: "price",
      header: "Prix",
      cell: ({ row }) => (
        <div className="">{row.getValue("price")}</div>
      ),
    },
    // {
    //   accessorKey: "imageUrl",
    //   header: "Image",
    //   cell: ({ row }) => (
    //     <div className=""> <Image src={row.getValue("imageUrl")} /> </div>
    //   ),
    // },
    {
      accessorKey: "imageUrl",
      header: "Image",
      cell: ({ row }) => {
        const imageUrl = row.getValue("imageUrl") as string;
    
        return (
          <div className="">
            {imageUrl ? (
              <Image
                src={imageUrl} // URL de l'image
                alt="Image du produit" // Texte alternatif
                width={50} // Largeur de l'image
                height={50} // Hauteur de l'image
                className="rounded-full object-cover" // Classes CSS pour le style
              />
            ) : (
              <span className="text-gray-500 italic">Pas d'image</span> // Message alternatif
            )}
          </div>
        );
      },
    },
    {
      id: "actions",
      header: "Action",
      cell: ({ row }) => {
        return (
         <div className="flex gap-4">
          <Update><UpdatePlant produit={row.original}/></Update>
          <Delete id={row.original.id} title="produits" deleteFnct={deleteProduit}/>
         </div>
        )
      },
    },
  ]




  return (
    <div className="bg-white shadow border h-full flex-1 flex-col space-y-8 p-8 ">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
          <p className="text-muted-foreground text-nt__primary">{subTitle}</p>
        </div>
      </div>
      <DataTable<produit>
        data={data}
        columns={columns}
        queryKey="produits"
      />
    </div>
  );
}

export default TablePlant
