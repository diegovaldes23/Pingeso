import React from 'react';

const OrderDetailsModal = ({ isOpen, onClose, order }) => {
  if (!isOpen || !order) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white w-full max-w-2xl rounded-lg shadow-lg p-6 relative">
        {/* Botón para cerrar el modal */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 16 16">
            <path fill="#e01b24" d="M15.854 12.854L11 8l4.854-4.854a.503.503 0 0 0 0-.707L13.561.146a.5.5 0 0 0-.707 0L8 5L3.146.146a.5.5 0 0 0-.707 0L.146 2.439a.5.5 0 0 0 0 .707L5 8L.146 12.854a.5.5 0 0 0 0 .707l2.293 2.293a.5.5 0 0 0 .707 0L8 11l4.854 4.854a.5.5 0 0 0 .707 0l2.293-2.293a.5.5 0 0 0 0-.707"/>
          </svg>
        </button>
        
        <h2 className="text-2xl font-bold mb-4">Detalles del pedido</h2>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <strong>Nombre del cliente:</strong>
            <p>{order.name}</p>
          </div>
          <div>
            <strong>Teléfono:</strong>
            <p>{order.phone}</p>
          </div>
          <div>
            <strong>Comuna:</strong>
            <p>{order.commune}</p>
          </div>
          <div>
            <strong>Dirección:</strong>
            <p>{order.address}</p>
          </div>
          <div>
            <strong>Fecha de pedido:</strong>
            <p>{order.order_date}</p>
          </div>
          <div>
            <strong>Tipo de cliente:</strong>
            <p>{order.customer_type}</p>
          </div>
          <div>
            <strong>Cómo fue la compra:</strong>
            <p>{order.purchase_source}</p>
          </div>
        </div>

        {/* Tabla de productos */}
        <div>
          <strong>Lista de productos</strong>
          <table className="min-w-full table-auto border-collapse mt-4">
            <thead>
              <tr className="border-b">
                <th className="px-4 py-2 text-left">Producto</th>
                <th className="px-4 py-2 text-left">Cantidad</th>
                <th className="px-4 py-2 text-left">Precio</th>
                <th className="px-4 py-2 text-left">Total</th>
              </tr>
            </thead>
            <tbody>
              {order.products.map((product, index) => (
                <tr key={index} className="border-b">
                  <td className="px-4 py-2">{product.name}</td>
                  <td className="px-4 py-2">{product.quantity}</td>
                  <td className="px-4 py-2">${product.price.toLocaleString()}</td>
                  <td className="px-4 py-2">${(product.quantity * product.price).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Resumen de precios */}
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <strong>Subtotal:</strong>
            <p>${order.subtotal.toLocaleString()}</p>
          </div>
          <div>
            <strong>Costo de envío:</strong>
            <p>${order.shipping_cost.toLocaleString()}</p>
          </div>
          <div>
            <strong>Total:</strong>
            <p>${order.total.toLocaleString()}</p>
          </div>
          <div>
            <strong>Abono inicial:</strong>
            <p>${order.initial_payment.toLocaleString()}</p>
          </div>
          <div>
            <strong>Estado:</strong>
            <p>{order.status}</p>
          </div>
          {/* Nuevas filas para fecha de entrega y descripción */}
          <div>
            <strong>Fecha de entrega:</strong>
            <p>{order.delivery_date ? order.delivery_date : 'No asignada'}</p>
          </div>
          <div>
            <strong>Descripción:</strong>
            <p>{order.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsModal;
