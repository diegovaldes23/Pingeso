import React from 'react';
import OrdersList from './OrdersList';

const OrdersPage = ({ orders, filterStatus, handleStatusChange }) => {
  // Filtrar las órdenes por el estado seleccionado
  const filteredOrders = filterStatus
    ? orders.filter((order) => order.status === filterStatus)
    : orders;

  // Definir la función para asignar clases CSS según el estado
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
        getStatusClass={getStatusClass} // Pasar la función como prop
      />
    </div>
  );
};

export default OrdersPage;
