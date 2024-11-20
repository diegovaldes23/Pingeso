import React, { useState, useEffect } from 'react';
import OrdersPage from './OrdersPage';

const HomePage = ({ orders, setOrders, filterStatus, setFilterStatus, handleStatusChange, getStatusClass }) => {

  const [counts, setCounts] = useState({
    Cancelada: 0,
    Pendiente: 0,
    'En proceso': 0,
    Completada: 0,
  });

  const filteredOrders = filterStatus
  ? orders.filter((order) => order.status === filterStatus)
  : orders; // Si no hay filtro, muestra todos los pedidos

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

  // Función para contar los pedidos por estado
  const countOrdersByStatus = () => {
    const counts = orders.reduce(
      (acc, order) => {
        acc[order.status] = (acc[order.status] || 0) + 1;
        return acc;
      },
      { Cancelada: 0, Pendiente: 0, 'En proceso': 0, Completada: 0 }
    );
    setCounts(counts);
  };

  // Calcular conteos cada vez que los pedidos cambien
  useEffect(() => {
    countOrdersByStatus();
  }, [orders]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <h1 className="text-3xl font-bold mb-6">Semana: {weekRange}</h1>
      <div className="flex space-x-6 mb-8">
        <button
          className="w-20 h-20 border-4 border-gray-500 rounded-full flex items-center justify-center text-xl font-bold text-gray-500"
          onClick={() => handleFilterClick('')}
        >
          Todos
        </button>
        <button
          className="w-20 h-20 border-4 border-red-500 rounded-full flex items-center justify-center text-xl font-bold text-red-500"
          onClick={() => handleFilterClick('Cancelada')}
        >
          {counts.Cancelada}
        </button>
        <button
          className="w-20 h-20 border-4 border-yellow-500 rounded-full flex items-center justify-center text-xl font-bold text-yellow-500"
          onClick={() => handleFilterClick('Pendiente')}
        >
          {counts.Pendiente}
        </button>
        <button
          className="w-20 h-20 border-4 border-green-500 rounded-full flex items-center justify-center text-xl font-bold text-green-500"
          onClick={() => handleFilterClick('En proceso')}
        >
          {counts['En proceso']}
        </button>
        <button
          className="w-20 h-20 border-4 border-blue-500 rounded-full flex items-center justify-center text-xl font-bold text-blue-500"
          onClick={() => handleFilterClick('Completada')}
        >
          {counts.Completada}
        </button>
      </div>

      {/* Tabla de órdenes filtrada */}
      <div className="w-full max-w-6xl">
        <OrdersPage
          orders={filteredOrders}
          setOrders={setOrders}
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
          handleStatusChange={handleStatusChange} // Pasar función para manejar el cambio de estado
          getStatusClass={getStatusClass}
        />
      </div>
    </div>
  );
};

export default HomePage;
