// eslint-disable-next-line no-unused-vars
import { path } from 'framer-motion/client';
import { Link, NavLink } from 'react-router-dom';

const Sidebar = () => {
  const menu = [
    // { name: 'Thống kê', path: '/thongke' },
    { name: 'Thú cưng', path: '/pet' },
    { name: 'Loại', path: '/category' },
    // { name: 'Đặt phòng', path: '/datphongdatphong' },
    { name: 'Khách Hàng', path: '/customer' },
    // { name: 'Dịch vụ', path: '/dichvu' },
    // { name: 'Tài khoản', path: '/taikhoan' },
    { name: 'Đặt hàng', path: '/order'},
  ];

  return (
    <div className="fixed top-0 left-0 h-screen w-64 bg-gray-800 text-white p-4 space-y-2 z-50">

      <Link to = "/" className="text-2xl font-bold mb-6">PetShop</Link>
      {menu.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) =>
            `block py-2 px-4 rounded hover:bg-gray-700 ${isActive ? 'bg-blue-600' : ''}`
          }
        >
          {item.name}
        </NavLink>
      ))}
    </div>
  );
};

export default Sidebar;