"use client";

import React, { useState } from "react";
import Cards from "../Cards/Cards";

const items = [
  { imageSrc: "/logoo.png", name: "Palmier", price: "3000 F", rating: 4, category: "Palmier" },
  { imageSrc: "/logoo.png", name: "Herbacée", price: "2000 F", rating: 5, category: "Herbacée" },
  { imageSrc: "/logoo.png", name: "Conifère", price: "1500 F", rating: 3, category: "Conifère" },
  { imageSrc: "/logoo.png", name: "Arbuste", price: "1000 F", rating: 4, category: "Arbuste" },
  { imageSrc: "/logoo.png", name: "Palmier", price: "2500 F", rating: 5, category: "Palmier" },
];

export default function HomePage() {
  const [filter, setFilter] = useState<string>(""); // Filtrage par catégorie
  const [search, setSearch] = useState<string>(""); // Filtrage par recherche (nom, catégorie, prix)

  // Filtrer les items en fonction de la catégorie et de la barre de recherche
  const filteredItems = items.filter((item) => {
    const matchesCategory = filter ? item.category === filter : true;
    const matchesSearch = search
      ? item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.category.toLowerCase().includes(search.toLowerCase()) ||
        item.price.toLowerCase().includes(search.toLowerCase())
      : true;

    return matchesCategory && matchesSearch;
  });

  // Liste des catégories uniques
  const categories = Array.from(new Set(items.map((item) => item.category)));

  return (
    <div className="p-8">
      {/* Barre de recherche */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Rechercher par nom, catégorie ou prix"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-lg border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Section des boutons de filtre */}
      <div className="flex gap-4 mb-6 justify-center">
        <button
          onClick={() => setFilter("")}
          className={`px-4 py-2 rounded text-white ${
            filter === "" ? "bg-blue-500" : "bg-gray-300 hover:bg-gray-400"
          }`}
        >
          Tous
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setFilter(category)}
            className={`px-4 py-2 rounded text-white ${
              filter === category ? "bg-blue-500" : "bg-gray-300 hover:bg-gray-400"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Grille des cartes filtrées */}
        <div className="w-full flex items-center justify-center mt-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-14 gap-y-18 max-w-[1100px]">
            {filteredItems.length > 0 ? (
              filteredItems.map((item, index) => (
                <Cards
                  key={index}
                  imageSrc={item.imageSrc}
                  name={item.name}
                  price={item.price}
                  rating={item.rating}
                />
              ))
            ) : (
              <p className="col-span-3 text-center text-gray-500">Aucun résultat trouvé.</p>
            )}
          </div>
        </div>
    </div>
  );
}
