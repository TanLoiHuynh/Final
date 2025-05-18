// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { FaShoppingCart, FaSearch, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    if (searchTerm.trim() !== "") {
      navigate(`/search?name=${encodeURIComponent(searchTerm)}`);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <header className="bg-gradient-to-r from-pink-200 to-yellow-100 shadow-md">
      <nav className="container mx-auto flex items-center justify-between py-4 px-6">
        <Link to="/" className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          🐾 Pet Shop
        </Link>

        <ul className="hidden md:flex space-x-6 text-gray-700 font-medium items-center">
          <li><Link to="/" className="hover:text-pink-600">Trang chủ</Link></li>
          <li><Link to="/cats" className="hover:text-pink-600">Mèo</Link></li>
          <li><Link to="/dogs" className="hover:text-pink-600">Chó</Link></li>
          <li><Link to="/contact" className="hover:text-pink-600">Liên hệ</Link></li>
        </ul>

        <div className="flex items-center space-x-4">
          <div className="relative hidden md:block">
            <input
              type="text"
              placeholder="Tìm kiếm..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyDown}
              className="border border-gray-300 rounded-full px-3 py-1 pl-8 focus:outline-none focus:ring-2 focus:ring-pink-300"
            />
            <FaSearch
              onClick={handleSearch}
              className="absolute left-2 top-2.5 text-gray-500 cursor-pointer"
            />
          </div>
          <FaUser title="Đăng nhập" className="text-xl text-gray-700 cursor-pointer hover:text-pink-600" />
          <FaShoppingCart
            title="Giỏ hàng"
            className="text-xl text-gray-700 cursor-pointer hover:text-pink-600"
            onClick={() => {
              console.log("Đi tới cart");
              navigate("/cart");
            }}
          />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
