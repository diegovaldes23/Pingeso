import React, { useCallback, useMemo, useState } from 'react';
import OrdersList from './OrdersList';
import OrderDetailsModal from './OrderDetailsModal';
import { useGlobalContext } from '../utils/GlobalModelContext';
import FilterAndSort from './FilterAndSort';
import Pagination from "./Pagination";

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

    const [currentPage, setCurrentPage] = useState(1);
    const [filteredOrders, setFilteredOrders] = useState(orders);
    const ordersPerPage = 7;

    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);
    const totalPages = Math.ceil(orders.length / ordersPerPage);

  // Buscar cómo hacer variables globales

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  }, []);

  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * ordersPerPage,
    currentPage * ordersPerPage
  );

  return (
    <div className="orders-container">
      <FilterAndSort setFilteredOrders={setFilteredOrders} />
      <OrdersList
        orders={currentOrders}
        handleStatusChange={handleStatusChange}
        getStatusClass={getStatusClass} // Pasa getStatusClass aquí
        isModalOpen={isModalOpen}
        selectedOrder={selectedOrder}
      />
      <Pagination 
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
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
