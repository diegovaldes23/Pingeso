import React, { useState, useEffect } from 'react';
import OrdersPage from './OrdersPage';

const HomePage = () => {
  // Estado para manejar el estado del filtro y la lista de pedidos
  const [filterStatus, setFilterStatus] = useState('');
  const [orders, setOrders] = useState([
    {
        id: 1,
        customerName: 'Juan Pérez',
        phone: '912345678',
        commune: 'Santiago',
        date: '2024-11-01',
        customerType: 'Antiguo', // Tipo de cliente
        purchaseSource: 'Facebook ads', // Cómo fue la compra
        products: [
          { name: 'Helado de Chocolate', price: 6000, quantity: 2 }, // Agregado cantidad
          { name: 'Brownie', price: 5990, quantity: 1 },
        ],
        deliveryCost: 2990,
        subtotal: 17980, // Subtotal calculado
        total: 20970, // Total calculado (subtotal + deliveryCost)
        initialPayment: 5000, // Abono inicial
        status: 'Pendiente',
      },
      {
        id: 2,
        customerName: 'Ana García',
        phone: '912345679',
        commune: 'Providencia',
        date: '2024-11-02',
        customerType: 'Nuevo', // Tipo de cliente
        purchaseSource: 'Orgánico', // Cómo fue la compra
        products: [
          { name: 'Tarta de Manzana', price: 7000, quantity: 1 },
          { name: 'Pastel de Zanahoria', price: 8000, quantity: 1 },
        ],
        deliveryCost: 3990,
        subtotal: 15000, // Subtotal calculado
        total: 18990, // Total calculado (subtotal + deliveryCost)
        initialPayment: 10000, // Abono inicial
        status: 'Completada',
      },
      {
        id: 3,
        customerName: 'Carlos López',
        phone: '912345680',
        commune: 'Las Condes',
        date: '2024-11-03',
        customerType: 'Antiguo', // Tipo de cliente
        purchaseSource: 'Facebook ads', // Cómo fue la compra
        products: [
          { name: 'Galletas de Chocolate', price: 4500, quantity: 3 },
          { name: 'Trufas', price: 5000, quantity: 2 },
        ],
        deliveryCost: 2490,
        subtotal: 23490, // Subtotal calculado
        total: 25980, // Total calculado (subtotal + deliveryCost)
        initialPayment: 15000, // Abono inicial
        status: 'Cancelada',
      },
  ]);

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

  // Función para manejar el cambio de estado de un pedido
  const handleStatusChange = (id, newStatus) => {
    const updatedOrders = orders.map((order) =>
      order.id === id ? { ...order, status: newStatus } : order
    );
    setOrders(updatedOrders); // Actualizar la lista de pedidos
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
          filterStatus={filterStatus}
          handleStatusChange={handleStatusChange} // Pasar función para manejar el cambio de estado
        />
      </div>
    </div>
  );
};

export default HomePage;
