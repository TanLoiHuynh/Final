import axiosClient from "./axiosClient";

const orderDetailApi = {
  getAllOrderDetails() {
    return axiosClient.get("/orderdetails/all");
  },
  getOrderDetailById(id) {
    return axiosClient.get(`/orderdetails/search/${id}`);
  },
  getOrderDetailsByOrderId(orderId) {
    return axiosClient.get(`/orderdetails/byorder/${orderId}`);
  }
};

export default orderDetailApi;
