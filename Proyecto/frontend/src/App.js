import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import OrdersPage from "./pages/OrdersList"; // Componente para visualización de pedidos
import MenuPage from "./pages/MenuPage";
import CostsPage from "./pages/CostsPage";
import StatisticsPage from "./pages/StatisticsPage";
import HomePage from "./pages/HomePage";
import AddOrderPage from "./pages/AddOrderPage";

const App = () => {
  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-6">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/orders-visualization" element={<OrdersPage />} />
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
