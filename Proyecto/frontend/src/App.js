import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GlobalProvider } from "./utils/GlobalModelContext";
import Sidebar from "./components/Sidebar";
import OrdersPage from "./pages/OrdersPage";
import AddOrderPage from "./pages/AddOrderPage";
import Dashboard from "./pages/Dashboard";
import ExcelPage from "./pages/ExcelPage";
import Login from "./pages/Login";

import Statistics from "./pages/Statistics";
import Profile from "./pages/Profile";
import ProtectedRoute from "./pages/ProtectedRoute";

import Error from "./pages/Error";
import { useLocation } from "react-router-dom"; // Importa useLocation

const AppContent = () => {
  const location = useLocation(); // Ahora estamos dentro del Router
  const hideSidebar = location.pathname === "/"; // Condición para ocultar el Sidebar en login
  const errorSidebar = location.pathname === "/error";
  return (
    <div className="flex max-h-max">
      {(!hideSidebar && !errorSidebar) && <Sidebar />} {/* Renderiza Sidebar solo si no está en / */}
      
      <div className="flex-1 p-6">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/orders"
            element={
              <ProtectedRoute allowedRoles={["MODERATOR", "ANALYST", "ADMIN"]}>
                <OrdersPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/statistics"
            element={
              <ProtectedRoute allowedRoles={["MODERATOR", "ANALYST", "ADMIN"]}>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add-order"
            element={
              <ProtectedRoute allowedRoles={["MODERATOR", "ADMIN"]}>
                <AddOrderPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/excel"
            element={
              <ProtectedRoute allowedRoles={["MODERATOR", "ANALYST", "ADMIN"]}>
                <ExcelPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute allowedRoles={["MODERATOR", "ANALYST", "ADMIN"]}>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route path="/error" element={<Error />} />
        </Routes>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <GlobalProvider>
      <Router>
        <AppContent />
      </Router>
    </GlobalProvider>
  );
};

export default App;


