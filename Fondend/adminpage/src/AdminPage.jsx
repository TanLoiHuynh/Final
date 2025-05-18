// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

import Category from './pages/Category';
import Customer from './pages/Customer';
import Pet from './pages/Pet';
import Order from './pages/Order';

const AdminPage = () => {
  return (
    <Router>
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Navbar />
          <main className="flex-1 bg-gray-100 p-6 pt-20 pl-72">
            <Routes>
              <Route path="/" element={<Navigate to="/Pet" replace />} />
              <Route path="/Category" element={<Category />} />
              <Route path="/Customer" element={<Customer />} />
              <Route path="/Pet" element={<Pet />} />
              <Route path="/Order" element={<Order />} />

            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
};

export default AdminPage;