import axiosClient from "./axiosClient";

const orderApi = {
  getAll: async () => {
    const response = await axiosClient.get("/order/all");
    return response;
  },

  addOrders: async (orderData) => {
    const response = await axiosClient.post("/order/add", orderData);
    return response.data; 
  },

  addOrdersitems: async (orderItem) => {
    const response = await axiosClient.post("/order/items", orderItem); 
    return response.data;
  },

  update: async (id, order) => {
    const response = await axiosClient.put(`/order/update/${id}`, order);
    return response;
  },

  delete: async (id) => {
    const response = await axiosClient.delete(`/order/delete/${id}`);
    return response;
  },
};

export default orderApi;