import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const products = [
  {
    name: "Brainy Blob",
    game: "Steal a Brainrot",
    price: "₹499",
    image: "/images/brainyblob.png",
    shopifyEmbed: "<!-- Insert Shopify Buy Button embed code here -->",
    inStock: true,
    description: "A squishy friend from the chaos of Brainrot.",
  },
  {
    name: "Garden Gnomey",
    game: "Grow a Garden",
    price: "₹399",
    image: "/images/gnomey.png",
    shopifyEmbed: "<!-- Insert Shopify Buy Button embed code here -->",
    inStock: false,
    description: "Your loyal leafy guardian.",
  },
  {
    name: "Root Beast",
    game: "Grow a Garden",
    price: "₹549",
    image: "/images/rootbeast.png",
    shopifyEmbed: "<!-- Insert Shopify Buy Button embed code here -->",
    inStock: true,
    description: "Terrifying yet cute plant protector.",
  },
];

export default function PetStore() {
  const [filter, setFilter] = useState("All");
  const [selectedPet, setSelectedPet] = useState(null);

  const filteredProducts =
    filter === "All" ? products : products.filter((p) => p.game === filter);

  return (
    <main className="min-h-screen bg-gradient-to-br from-black to-gray-900 text-white font-sans">
      {/* Sticky Navbar */}
      <nav className="sticky top-0 z-50 bg-black bg-opacity-90 backdrop-blur-sm py-4 px-6 flex justify-between items-center shadow-md">
        <h1 className="text-2xl font-extrabold bg-gradient-to-r from-orange-400 via-yellow-300 to-blue-400 bg-clip-text text-transparent">
          Roblox 3D Pet Store
        </h1>
        <div className="space-x-2">
          {["All", "Grow a Garden", "Steal a Brainrot"].map((cat) => (
            <button
              key={cat}
              className={`text-sm font-semibold px-3 py-1 rounded-full transition ${
                filter === cat
                  ? "bg-purple-600 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
              onClick={() => setFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </nav>

      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 max-w-7xl mx-auto p-6">
        {filteredProducts.map((pet, index) => (
          <motion.div
            key={index}
            whileHover={{ rotateY: 5, scale: 1.05 }}
            className="relative"
          >
            <Card
              className="rounded-3xl bg-black border border-gray-800 relative overflow-hidden shadow-lg"
              onClick={() => setSelectedPet(pet)}
            >
              <div className="absolute inset-0 z-0 opacity-40 bg-gradient-to-tr from-orange-500 via-yellow-400 to-blue-400 blur-2xl animate-pulse" />
              <div className="relative z-10">
                <img
                  src={pet.image}
                  alt={pet.name}
                  className="w-full h-56 object-contain bg-black p-6 rounded-t-3xl"
                />
                <CardContent className="p-5 text-center">
                  <h2 className="text-2xl font-bold text-white mb-1">
                    {pet.name}
                  </h2>
                  <p className="text-sm text-gray-400 italic mb-1">
                    from <strong>{pet.game}</strong>
                  </p>
                  <p className="text-xl font-semibold text-green-400 mb-2">
                    {pet.price}
                  </p>
                  {!pet.inStock && (
                    <p className="text-sm text-red-500 font-bold mb-2">
                      Out of Stock
                    </p>
                  )}
                  <div dangerouslySetInnerHTML={{ __html: pet.shopifyEmbed }} />
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-2 w-full bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white py-2 rounded-xl shadow-md animate-pulse"
                  >
                    Buy Now
                  </motion.button>
                </CardContent>
              </div>
            </Card>
          </motion.div>
        ))}
      </section>

      {/* Modal */}
      {selectedPet && (
        <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-md flex items-center justify-center z-50">
          <div className="bg-gray-900 rounded-2xl shadow-2xl p-6 max-w-md w-full text-center relative">
            <button
              className="absolute top-2 right-4 text-gray-400 hover:text-white text-xl"
              onClick={() => setSelectedPet(null)}
            >
              ×
            </button>
            <img
              src={selectedPet.image}
              alt={selectedPet.name}
              className="mx-auto h-40 object-contain"
            />
            <h3 className="text-3xl font-bold text-white mt-4">
              {selectedPet.name}
            </h3>
            <p className="text-md text-gray-400 italic mb-2">
              from {selectedPet.game}
            </p>
            <p className="text-sm text-gray-300 mb-4">
              {selectedPet.description}
            </p>
            <p className="text-xl text-green-400 font-semibold mb-4">
              {selectedPet.price}
            </p>
            <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
              Buy Now
            </Button>
          </div>
        </div>
      )}

      <footer className="text-center mt-16 text-sm text-gray-500">
        © {new Date().getFullYear()} Roblox 3D Pet Store. All rights reserved.
      </footer>
    </main>
  );
}
