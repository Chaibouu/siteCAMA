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
      <div className=" overflow-hidden flex items-center justify-center bg-gray-100 dark:bg-DarkCol">
        <img
          src={imageSrc}
          alt={name}
          className="object-cover h-full w-full"
        />
      </div>

      {/* Contenu */}
      <div className="bg-BrunFonce min-h-[70px] relative flex justify-between py-3 px-4 text-center rounded-b-lg">
        {/* Nom */}
        <h3 className="text-lg font-semibold text-white">{name}</h3>
        <div>
          {/* Notation */}
          <div className="flex justify-center mt-2 absolute px-2 rounded-tl-md top-[-32px] right-0 bg-white/90 dark:bg-white/40">
            {[...Array(5)].map((_, index) => (
              <span
                key={index}
                className={`text-yellow-400 cursor-pointer ${
                  index < rating ? "opacity-100" : "opacity-30"
                }`}
              >
                ★
              </span>
            ))}
          </div>
          {/* Prix */}
          <p className="text-white text-lg">{price}</p>
        </div>
      </div>
    </div>
  );
};

export default Cards;
