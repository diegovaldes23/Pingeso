import React, { createContext, useContext, useState, useEffect } from 'react';

// Crear el contexto
const GlobalContext = createContext();

// Proveedor del contexto
export const GlobalProvider = ({ children }) => {
  // Estados y funciones globales
  const [orders, setOrders] = useState([]);

  const backend = 'http://localhost:8080';

  const formatToDDMMYYYY = (dateStr) => {
    if (!dateStr) return ""; // Manejo de casos nulos
    try {
        const [year, month, day] = dateStr.split("-");
        return `${day}-${month}-${year}`;
    } catch (error) {
        console.error("Error al formatear la fecha:", dateStr);
        return dateStr; // Devuelve la fecha original si hay un error
    }
};


  // Función para cargar las órdenes desde el backend
  const fetchOrders = async () => {
    try {
        const token = localStorage.getItem("authToken"); // Obtener el token de localStorage
        if (!token) throw new Error("No autenticado");
        const headers = { Authorization: `Bearer ${token}` }; 

        
        const response = await fetch(backend + '/admin/orders', { headers });

        if (!response.ok) {
          throw new Error("Error en la solicitud: " + response.statusText);
        }

        const data = await response.json();

        // Ordenar las órdenes por fecha de pedido (descendente)
    const sortedData = data.sort((a, b) => {
        const dateA = new Date(a.order_date);
        const dateB = new Date(b.order_date);
        return dateB - dateA; // Orden descendente
      });

        const formattedOrders = sortedData.map((order) => ({
            ...order,
            order_date: order.order_date ? new Date(order.order_date) : null,
            delivery_date: order.delivery_date ? new Date(order.delivery_date) : null,
    }));
        setOrders(formattedOrders);
        setFilteredOrders(sortedData);
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
    searchTerm: '',
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
        searchTerm
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

    // Filtrado por término de búsqueda
    if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();

        // Detecta si el término de búsqueda parece ser una fecha (dd-MM o dd-MM-yyyy)
        const dateRegex = /^\d{1,2}-\d{1,2}(-\d{4})?$/;

        if (dateRegex.test(searchLower)) {
        // Normaliza el término de búsqueda a formato yyyy-MM-dd
        const [day, month, year] = searchLower.split('-');
        const actualYear = new Date().getFullYear();
        const searchDate = new Date(
            year ? `${year}-${month}-${day}` : `${actualYear}-${month}-${day}` // Agrega un año predeterminado si no está presente
        );

        filtered = filtered.filter(order => {
            const orderDate = new Date(order.order_date); // Convierte la fecha de la orden
            return (
            orderDate.getDate() === searchDate.getDate() &&
            orderDate.getMonth() === searchDate.getMonth() &&
            (year ? orderDate.getFullYear() === searchDate.getFullYear() : true)
            );
        });
        } else {
        // Si no es una fecha, busca en otros campos
        filtered = filtered.filter(order => 
            order.id.toString().includes(searchLower) || // Busca por ID
            order.name?.toLowerCase().includes(searchLower) || // Busca por cliente
            order.address.toLowerCase().includes(searchLower) ||
            order.orderProducts?.some(product => 
            product.name.toLowerCase().includes(searchLower) // Busca en productos
            )
        );
        }
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
        searchTerm: '', // Limpia el término de búsqueda
      });
    fetchOrders();
    setFilteredOrders([...orders]); // Restablece a la vista original
    applyFilters();
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
        resetFilters,
        backend
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
