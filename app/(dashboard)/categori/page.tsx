import { fetchCategoriPlant } from '@/actions/CategoriPlant'
import ButtonAddCategoriPlant from '@/components/Buttons/ButtonAddCategoriPlant'
import TableCategoriPlant from '@/components/Tables/Table/TableCategoriPlant'
import React from 'react'

const page = async () => {
    const categoriplant = await fetchCategoriPlant()
    return (
      <div>
          <div className='flex items-center justify-end my-4'><ButtonAddCategoriPlant/></div>
          <div>
            <TableCategoriPlant title={"Les Catégories"} subTitle={"Tout les Catégories"} categoriplants={categoriplant.categoriplant}/>
          </div>
      </div>
    )
}

export default page
