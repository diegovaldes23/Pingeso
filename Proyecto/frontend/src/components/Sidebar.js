import React, { useState } from "react";
import { Link } from "react-router-dom"; // Importar React Router
import HogarIcon from "../icons/hogar.png"; // Ícono para "Inicio"
import AddOrderIcon from "../icons/agregar-pedido.png"; // Ícono para "Agregar pedido"
import OrdersVisualizationIcon from "../icons/visualizacion-pedidos.png"; // Ícono para "Visualización de pedidos"
import CostsIcon from "../icons/costos.png"; // Ícono para "Costos asociados"
import StatisticsIcon from "../icons/estadisticas.png"; // Ícono para "Estadísticas varias"

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div
      className={`h-screen bg-purple-800 text-white flex flex-col transition-all duration-500 ${
        isCollapsed ? "w-20" : "w-72"
      }`}
    >
      {/* Botón para colapsar/expandir */}
      <div
        className="p-4 cursor-pointer text-center hover:bg-purple-600"
        onClick={toggleSidebar}
      >
        ☰
      </div>

      {/* Menú */}
      <ul className="flex flex-col mt-4 space-y-4">
        {/* Opción Inicio */}
        <li
          className={`flex items-center p-2 rounded hover:bg-purple-600 cursor-pointer transition-all duration-300 ${
            isCollapsed ? "justify-center" : ""
          }`}
        >
          <img src={HogarIcon} alt="Inicio Icon" className="w-6 h-6" />
          {!isCollapsed && (
            <Link
              to="/"
              className="ml-3 transition-opacity duration-500 whitespace-nowrap"
            >
              Inicio
            </Link>
          )}
        </li>

        {/* Agregar Pedido */}
        <li
          className={`flex items-center p-2 rounded hover:bg-purple-600 cursor-pointer transition-all duration-300 ${
            isCollapsed ? "justify-center" : ""
          }`}
        >
          <img src={AddOrderIcon} alt="Agregar Pedido Icon" className="w-6 h-6" />
          {!isCollapsed && (
            <Link
              to="/add-order"
              className="ml-3 transition-opacity duration-500 whitespace-nowrap"
            >
              Agregar pedido
            </Link>
          )}
        </li>

        {/* Visualización de pedidos */}
        <li
          className={`flex items-center p-2 rounded hover:bg-purple-600 cursor-pointer transition-all duration-300 ${
            isCollapsed ? "justify-center" : ""
          }`}
        >
          <img
            src={OrdersVisualizationIcon}
            alt="Visualización de Pedidos Icon"
            className="w-6 h-6"
          />
          {!isCollapsed && (
            <Link
              to="/orders"
              className="ml-3 transition-opacity duration-500 whitespace-nowrap"
            >
              Visualización de pedidos
            </Link>
          )}
        </li>

       

        {/* Estadísticas varias */}
        <li
          className={`flex items-center p-2 rounded hover:bg-purple-600 cursor-pointer transition-all duration-300 ${
            isCollapsed ? "justify-center" : ""
          }`}
        >
          <img src={StatisticsIcon} alt="Estadísticas Icon" className="w-6 h-6" />
          {!isCollapsed && (
            <Link
              to="/statistics"
              className="ml-3 transition-opacity duration-500 whitespace-nowrap"
            >
              Estadísticas varias
            </Link>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
