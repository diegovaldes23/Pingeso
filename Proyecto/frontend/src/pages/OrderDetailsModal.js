import React from 'react';

const OrderDetailsModal = ({ isOpen, onClose, order }) => {
  if (!isOpen || !order) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white w-full max-w-2xl p-8 relative">
        {/* Botón de cierre */}
        <button onClick={onClose} className="absolute top-2 right-2 text-red-600">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 16 16">
            <path fill="currentColor" d="M15.854 12.854L11 8l4.854-4.854a.503.503 0 0 0 0-.707L13.561.146a.5.5 0 0 0-.707 0L8 5L3.146.146a.5.5 0 0 0-.707 0L.146 2.439a.5.5 0 0 0 0 .707L5 8L.146 12.854a.5.5 0 0 0 0 .707l2.293 2.293a.5.5 0 0 0 .707 0L8 11l4.854 4.854a.5.5 0 0 0 .707 0l2.293-2.293a.5.5 0 0 0 0-.707"/>
          </svg>
        </button>

        <div className="border-b-2 border-dashed pb-4 mb-4">
          <h2 className="text-center font-bold mb-2">RESUMEN BOLETA</h2>
          <p className="text-center text-sm">RUT: 13.111.111-1</p>
          <p className="text-center text-sm">N° {order.id}</p>
          <p className="text-center text-sm">CONFITES CÓRDOVA</p>
          <p className="text-center text-sm">FECHA EMISIÓN: {order.order_date}</p>
        </div>

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
          <div className="flex">
            <span className="font-bold block w-40">Descripción:</span>
            <span>{order.description}</span>
          </div>
          <div className="flex ">
            <span className="font-bold block w-40">Fecha de entrega:</span>
            <span>{order.delivery_date || 'No asignada'}</span>
          </div>
        </div>

        <div className="mb-4">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left w-20">CANTIDAD</th>
                <th className="text-left">DESCRIPCION</th>
                <th className="text-right">VALOR</th>
              </tr>
            </thead>
            <tbody>
              {order.products.map((product, index) => (
                <tr key={index} className="border-b border-dashed">
                  <td className="py-1">{product.quantity}</td>
                  <td className="py-1">{product.name}</td>
                  <td className="py-1 text-right">${product.price.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

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
