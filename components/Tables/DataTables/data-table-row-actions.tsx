"use client"

import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import { Row } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {  toast } from 'sonner'
import { CreateAgentSchema } from "./schema"
// import { deleteUser } from "@/actions/deleteUser"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
// import AddUserForm from "@/components/forms/add-user-form"

interface DataTableRowActionsProps<TData> {
  row: Row<TData>,
  setTableData?: React.Dispatch<React.SetStateAction<TData[]>>,
}

export function DataTableRowActions<TData>({
  row,
  setTableData,
}: DataTableRowActionsProps<TData>) {
  

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
          >
            <DotsHorizontalIcon className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          <DropdownMenuItem>
          <DialogTrigger asChild>
            <Button variant={"ghost"} >Modifier</Button>
          </DialogTrigger>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem /* onClick={() => handleDeleteUser(user.id)} */ >
            <Button variant={"ghost"} >Supprimer</Button>
          </DropdownMenuItem>
          <DropdownMenuSeparator />

        </DropdownMenuContent>
      </DropdownMenu>
      <DialogContent className=" max-w-[800px] border-none">
      {/* <AddUserForm agencyId={agencyId} modify data={user} userRole={user.role} setUserData={setTableData} /> */}
    </DialogContent>
    </Dialog>
  )
}
