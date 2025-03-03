// src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
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

const Home = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-gray-700 to-white h-[600px] text-white">
        {/* Hero Content: Super Trending Cars on sale for low prices */}
        <div className="absolute inset-0 flex flex-col md:flex-row items-center justify-center px-4">
          {/* Left: Text Content */}
          <div className="md:w-1/2 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
              Brand New Cars : Limited time offer
            </h1>
            <p className="text-lg md:text-xl mb-6 max-w-xl">
            "Driving Excellence, Unleashing Innovation,Unlock Your Journey, Drive Uniqueness,Dare to be Different, Drive with Passion"
            </p>
            <Link
              to="/products"
              className="bg-teal-400 text-dark font-semibold px-6 py-3 rounded-full hover:bg-yellow-500 transition duration-300"
            >
              Purchase Now
            </Link>
          </div>
          {/* Top Selling Cars */}
          <div className="md:w-1/2 mt-8 md:mt-0 flex justify-center">
            <img 
              src="/images/benz.jpg" 
              alt="Car of the year" 
              className="w-full max-w-sm rounded-lg shadow-2xl"
            />
          </div>
        </div>
      </section>
      
      {/* Branded Cars*/}
      <section className="p-8 bg-beige">
        <h2 className="text-3xl font-bold mb-6 text-center">
          Top Notch Best-Selling Cars
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
