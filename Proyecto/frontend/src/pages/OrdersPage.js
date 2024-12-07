import React, { useCallback, useMemo, useState, useEffect } from 'react';
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
    const [filteredOrders, setFilteredOrders] = useState(orders); // Asegúrate de que `filteredOrders` se usa para la paginación
    const ordersPerPage = 7;

    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);
    const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

    // Asegúrate de que `filteredOrders` se actualiza cuando cambian las órdenes o los filtros
    useEffect(() => {
        setFilteredOrders(orders); // Si las órdenes cambian, actualiza el estado de `filteredOrders`
    }, [orders]);

    // Para actualizar la página cuando se cambia de página
    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    return (
        <div className="orders-container">
            <FilterAndSort setFilteredOrders={setFilteredOrders} />
            <OrdersList
                orders={currentOrders}
                handleStatusChange={handleStatusChange}
                getStatusClass={getStatusClass}
                isModalOpen={isModalOpen}
                selectedOrder={selectedOrder}
            />
            <Pagination 
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange} // Asegúrate de que la función `onPageChange` esté pasando la nueva página
            />
            <OrderDetailsModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                order={selectedOrder}
            />
        </div>
    );
};

export default OrdersPage;
