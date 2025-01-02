import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GlobalProvider } from "./utils/GlobalModelContext"; // Importa el proveedor
import Sidebar from "./components/Sidebar";
import OrdersPage from "./pages/OrdersPage";
import AddOrderPage from "./pages/AddOrderPage";
import Dashboard from "./pages/Dashboard";
import ExcelPage from "./pages/ExcelPage";
import Login from "./pages/Login";
import ContactPage from "./pages/ContactPage";

import Statistics from "./pages/Statistics";

import { useLocation } from "react-router-dom"; // Importa useLocation
import Profile from "./pages/Profile";

const AppContent = () => {
  const location = useLocation(); // Ahora estamos dentro del Router
  const hideSidebar = location.pathname === "/"; // Condición para ocultar el Sidebar en login

  return (
    <div className="flex max-h-max">
      {!hideSidebar && <Sidebar />} {/* Renderiza Sidebar solo si no está en / */}
      <div className="flex-1 p-6">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/statistics" element={<Dashboard />} />
          <Route path="/add-order" element={<AddOrderPage />} />
          <Route path="/excel" element={<ExcelPage />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/contact" element={<ContactPage />} />

        </Routes>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <GlobalProvider>
      <Router>
        <AppContent /> {/* Mueve el contenido principal aquí */}
      </Router>
    </GlobalProvider>
  );
};

export default App;

