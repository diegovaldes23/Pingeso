import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GlobalProvider } from "./utils/GlobalModelContext"; // Importa el proveedor
import Sidebar from "./components/Sidebar";
import OrdersPage from "./pages/OrdersPage";
import AddOrderPage from "./pages/AddOrderPage";
import Dashboard from "./pages/Dashboard";
import ExcelPage from "./pages/ExcelPage";

import Statistics from "./pages/Statistics";

const App = () => {
  return (
    <GlobalProvider>
      <Router>
        <div className="flex max-h-max">
          <Sidebar />
          <div className="flex-1 p-6">
            <Routes>
              <Route path="/orders" element={<OrdersPage />} />
              <Route path="/statistics" element={<Dashboard />} />
              <Route path="/add-order" element={<AddOrderPage />} />
              <Route path="/excel" element={<ExcelPage />}/>
              <Route path="/statistics" element={<Statistics />} />
            </Routes>
          </div>
        </div>
      </Router>
    </GlobalProvider>
  )
};

export default App;
