import React, { useState } from 'react';
import OrdersList from './OrdersList';
import OrderDetailsModal from './OrderDetailsModal';

const OrdersPage = ({ orders, filterStatus, handleStatusChange }) => {
  // Filtrar las órdenes por el estado seleccionado
  const filteredOrders = filterStatus
    ? orders.filter((order) => order.status === filterStatus)
    : orders;

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewDetails = (orderId) => {
    const order = orders.find((o) => o.id === orderId);
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

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
        orders={orders}
        handleStatusChange={handleStatusChange}
        getStatusClass={getStatusClass}
        handleViewDetails={handleViewDetails}
      />
      <OrderDetailsModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        order={selectedOrder}
      />
    </div>
  );
};

export default OrdersPage;
