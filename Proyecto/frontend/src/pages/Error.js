import React from 'react';
import { useNavigate } from 'react-router-dom';

const Error = () => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate("/");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-purple-800">
      <div className="bg-white p-6 rounded shadow-md text-center w-96">
        <h1 className="text-2xl font-bold text-purple-800 mb-4">
          Error al cargar la página
        </h1>
        <p className="text-gray-700 mb-6">
          Parece que hubo un problema al intentar acceder a esta página. Por favor, verifica la URL o regresa a la página principal.
        </p>
        <p className="text-purple-800 mb-6">
            <strong>Nota: </strong> Su sesión pudo haber cerrado, o está accediendo a un dominio que no le pertenece a su rol
        </p>
        <button
          onClick={handleRedirect}
          className="w-full bg-purple-800 text-white py-2 rounded hover:bg-purple-600 transition-all"
        >
          Presione aquí para regresar a la Página Inicial
        </button>
      </div>
    </div>
  );
};

export default Error;
