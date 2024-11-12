import React, { useEffect, useState } from 'react';

function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);

  // Función para obtener órdenes del backend
  useEffect(() => {
    fetch('/api/orders')
      .then(response => response.json())
      .then(data => setOrders(data))
      .catch(error => console.error('Error al obtener las órdenes:', error));
  }, []);

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">Gestión de Órdenes</h1>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border">ID</th>
            <th className="py-2 px-4 border">Cliente</th>
            <th className="py-2 px-4 border">Fecha</th>
            <th className="py-2 px-4 border">Estado</th>
            <th className="py-2 px-4 border">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td className="py-2 px-4 border">{order.id}</td>
              <td className="py-2 px-4 border">{order.customerName}</td>
              <td className="py-2 px-4 border">{order.date}</td>
              <td className="py-2 px-4 border">{order.status}</td>
              <td className="py-2 px-4 border">
                <button className="bg-blue-500 text-white px-3 py-1 rounded mr-2">Editar</button>
                <button className="bg-red-500 text-white px-3 py-1 rounded">Cancelar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminOrdersPage;
