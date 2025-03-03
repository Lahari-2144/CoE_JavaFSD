// src/pages/Products.jsx
import React from 'react';
import ProductCard from "../components/ProductCard";

const products = [
  
  {
    id: 1,
    name: "Kia Syros",
    price: 867999,
    image: "/images/kia.jpg",
  },
  {
    id: 2,
    name: "Ferrai",
    price: 10000000,
    image: "/images/ferrari.jpg",
  },
  {
    id: 3,
    name: "Ford EcoSport",
    price: 979999,
    image: "/images/ford.jpg",
  },
  {
    id: 4,
    name: "Honda Civic",
    price: 1074999,
    image:"/images/honda.jpg",
  },
  // Additional phone products for unified collection
  {
    id: 5,
    name: "Toyota Innova",
    price: 785000,
    image: "/images/innova.jpg",
  },
  {
    id: 6,
    name: "Mahindra Scorpio",
    price: 865000,
    image: "/images/mahindra.jpg",
  },
  {
    id: 7,
    name: "Rolls Royce",
    price: 110000000,
    image: "/images/rr.jpg",
  },
  {
    id: 8,
    name: "Maruti Swift",
    price: 650000,
    image: "/images/swift.jpg",
  },
];

const Products = () => {
  return (
    <div className="p-8 bg-beige">
      <h2 className="text-3xl font-bold mb-6 text-center">Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Products;
