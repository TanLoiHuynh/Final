import { useState, useEffect } from "react";
import customerApi from "../api/customerApi";

const Customer = () => {
  const [customer, setCustomer] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [formData, setFormData] = useState({
    userName: "",
    userSex: true,
    userEmail: "",
    userPhone: "",
    userPassword: "",
    userAddress: "",
  });

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const data = await customerApi.getAllCustomer();
      const sorted = data.sort((a, b) => a.pet_id - b.pet_id);
      setCustomer(sorted);    } catch (error) {
      console.log("Error", error);
    }
  };

  const handleOpenModal = (type, customer = null) => {
    setModalType(type);
    setSelectedCustomer(customer);
    setFormData(
      customer || {
        userName: "",
        userSex: true,
        userEmail: "",
        userPhone: "",
        userPassword: "",
        userAddress: "",
      }
    );
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCustomer(null);
  };

  const handleChange = (e) => {
    const { name, value, type: inputType, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: inputType === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async () => {
    try {
      if (modalType === "add") {
        await customerApi.addCustomer(formData);
      } else if (modalType === "edit") {
        await customerApi.updateCustomer(selectedCustomer.userId, formData);
      }
      await fetchCustomers();
      handleCloseModal();
    } catch (error) {
      console.log("Error", error);
    }
  };

  const handleDelete = async () => {
    try {
      await customerApi.deleteCustomer(selectedCustomer.userId);
      await fetchCustomers();
      handleCloseModal();
    } catch (error) {
      console.log("Delete Error", error);
    }
  };

  return (
    <div>
      <button
        className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
        onClick={() => handleOpenModal("add")}
      >
        Thêm
      </button>

      <div className="overflow-x-auto mt-4">
        <table className="min-w-full bg-white border border-gray-200 shadow">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b text-left">Mã khách hàng</th>
              <th className="py-2 px-4 border-b text-left">Họ tên</th>
              <th className="py-2 px-4 border-b text-left">Giới tính</th>
              <th className="py-2 px-4 border-b text-left">Email</th>
              <th className="py-2 px-4 border-b text-left">Số điện thoại</th>
              <th className="py-2 px-4 border-b text-left">Mật khẩu</th>
              <th className="py-2 px-4 border-b text-left">Địa chỉ</th>
              <th className="py-2 px-4 border-b text-left">Chức năng</th>
            </tr>
          </thead>
          <tbody>
            {customer.map((kh) => (
              <tr key={kh.userId} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{kh.userId}</td>
                <td className="py-2 px-4 border-b">{kh.userName}</td>
                <td className="py-2 px-4 border-b">{kh.userSex ? "Nam" : "Nữ"}</td>
                <td className="py-2 px-4 border-b">{kh.userEmail}</td>
                <td className="py-2 px-4 border-b">{kh.userPhone}</td>
                <td className="py-2 px-4 border-b">{kh.userPassword}</td>
                <td className="py-2 px-4 border-b">{kh.userAddress}</td>
                <td className="py-2 px-4 border-b">
                  <button
                    className="bg-green-500 text-white px-3 py-1 rounded mr-2"
                    onClick={() => handleOpenModal("edit", kh)}
                  >
                    Sửa
                  </button>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded"
                    onClick={() => handleOpenModal("delete", kh)}
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-[500px]">
            <h2 className="text-xl font-bold mb-4">
              {modalType === "add" && "Thêm khách hàng"}
              {modalType === "edit" && "Sửa khách hàng"}
              {modalType === "delete" && "Xóa khách hàng"}
            </h2>

            {modalType === "delete" ? (
              <div>
                <p>
                  Bạn có chắc chắn muốn xóa khách hàng &ldquo;
                  {selectedCustomer?.userName}&rdquo;?
                </p>
                <div className="mt-4 flex justify-end gap-3">
                  <button
                    className="bg-gray-300 px-4 py-1 rounded"
                    onClick={handleCloseModal}
                  >
                    Hủy
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-1 rounded"
                    onClick={handleDelete}
                  >
                    Xóa
                  </button>
                </div>
              </div>
            ) : (
              <form className="grid gap-3">
                <input
                  name="userName"
                  value={formData.userName}
                  onChange={handleChange}
                  placeholder="Họ tên"
                  className="border px-3 py-1 rounded"
                />
                <select
                  name="userSex"
                  value={formData.userSex}
                  onChange={handleChange}
                  className="border px-3 py-1 rounded"
                >
                  <option value={true}>Nam</option>
                  <option value={false}>Nữ</option>
                </select>
                <input
                  name="userEmail"
                  value={formData.userEmail}
                  onChange={handleChange}
                  placeholder="Email"
                  className="border px-3 py-1 rounded"
                />
                <input
                  name="userPhone"
                  value={formData.userPhone}
                  onChange={handleChange}
                  placeholder="Số điện thoại"
                  className="border px-3 py-1 rounded"
                />
                <input
                  name="userPassword"
                  value={formData.userPassword}
                  onChange={handleChange}
                  placeholder="Mật khẩu"
                  className="border px-3 py-1 rounded"
                />
                <input
                  name="userAddress"
                  value={formData.userAddress}
                  onChange={handleChange}
                  placeholder="Địa chỉ"
                  className="border px-3 py-1 rounded"
                />

                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    className="bg-gray-300 px-4 py-1 rounded"
                    onClick={handleCloseModal}
                  >
                    Hủy
                  </button>
                  <button
                    type="button"
                    className="bg-blue-500 text-white px-4 py-1 rounded"
                    onClick={handleSubmit}
                  >
                    {modalType === "add" ? "Thêm" : "Lưu"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Customer;
