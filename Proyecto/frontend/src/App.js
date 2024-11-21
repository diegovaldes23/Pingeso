import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import OrdersPage from "./pages/OrdersList"; // Componente para visualización de pedidos
import MenuPage from "./pages/MenuPage";
import CostsPage from "./pages/CostsPage";
import StatisticsPage from "./pages/StatisticsPage";
import HomePage from "./pages/HomePage";
import AddOrderPage from "./pages/AddOrderPage";
import OrdersList from "./pages/OrdersList";

const App = () => {
    const [orders, setOrders] = useState([
        {
            id: 1,
            customerName: 'Juan Pérez',
            phone: '912345678',
            commune: 'Santiago',
            date: '2024-11-01',
            customerType: 'Antiguo', // Tipo de cliente
            purchaseSource: 'Facebook ads', // Cómo fue la compra
            products: [
              { name: 'Helado de Chocolate', price: 6000, quantity: 2 }, // Agregado cantidad
              { name: 'Brownie', price: 5990, quantity: 1 },
            ],
            deliveryCost: 2990,
            subtotal: 17980, // Subtotal calculado
            total: 20970, // Total calculado (subtotal + deliveryCost)
            initialPayment: 5000, // Abono inicial
            status: 'Pendiente',
          },
          {
            id: 2,
            customerName: 'Ana García',
            phone: '912345679',
            commune: 'Providencia',
            date: '2024-11-02',
            customerType: 'Nuevo', // Tipo de cliente
            purchaseSource: 'Orgánico', // Cómo fue la compra
            products: [
              { name: 'Tarta de Manzana', price: 7000, quantity: 1 },
              { name: 'Pastel de Zanahoria', price: 8000, quantity: 1 },
            ],
            deliveryCost: 3990,
            subtotal: 15000, // Subtotal calculado
            total: 18990, // Total calculado (subtotal + deliveryCost)
            initialPayment: 10000, // Abono inicial
            status: 'Completada',
          },
          {
            id: 3,
            customerName: 'Carlos López',
            phone: '912345680',
            commune: 'Las Condes',
            date: '2024-11-03',
            customerType: 'Antiguo', // Tipo de cliente
            purchaseSource: 'Facebook ads', // Cómo fue la compra
            products: [
              { name: 'Galletas de Chocolate', price: 4500, quantity: 3 },
              { name: 'Trufas', price: 5000, quantity: 2 },
            ],
            deliveryCost: 2490,
            subtotal: 23490, // Subtotal calculado
            total: 25980, // Total calculado (subtotal + deliveryCost)
            initialPayment: 15000, // Abono inicial
            status: 'Cancelada',
          },
      ]);
    const [filterStatus, setFilterStatus] = useState('');

    const handleStatusChange = (id, newStatus) => {
        const updatedOrders = orders.map((order) =>
          order.id === id ? { ...order, status: newStatus } : order
        );
        setOrders(updatedOrders);
    };

    // Define la función getStatusClass
  const getStatusClass = (status) => {
    switch (status) {
      case 'Pendiente':
        return 'bg-yellow-200 text-yellow-800';
      case 'En proceso':
        return 'bg-green-200 text-green-800';
      case 'Completada':
        return 'bg-blue-200 text-blue-800';
      case 'Cancelada':
        return 'bg-red-200 text-red-800';
      default:
        return '';
    }
  };

  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-6">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/orders-visualization" element={<OrdersList />} />
            <Route path="/costs" element={<CostsPage />} />
            <Route path="/statistics" element={<StatisticsPage />} />
            <Route path="/add-order" element={<AddOrderPage />}/>
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
