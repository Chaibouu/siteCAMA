import Image from "next/image";
import React from "react";

const services = [
  {
    title: "Conception sous projet agricole",
    description: "Nous analysons votre terrain et installons un système adapté pour une irrigation optimale.",
    icon: "/IconeService/project.png",
  },
  {
    title: "Installation de systèmes d'irrigation",
    description: "Nous analysons votre terrain et installons un système adapté pour une irrigation optimale.",
    icon: "/IconeService/water-system.png",
  },
  {
    title: "Suivi et entretien des champs",
    description: "Nous assurons un suivi régulier de vos cultures et l'entretien des jardins ou champs.",
    icon: "/IconeService/reforestation.png",
  },
  {
    title: "Formation pratique",
    description: "Nous assurons un suivi régulier de vos cultures et l'entretien des jardins ou champs.",
    icon: "/IconeService/teaching.png",
  },
  {
    title: "Vente de Pépinières et Semences Certifié",
    description: "Découvrez notre sélection de plantes, graines et produits d'entretien de qualité.",
    icon: "/IconeService/seeds.png",
  },
  {
    title: "Conseils personnalisés",
    description: "Recevez des recommandations adaptées à vos besoins pour vos projets agricoles ou paysagers.",
    icon: "/IconeService/lightbulb.png",
  },
];

const Services = () => {
  return (
    <div className="max-w-[1100px] mx-auto">
      <div>
        <h2 className="text-SecondaryCol text-4xl font-bold text-center mb-6">Services</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {services.map((service, index) => (
          <div
            key={index}
            className="relative w-82 h-48 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden group"
          >
            {/* Icône et titre visibles par défaut */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center transition-transform duration-500 group-hover:-translate-y-full">
              {/* <div className="text-4xl text-green-500">{service.icon}</div> */}
              <div className="">
                <Image
                    src={service.icon}
                    alt={service.title}
                    width={600}
                    height={600}
                    className="w-26 h-26"
                />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-800">{service.title}</h3>
            </div>

            {/* Description masquée au départ */}
            <div className="absolute inset-0 flex items-center justify-center p-4 text-white bg-BrunFonce translate-y-full transition-transform duration-500 group-hover:translate-y-0">
              <p className="text-sm">{service.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
