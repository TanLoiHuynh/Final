// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import petApi from "../api/petApi";
import PetList from "../components/PetList";

const HomePage = () => {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const data = await petApi.getAll(); 
        setPets(data);
      } catch (error) {
        console.error("Failed to fetch pets:", error);
      }
    })();
  }, []);

  return (
    <div className="bg-pink-50 min-h-screen">
      {/* Hero Section */}
      <section className="font-sans bg-gradient-to-r from-pink-300 to-yellow-200 py-12 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">
          Chào mừng đến với Pet Shop
        </h1>
        <p className="text-lg text-gray-700 mb-6">
          Nơi bạn tìm thấy những người bạn thú cưng đáng yêu
        </p>
      </section>
      
      {/* Pet List Section */}
      <section className="container mx-auto px-4 py-10">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Tất cả thú cưng
        </h2>
        <PetList pets={pets} />
      </section>
    </div>
  );
};

export default HomePage;
