import { useState, useEffect } from "react";
import categoryApi from "../api/categoryApi";

const Category = () => {
  const [category, setCategory] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(""); // "add" | "edit" | "delete"
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [formData, setFormData] = useState({
    categoryName: "",
    categoryStatus: "",
  });

  useEffect(() => {
    fetchCategory();
  }, []);

  const fetchCategory = async () => {
    try {
      const data = await categoryApi.getAllCategory();
      const sorted = data.sort((a, b) => a.categoryId - b.categoryId);
      setCategory(sorted);
    } catch (error) {
      console.log("Error", error);
    }
  };

  const handleOpenModal = (type, category = null) => {
    setModalType(type);
    setSelectedCategory(category);
    setFormData(
        category || {
        categoryName: "",
        categoryStatus: "",
      }
    );
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCategory(null);
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
        await categoryApi.addCategory(formData);
      } else if (modalType === "edit") {
        await categoryApi.updateCategory(selectedCategory.categoryId, formData);
      }
      await fetchCategory();
      handleCloseModal();
    } catch (error) {
      console.log("Error", error);
    }
  };

  const handleDelete = async () => {
    try {
      await categoryApi.deleteCategory(selectedCategory.categoryId);
      await fetchCategory();
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
              <th className="py-2 px-4 border-b text-left">Mã</th>
              <th className="py-2 px-4 border-b text-left">Tên loại</th>
              <th className="py-2 px-4 border-b text-left">Mô tả</th>
              <th className="py-2 px-4 border-b text-left">Chức năng</th>
            </tr>
          </thead>
          <tbody>
            {category.map((items) => (
              <tr key={items.categoryId} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{items.categoryId}</td>
                <td className="py-2 px-4 border-b">{items.categoryName}</td>
                <td className="py-2 px-4 border-b">{items.categoryStatus? "Ẩn":"Hiện"}</td>
                <td className="py-2 px-4 border-b">
                  <button
                    className="bg-green-500 text-white px-3 py-1 rounded mr-2"
                    onClick={() => handleOpenModal("edit", items)}
                  >
                    Sửa
                  </button>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded"
                    onClick={() => handleOpenModal("delete", items)}
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
              {modalType === "add" && "Thêm loại sản phẩm"}
              {modalType === "edit" && "Sửa loại sản phẩm"}
              {modalType === "delete" && "Xóa loại sản phẩm"}
            </h2>

            {modalType === "delete" ? (
              <div>
                <p>
                  {selectedCategory?.namecategory}
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
                  name="categoryName"
                  value={formData.categoryName}
                  onChange={handleChange}
                  placeholder="Tên loại"
                  className="border px-3 py-1 rounded"
                />
                <select
                  name="categoryStatus"
                  value={formData.categoryStatus}
                  onChange={handleChange}
                  placeholder="Ẩn/Hiện"
                  className="border px-3 py-1 rounded"
                >
                <option value={true}>Ẩn</option>
                <option value={false}>Hiện</option>
                </select>
               

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

export default Category;
