import axiosClient from "./axiosClient";  

const cartApi = {
  // Lấy tất cả giỏ hàng
  getAll: async () => {
    const response = await axiosClient.get("/cart/all");
    return response; 
  },

  // Thêm một giỏ hàng mới
  add: async (cartItem) => {
    const response = await axiosClient.post("/cart/add", cartItem); 
    return response;
  },

  // Cập nhật giỏ hàng
  update: async (id, cart) => {
    const response = await axiosClient.put(`/cart/update/${id}`, cart);
    return response;
  },

  // Xóa giỏ hàng
  delete: async (id) => {
    const response = await axiosClient.delete(`/cart/delete/${id}`);
    return response;
  },
};

export default cartApi;
