import { useEffect, useState } from "react";
import orderApi from "../api/orderApi";

const Order = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const data = await orderApi.getAllOrder();
      const sorted = data.sort((a, b) => a.orderId - b.orderId);
      setOrders(sorted);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Danh sách đơn hàng</h1>

      <table className="w-full table-auto border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-3 py-2">Mã Đơn</th>
            <th className="border px-3 py-2">Người Đặt</th>
            <th className="border px-3 py-2">Tổng Tiền</th>
            <th className="border px-3 py-2">Thời gian</th>
            <th className="border px-3 py-2">Trạng Thái</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.orderId}>
              <td className="border px-3 py-2 text-center">{order.orderId}</td>
              <td className="border px-3 py-2">{order.user?.fullname || "(không rõ)"}</td>
              <td className="border px-3 py-2">{order.orderTotal?.toLocaleString()} đ</td>
              <td className="border px-3 py-2">
                {new Date(order.orderTime).toLocaleString("vi-VN")}
              </td>
              <td className="border px-3 py-2">{order.orderstatus?.orderName || "Chưa xác định"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Order;
