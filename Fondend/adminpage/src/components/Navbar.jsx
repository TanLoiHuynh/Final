const Navbar = () => {
    return (
      <div className="fixed top-0 left-64 right-0 z-40 bg-white shadow px-6 py-4 flex justify-between items-center">

        <div className="text-pink-500 text-xl font-semibold">
          <input
            type="text"
            placeholder="Tìm kiếm..."
            className="px-3 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
        </div>
        <div className="flex items-center space-x-4">
          <span>Huỳnh Tấn Lợi</span>
          <button className="bg-red-500 text-white px-3 py-1 rounded">Đăng Xuất</button>
        </div>
      </div>
    );
  };
  
  export default Navbar;
  