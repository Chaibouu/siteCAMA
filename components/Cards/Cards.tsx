import React from "react";

interface CardProps {
  imageSrc: string;
  name: string;
  price: string;
  rating: number; // Note sur 5 étoiles
}

const Cards: React.FC<CardProps> = ({ imageSrc, name, price, rating }) => {
  return (
    <div className="border rounded-lg shadow-md bg-white max-w-xs">
      {/* Image */}
      <div className="h-40 overflow-hidden flex items-center justify-center bg-gray-100">
        <img
          src={imageSrc}
          alt={name}
          className="object-cover h-full w-full"
        />
      </div>

      {/* Contenu */}
      <div className="bg-green-100 py-3 px-4 text-center">
        {/* Nom */}
        <h3 className="text-lg font-semibold text-gray-700">{name}</h3>

        {/* Prix */}
        <p className="text-gray-600 text-sm mt-1">{price}</p>

        {/* Notation */}
        <div className="flex justify-center mt-2">
          {[...Array(5)].map((_, index) => (
            <span
              key={index}
              className={`text-yellow-400 ${
                index < rating ? "opacity-100" : "opacity-30"
              }`}
            >
              ★
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Cards;
