import React, { useState } from "react";
import { Link } from "react-router-dom"; // Importar React Router

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div
      className={`h-screen bg-purple-800 text-white flex flex-col ${
        isCollapsed ? "w-20" : "w-64"
      } transition-all duration-300`}
    >
      {/* Botón para colapsar/expandir */}
      <div
        className={`p-4 cursor-pointer text-center hover:bg-purple-600 ${
          isCollapsed ? "text-2xl" : "text-lg"
        }`}
        onClick={toggleSidebar}
      >
        ☰
      </div>

      {/* Menú */}
      <ul className="flex flex-col space-y-2 px-4">
        <li
          className={`flex items-center space-x-3 p-2 rounded hover:bg-purple-600 cursor-pointer ${
            isCollapsed ? "justify-center" : ""
          }`}
        >
          <span className="text-xl">🏠</span>
          {!isCollapsed && <Link to="/">Inicio</Link>}
        </li>
        <li
          className={`flex items-center space-x-3 p-2 rounded hover:bg-purple-600 cursor-pointer ${
            isCollapsed ? "justify-center" : ""
          }`}
        >
          <span className="text-xl">🍰</span>
          {!isCollapsed && <Link to="/menu">Menú</Link>}
        </li>
        <li
          className={`flex items-center space-x-3 p-2 rounded hover:bg-purple-600 cursor-pointer ${
            isCollapsed ? "justify-center" : ""
          }`}
        >
          <span className="text-xl">📱</span>
          {!isCollapsed && <Link to="/add-order">Agregar pedido</Link>}
        </li>
        <li
          className={`flex items-center space-x-3 p-2 rounded hover:bg-purple-600 cursor-pointer ${
            isCollapsed ? "justify-center" : ""
          }`}
        >
          <span className="text-xl">👀</span>
          {!isCollapsed && <Link to="/orders">Visualización de pedidos</Link>}
        </li>
        <li
          className={`flex items-center space-x-3 p-2 rounded hover:bg-purple-600 cursor-pointer ${
            isCollapsed ? "justify-center" : ""
          }`}
        >
          <span className="text-xl">💲</span>
          {!isCollapsed && <Link to="/costs">Costos asociados</Link>}
        </li>
        <li
          className={`flex items-center space-x-3 p-2 rounded hover:bg-purple-600 cursor-pointer ${
            isCollapsed ? "justify-center" : ""
          }`}
        >
          <span className="text-xl">📊</span>
          {!isCollapsed && <Link to="/statistics">Estadísticas varias</Link>}
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
