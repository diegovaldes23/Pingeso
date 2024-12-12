import React, { useCallback, useMemo, useState, useEffect } from 'react';
import OrdersList from './OrdersList';
import OrderDetailsModal from './OrderDetailsModal';
import { useGlobalContext } from '../utils/GlobalModelContext';
import FilterAndSort from './FilterAndSort';

/**
 * OrdersPage Component
 * Este componente maneja la pantalla e interacción de órdenes, incluyendo:
 * - Filtro y ordenamiento de órdenes
 * - Paginación de la lista de órdenes
 * - Mostrar el modal de los detalles de una orden específica
 * 
 * @component
 * @returns {React.ReactElement} Rendered OrdersPage component
 * 
 */
const OrdersPage = () => {
    // Se utiliza el GlobalContext para extraer las variables globales
    const {
        orders,
        handleStatusChange,
        getStatusClass,
        isModalOpen,
        setIsModalOpen, 
        selectedOrder,
    } = useGlobalContext();

    // Declaración de variables a ocupar para la paginación
    const [currentPage, setCurrentPage] = useState(1);
    const [filteredOrders, setFilteredOrders] = useState(orders);

    // Constantes de paginación
    const ordersPerPage = 15;
    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;

    // Porción de órdenes a mostrar en la página actual
    const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);

    // Actualización de filteredOrders cuando la lista original de órdenes cambie
    useEffect(() => {
        setFilteredOrders(orders); // Si las órdenes cambian, actualiza el estado de `filteredOrders`
    }, [orders]);

    // Reseteo a la primera página cuando las órdenes filtradas cambian
    useEffect(() => {
        setCurrentPage(1);
    }, [filteredOrders]);

    return (
        <div className="orders-container">
            {/* Componente para filtrar y ordenar las órdenes */}
            <FilterAndSort setFilteredOrders={setFilteredOrders} />

            {/* Lista de órdenes de la página actual */}
            <OrdersList
                orders={currentOrders}
                handleStatusChange={handleStatusChange}
                getStatusClass={getStatusClass}
                isModalOpen={isModalOpen}
                selectedOrder={selectedOrder}
            />

            {/* Modal para mostrar información detallada de la orden */}
            <OrderDetailsModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                order={selectedOrder}
            />
        </div>
    );
};

export default OrdersPage;
