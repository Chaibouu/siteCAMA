"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";
import { DataTable } from "../DataTables/data-table";
import { deleteCycle, getAllCycles } from "@/utils/cycle";
import Delete from "../Delete/Delete";
import Update from "../Update/Update";
import UpdateCycle from "@/components/Forms/Update/UpdateCycle";


interface cycle {
    id: string,
    cycle: string,
    isDeleted: boolean;
  }


interface TableProps {
  title: string,
  subTitle: string,
  cycles?:cycle,
}


const  TableCycle = ({title, subTitle, cycles}: TableProps)=>{

  const queryClient = useQueryClient();
 
  // Récupération des données des patients
  const Cycles = async () => {
    let res = await getAllCycles()
    return res.Cycles
  }

  const { data } = useQuery({
    queryKey: ["cycle"],
    queryFn: Cycles,
    initialData: cycles,
  });

  // Définition des colonnes pour DataTable
   const columns: ColumnDef<cycle>[] = [
    {
      accessorKey: "cycle",
      header: "Cycle",
      cell: ({ row }) => (
        <div className="">{row.getValue("cycle")}</div>
      ),
    },
    {
      id: "actions",
      cell: ({ row }) => {
        return (
         <div className="flex gap-4 justify-end me-4">
          <Update><UpdateCycle id={row.original.id}/></Update>
          <Delete id={row.original.id} title="le cycle" deleteFnct={deleteCycle}/>
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
      <DataTable<cycle>
        data={data}
        columns={columns}
        queryKey="cycle"
      />
    </div>
  );
}

export default TableCycle
