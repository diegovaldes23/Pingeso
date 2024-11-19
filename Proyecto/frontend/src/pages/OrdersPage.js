import React from 'react';
import OrdersList from './OrdersList';

const OrdersPage = ({ filterStatus }) => {
  // Órdenes de ejemplo
  const orders = [
    {
      id: 1,
      customerName: 'Juan Pérez',
      phone: '912345678',
      commune: 'Santiago',
      date: '2024-11-01',
      category: 'Helados',
      products: [
        { name: 'Helado de Chocolate', price: 6000 },
        { name: 'Brownie', price: 5990 },
      ],
      deliveryCost: 2990,
      status: 'Pendiente',
    },
    {
      id: 2,
      customerName: 'Ana García',
      phone: '912345679',
      commune: 'Providencia',
      date: '2024-11-02',
      category: 'Pasteles',
      products: [
        { name: 'Tarta de Manzana', price: 7000 },
        { name: 'Pastel de Zanahoria', price: 8000 },
      ],
      deliveryCost: 3990,
      status: 'Completada',
    },
    {
      id: 3,
      customerName: 'Carlos López',
      phone: '912345680',
      commune: 'Las Condes',
      date: '2024-11-03',
      category: 'Dulces',
      products: [
        { name: 'Galletas de Chocolate', price: 4500 },
        { name: 'Trufas', price: 5000 },
      ],
      deliveryCost: 2490,
      status: 'Cancelada',
    },
  ];

  // Filtrar las órdenes por el estado seleccionado
  const filteredOrders = filterStatus
    ? orders.filter((order) => order.status === filterStatus)
    : orders;

  // Función para manejar los cambios de estado en los pedidos
  const handleStatusChange = (id, newStatus) => {
    const updatedOrders = orders.map((order) =>
      order.id === id ? { ...order, status: newStatus } : order
    );
    console.log('Actualizado:', updatedOrders);
  };

  // Función para obtener clases dinámicas para los estilos
  const getStatusClass = (status) => {
    switch (status) {
      case 'Pendiente':
        return 'bg-yellow-200 text-yellow-800';
      case 'En proceso':
        return 'bg-green-200 text-green-800';
      case 'Completada':
        return 'bg-blue-200 text-blue-800';
      case 'Cancelada':
        return 'bg-red-200 text-red-800';
      default:
        return '';
    }
  };

  return (
    <div>
      <OrdersList
        orders={filteredOrders}
        handleStatusChange={handleStatusChange}
        getStatusClass={getStatusClass}
      />
    </div>
  );
};

export default OrdersPage;
