import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GlobalProvider } from "./utils/GlobalModelContext"; // Importa el proveedor
import Sidebar from "./components/Sidebar";
import HomePage from "./pages/HomePage";
import OrdersPage from "./pages/OrdersPage";
import MenuPage from "./pages/MenuPage";
import CostsPage from "./pages/CostsPage";
import AddOrderPage from "./pages/AddOrderPage";
import Dashboard from "./pages/Dashboard";
import ExcelPage from "./pages/ExcelPage";

import New_Statistics from "./pages/New_Statistics"

const App = () => {
  return (
    <GlobalProvider>
      <Router>
        <div className="flex">
          <Sidebar />
          <div className="flex-1 p-6">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/menu" element={<MenuPage />} />
              <Route path="/orders" element={<OrdersPage />} />
              <Route path="/costs" element={<CostsPage />} />
              <Route path="/statistics" element={<Dashboard />} />
              <Route path="/add-order" element={<AddOrderPage />} />
              <Route path="/excel" element={<ExcelPage />}/>
              <Route path="/new_statistics" element={<New_Statistics />} />
            </Routes>
          </div>
        </div>
      </Router>
    </GlobalProvider>
  )
};

export default App;
