import React, { useEffect, useState } from 'react';

function AdminOrdersPage() {
    const [orders, setOrders] = useState([
        { id: 1, customerName: 'Juan Pérez', date: '2024-11-01', total: 11990, products: 'Helado de Chocolate, Brownie', status: 'Pendiente' },
        { id: 2, customerName: 'Ana López', date: '2024-11-02', total: 15400, products: 'Helado de Vainilla', status: 'Completada' },
        { id: 3, customerName: 'Carlos García', date: '2024-11-03', total: 8900, products: 'Gomitas, Caramelos', status: 'Cancelada' },
        { id: 4, customerName: 'María Fernández', date: '2024-11-04', total: 11200, products: 'Cupcake', status: 'En proceso' },
        { id: 5, customerName: 'Luis Ramírez', date: '2024-11-05', total: 7300, products: 'Chocolate', status: 'Pendiente' },
        // Agrega más órdenes según sea necesario
      ]);

  // Función para obtener órdenes del backend
  useEffect(() => {
    fetch('/api/orders')
      .then(response => response.json())
      .then(data => setOrders(data))
      .catch(error => console.error('Error al obtener las órdenes:', error));
  }, []);

  // Función para asignar color según el estado
  const getStatusClass = (status) => {
    switch (status) {
      case 'Pendiente':
        return 'bg-yellow-200 text-yellow-800';
      case 'Completada':
        return 'bg-green-200 text-green-800';
      case 'Cancelada':
        return 'bg-red-200 text-red-800';
      case 'En proceso':
        return 'bg-blue-200 text-blue-800';
      default:
        return '';
    }
  };

  // Función para manejar el cambio de estado
  const handleStatusChange = (id, newStatus) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === id ? { ...order, status: newStatus } : order
      )
    );
    // Aquí podrías hacer una llamada al backend para actualizar el estado en el servidor
    // fetch(`/api/orders/${id}`, { method: 'PATCH', body: JSON.stringify({ status: newStatus }) });
  };

  return (
    <div className="p-5 flex justify-center">
      <div className="w-full max-w-4xl">
        <h1 className="text-2xl font-bold mb-4 text-center">Gestión de Órdenes</h1>
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-pink-pastel">
            <tr>
              <th className="py-2 px-4 border">ID</th>
              <th className="py-2 px-4 border">Cliente</th>
              <th className="py-2 px-4 border">Fecha</th>
              <th className="py-2 px-4 border">Productos</th>
              <th className="py-2 px-4 border">Total</th>
              <th className="py-2 px-4 border">Estado</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-100">
                <td className="py-2 px-4 border">{order.id}</td>
                <td className="py-2 px-4 border">{order.customerName}</td>
                <td className="py-2 px-4 border">{order.date}</td>
                <td className="py-2 px-4 border">{order.products}</td>
                <td className="py-2 px-4 border">
                  {order.total.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}
                </td>
                <td className="py-2 px-4 border text-center">
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                    className={`p-2 rounded ${getStatusClass(order.status)}`}
                  >
                    <option value="Pendiente" className="bg-yellow-200 text-yellow-800">
                      Pendiente
                    </option>
                    <option value="Completada" className="bg-green-200 text-green-800">
                      Completada
                    </option>
                    <option value="Cancelada" className="bg-red-200 text-red-800">
                      Cancelada
                    </option>
                    <option value="En proceso" className="bg-blue-200 text-blue-800">
                      En proceso
                    </option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminOrdersPage;
