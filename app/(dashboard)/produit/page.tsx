import { fetchPlant } from '@/actions/Plant'
import ButtonAddPlant from '@/components/Buttons/ButtonAddPlant'
import TablePlant from '@/components/Tables/Table/TablePlant'
import React from 'react'

export const dynamic = "force-dynamic";


const page = async () => {
    const plant = await fetchPlant()
    return (
      <div>
          <div className='flex items-center justify-end my-4'><ButtonAddPlant/></div>
          <div>
            <TablePlant title={"Les produits"} subTitle={"Tout les produits de la boutique"} plants={plant.plant}/>
          </div>
      </div>
    )
}

export default page
