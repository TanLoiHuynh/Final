import { useState, useEffect } from "react";
import petApi from "../api/petApi";
import categoryApi from "../api/categoryApi";

const Pet = () => {
  const [pets, setPets] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [selectedPet, setSelectedPet] = useState({
    name: "",
    type: true,
    gender: true,
    description: "",
    price: "",
    status: true,
    category: null,
    image: "",
    imageFile: null,
  });
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const data = await petApi.getAllPet();
        const sorted = data.sort((a, b) => a.pet_id - b.pet_id);
        setPets(sorted);
      } catch (error) {
        console.error("Error fetching pets:", error);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const categoryData = await categoryApi.getAllCategory();
        setCategories(categoryData);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    })();
  }, []);

  const handleOpenModal = (type, pet = null) => {
    setModalType(type);
    if (type === "add") {
      setSelectedPet({
        name: "",
        type: true,
        gender: true,
        description: "",
        price: "",
        status: true,
        category: null,
        image: "",
        imageFile: null,
      });
    } else {
      setSelectedPet({ ...pet, imageFile: null });
    }
    setIsModalOpen(true);
  };

  const handleDelete = async () => {
    try {
      await petApi.deletePet(selectedPet.pet_id);
      setPets((prev) => prev.filter((p) => p.pet_id !== selectedPet.pet_id));
      setIsModalOpen(false);
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedPet((prev) => ({
        ...prev,
        imageFile: file,
        image: file.name,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", selectedPet.name);
      formData.append("type", selectedPet.type);
      formData.append("gender", selectedPet.gender);
      formData.append("description", selectedPet.description);
      formData.append("price", selectedPet.price);
      formData.append("status", selectedPet.status);
      formData.append("categoryId", selectedPet.category?.categoryId);

      if (selectedPet.imageFile) {
        formData.append("image", selectedPet.imageFile);
      }

      if (modalType === "add") {
        const newPet = await petApi.addPet(formData);
        setPets((prev) => [...prev, newPet]);
      } else {
        await petApi.updatePet(selectedPet.pet_id, formData);
        const updatedList = await petApi.getAllPet();
        setPets(updatedList.sort((a, b) => a.pet_id - b.pet_id));
      }

      setIsModalOpen(false);
    } catch (error) {
      console.error("Save failed", error);
    }
  };

  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div className="p-4">
      <button className="bg-blue-500 text-white px-4 py-2 rounded mb-4" onClick={() => handleOpenModal("add")}>
        Thêm 
      </button>

      <table className="min-w-full table-auto border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-3 py-2">Mã</th>
            <th className="border px-3 py-2">Ảnh</th>
            <th className="border px-3 py-2">Loại</th>
            <th className="border px-3 py-2">Danh mục</th>
            <th className="border px-3 py-2">Tên</th>
            <th className="border px-3 py-2">Mô tả</th>
            <th className="border px-3 py-2">Giá</th>
            <th className="border px-3 py-2">Trạng thái</th>
            <th className="border px-3 py-2">Chức năng</th>
          </tr>
        </thead>
        <tbody>
          {pets.map((pet) => (
            <tr key={pet.pet_id}>
              <td className="border px-3 py-2">{pet.pet_id}</td>
              <td className="border px-3 py-2">
                <img src={`http://localhost:8080/images/${pet.image}`} alt={pet.name} className="object-cover" style={{ width: '180px', height: '90px' }} />
              </td>
              <td className="border px-3 py-2">{pet.type ? "Mèo" : "Chó"}</td>
              <td className="border px-3 py-2">{pet.category?.categoryName}</td>
              <td className="border px-3 py-2">{pet.name}</td>
              <td className="border px-3 py-2">{pet.description}</td>
              <td className="border px-3 py-2">{pet.price}</td>
              <td className="border px-3 py-2">{pet.status ? "Còn" : "Hết"}</td>
              <td className="border px-3 py-2">
                <button className="bg-green-500 text-white px-2 py-1 rounded mr-2" onClick={() => handleOpenModal("edit", pet)}>Sửa</button>
                <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={() => handleOpenModal("delete", pet)}>Xoá</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded w-[500px]">
            <h2 className="text-xl font-bold text-center mb-4">
              {modalType === "add" ? "Thêm" : modalType === "edit" ? "Sửa" : "Xoá"} thú cưng
            </h2>

            {modalType === "delete" ? (
              <div className="text-center">
                <p>Bạn có chắc chắn muốn xoá &ldquo;{selectedPet.name}&rdquo;?</p>
                <div className="mt-4 flex justify-center gap-4">
                  <button className="bg-gray-300 px-4 py-2 rounded" onClick={handleCloseModal}>Huỷ</button>
                  <button className="bg-red-600 text-white px-4 py-2 rounded" onClick={handleDelete}>Xoá</button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="grid gap-3">
                <input value={selectedPet.name} onChange={(e) => setSelectedPet({ ...selectedPet, name: e.target.value })} placeholder="Tên" className="border px-3 py-2 rounded" />
                <select value={selectedPet.type} onChange={(e) => setSelectedPet({ ...selectedPet, type: e.target.value === "true" })} className="border px-3 py-2 rounded">
                  <option value="true">Mèo</option>
                  <option value="false">Chó</option>
                </select>
                <select value={selectedPet.category?.categoryId || ""} onChange={(e) => {
                  const id = parseInt(e.target.value);
                  const cat = categories.find((c) => c.categoryId === id);
                  setSelectedPet({ ...selectedPet, category: cat });
                }} className="border px-3 py-2 rounded">
                  <option value="">--Chọn danh mục--</option>
                  {categories.map((c) => (
                    <option key={c.categoryId} value={c.categoryId}>{c.categoryName}</option>
                  ))}
                </select>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="border px-3 py-2 rounded"
                />
                {(selectedPet.imageFile || selectedPet.image) && (
                  <img
                    src={
                      selectedPet.imageFile
                        ? URL.createObjectURL(selectedPet.imageFile)
                        : `http://localhost:8080/images/${selectedPet.image}`
                    }
                    alt="Preview"
                    className="object-cover rounded shadow"
                    style={{ width: "100px", height: "100px" }}
                  />
                )}
                <input value={selectedPet.price} onChange={(e) => setSelectedPet({ ...selectedPet, price: e.target.value })} placeholder="Giá" className="border px-3 py-2 rounded" />
                <input value={selectedPet.description} onChange={(e) => setSelectedPet({ ...selectedPet, description: e.target.value })} placeholder="Mô tả" className="border px-3 py-2 rounded" />
                <select value={selectedPet.status} onChange={(e) => setSelectedPet({ ...selectedPet, status: e.target.value === "true" })} className="border px-3 py-2 rounded">
                  <option value="true">Còn</option>
                  <option value="false">Hết</option>
                </select>
                <div className="flex justify-end gap-3">
                  <button type="button" className="bg-gray-400 px-4 py-2 rounded" onClick={handleCloseModal}>Huỷ</button>
                  <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">{modalType === "add" ? "Thêm" : "Lưu"}</button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Pet;
