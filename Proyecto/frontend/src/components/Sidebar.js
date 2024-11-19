import React, { useState } from "react";

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
          {!isCollapsed && <span>Inicio</span>}
        </li>
        <li
          className={`flex items-center space-x-3 p-2 rounded hover:bg-purple-600 cursor-pointer ${
            isCollapsed ? "justify-center" : ""
          }`}
        >
          <span className="text-xl">🍰</span>
          {!isCollapsed && <span>Menú</span>}
        </li>
        <li
          className={`flex items-center space-x-3 p-2 rounded hover:bg-purple-600 cursor-pointer ${
            isCollapsed ? "justify-center" : ""
          }`}
        >
          <span className="text-xl">📱</span>
          {!isCollapsed && <span>Gestión de pedidos</span>}
        </li>
        <li
          className={`flex items-center space-x-3 p-2 rounded hover:bg-purple-600 cursor-pointer ${
            isCollapsed ? "justify-center" : ""
          }`}
        >
          <span className="text-xl">👀</span>
          {!isCollapsed && <span>Visualización de pedidos</span>}
        </li>
        <li
          className={`flex items-center space-x-3 p-2 rounded hover:bg-purple-600 cursor-pointer ${
            isCollapsed ? "justify-center" : ""
          }`}
        >
          <span className="text-xl">💲</span>
          {!isCollapsed && <span>Costos asociados</span>}
        </li>
        <li
          className={`flex items-center space-x-3 p-2 rounded hover:bg-purple-600 cursor-pointer ${
            isCollapsed ? "justify-center" : ""
          }`}
        >
          <span className="text-xl">📊</span>
          {!isCollapsed && <span>Estadísticas varias</span>}
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
