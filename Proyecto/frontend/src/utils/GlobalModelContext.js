import React, { createContext, useContext, useState, useEffect } from 'react';

// Crear el contexto
const GlobalContext = createContext();

// Proveedor del contexto
export const GlobalProvider = ({ children }) => {
  // Estados y funciones globales
  const [orders, setOrders] = useState([]);
  const [region, setRegion] = useState('');
    const [commune, setCommune] = useState('');
    const [year, setYear] = useState('');
    const [month, setMonth] = useState('');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [orderStatus, setOrderStatus] = useState('');
    const [sortBy, setSortBy] = useState('');
    const [sortOrder, setSortOrder] = useState('');


  const URL = 'http://localhost:8080'

  // Función para cargar las órdenes desde el backend
  const fetchOrders = async () => {
    try {
        const response = await fetch(URL + '/admin/orders');
        const data = await response.json();
        setOrders(data);
        setFilteredOrders(data);
    } catch (error) {
        console.error('Error al obtener las órdenes: ', error);
    }
  };

  const updateOrderDeliveryDate = (updatedOrder) => {
    setOrders((prevOrders) =>
      prevOrders.map(order =>
        order.id === updatedOrder.id ? { ...order, delivery_date: updatedOrder.delivery_date } : order
      )
    );
  };


  useEffect(() => {
    fetchOrders();
  }, []);

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

  const handleStatusChange = (id, newStatus) => {
    setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === id ? { ...order, status: newStatus } : order
        )
      );
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

    // Aplica filtros
    const {
        region,
        commune,
        startDate,
        endDate,
        customerType,
        purchaseSource,
        status,
        productName,
        year,
        month,
        sortBy,
        sortOrder,
      } = filters;

    // Filtros
    if (region) filtered = filtered.filter(order => order.region === region);
    if (commune) filtered = filtered.filter(order => order.commune === commune);
    if (startDate) filtered = filtered.filter(order => new Date(order.order_date) >= new Date(startDate));
    if (endDate) filtered = filtered.filter(order => new Date(order.order_date) <= new Date(endDate));
    if (customerType) filtered = filtered.filter(order => order.customer_type === customerType);
    if (purchaseSource) filtered = filtered.filter(order => order.purchase_source === purchaseSource);
    if (status) filtered = filtered.filter(order => order.status === status);
    if (productName) {
      filtered = filtered.filter(order =>
        order.products.some(product => product.name.toLowerCase().includes(productName.toLowerCase()))
      );
    }
    if (year) filtered = filtered.filter(order => new Date(order.order_date).getFullYear() === parseInt(year, 10));
    if (month) filtered = filtered.filter(order => new Date(order.order_date).getMonth() + 1 === parseInt(month, 10));

    // Ordenamiento
    if (sortBy) {
      filtered.sort((a, b) => {
        if (sortBy === 'orderDate') {
          return sortOrder === 'asc'
            ? new Date(a.order_date) - new Date(b.order_date)
            : new Date(b.order_date) - new Date(a.order_date);
        }

        if (sortBy === 'deliveryDate') {
            return sortOrder === 'asc'
             ? new Date(a.deliveryDate) - new Date(b.deliveryDate)
             : new Date(b.deliveryDate) - new Date(a.deliveryDate);
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
        updateOrderDeliveryDate,
        resetFilters
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
