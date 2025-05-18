// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import petApi from "../api/petApi";
import PetList from "../components/PetList";

const CatPage = () => {
  const [cats, setCats] = useState([]);

  useEffect(() => {
    (async () => {
      const data = await petApi.getCats();
      setCats(data);
    })();
  }, []);

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Mèo</h1>
      <PetList pets={cats} />
    </div>
  );
};

export default CatPage;
