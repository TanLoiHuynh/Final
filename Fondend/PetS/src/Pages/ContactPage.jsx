// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Link } from 'react-router-dom';

const ContactPage = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-md p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-pink-600 hover:text-pink-700 transition">
            PetShop 🐾
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto py-12 px-4">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Liên Hệ</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Contact Info */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">Thông Tin Liên Hệ</h2>
              <p className="text-gray-600 mb-2"><strong>Địa chỉ:</strong> 123 Đường Lê Lợi, Quận 1, TP.HCM</p>
              <p className="text-gray-600 mb-2"><strong>Số điện thoại:</strong> 0123 456 789</p>
              <p className="text-gray-600 mb-2"><strong>Email:</strong> contact@petshop.vn</p>
            </div>

            {/* Working Hours */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">Giờ Làm Việc</h2>
              <p className="text-gray-600 mb-2"><strong>Thứ 2 - Thứ 6:</strong> 8:00 - 17:00</p>
              <p className="text-gray-600 mb-2"><strong>Thứ 7:</strong> 8:00 - 12:00</p>
              <p className="text-gray-600 mb-2"><strong>Chủ Nhật:</strong> Nghỉ</p>
            </div>
          </div>

          {/* Contact Form (UI only) */}
          <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Gửi Tin Nhắn</h2>
            <form className="grid gap-4">
              <input type="text" placeholder="Tên của bạn" className="border border-gray-300 rounded px-4 py-2" />
              <input type="email" placeholder="Email" className="border border-gray-300 rounded px-4 py-2" />
              <textarea rows="4" placeholder="Nội dung..." className="border border-gray-300 rounded px-4 py-2" />
              <button
                type="submit"
                className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-2 rounded font-semibold transition"
              >
                Gửi
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ContactPage;
