// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const PetList = ({ pets }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // Thêm state loading

const handleAddToCart = async (petId) => {
  try {
    setLoading(true);

    const userId = 1;
    const cartItem = {
      user: { userId },
      pet: { petId },
      quantity: 1,
      ordered: false,
    };

    // ✅ Lưu vào localStorage
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const updatedCart = [...existingCart, cartItem];
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    // (Tuỳ chọn) Gửi lên server nếu muốn
    // await cartApi.add(cartItem);

    alert("Đã thêm vào giỏ hàng");
  } catch (error) {
    console.error("Lỗi khi thêm vào giỏ hàng:", error);
    alert("Thêm vào giỏ hàng thất bại!");
  } finally {
    setLoading(false);
  }
};


  if (!Array.isArray(pets) || pets.length === 0) {
    return (
      <p className="text-center text-gray-500">
        Không có thú cưng nào.
      </p>
    );
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN').format(price) + " VND";
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {pets.map((pet) => (
        <div
          key={pet.pet_id}
          className="border rounded-lg shadow hover:shadow-md transition p-4"
        >
          <button
            type="button"
            onClick={() => navigate(`/pet/${pet.pet_id}`)}
            className="w-full h-48 cursor-pointer bg-transparent border-none p-0"
          >
            <img
              src={`http://localhost:8080/images/${pet.image}`}
              alt={`Ảnh của ${pet.name}`}
              className="w-full h-48 object-contain bg-white rounded-t"
            />
          </button>

          <h3 className="text-lg font-bold mt-2">{pet.name}</h3>
          <p className="text-gray-600">{pet.description}</p>
          <p className="text-red-500 font-semibold">{formatPrice(pet.price)}</p>

          <div className="flex gap-2 mt-4">
            <button
              onClick={() => navigate(`/pet/${pet.pet_id}`)}
              className="bg-blue-500 text-white px-3 py-1 rounded"
            >
              Xem chi tiết
            </button>
            <button
              onClick={() => handleAddToCart(pet.pet_id)}
              className="bg-green-500 text-white px-3 py-1 rounded"
              disabled={loading}
            >
              {loading ? "Đang thêm..." : "Đặt hàng"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

PetList.propTypes = {
  pets: PropTypes.array.isRequired,
};

export default PetList;
