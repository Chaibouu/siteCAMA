"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

type Partenaire = {
  id: number;
  name: string;
  logo: string; // URL du logo
  description?: string;
};

const PartenairesSection: React.FC<{ partenaires: Partenaire[] }> = ({ partenaires }) => {
  return (
    <section className="py-10">
      <div className="container max-w-[1100px] mx-auto px-4">
        {/* Titre de la section */}
        <h2 className="text-4xl font-bold text-center text-SecondaryCol mb-6">Nos Partenaires</h2>
        <p className="text-center text-gray-600 mb-10">
          Découvrez nos précieux partenaires qui nous accompagnent dans nos projets.
        </p>

        {/* Grille des partenaires */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          initial="visible" // Pas de caché au démarrage
          animate="visible"
          variants={{
            visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.2 } },
          }}
        >
          {partenaires.map((partenaire) => (
            <motion.div
              key={partenaire.id}
              className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
              whileHover={{ scale: 1.05 }} // Animation au survol
              whileTap={{ scale: 0.95 }} // Animation au clic
              variants={{
                visible: { opacity: 1, y: 0 }, // Toujours visible
              }}
            >
              {/* Conteneur du logo */}
              <div className="w-full h-50 flex items-center justify-center bg-gray-100">
                <Image
                  src={partenaire.logo}
                  alt={partenaire.name}
                  width={220}
                  height={220}
                  className="object-contain max-h-full"
                />
              </div>

              {/* Texte associé */}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-center">{partenaire.name}</h3>
                {partenaire.description && (
                  <p className="text-sm text-gray-600 text-center mt-2 line-clamp-3">
                    {partenaire.description}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default PartenairesSection;
