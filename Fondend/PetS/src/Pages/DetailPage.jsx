import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import petApi from "../api/petApi";

const DetailPage = () => {
  const { id } = useParams();
  const [pet, setPet] = useState(null);
  const [error, setError] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080"; // Sử dụng biến môi trường

  useEffect(() => {
    (async () => {
      try {
        const data = await petApi.getById(id);
        setPet(data);
      } catch (error) {
        setError("Không thể tải dữ liệu thú cưng. Vui lòng thử lại sau.");
        console.error("Lỗi khi tải dữ liệu thú cưng:", error);
      }
    })();
  }, [id]);

  const handleAddToCart = () => {
    if (!pet) {
      setErrorMessage("Không tìm thấy thú cưng.");
      return;
    }

    const petId = pet.petId ?? pet.id ?? pet.pet_id;
    if (!petId) {
      console.error("Dữ liệu thú cưng thiếu ID:", pet);
      setErrorMessage("Không xác định được ID thú cưng.");
      return;
    }

    const normalizedPet = {
      petId: petId,
      name: pet.name || "Tên không xác định",
      image: pet.image || "default.jpg",
      price: Number(pet.price) || 0,
      quantity: 1,
      selected: true,
    };

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const index = cart.findIndex(item => item.petId === petId);

    if (index !== -1) {
      cart[index].quantity += 1;
    } else {
      cart.push(normalizedPet);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    setErrorMessage("");
    alert("Đã thêm vào giỏ hàng!");
  };

  if (error) {
    return <div className="text-center p-10 text-red-500">{error}</div>;
  }

  if (!pet) {
    return <div className="text-center p-10">Đang tải dữ liệu thú cưng...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-10 bg-pink-50 min-h-screen">
      <div className="bg-white rounded-2xl shadow-md p-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="w-full flex justify-center">
          <img
            src={`${API_URL}/images/${pet.image || "default.jpg"}`} // Đường dẫn ảnh đúng với cấu hình BE
            alt={pet.name || "Tên không xác định"}
            className="w-full max-w-sm h-auto rounded-xl shadow-lg object-cover"
          />
        </div>

        <div className="flex flex-col justify-between h-full">
          <div>
            <h1 className="text-4xl font-bold mb-4 text-gray-800">{pet.name || "Tên không xác định"}</h1>
            <p className="text-gray-600 mb-4 text-lg">{pet.description || "Không có mô tả"}</p>
            <p className="text-2xl font-semibold text-red-500 mb-6">
              {typeof pet.price === "number" && !isNaN(pet.price)
                ? Number(pet.price).toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })
                : "Giá không khả dụng"}
            </p>
            {errorMessage && (
              <p className="text-red-500 mb-4">{errorMessage}</p>
            )}
          </div>
          <button
            onClick={handleAddToCart}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition"
          >
            Thêm vào giỏ hàng
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;