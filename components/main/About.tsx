// import Image from 'next/image'
// import React from 'react'

// const About = () => {
//   return (
//     <>
//       <div><h2 className="text-Es_primary text-4xl font-bold text-center mb-14">A propos</h2></div>
//       <div className='flex justify-center items-center'>
//           <div>
//             <p className='text-xl'>
//               Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos voluptates quasi 
//               repellat <br /> a est officia officiis doloremque aliquam. Esse illum nam 
//               accusamus voluptate beatae, dolorum natus id est dolorem <br /> 
//               asperiores optio quis voluptas sapiente rerum, excepturi eveniet! Id, 
//               voluptatum. At unde sed quasi provident explicabo <br />. Voluptatum 
//               repellendus vero, harum quos cupiditate, sapiente eius doloribus 
//               maxime quae amet <br /> praesentium perspiciatis odio. Saepe, dolor inve <br />
//               ntore. Accusantium eius quisquam omnis cupiditate incidunt recusandae.
//             </p> 
//           </div>
//           <div>
//               <Image src="/logoo.png" alt="Cama" height={400} width={400}/>
//           </div> 
//       </div>
//     </>
//   )
// }

// export default About


import Image from 'next/image'
import React from 'react'

const About = () => {
  return (
    <>
      <div>
        <h2 className="text-Es_primary text-4xl font-bold text-center mb-14">À propos</h2>
      </div>
      <div className='flex justify-center items-center'>
        <div className="flex flex-col md:flex-row justify-center items-center md:items-start space-y-8 md:space-y-0 md:space-x-10">
          {/* Texte à gauche */}
          <div className="md:w-1/2">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">C.A.M.A. (Compagnie Africaine pour la Modernisation de l'Agriculture)</h3>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              <span className="font-semibold">Spécialisation :</span> Production et vente de légumes et fruits. <br />
              <span className="font-semibold">Origine :</span> Issue d'une réflexion collective entre étudiants agronomes et producteurs locaux. <br />
              <span className="font-semibold">Intervention :</span> Toute la chaîne de production agricole.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              <span className="font-semibold">Mission :</span> Assister les producteurs à mieux rentabiliser leur production grâce à la modernisation.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              <span className="font-semibold">Objectif :</span> Inciter les jeunes à s'engager dans le domaine agricole.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              <span className="font-semibold">Services et Produits :</span> Offrir les meilleurs services et produits agricoles pour améliorer la rentabilité et l'efficacité des producteurs.
            </p>
          </div>

          {/* Images superposées à droite */}
          <div className="relative md:w-1/2 h-[400px]">
            {/* Image principale */}
            <div className="absolute top-0 left-0 z-10">
              {/* <Image src="/logoo.png" alt="Image C.A.M.A. 1" width={300} height={300} className="rounded-lg shadow-lg h-[300px]" /> */}
            </div>
            {/* Image décalée 1 */}
            <div className="absolute top-6 left-6 z-0">
              <Image src="/image1.jpg" alt="Image C.A.M.A. 2" width={300} height={300} className="border border-slate-200 rounded-lg shadow-md h-[300px]" />
            </div>
            {/* Image décalée 2 */}
            <div className="absolute top-22 left-56 z-0">
              <Image src="/champ.jpg" alt="Image C.A.M.A. 3" width={300} height={100} className="border border-slate-200 rounded-lg shadow-sm h-[300px]" />
            </div>
            {/* Image décalée 3 */}
            <div className="absolute top-44 left-0 z-0">
              <Image src="/papaye.jpg" alt="Image C.A.M.A. 4" width={300} height={300} className="border border-slate-200 rounded-lg h-[300px]" />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default About
