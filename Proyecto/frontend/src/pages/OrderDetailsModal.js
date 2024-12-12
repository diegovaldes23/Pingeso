import React from 'react';

/**
 * OrderDetailsModal Component
 * 
 * Renderiza una vista de un modal detallado de una orden específica, mostrando información de la orden de forma comprensiva.
 * El modal incluye los detalles del cliente, ítems de la orden, precios y estado.
 * 
 * @component
 * 
 * @param {Object} props - Propiedades del componente
 * @param {boolean} props.isOpen - Determina si el modal es visible
 * @param {Function} props.onClose - Función para cerrar el modal
 * @param {Object} props.order - El objeto "orden" que contiene todos los detalles de la orden 
 * @returns {React.ReactElement|null} OrderDetailsModal renderizado o nulo
 */
const OrderDetailsModal = ({ isOpen, onClose, order }) => {
    // Retorna nulo si el modal no está abierto o no se provee una orden
    if (!isOpen || !order) return null;
    
    /**
     * Formatea una fecha string a una fecha localizada para Chile.
     * 
     * @param {string} dateString - El string de fecha a ser formateada
     * @returns {string} Fecha formateada en dd-MM-yyyy
     */
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        // Se ajusta al huso horario para prevenir date shifting
        date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
        return date.toLocaleDateString('es-CL', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });
};

return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-white w-full max-w-2xl p-8 relative">
            {/* Botón de cierre */}
            <button onClick={onClose} className="absolute top-2 right-2 text-red-600">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 16 16">
                    <path fill="currentColor" d="M15.854 12.854L11 8l4.854-4.854a.503.503 0 0 0 0-.707L13.561.146a.5.5 0 0 0-.707 0L8 5L3.146.146a.5.5 0 0 0-.707 0L.146 2.439a.5.5 0 0 0 0 .707L5 8L.146 12.854a.5.5 0 0 0 0 .707l2.293 2.293a.5.5 0 0 0 .707 0L8 11l4.854 4.854a.5.5 0 0 0 .707 0l2.293-2.293a.5.5 0 0 0 0-.707"/>
                </svg>
            </button>
            
            {/* Sección de arriba */}
            <div className="border-b-2 border-dashed pb-4 mb-4">
                <h2 className="text-center font-bold mb-2">RESUMEN BOLETA</h2>
                <p className="text-center text-sm">RUT: 77.130.395-1</p>
                <p className="text-center text-sm">N° {order.id}</p>
                <p className="text-center text-sm">CONFITES CÓRDOVA</p>
                <p className="text-center text-sm">FECHA EMISIÓN: {formatDate(order.order_date)}</p>
            </div>

            {/* Sección de detalles del cliente */}
            <div className="space-y-2 border-b-2 border-dashed pb-4 mb-4">
                <div className="flex">
                    <span className="font-bold w-40">Nombre del cliente:</span>
                    <span>{order.name}</span>
                </div>
                <div className="flex">
                    <span className="font-bold w-40">Teléfono:</span>
                    <span>{order.phone}</span>
                </div>
                <div className="flex">
                    <span className="font-bold w-40">Comuna:</span>
                    <span>{order.commune}</span>
                </div>
                <div className="flex">
                    <span className="font-bold w-40">Dirección:</span>
                    <span>{order.address}</span>
                </div>
                <div className="flex">
                    <span className="font-bold w-40">Tipo de cliente:</span>
                    <span>{order.customer_type}</span>
                </div>
                <div className="flex">
                    <span className="font-bold w-40">Tipo de compra:</span>
                    <span>{order.purchase_source}</span>
                </div>
                <div className="flex h-[100px] overflow-hidden">
                    <span className="font-bold block w-40 order-description whitespace-nowrap overflow-hidden text-ellipsis">Descripción:</span>
                    <span>{order.description}</span>
                </div>
                <div className="flex ">
                    <span className="font-bold block w-40">Fecha de entrega:</span>
                    <span>{formatDate(order.delivery_date) || 'No asignada'}</span>
                </div>
            </div>

            {/* Tabla de productos */}
            <div className="mb-4">
                <table className="w-full">
                    <thead>
                    <tr className="border-b">
                        <th className="text-left w-20">CANTIDAD</th>
                        <th className="text-left">PRODUCTO</th>
                        <th className="text-right">VALOR</th>
                    </tr>
                    </thead>
                    <tbody>
                    {order.orderProducts.map((product, index) => (
                        <tr key={index} className="border-b border-dashed">
                            <td className="py-1">{product.quantity}</td>
                            <td className="py-1">{product.name}</td>
                            <td className="py-1 text-right">${product.unit_cost.toLocaleString()}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {/* Sección de resumen financiero */}
            <div className="space-y-2 border-t-2 border-dashed pt-4">
                <div className="flex justify-between">
                    <span className="font-bold">Subtotal:</span>
                    <span>${order.subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                    <span className="font-bold">Costo de envío:</span>
                    <span>${order.shipping_cost.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-lg font-bold">
                    <span>Total:</span>
                    <span>${order.total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                    <span className="font-bold">Abono inicial:</span>
                    <span>${order.initial_payment.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                    <span className="font-bold">Estado:</span>
                    <span>{order.status}</span>
                </div>
            </div>
        </div>
    </div>
    );
};
export default OrderDetailsModal;
