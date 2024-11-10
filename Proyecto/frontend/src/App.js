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
import CartPage from './pages/CartPage'; // Importa la página del carrito
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
            <Route path="/add-product" element={<AddProductPage />} /> {/* Nueva ruta para agregar producto */}
            <Route path="/order" element={<OrderPage />} /> {/* Ruta para la página de pedidos */}
            <Route path="/contact" element={<ContactPage />} /> {/* Ruta para la página de contacto */}
            <Route path="/cart" element={<CartPage />} /> {/* Ruta para la página del carrito */}
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
