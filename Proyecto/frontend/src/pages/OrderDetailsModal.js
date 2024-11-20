import React from 'react';

const OrderDetailsModal = ({ isOpen, onClose, order }) => {
  if (!isOpen || !order) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white w-full max-w-2xl rounded-lg shadow-lg p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
        >
          ×
        </button>
        <h2 className="text-2xl font-bold mb-4">Detalles del Pedido</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <strong>Nombre del cliente:</strong>
            <p>{order.customerName}</p>
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
            <strong>Fecha de pedido:</strong>
            <p>{order.date}</p>
          </div>
          <div>
            <strong>Tipo de cliente:</strong>
            <p>{order.customerType}</p>
          </div>
          <div>
            <strong>Cómo fue la compra:</strong>
            <p>{order.purchaseSource}</p>
          </div>
          <div>
            <strong>Productos:</strong>
            <ul>
              {order.products.map((product, index) => (
                <li key={index}>
                  {product.name} - Cantidad: {product.quantity} - Precio: $
                  {product.price.toLocaleString()}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <strong>Subtotal:</strong>
            <p>${order.subtotal.toLocaleString()}</p>
          </div>
          <div>
            <strong>Costo de envío:</strong>
            <p>${order.deliveryCost.toLocaleString()}</p>
          </div>
          <div>
            <strong>Total:</strong>
            <p>${order.total.toLocaleString()}</p>
          </div>
          <div>
            <strong>Abono inicial:</strong>
            <p>${order.initialPayment.toLocaleString()}</p>
          </div>
          <div>
            <strong>Estado:</strong>
            <p>{order.status}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsModal;
