import React, { useState } from "react";
import { Link } from "react-router-dom"; // Importar React Router

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div
      className={`h-screen bg-purple-800 text-white flex flex-col transition-all duration-300 ${
        isCollapsed ? "w-20" : "w-60"
      }`}
    >
      {/* Botón para colapsar/expandir */}
      <div
        className={`p-4 cursor-pointer text-center hover:bg-purple-600 transition-all duration-300 ${
          isCollapsed ? "justify-center" : "justify-start"
        }`}
        onClick={toggleSidebar}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="2rem" // Fijo el tamaño del ícono
          height="2rem" // Fijo el tamaño del ícono
          viewBox="0 0 24 24"
        >
          <g fill="none">
            <path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"/>
            <path fill="white" d="M20 17.5a1.5 1.5 0 0 1 .144 2.993L20 20.5H4a1.5 1.5 0 0 1-.144-2.993L4 17.5zm0-7a1.5 1.5 0 0 1 0 3H4a1.5 1.5 0 0 1 0-3zm0-7a1.5 1.5 0 0 1 0 3H4a1.5 1.5 0 1 1 0-3z"/>
          </g>
        </svg>
      </div>

      {/* Menú */}
      <ul
        className={`flex flex-col mt-4 transition-all duration-300 ${
          isCollapsed ? "items-center justify-center" : ""
        }`}
      >
        {/* Opción Inicio */}
        <li
          className={`flex items-center p-2 rounded hover:bg-purple-600 cursor-pointer transition-all duration-300 ${
            isCollapsed ? "justify-center" : "justify-start"
          }`}
        >
          <Link
            to="/"
            className="flex items-center w-full p-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="2rem" height="2rem" viewBox="0 0 24 24">
              <path fill="white" d="M21 20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.49a1 1 0 0 1 .386-.79l8-6.223a1 1 0 0 1 1.228 0l8 6.223a1 1 0 0 1 .386.79z"/>
            </svg>
            {!isCollapsed && (
              <span className="ml-3 transition-opacity duration-300 whitespace-nowrap">
                Inicio
              </span>
            )}
          </Link>
        </li>

        {/* Agregar Pedido */}
        <li
          className={`flex items-center p-2 rounded hover:bg-purple-600 cursor-pointer transition-all duration-300 ${
            isCollapsed ? "justify-center" : "justify-start"
          }`}
        >
          <Link
            to="/add-order"
            className="flex items-center w-full p-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="2rem" height="2rem" viewBox="0 0 20 20">
              <path fill="white" d="M11 9V5H9v4H5v2h4v4h2v-4h4V9zm-1 11a10 10 0 1 1 0-20a10 10 0 0 1 0 20"/>
            </svg>
            {!isCollapsed && (
              <span className="ml-3 transition-opacity duration-300 whitespace-nowrap">
                Agregar pedido
              </span>
            )}
          </Link>
        </li>

        {/* Visualización de pedidos */}
        <li
          className={`flex items-center p-2 rounded hover:bg-purple-600 cursor-pointer transition-all duration-300 ${
            isCollapsed ? "justify-center" : "justify-start"
          }`}
        >
          <Link
            to="/orders"
            className="flex items-center w-full p-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="2rem" height="2rem" viewBox="0 0 48 48">
              <defs>
                <mask id="ipSTableReport0">
                  <g fill="none" stroke-linejoin="round" stroke-width="4">
                    <path fill="#fff" stroke="#fff" d="M5 7a3 3 0 0 1 3-3h24a3 3 0 0 1 3 3v37H8a3 3 0 0 1-3-3z"/>
                    <path stroke="#fff" d="M35 24a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v17a3 3 0 0 1-3 3h-5z"/>
                    <path stroke="#000" stroke-linecap="round" d="M11 12h8m-8 7h12"/>
                  </g>
                </mask>
              </defs>
              <path fill="white" d="M0 0h48v48H0z" mask="url(#ipSTableReport0)"/>
            </svg>
            {!isCollapsed && (
              <span className="ml-3 transition-opacity duration-300 whitespace-nowrap">
                Ver pedidos
              </span>
            )}
          </Link>
        </li>

        {/* Estadísticas */}
        <li
          className={`flex items-center p-2 rounded hover:bg-purple-600 cursor-pointer transition-all duration-300 ${
            isCollapsed ? "justify-center" : "justify-start"
          }`}
        >
          <Link
            to="/statistics"
            className="flex items-center w-full p-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="2rem" height="2rem" viewBox="0 0 24 24">
              <path fill="white" d="M11 2v20c-5.1-.5-9-4.8-9-10s3.9-9.5 9-10m2 0v9h9c-.5-4.8-4.2-8.5-9-9m0 11v9c4.7-.5 8.5-4.2 9-9z"/>
            </svg>
            {!isCollapsed && (
              <span className="ml-3 transition-opacity duration-300 whitespace-nowrap">
                Estadísticas
              </span>
            )}
          </Link>
        </li>
        {/* Excel */}
        <li
          className={`flex items-center p-2 rounded hover:bg-purple-600 cursor-pointer transition-all duration-300 ${
            isCollapsed ? "justify-center" : "justify-start"
          }`}
        >
          <Link
            to="/excel"
            className="flex items-center w-full p-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="2rem" height="2rem" viewBox="0 0 24 24">
                <path fill="white" d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zm1.8 18H14l-2-3.4l-2 3.4H8.2l2.9-4.5L8.2 11H10l2 3.4l2-3.4h1.8l-2.9 4.5zM13 9V3.5L18.5 9z"/>
            </svg>

            {!isCollapsed && (
              <span className="ml-3 transition-opacity duration-300 whitespace-nowrap">
                Opciones excel
              </span>
            )}
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
