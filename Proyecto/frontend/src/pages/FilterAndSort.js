import React, { useState, useEffect, useRef } from 'react';
import { useGlobalContext } from '../utils/GlobalModelContext';
import regionsAndCommunes from './RegionesYComunas';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const FilterAndSort = ({ setFilteredOrders }) => {
  const { orders, filters, setFilters, applyFiltersAndSorting } = useGlobalContext();

  // Refs para los dropdowns, para poder detectar clics fuera de ellos
  const filterDropdownRef = useRef(null);
  const sortDropdownRef = useRef(null);

  // Estados para mostrar los dropdowns
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
  const [orderStatus, setOrderStatus] = useState('');

  const statusOptions = [
    'Pendiente',
    'En proceso',
    'Completada',
    'Cancelada'
  ];

  // Función para filtrar los pedidos
  const applyFilters = () => {
    let filtered = [...orders];

    // Filtros
    if (region) filtered = filtered.filter(order => order.region === region);
    if (commune) filtered = filtered.filter(order => order.commune === commune);
    if (startDate) filtered = filtered.filter(order => new Date(order.order_date) >= new Date(startDate));
    if (endDate) filtered = filtered.filter(order => new Date(order.order_date) <= new Date(endDate));
    if (customerType) filtered = filtered.filter(order => order.customerType === customerType);
    if (purchaseSource) filtered = filtered.filter(order => order.purchaseSource === purchaseSource);
    if (orderStatus) filtered = filtered.filter(order => order.status === orderStatus);
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
        if (sortBy === 'date') {
          return sortOrder === 'asc'
            ? new Date(a.order_date) - new Date(b.order_date)
            : new Date(b.order_date) - new Date(a.order_date);
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

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  // Cerrar dropdowns si se hace clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        filterDropdownRef.current && !filterDropdownRef.current.contains(event.target) &&
        sortDropdownRef.current && !sortDropdownRef.current.contains(event.target)
      ) {
        setShowFilterDropdown(false);
        setShowSortDropdown(false);
      }
    };
  
    // Agregar el evento de clic al documento
    document.addEventListener('mousedown', handleClickOutside);
  
    // Limpiar el evento cuando el componente se desmonte
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  // Manejo de comunas dinámicas según región seleccionada
  const availableCommunes = region
    ? regionsAndCommunes.find(r => r.NombreRegion === region)?.comunas || []
    : [];

    return (
        <div className="relative">
          <div className="flex justify-end mb-4 space-x-4">
            {/* Botón Filtro */}
            <div className="relative" ref={filterDropdownRef}>
              <button
                onClick={() => {
                  setShowFilterDropdown(!showFilterDropdown);
                  setShowSortDropdown(false); // Cierra el otro dropdown
                }}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Filtro
              </button>
              {showFilterDropdown && (
                <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-300 rounded-md shadow-lg p-4 z-10">
                  <h3 className="font-bold text-gray-700 mb-2">Filtros</h3>
                  <div className="grid grid-cols-2 gap-4"> {/* Usamos grid para organizar los filtros */}
                    {/* Filtro de Región */}
                    <div>
                        <label className="block text-gray-700">Región</label>
                        <select
                        value={region}
                        onChange={(e) => {
                            setRegion(e.target.value);
                            setCommune(''); // Reinicia la comuna cuando cambia la región
                        }}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        >
                        <option value="">Todas</option>
                        {regionsAndCommunes.map((r) => (
                            <option key={r.NombreRegion} value={r.NombreRegion}>
                            {r.NombreRegion}
                            </option>
                        ))}
                        </select>
                    </div>

                    {/* Filtro de Comuna */}
                    <div>
                        <label className="block text-gray-700">Comuna</label>
                        <select
                        value={commune}
                        onChange={(e) => setCommune(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        >
                        <option value="">Todas</option>
                        {availableCommunes.map((c) => (
                            <option key={c} value={c}>
                            {c}
                            </option>
                        ))}
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Año</label>
                        <select
                            value={year}
                            onChange={(e) => setYear(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md"
                        >
                            <option value="">Todos</option>
                            {/* Aquí puedes agregar las opciones de años dinámicamente, o escribirlos manualmente */}
                            <option value="2023">2023</option>
                            <option value="2024">2024</option>
                            <option value="2025">2025</option>
                        </select>
                        </div>
                        <div className="mb-4">
                        <label className="block text-gray-700">Mes</label>
                        <select
                            value={month}
                            onChange={(e) => setMonth(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md"
                        >
                            <option value="">Todos</option>
                            <option value="1">Enero</option>
                            <option value="2">Febrero</option>
                            <option value="3">Marzo</option>
                            <option value="4">Abril</option>
                            <option value="5">Mayo</option>
                            <option value="6">Junio</option>
                            <option value="7">Julio</option>
                            <option value="8">Agosto</option>
                            <option value="9">Septiembre</option>
                            <option value="10">Octubre</option>
                            <option value="11">Noviembre</option>
                            <option value="12">Diciembre</option>
                        </select>
                        </div>

                    {/* Filtro de Fecha de Inicio */}
                    <div>
                        <label className="block text-gray-700">Fecha de Inicio</label>
                        <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        dateFormat="dd/MM/yyyy"
                        className="w-full p-2 border border-gray-300 rounded-md"
                        placeholderText="Selecciona una fecha"
                        />
                    </div>

                    {/* Filtro de Fecha de Término */}
                    <div>
                        <label className="block text-gray-700">Fecha de Término</label>
                        <DatePicker
                        selected={endDate}
                        onChange={(date) => setEndDate(date)}
                        dateFormat="dd/MM/yyyy"
                        className="w-full p-2 border border-gray-300 rounded-md"
                        placeholderText="Selecciona una fecha"
                        />
                    </div>

                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1 mt-4">
                        Estado del pedido
                    </label>
                    <select
                        value={orderStatus}
                        onChange={(e) => setOrderStatus(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-2.5 h-9 p-2"
                    >
                        <option value="">Todos los estados</option>
                        {statusOptions.map((status) => (
                        <option key={status} value={status}>
                            {status}
                        </option>
                        ))}
                    </select>
                    </div>

                  <button
                    onClick={applyFilters}
                    className="w-full px-4 py-2 mt-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  >
                    Aplicar
                  </button>
                </div>
              )}
            </div>
    
            {/* Botón Ordenar */}
            <div className="relative" ref={sortDropdownRef}>
              <button
                onClick={() => {
                  setShowSortDropdown(!showSortDropdown);
                  setShowFilterDropdown(false); // Cierra el otro dropdown
                }}
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
              >
                Ordenar por
              </button>
              {showSortDropdown && (
                <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-300 rounded-md shadow-lg p-4 z-10">
                  <h3 className="font-bold text-gray-700 mb-2">Ordenar por</h3>
                  <div className="mb-4">
                    <label className="block text-gray-700">Criterio</label>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    >
                      <option value="">Ninguno</option>
                      <option value="date">Fecha</option>
                      <option value="total">Valor Total</option>
                    </select>
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700">Orden</label>
                    <select
                      value={sortOrder}
                      onChange={(e) => setSortOrder(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    >
                      <option value="">Ninguno</option>
                      <option value="asc">Ascendente</option>
                      <option value="desc">Descendente</option>
                    </select>
                  </div>
                  <button
                    onClick={applyFilters}
                    className="w-full px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                  >
                    Aplicar
                  </button>
                </div>
              )}
            </div>

    
            {/* Botón Restablecer */}
            <button
              onClick={resetFilters}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
            >
              Restablecer
            </button>
          </div>
        </div>
      );
};

export default FilterAndSort;
