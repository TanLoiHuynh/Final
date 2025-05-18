// eslint-disable-next-line no-unused-vars
import React from "react";
import PropTypes from "prop-types";

const PetCard = ({ pet }) => {
  return (
    <div className="bg-white shadow-md rounded-2xl p-4 hover:shadow-lg transition duration-300">
      <img src={`http://localhost:8080/images/${pet.image}`} onError={(e) => (e.target.src = "/images/default.jpg")} alt={pet.name}
  className="w-full h-48 object-cover rounded-xl"
/>
      <div className="mt-4">
        <h2 className="text-lg font-semibold text-gray-800">{pet.name}</h2>
        <p className="text-sm text-gray-500 mb-1 line-clamp-2">{pet.description}</p>
        <p className="text-pink-600 font-bold">{pet.price?.toLocaleString()} VND</p>
      </div>
    </div>
  );
};

PetCard.propTypes = {
  pet: PropTypes.shape({
    pet_id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    description: PropTypes.string,
    image: PropTypes.string,
  }).isRequired,
};

export default PetCard;
