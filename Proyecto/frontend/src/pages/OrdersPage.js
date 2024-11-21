import React, { useState } from 'react';
import OrdersList from './OrdersList';
import OrderDetailsModal from './OrderDetailsModal';
import { useGlobalContext } from '../utils/GlobalModelContext';
import FilterAndSort from './FilterAndSort';

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

  const [filteredOrders, setFilteredOrders] = useState(orders);

  return (
    <div>
      <FilterAndSort setFilteredOrders={setFilteredOrders} />
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
