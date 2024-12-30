import React, { useState } from "react";
import { Link, useLocation, useNavigate  } from "react-router-dom"; // Importar React Router

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation(); // Obtener la ubicación actual
  const navigate = useNavigate(); // Para redirigir al usuario

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  // Función para cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Eliminar el token de localStorage
    localStorage.removeItem("role_u");
    localStorage.removeItem("username");
    navigate("/"); // Redirigir al inicio de sesión
  };

  // Verificar si estamos en la ruta de ExcelPage
  const isFull = location.pathname === "/excel" || location.pathname === "/orders";

  const userRole = localStorage.getItem("role_u"); // Obtener el rol del usuario

  return (
    <div
      className={`bg-indigo-800 text-white flex flex-col transition-all duration-300 overflow-y-auto ${
        isCollapsed ? "w-20" : "w-60"
    } ${isFull ? "h-screen" : "min-h-full"}`}
    >
      {/* Botón para colapsar/expandir */}
      <div
        className={`p-6 cursor-pointer text-center hover:bg-indigo-600 transition-all duration-300 ${
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

        
        {/* Visualización de pedidos */}
        <li
          className={`inline-flex items-center p-4 rounded hover:bg-indigo-600 cursor-pointer transition-all duration-300 ${
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
                Inicio
              </span>
            )}
          </Link>
        </li>
        
        {/* Agregar Pedido */}
        {userRole !== "ANALYST" && ( // Mostrar solo si el rol no es ANALYST
          <li
            className={`flex items-center p-4 rounded hover:bg-purple-600 cursor-pointer transition-all duration-300 ${
              isCollapsed ? "justify-center" : "justify-start"
            }`}
          >
            <Link to="/add-order" className="flex items-center w-full p-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="2rem" height="2rem" viewBox="0 0 20 20">
                <path
                  fill="white"
                  d="M11 9V5H9v4H5v2h4v4h2v-4h4V9zm-1 11a10 10 0 1 1 0-20a10 10 0 0 1 0 20"
                />
              </svg>
              {!isCollapsed && (
                <span className="ml-3 transition-opacity duration-300 whitespace-nowrap">
                  Agregar pedido
                </span>
              )}
            </Link>
          </li>
        )}

        

        

        {/* Estadísticas */}
        <li
          className={`flex items-center p-4 rounded hover:bg-indigo-600 cursor-pointer transition-all duration-300 ${
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
          className={`flex items-center p-4 rounded hover:bg-indigo-600 cursor-pointer transition-all duration-300 ${
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

        {/* Perfil */}
        <li
          className={`inline-flex items-center p-4 rounded hover:bg-indigo-600 cursor-pointer transition-all duration-300 ${
            isCollapsed ? "justify-center" : "justify-start"
          }`}
        >
          <Link
            to="/profile"
            className="flex items-center w-full p-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="2rem" height="2rem" viewBox="0 0 24 24"><path fill="#fff" fill-rule="evenodd" d="M8 7a4 4 0 1 1 8 0a4 4 0 0 1-8 0m0 6a5 5 0 0 0-5 5a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3a5 5 0 0 0-5-5z" clip-rule="evenodd"/></svg>
            {!isCollapsed && (
              <span className="ml-3 transition-opacity duration-300 whitespace-nowrap">
                Perfil
              </span>
            )}
          </Link>
        </li>

        {/* Cerrar sesión */}
        <li
        className={`inline-flex items-center p-4 rounded hover:bg-indigo-600 cursor-pointer transition-all duration-300 ${
            isCollapsed ? "justify-center" : "justify-start"
        }`}
        >
        <button
            className="flex items-center ml-1 w-full p-2 space-x-2 focus:outline-none"
            onClick={handleLogout}
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="2rem" height="2rem" viewBox="0 0 512 512">
            <path fill="#fff" d="M336 376V272H191a16 16 0 0 1 0-32h145V136a56.06 56.06 0 0 0-56-56H88a56.06 56.06 0 0 0-56 56v240a56.06 56.06 0 0 0 56 56h192a56.06 56.06 0 0 0 56-56m89.37-104l-52.68 52.69a16 16 0 0 0 22.62 22.62l80-80a16 16 0 0 0 0-22.62l-80-80a16 16 0 0 0-22.62 22.62L425.37 240H336v32Z"/>
            </svg>
            {!isCollapsed && (
            <span className="transition-opacity duration-300 whitespace-nowrap">
                Cerrar sesión
            </span>
            )}
        </button>
        </li>



      </ul>
    </div>
  );
};

export default Sidebar;
