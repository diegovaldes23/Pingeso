import React from 'react';

const OrdersList = ({ orders = [], handleStatusChange, getStatusClass, handleViewDetails }) => {
  return (
    <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
      <thead className="bg-purple-800">
        <tr>
          <th className="py-2 px-4 border text-white">ID</th>
          <th className="py-2 px-4 border text-white">Cliente</th>
          <th className="py-2 px-4 border text-white">Teléfono</th>
          <th className="py-2 px-4 border text-white">Comuna</th>
          <th className="py-2 px-4 border text-white">Fecha pedido</th>
          <th className="py-2 px-4 border text-white">Productos</th>
          <th className="py-2 px-4 border text-white">Subtotal productos</th>
          <th className="py-2 px-4 border text-white">Valor despacho</th>
          <th className="py-2 px-4 border text-white">Valor total</th>
          <th className="py-2 px-4 border text-white">Estado</th>
          <th className="py-2 px-4 border text-white">Acciones</th> {/* Nueva columna */}
        </tr>
      </thead>
      <tbody>
        {orders.length > 0 ? (
          orders.map((order) => {
            const subtotal = order.products.reduce((acc, product) => acc + product.price, 0);
            const total = subtotal + order.deliveryCost;

            return (
              <tr key={order.id} className="hover:bg-gray-100">
                <td className="py-2 px-4 border">{order.id}</td>
                <td className="py-2 px-4 border">{order.customerName}</td>
                <td className="py-2 px-4 border">{order.phone}</td>
                <td className="py-2 px-4 border">{order.commune}</td>
                <td className="py-2 px-4 border">{order.date}</td>
                <td className="py-2 px-4 border">
                  {order.products.map((product, index) => (
                    <div key={index}>{product.name}</div>
                  ))}
                </td>
                <td className="py-2 px-4 border font-bold">
                  {subtotal.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}
                </td>
                <td className="py-2 px-4 border">
                  {order.deliveryCost.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}
                </td>
                <td className="py-2 px-4 border font-bold">
                  {total.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}
                </td>
                <td className="py-2 px-4 border text-center">
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                    className={`p-2 rounded ${getStatusClass(order.status)}`}
                  >
                    <option value={order.status} disabled>
                      {order.status}
                    </option>
                    <option value="Pendiente">Pendiente</option>
                    <option value="En proceso">En proceso</option>
                    <option value="Completada">Completada</option>
                    <option value="Cancelada">Cancelada</option>
                  </select>
                </td>
                <td className="py-2 px-4 border text-center"> {/* Nueva celda */}
                  <button
                    onClick={() => handleViewDetails(order.id)}
                    className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  >
                    Ver detalle
                  </button>
                </td>
              </tr>
            );
          })
        ) : (
          <tr>
            <td colSpan="11" className="text-center py-4">
              No se encontraron órdenes.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default OrdersList;
