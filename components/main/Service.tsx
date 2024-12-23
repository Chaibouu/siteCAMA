import React from "react";

const services = [
  {
    title: "Installation de systèmes d'irrigation",
    description: "Nous analysons votre terrain et installons un système adapté pour une irrigation optimale.",
    icon: "💧",
  },
  {
    title: "Suivi et entretien des champs",
    description: "Nous assurons un suivi régulier de vos cultures et l'entretien des jardins ou champs.",
    icon: "🌱",
  },
  {
    title: "Vente de plantes et graines",
    description: "Découvrez notre sélection de plantes, graines et produits d'entretien de qualité.",
    icon: "🌻",
  },
  {
    title: "Conseils personnalisés",
    description: "Recevez des recommandations adaptées à vos besoins pour vos projets agricoles ou paysagers.",
    icon: "📋",
  },
];

const Services = () => {
  return (
    <div className="flex flex-wrap justify-center gap-6 p-6 bg-gray-100">
      {services.map((service, index) => (
        <div
          key={index}
          className="relative w-72 h-48 bg-white rounded-lg shadow-lg overflow-hidden group"
        >
          {/* Icône et titre visibles par défaut */}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center transition-transform duration-500 group-hover:-translate-y-full">
            <div className="text-4xl text-green-500">{service.icon}</div>
            <h3 className="mt-4 text-lg font-semibold text-gray-800">{service.title}</h3>
          </div>

          {/* Description masquée au départ */}
          <div className="absolute inset-0 flex items-center justify-center p-4 text-white bg-green-500 translate-y-full transition-transform duration-500 group-hover:translate-y-0">
            <p className="text-sm">{service.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Services;
