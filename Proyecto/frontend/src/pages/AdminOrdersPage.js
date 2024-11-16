import React, { useEffect, useState } from 'react';

const backend = "http://localhost:8080/";

function AdminOrdersPage() {
  const [orders, setOrders] = useState([
    { 
      id: 1, 
      customerName: 'Juan Pérez', 
      phone: '912345678', 
      commune: 'Santiago', 
      date: '2024-11-01', 
      category: 'Helados',
      products: [
        { name: 'Helado de Chocolate', price: 6000 },
        { name: 'Brownie', price: 5990 },
      ], 
      deliveryCost: 2990, 
      status: 'Pendiente' 
    },
    // Agrega más órdenes según sea necesario
  ]);

  const [sortCriteria, setSortCriteria] = useState('');
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [category, setCategory] = useState('');
  const [commune, setCommune] = useState('');

  // Generar lista de años desde 2020 hasta el año actual
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 2020 + 1 }, (_, i) => 2020 + i);

  // Lista de meses
  const months = [
    { value: 1, label: 'Enero' },
    { value: 2, label: 'Febrero' },
    { value: 3, label: 'Marzo' },
    { value: 4, label: 'Abril' },
    { value: 5, label: 'Mayo' },
    { value: 6, label: 'Junio' },
    { value: 7, label: 'Julio' },
    { value: 8, label: 'Agosto' },
    { value: 9, label: 'Septiembre' },
    { value: 10, label: 'Octubre' },
    { value: 11, label: 'Noviembre' },
    { value: 12, label: 'Diciembre' }
  ];

  // Lista de categorías (ejemplo)
  const categories = ['Helados', 'Pasteles', 'Dulces'];

  // Lista de comunas (ejemplo)
  const communes = ['Santiago', 'Providencia', 'Las Condes'];

  // Función para calcular el subtotal de los productos en una orden
  const calculateSubtotal = (products) => {
    return products.reduce((acc, product) => acc + product.price, 0);
  };

  // Función para obtener órdenes del backend (simulada aquí con useEffect)
  useEffect(() => {
    fetch(backend)
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
  };

  // Función para aplicar automáticamente los filtros de comuna y categoría
  useEffect(() => {
    // Llama al backend con los filtros seleccionados
    
    fetch(`/api/orders?commune=${commune}&category=${category}&year=${year}&month=${month}`)
      .then(response => response.json())
      .then(data => setOrders(data))
      .catch(error => console.error('Error al aplicar los filtros:', error));
  }, [commune, category, year, month]); // Se ejecuta cada vez que cambie alguno de estos filtros

  return (
    <div className="p-5 flex justify-center">
      <div className="w-full max-w-6xl">
        <h1 className="text-2xl font-bold mb-4 text-center">Gestión de Órdenes</h1>

        {/* Filtros de Comuna y Categoría */}
        <div className="flex space-x-4 mb-4">
          <select 
            value={commune} 
            onChange={(e) => setCommune(e.target.value)} 
            className="p-2 border rounded"
          >
            <option value="">Filtrar por comuna</option>
            {communes.map((com) => (
              <option key={com} value={com}>{com}</option>
            ))}
          </select>

          <select 
            value={category} 
            onChange={(e) => setCategory(e.target.value)} 
            className="p-2 border rounded"
          >
            <option value="">Filtrar por categoría</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Filtros de Fecha */}
        <div className="flex space-x-4 mb-4">
          <select 
            value={sortCriteria} 
            onChange={(e) => setSortCriteria(e.target.value)} 
            className="p-2 border rounded"
          >
            <option value="">Ordenar por</option>
            <option value="date_order">Fecha de Pedido</option>
            <option value="date_delivery">Fecha de Entrega</option>
            <option value="total_value">Valor Total</option>
          </select>

          <select 
            value={year} 
            onChange={(e) => setYear(e.target.value)} 
            className="p-2 border rounded"
          >
            <option value="">Seleccionar año</option>
            {years.map((year) => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>

          <select 
            value={month} 
            onChange={(e) => setMonth(e.target.value)} 
            className="p-2 border rounded"
          >
            <option value="">Seleccionar mes</option>
            {months.map((month) => (
              <option key={month.value} value={month.value}>{month.label}</option>
            ))}
          </select>
        </div>

        {/* Tabla de órdenes */}
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-pink-pastel">
            <tr>
              <th className="py-2 px-4 border">ID</th>
              <th className="py-2 px-4 border">Cliente</th>
              <th className="py-2 px-4 border">Teléfono</th>
              <th className="py-2 px-4 border">Comuna</th>
              <th className="py-2 px-4 border">Fecha pedido</th>
              <th className="py-2 px-4 border">Productos</th>
              <th className="py-2 px-4 border">Subtotal productos</th>
              <th className="py-2 px-4 border">Valor despacho</th>
              <th className="py-2 px-4 border">Valor total</th>
              <th className="py-2 px-4 border">Estado</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => {
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
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminOrdersPage;
