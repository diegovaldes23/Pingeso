import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
<<<<<<< HEAD
import Header from './components/Header';
import Footer from './components/Footer';
import ProductSlider from './components/Slider';
import ProductList from './components/ProductList';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AddProductPage from './pages/AddProductPage';
import OrderPage from './pages/OrderPage';
import AdminEditProductPage from './pages/AdminEditProductPage';
import AdminOrdersPage from './pages/AdminOrdersPage';
import HomePage from './pages/HomePage'; // Importa la nueva página
import './App.css';
=======
import './App.css';
import OrdersPage from './pages/OrdersPage';
import Sidebar from './components/Sidebar';
>>>>>>> origin/main

function App() {
  return (
    <Router>
      <div className="App">
        <Sidebar />
        <div className="content">
          <Routes>
<<<<<<< HEAD
            <Route path="/" element={<HomePage />} /> {/* Nueva ruta */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/add-product" element={<AddProductPage />} />
            <Route path="/order" element={<OrderPage />} />
            <Route path="/admin/edit-product" element={<AdminEditProductPage />} />
            <Route path="/admin/orders" element={<AdminOrdersPage />} />
=======
            <Route path="/admin/orders" element={<OrdersPage />}/>
>>>>>>> origin/main
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
