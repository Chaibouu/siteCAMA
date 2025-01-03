'use client'
import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

type Realisation = {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  date: string;
  media: string; // URL d'une image ou vidéo
  mediaType: "image" | "video";
};

const RealisationsSection: React.FC<{ realisations: Realisation[] }> = ({ realisations }) => {
  const [selectedRealisation, setSelectedRealisation] = useState<Realisation | null>(null);

  const handleOpenModal = (realisation: Realisation) => {
    setSelectedRealisation(realisation);
  };

  const handleCloseModal = () => {
    setSelectedRealisation(null);
  };

  return (
    <section className="py-10 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-6">Nos Réalisations</h2>

        {/* Animation de la liste */}
        <motion.div
          className="space-y-8"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.2 } },
          }}
        >
          {realisations.map((realisation) => (
            <motion.div
              key={realisation.id}
              className="flex flex-col lg:flex-row items-center bg-white shadow-md rounded-md overflow-hidden"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              {/* Media à gauche */}
              <div className="w-full lg:w-1/2 h-64 p-4">
                {realisation.mediaType === "image" ? (
                  <Image
                    src={realisation.media}
                    alt={realisation.title}
                    width={600}
                    height={400}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <video controls className="w-full h-full object-cover">
                    <source src={realisation.media} type="video/mp4" />
                    Votre navigateur ne prend pas en charge les vidéos HTML5.
                  </video>
                )}
              </div>

              {/* Texte à droite */}
              <div className="w-full lg:w-1/2 p-6">
                <h3 className="text-2xl font-semibold">{realisation.title}</h3>
                <h4 className="text-lg text-gray-500 mt-1">{realisation.subtitle}</h4>
                <p className="text-gray-600 mt-2 text-sm">Date : {realisation.date}</p>
                <p className="text-gray-600 mt-4 line-clamp-3">{realisation.description}</p>
                <button
                  onClick={() => handleOpenModal(realisation)}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Savoir plus
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Modal avec animation */}
      <AnimatePresence>
        {selectedRealisation && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white w-11/12 max-w-3xl rounded-md overflow-hidden"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              <div className="p-6">
                {/* Media */}
                <div className="w-full h-64 mb-4">
                  {selectedRealisation.mediaType === "image" ? (
                    <Image
                      src={selectedRealisation.media}
                      alt={selectedRealisation.title}
                      width={800}
                      height={600}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <video controls className="w-full h-full object-cover">
                      <source src={selectedRealisation.media} type="video/mp4" />
                    </video>
                  )}
                </div>

                {/* Texte */}
                <h3 className="text-2xl font-semibold">{selectedRealisation.title}</h3>
                <h4 className="text-lg text-gray-500 mt-1">{selectedRealisation.subtitle}</h4>
                <p className="text-gray-600 mt-4">{selectedRealisation.description}</p>
              </div>
              <div className="p-4 border-t">
                <button
                  onClick={handleCloseModal}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Fermer
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default RealisationsSection;
