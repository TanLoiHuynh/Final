// eslint-disable-next-line no-unused-vars
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-pink-200 to-yellow-100 text-gray-700 mt-10">
      <div className="container mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
        {/* Cột 1: Giới thiệu */}
        <div>
          <h2 className="text-xl font-bold text-pink-700">🐾 Pet Shop</h2>
          <p className="mt-2 text-sm">
            Mang đến những người bạn nhỏ đáng yêu nhất cho bạn và gia đình. Chăm sóc tận tâm – dịch vụ tận tình!
          </p>
        </div>

        {/* Cột 2: Điều hướng */}
        <div>
          <h3 className="text-lg font-semibold text-pink-700">Liên kết nhanh</h3>
          <ul className="mt-2 space-y-2 text-sm">
            <li><a href="/" className="hover:text-pink-800">Trang chủ</a></li>
            <li><a href="/category/1" className="hover:text-pink-800">Mèo</a></li>
            <li><a href="/category/2" className="hover:text-pink-800">Chó</a></li>
            <li><a href="/contact" className="hover:text-pink-800">Liên hệ</a></li>
          </ul>
        </div>

        {/* Cột 3: Mạng xã hội */}
        <div>
          <h3 className="text-lg font-semibold text-pink-700">Kết nối với chúng tôi</h3>
          <div className="flex justify-center md:justify-start mt-2 space-x-4">
            <a href="https://www.facebook.com/SeraMon.826564/about?viewas=100000686899395" className="hover:text-pink-800">Facebook</a>
            <a href="/" className="hover:text-pink-800">Instagram</a>
            <a href="/" className="hover:text-pink-800">Zalo</a>
          </div>
        </div>
      </div>

      <div className="text-center text-gray-600 text-sm py-4 border-t border-pink-300">
        © 2025 Pet Shop. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
