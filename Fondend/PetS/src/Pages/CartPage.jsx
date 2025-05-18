// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import orderApi from "../api/orderApi";
import petApi from "../api/petApi";

const CartPage = () => {
  const [cart, setCart] = useState(() => {
    const stored = localStorage.getItem("cart");
    if (!stored) return [];
    try {
      const parsed = JSON.parse(stored);
      return parsed.map(item => ({
        petId: item.petId || (item.pet && item.pet.petId) || null,
        name: item.name || "Tên không xác định",
        image: item.image || "default.jpg",
        price: Number(item.price) || 0,
        quantity: Number(item.quantity) || (item.pet && item.pet.quantity) || 1,
        selected: item.selected ?? true,
      }));
    } catch {
      return [];
    }
  });

  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    shippingAddress: "",
    note: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

  useEffect(() => {
    const fetchMissingData = async () => {
      const updatedCart = [...cart];
      let hasChanges = false;

      for (let i = 0; i < updatedCart.length; i++) {
        const item = updatedCart[i];
        if (!item.petId || !item.name || !item.image || item.price === 0) {
          try {
            const petData = await petApi.getById(item.petId);
            updatedCart[i] = {
              ...item,
              petId: petData.petId || item.petId,
              name: petData.name || "Tên không xác định",
              image: petData.image || "default.jpg",
              price: Number(petData.price) || 0,
            };
            hasChanges = true;
          } catch (error) {
            console.error(`Lỗi khi lấy dữ liệu thú cưng ${item.petId}:`, error);
          }
        }
      }

      if (hasChanges) {
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
      }
    };

    fetchMissingData();
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const toggleSelect = (petId) => {
    setCart(prev =>
      prev.map(item =>
        item.petId === petId ? { ...item, selected: !item.selected } : item
      )
    );
  };

  const increaseQuantity = (petId) => {
    setCart(prev =>
      prev.map(item =>
        item.petId === petId ? { ...item, quantity: (item.quantity || 0) + 1 } : item
      )
    );
  };

  const decreaseQuantity = (petId) => {
    setCart(prev =>
      prev.map(item =>
        item.petId === petId && (item.quantity || 0) > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const removeItem = (petId) => {
    setCart(prev => prev.filter(item => item.petId !== petId));
  };

  const total = cart
    .filter(item => item.selected)
    .reduce((sum, item) => sum + (Number(item.price) || 0) * (item.quantity || 0), 0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (cart.length === 0) {
      setErrorMessage("Giỏ hàng trống.");
      return;
    }

    if (!formData.fullName.trim() || !formData.phoneNumber.trim() || !formData.shippingAddress.trim()) {
      setErrorMessage("Vui lòng nhập đầy đủ thông tin giao hàng.");
      return;
    }

    const nameRegex = /^[a-zA-ZÀ-ỹ\s]+$/u;
    if (!nameRegex.test(formData.fullName.trim())) {
      setErrorMessage("Họ và tên chỉ được chứa chữ cái và khoảng trắng.");
      return;
    }

    const phoneRegex = /^0\d{9}$/;
    if (!phoneRegex.test(formData.phoneNumber.trim())) {
      setErrorMessage("Số điện thoại không hợp lệ. Vui lòng nhập đúng định dạng (10 chữ số, bắt đầu bằng 0).");
      return;
    }

    if (formData.note.length > 200) {
      setErrorMessage("Ghi chú không được vượt quá 200 ký tự.");
      return;
    }

    const selectedItems = cart.filter(item => item.selected);
    if (selectedItems.length === 0) {
      setErrorMessage("Vui lòng chọn ít nhất một sản phẩm để đặt hàng.");
      return;
    }

    for (const item of selectedItems) {
      if (!item.petId) {
        setErrorMessage("Một hoặc nhiều sản phẩm không có ID hợp lệ.");
        return;
      }
    }

    const orderData = {
      user: { userId: 1 }, 
      orderTotal: total.toString(),
      orderStatus: { id: 1 }, 
      orderDetails: selectedItems.map(item => ({
        pet: { petId: item.petId },
        quantity: item.quantity,
        price: Number(item.price), 
      })),
    };

    try {
      console.log("Dữ liệu đơn hàng gửi lên:", orderData);
      const response = await orderApi.addOrders(orderData);

      if (response === "Saved") {
        try {
          await orderApi.saveShippingInfo({
            orderId: null, // Chưa có orderId, cần backend trả orderId
            fullName: formData.fullName,
            phoneNumber: formData.phoneNumber,
            shippingAddress: formData.shippingAddress,
            note: formData.note,
          });
        } catch (shippingError) {
          console.error("Lỗi khi lưu thông tin giao hàng:", shippingError);
          setErrorMessage("Đơn hàng đã được tạo nhưng không thể lưu thông tin giao hàng.");
          return;
        }

        alert("Đặt hàng thành công!");
        setCart(prev => prev.filter(item => !item.selected));
        localStorage.setItem("cart", JSON.stringify(cart.filter(item => !item.selected)));
        setFormData({
          fullName: "",
          phoneNumber: "",
          shippingAddress: "",
          note: "",
        });
      } else {
        throw new Error("Phản hồi từ server không hợp lệ.");
      }
    } catch (error) {
      console.error("Lỗi khi đặt hàng:", error);
      const errorMsg = error.response?.data || error.message || "Đặt hàng thất bại. Vui lòng thử lại sau.";
      setErrorMessage(errorMsg);
    }
  };

  return (
    <div className="p-6 bg-pink-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Giỏ hàng</h1>

      {errorMessage && (
        <p className="text-red-500 mb-4">{typeof errorMessage === "string" ? errorMessage : JSON.stringify(errorMessage)}</p>
      )}

      {cart.length === 0 && <p>Giỏ hàng của bạn đang trống.</p>}

      {cart.map((item, index) => (
        <div key={item.petId || `cart-item-${index}`} className="flex items-center border-b py-4 mb-4">
          <input
            type="checkbox"
            checked={item.selected}
            onChange={() => toggleSelect(item.petId)}
            className="mr-4"
          />
          <img
            src={`${API_URL}/images/${item.image}`}
            alt={item.name}
            className="w-24 h-24 object-cover rounded mr-4"
          />
          <div className="flex-grow">
            <p className="font-medium">{item.name}</p>
            <p className="text-sm text-gray-600">
              {typeof item.price === "number" && item.price > 0
                ? item.price.toLocaleString() + " đ"
                : "N/A"}
            </p>
            <div className="flex items-center mt-2">
              <button
                onClick={() => decreaseQuantity(item.petId)}
                className="px-2 py-1 border rounded"
              >
                -
              </button>
              <span className="mx-2">{item.quantity || 1}</span>
              <button
                onClick={() => increaseQuantity(item.petId)}
                className="px-2 py-1 border rounded"
              >
                +
              </button>
            </div>
          </div>
          <button
            onClick={() => removeItem(item.petId)}
            className="text-red-500 hover:text-red-700"
          >
            Xóa
          </button>
        </div>
      ))}

      <div className="text-right font-bold text-lg mb-6">
        Tổng cộng: <span className="text-red-600">{total.toLocaleString()} đ</span>
      </div>

      <form onSubmit={handleSubmitOrder} className="bg-gray-100 p-6 rounded">
        <h2 className="text-xl font-bold mb-4">Thông tin giao hàng</h2>
        <div className="mb-4">
          <label htmlFor="fullName" className="block mb-1">Họ và tên</label>
          <input
            id="fullName"
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="phoneNumber" className="block mb-1">Số điện thoại</label>
          <input
            id="phoneNumber"
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="shippingAddress" className="block mb-1">Địa chỉ giao hàng</label>
          <textarea
            id="shippingAddress"
            name="shippingAddress"
            value={formData.shippingAddress}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="note" className="block mb-1">Ghi chú (nếu có)</label>
          <textarea
            id="note"
            name="note"
            value={formData.note}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <button
          type="submit"
          className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600"
        >
          Đặt hàng
        </button>
      </form>
    </div>
  );
};

export default CartPage;