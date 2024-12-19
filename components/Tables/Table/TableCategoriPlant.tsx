"use client";
import { useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";
import { DataTable } from "../DataTables/data-table";
import Delete from "../Delete/Delete";
import Update from "../Update/Update";
import { deleteCategoriPlant, fetchCategoriPlant } from "@/actions/CategoriPlant";
import UpdateCategoriPlant from "@/components/Forms/Update/UpdateCategoriPlant";


interface categoriplant {
  id: string;
  name: string;
  description: string;
}

interface TableProps {
  title: string,
  subTitle: string,
  categoriplants?:categoriplant[],
}


const  TableCategoriPlant = ({title, subTitle, categoriplants}: TableProps)=>{
 
  const CategoriPlant = async () => {
    let res = await fetchCategoriPlant()
    return res.categoriplant
  }

  const { data } = useQuery({
    queryKey: ["categoriplants"],
    queryFn: CategoriPlant,
    initialData: categoriplants,
  });
  

   const columns: ColumnDef<categoriplant>[] = [
    {
      accessorKey: "name",
      header: "Nom",
      cell: ({ row }) => (
        <div className="">{row.getValue("name")}</div>
      ),
    },
    {
      id: "actions",
      cell: ({ row }) => {
        return (
         <div className="flex gap-4 justify-end me-4">
          <Update><UpdateCategoriPlant categoriplant={row.original}/></Update>
          <Delete id={row.original.id} title="categoriplants" deleteFnct={deleteCategoriPlant}/>
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
      <DataTable<categoriplant>
        data={data}
        columns={columns}
        queryKey="categoriplants"
      />
    </div>
  );
}

export default TableCategoriPlant
