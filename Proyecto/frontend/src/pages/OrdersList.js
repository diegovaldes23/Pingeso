import React from 'react';
import { useGlobalContext } from '../utils/GlobalModelContext';

const OrdersList = ({ orders }) => {
  const { getStatusClass, handleStatusChange, setIsModalOpen, setSelectedOrder } = useGlobalContext();

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleStateChange = (orderId, newStatus) => {
    handleStatusChange(orderId, newStatus); // Llamar la función del contexto para actualizar el estado
  };

  return (
    <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
      <thead className="bg-purple-800">
        <tr>
          <th className="py-2 px-4 border text-white">ID</th>
          <th className="py-2 px-4 border text-white">Cliente</th>
          <th className="py-2 px-4 border text-white">Teléfono</th>
          <th className="py-2 px-4 border text-white">Comuna</th>
          <th className="py-2 px-4 border text-white">Dirección</th>
          <th className="py-2 px-4 border text-white">Fecha pedido</th>
          <th className="py-2 px-4 border text-white">Productos</th>
          <th className="py-2 px-4 border text-white">Subtotal productos</th>
          <th className="py-2 px-4 border text-white">Valor despacho</th>
          <th className="py-2 px-4 border text-white">Valor total</th>
          <th className="py-2 px-4 border text-white">Estado</th>
          <th className="py-2 px-4 border text-white">Fecha Entrega</th> {/* Nueva columna */}
          <th className="py-2 px-4 border text-white">Descripción</th> {/* Nueva columna */}
          <th className="py-2 px-4 border text-white">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {orders.length > 0 ? (
          orders.map((order) => (
            <tr key={order.id_order} className="hover:bg-gray-100">
              <td className="py-2 px-4 border">{order.id_order}</td>
              <td className="py-2 px-4 border">{order.name}</td>
              <td className="py-2 px-4 border">{order.phone}</td>
              <td className="py-2 px-4 border">{order.commune}</td>
              <td className="py-2 px-4 border">{order.address}</td>
              <td className="py-2 px-4 border">{order.order_date}</td>
              <td className="py-2 px-4 border">
                {order.products.map((product, index) => (
                  <div key={index}>{product.name}</div>
                ))}
              </td>
              <td className="py-2 px-4 border font-bold">
                {order.subtotal.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}
              </td>
              <td className="py-2 px-4 border">
                {order.shipping_cost.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}
              </td>
              <td className="py-2 px-4 border font-bold">
                {order.total.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}
              </td>
              <td className="py-2 px-4 border text-center">
                <select
                  value={order.status}
                  onChange={(e) => handleStateChange(order.id_order, e.target.value)} // Actualizar estado al cambiar
                  className={`p-2 rounded ${getStatusClass(order.status)}`}
                >
                  <option value="Pendiente">Pendiente</option>
                  <option value="En proceso">En proceso</option>
                  <option value="Completada">Completada</option>
                  <option value="Cancelada">Cancelada</option>
                </select>
              </td>
              {/* Nueva columna: Fecha de entrega */}
              <td className="py-2 px-4 border">
                {order.delivery_date ? order.delivery_date : 'No asignada'}
              </td>
              {/* Nueva columna: Descripción */}
              <td className="py-2 px-4 border">{order.description}</td>
              <td className="py-2 px-4 border text-center">
                <button
                  onClick={() => handleViewDetails(order)}
                  className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Ver detalle
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="12" className="text-center py-4">
              No se encontraron órdenes.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default OrdersList;
