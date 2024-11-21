import React, { createContext, useContext, useState, useEffect } from 'react';

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
      region: 'Región Metropolitana de Santiago',
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
        region: 'Región Metropolitana de Santiago',
        commune: 'Las Condes',
        date: '2024-11-01',
        customerType: 'Nuevo',
        purchaseSource: 'WhatsApp',
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
        region: 'Región Metropolitana de Santiago',
        commune: 'Providencia',
        date: '2024-11-02',
        customerType: 'Antiguo',
        purchaseSource: 'Tiendanube',
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
        region: 'Región Metropolitana de Santiago',
        commune: 'Ñuñoa',
        date: '2024-11-03',
        customerType: 'Nuevo',
        purchaseSource: 'Tiendanube',
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
        region: 'Región Metropolitana de Santiago',
        commune: 'San Joaquín',
        date: '2024-11-04',
        customerType: 'Antiguo',
        purchaseSource: 'Tiendanube',
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
        region: 'Región del Biobío',
        commune: 'Coronel',
        date: '2024-11-05',
        customerType: 'Nuevo',
        purchaseSource: 'Tiendanube',
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
  const [statistics, setStatistics] = useState({
    totalOrders: 0,
    statusCounts: {},
    totalRevenue: 0,
  });

  const [filterStatus, setFilterStatus] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false); // Global
  const [selectedOrder, setSelectedOrder] = useState(null); // Global

  // Estados para dropdowns
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  // Estados para los filtros
  const [region, setRegion] = useState('');
  const [commune, setCommune] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [customerType, setCustomerType] = useState('');
  const [purchaseSource, setPurchaseSource] = useState('');
  const [status, setStatus] = useState('');
  const [productName, setProductName] = useState('');
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');

  // Estado para el ordenamiento
  const [sortBy, setSortBy] = useState(''); // "date" o "total"
  const [sortOrder, setSortOrder] = useState(''); // "asc" o "desc"

  const handleStatusChange = (id, newStatus) => {
    const updatedOrders = orders.map((order) =>
      order.id === id ? { ...order, status: newStatus } : order
    );
    setOrders(updatedOrders);
  };

  const [filteredOrders, setFilteredOrders] = useState([]);
  const [filters, setFilters] = useState({
    region: '',
    commune: '',
    startDate: '',
    endDate: '',
    customerType: '',
    purchaseSource: '',
    status: '',
    productName: '',
    year: '',
    month: '',
    sortBy: '',
    sortOrder: '',
  });

  const applyFilters = () => {
    let filtered = [...orders];

    // Filtros
    if (region) filtered = filtered.filter(order => order.region === region);
    if (commune) filtered = filtered.filter(order => order.commune === commune);
    if (startDate) filtered = filtered.filter(order => new Date(order.date) >= new Date(startDate));
    if (endDate) filtered = filtered.filter(order => new Date(order.date) <= new Date(endDate));
    if (customerType) filtered = filtered.filter(order => order.customerType === customerType);
    if (purchaseSource) filtered = filtered.filter(order => order.purchaseSource === purchaseSource);
    if (status) filtered = filtered.filter(order => order.status === status);
    if (productName) {
      filtered = filtered.filter(order =>
        order.products.some(product => product.name.toLowerCase().includes(productName.toLowerCase()))
      );
    }
    if (year) filtered = filtered.filter(order => new Date(order.date).getFullYear() === parseInt(year, 10));
    if (month) filtered = filtered.filter(order => new Date(order.date).getMonth() + 1 === parseInt(month, 10));

    // Ordenamiento
    if (sortBy) {
      filtered.sort((a, b) => {
        if (sortBy === 'date') {
          return sortOrder === 'asc'
            ? new Date(a.date) - new Date(b.date)
            : new Date(b.date) - new Date(a.date);
        }
        if (sortBy === 'total') {
          return sortOrder === 'asc' ? a.total - b.total : b.total - a.total;
        }
        return 0;
      });
    }

    setFilteredOrders(filtered);

    setShowFilterDropdown(false);
    setShowSortDropdown(false);
  };

  // Función para restablecer filtros
  const resetFilters = () => {
    setFilters({
      region: '',
      commune: '',
      startDate: '',
      endDate: '',
      customerType: '',
      purchaseSource: '',
      status: '',
      productName: '',
      year: '',
      month: '',
      sortBy: '',
      sortOrder: '',
    });
    setFilteredOrders(orders); // Restablece a la vista original
  };

  // Aplicar filtros y ordenamiento cada vez que cambien los filtros o las órdenes
  useEffect(() => {
    applyFilters();
  }, [filters, orders]);

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
        filteredOrders, 
        setFilteredOrders,
        filters,
        setFilters,
        showFilterDropdown,
        setShowFilterDropdown,
        showSortDropdown,
        setShowSortDropdown,
        applyFilters,
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