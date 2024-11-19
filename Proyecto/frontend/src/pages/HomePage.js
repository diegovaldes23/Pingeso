import React, { useState } from 'react';
import AdminOrdersPage from './AdminOrdersPage';

const HomePage = () => {
  // Estado para manejar qué tabla mostrar
  const [filterStatus, setFilterStatus] = useState('');

  // Obtener inicio y fin de la semana actual
  const today = new Date();
  const firstDayOfWeek = new Date(today.setDate(today.getDate() - today.getDay() + 1));
  const lastDayOfWeek = new Date(today.setDate(firstDayOfWeek.getDate() + 6));

  const formatDate = (date) => {
    return date.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  const weekRange = `${formatDate(firstDayOfWeek)} - ${formatDate(lastDayOfWeek)}`;

  // Función para manejar clic en los botones
  const handleFilterClick = (status) => {
    setFilterStatus(status);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <h1 className="text-3xl font-bold mb-6">Semana: {weekRange}</h1>
      <div className="flex space-x-6 mb-8">
        <button
          className="w-20 h-20 border-4 border-red-500 rounded-full flex items-center justify-center text-xl font-bold text-red-500"
          onClick={() => handleFilterClick('Cancelada')}
        >
          5
        </button>
        <button
          className="w-20 h-20 border-4 border-yellow-500 rounded-full flex items-center justify-center text-xl font-bold text-yellow-500"
          onClick={() => handleFilterClick('Pendiente')}
        >
          3
        </button>
        <button
          className="w-20 h-20 border-4 border-green-500 rounded-full flex items-center justify-center text-xl font-bold text-green-500"
          onClick={() => handleFilterClick('Completada')}
        >
          2
        </button>
      </div>

      {/* Mostrar tabla correspondiente */}
      {filterStatus && (
        <div className="w-full max-w-6xl">
          <h2 className="text-2xl font-bold text-center mb-4">Órdenes - {filterStatus}</h2>
          <AdminOrdersPage filterStatus={filterStatus} />
        </div>
      )}
    </div>
  );
};

export default HomePage;
