// eslint-disable-next-line no-unused-vars
import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./Pages/HomePage";
import Contact from "./Pages/ContactPage";
import CatPage from "./Pages/CatPage";
import DogPage from "./Pages/DogPage";
import Footer from "./components/Footer/Footer";
import DetailPage from "./Pages/DetailPage";
import CartPage from "./Pages/CartPage";
import SearchResultPage from "./Pages/SearchResultPage";
const App = () => {
  return (
    <Router>
      <div className="grid grid-rows-[auto_1fr_auto] min-h-screen">
        <Navbar />
        <main className="bg-pink-50">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cats" element={<CatPage />} />
            <Route path="/dogs" element={<DogPage />} />
            <Route path="/pet/:id" element={<DetailPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/search" element={<SearchResultPage />} />  
          </Routes>
        </main>
          <Footer />
      </div>
    </Router>
  );
};

export default App;
