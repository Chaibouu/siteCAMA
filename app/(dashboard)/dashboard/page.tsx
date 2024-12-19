
import React from 'react'


// export async function getServerSideProps() {
//   try {
//     const cycles = await getAllCycles(); // Récupère les données côté serveur
//     return {
//       props: {
//         cycles,
//       },
//     };
//   } catch (error: any) {
//     console.error("Erreur lors de la récupération des cycles : ", error);
//     return {
//       props: {
//         cycles: [],
//         error: error.message || "Erreur inconnue",
//       },
//     };
//   }
// }

const page = () => {
  return (
    <div>
      {/* <ButtonAddCycle/> */}
      {/* <TableCycle title="Les Cycles" subTitle="Tout les cycles"/> */}
    </div>
  )
}

export default page
