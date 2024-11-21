import React, { useState } from 'react';
import OrdersList from './OrdersList';
import OrderDetailsModal from './OrderDetailsModal';

const OrdersPage = ({ orders, setOrders, filterStatus, setFilterStatus, handleStatusChange, getStatusClass }) => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Buscar cómo hacer variables globales

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  const filteredOrders = filterStatus
    ? orders.filter((order) => order.status === filterStatus)
    : orders;

  return (
    <div>
      <OrdersList
        orders={filteredOrders}
        handleStatusChange={handleStatusChange}
        getStatusClass={getStatusClass} // Pasa getStatusClass aquí
        isModalOpen={isModalOpen}
        selectedOrder={selectedOrder}
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
