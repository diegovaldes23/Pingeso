// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ProductSlider from './components/Slider';
import ProductList from './components/ProductList';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AddProductPage from './pages/AddProductPage';
import OrderPage from './pages/OrderPage';
import ContactPage from './pages/ContactPage';
import CartPage from './pages/CartPage';
import AdminEditProductPage from './pages/AdminEditProductPage'; 
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={
              <>
                <ProductSlider />
                <ProductList />
              </>
            } />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/add-product" element={<AddProductPage />} />
            <Route path="/order" element={<OrderPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/admin/edit-product" element={<AdminEditProductPage />} /> {/* Ruta para edición de productos */}
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
