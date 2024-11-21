import React from 'react';
import OrdersList from './OrdersList';
import OrderDetailsModal from './OrderDetailsModal';
import { useGlobalContext } from '../utils/GlobalModelContext';

const OrdersPage = () => {
    const {
        orders,
        filterStatus,
        handleStatusChange,
        getStatusClass,
        isModalOpen, // Usamos el estado global
        setIsModalOpen, // Usamos el estado global
        selectedOrder, // Usamos el estado global
        setSelectedOrder, // Usamos el estado global
      } = useGlobalContext();

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
