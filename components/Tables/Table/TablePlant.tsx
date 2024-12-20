"use client";
import { useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";
import { DataTable } from "../DataTables/data-table";
import Delete from "../Delete/Delete";
import Update from "../Update/Update";
import { deletePlant, fetchPlant } from "@/actions/Plant";
import Image from "next/image";
import UpdatePlant from "@/components/Forms/Update/UpdatePlant";
// import UpdatePlant from "@/components/Forms/Update/UpdatePlant";
// import { deletePlant, fetchPlant } from "@/actions/plants";

interface categoriplant {
  id: string;
  name: string;
}
interface plant {
  id: string;
  name: string;
  price: string,
  category: categoriplant,
  imageUrl:  File | undefined, 
}

interface TableProps {
  title: string,
  subTitle: string,
  plants?:plant[],
}


const  TablePlant = ({title, subTitle, plants}: TableProps)=>{
 
  const Plant = async () => {
    let res = await fetchPlant()
    return res.plant
  }

  const { data } = useQuery({
    queryKey: ["plants"],
    queryFn: Plant,
    initialData: plants,
  });
  console.log(data);
  
  

   const columns: ColumnDef<plant>[] = [
    {
      accessorKey: "name",
      header: "Plant",
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
                alt="Image de la plante" // Texte alternatif
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
          <Update><UpdatePlant plant={row.original}/></Update>
          <Delete id={row.original.id} title="plants" deleteFnct={deletePlant}/>
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
      <DataTable<plant>
        data={data}
        columns={columns}
        queryKey="plants"
      />
    </div>
  );
}

export default TablePlant
