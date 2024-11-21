import React, { createContext, useContext, useState } from 'react';

// Crear el contexto
const GlobalContext = createContext();

// Proveedor del contexto
export const GlobalProvider = ({ children }) => {
  // Estados y funciones globales
  const [orders, setOrders] = useState([
    {
      id: 1,
      customerName: 'Juan Pérez',
      phone: '912345678',
      commune: 'Santiago',
      date: '2024-11-01',
      customerType: 'Antiguo',
      purchaseSource: 'Facebook ads',
      products: [
        { name: 'Helado de Chocolate', price: 6000, quantity: 2 },
        { name: 'Brownie', price: 5990, quantity: 1 },
      ],
      deliveryCost: 2990,
      subtotal: 17980,
      total: 20970,
      initialPayment: 5000,
      status: 'Pendiente',
    },
    {
        id: 2,
        customerName: 'Marcela Parra',
        phone: '956576234',
        commune: 'Las Condes',
        date: '2024-11-01',
        customerType: 'Nuevo',
        purchaseSource: 'Orgánico',
        products: [
          { name: 'Tarta de frambuesa', price: 1000, quantity: 5 },
          { name: 'Cupcake', price: 2000, quantity: 2 },
        ],
        deliveryCost: 2990,
        subtotal: 9000,
        total: 11990,
        initialPayment: 6000,
        status: 'Completada',
      },
      {
        id: 3,
        customerName: 'Carlos López',
        phone: '923456789',
        commune: 'Providencia',
        date: '2024-11-02',
        customerType: 'Antiguo',
        purchaseSource: 'Instagram',
        products: [
          { name: 'Cheesecake', price: 8500, quantity: 1 },
          { name: 'Brownie de chocolate', price: 5000, quantity: 3 },
        ],
        deliveryCost: 2490,
        subtotal: 18500,
        total: 20990,
        initialPayment: 10000,
        status: 'En proceso',
      },
      {
        id: 4,
        customerName: 'Lucía Fernández',
        phone: '987654321',
        commune: 'Ñuñoa',
        date: '2024-11-03',
        customerType: 'Nuevo',
        purchaseSource: 'Recomendación',
        products: [
          { name: 'Macarons', price: 1500, quantity: 10 },
          { name: 'Tarta de limón', price: 12000, quantity: 1 },
        ],
        deliveryCost: 3990,
        subtotal: 27000,
        total: 30990,
        initialPayment: 15000,
        status: 'Pendiente',
      },
      {
        id: 5,
        customerName: 'Diego Castillo',
        phone: '923987654',
        commune: 'San Joaquín',
        date: '2024-11-04',
        customerType: 'Antiguo',
        purchaseSource: 'Google Ads',
        products: [
          { name: 'Brownie', price: 5000, quantity: 2 },
          { name: 'Trufas de chocolate', price: 3000, quantity: 5 },
        ],
        deliveryCost: 2490,
        subtotal: 25000,
        total: 27490,
        initialPayment: 20000,
        status: 'Cancelada',
      },
      {
        id: 6,
        customerName: 'Ana Soto',
        phone: '912345111',
        commune: 'La Florida',
        date: '2024-11-05',
        customerType: 'Nuevo',
        purchaseSource: 'Facebook Ads',
        products: [
          { name: 'Tarta de manzana', price: 7000, quantity: 1 },
          { name: 'Galletas de avena', price: 3000, quantity: 6 },
        ],
        deliveryCost: 2990,
        subtotal: 25000,
        total: 27990,
        initialPayment: 15000,
        status: 'Pendiente',
      },
      /**{
        id: 7,
        customerName: 'Rodrigo Vargas',
        phone: '956123678',
        commune: 'Macul',
        date: '2024-11-06',
        customerType: 'Antiguo',
        purchaseSource: 'Recomendación',
        products: [
          { name: 'Tarta de frutos secos', price: 12000, quantity: 1 },
          { name: 'Brownie de nueces', price: 6000, quantity: 2 },
        ],
        deliveryCost: 1990,
        subtotal: 24000,
        total: 25990,
        initialPayment: 20000,
        status: 'En proceso',
      },
      {
        id: 8,
        customerName: 'Isabel Romero',
        phone: '943256789',
        commune: 'La Reina',
        date: '2024-11-07',
        customerType: 'Nuevo',
        purchaseSource: 'Instagram',
        products: [
          { name: 'Cupcake de vainilla', price: 2000, quantity: 8 },
          { name: 'Galletas de chocolate', price: 3500, quantity: 5 },
        ],
        deliveryCost: 3990,
        subtotal: 41500,
        total: 45490,
        initialPayment: 30000,
        status: 'Pendiente',
      },
      {
        id: 9,
        customerName: 'Fernando Alarcón',
        phone: '934567890',
        commune: 'Las Condes',
        date: '2024-11-08',
        customerType: 'Antiguo',
        purchaseSource: 'Google Ads',
        products: [
          { name: 'Cheesecake de mango', price: 9500, quantity: 1 },
          { name: 'Brownie vegano', price: 5000, quantity: 2 },
        ],
        deliveryCost: 3490,
        subtotal: 19500,
        total: 22990,
        initialPayment: 10000,
        status: 'Completada',
      },
      {
        id: 10,
        customerName: 'Andrea Muñoz',
        phone: '926789345',
        commune: 'Peñalolén',
        date: '2024-11-09',
        customerType: 'Nuevo',
        purchaseSource: 'Orgánico',
        products: [
          { name: 'Helado de frambuesa', price: 4500, quantity: 3 },
          { name: 'Torta de chocolate', price: 15000, quantity: 1 },
        ],
        deliveryCost: 2990,
        subtotal: 28500,
        total: 31490,
        initialPayment: 20000,
        status: 'En proceso',
      },*/

  ]);
  const [filterStatus, setFilterStatus] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false); // Global
  const [selectedOrder, setSelectedOrder] = useState(null); // Global

  const handleStatusChange = (id, newStatus) => {
    const updatedOrders = orders.map((order) =>
      order.id === id ? { ...order, status: newStatus } : order
    );
    setOrders(updatedOrders);
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'Pendiente':
        return 'bg-yellow-200 text-yellow-800';
      case 'En proceso':
        return 'bg-green-200 text-green-800';
      case 'Completada':
        return 'bg-blue-200 text-blue-800';
      case 'Cancelada':
        return 'bg-red-200 text-red-800';
      default:
        return '';
    }
  };

  return (
    <GlobalContext.Provider
    value={{
        orders,
        setOrders,
        filterStatus,
        setFilterStatus,
        isModalOpen,
        setIsModalOpen, // Exportamos las nuevas variables globales
        selectedOrder,
        setSelectedOrder, // Exportamos las nuevas variables globales
        handleStatusChange,
        getStatusClass,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

// Hook para usar el contexto en cualquier componente
export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
