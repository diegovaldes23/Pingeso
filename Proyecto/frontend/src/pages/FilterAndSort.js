import React, { useState } from 'react';
import { useGlobalContext } from '../utils/GlobalModelContext';
import regionsAndCommunes from './RegionesYComunas';

const FilterAndSort = ({ setFilteredOrders }) => {
  const { orders, filters, setFilters, applyFiltersAndSorting } = useGlobalContext();

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

  // Función para filtrar los pedidos
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


  // Manejo de comunas dinámicas según región seleccionada
  const availableCommunes = region
    ? regionsAndCommunes.find(r => r.NombreRegion === region)?.comunas || []
    : [];

    return (
        <div className="relative">
          <div className="flex justify-end mb-4 space-x-4">
            {/* Botón Filtro */}
            <div className="relative">
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
                  <div className="mb-4">
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
                  <div className="mb-4">
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
                  {/* Agrega más filtros aquí */}
                  <button
                    onClick={applyFilters}
                    className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  >
                    Aplicar
                  </button>
                </div>
              )}
            </div>
    
            {/* Botón Ordenar */}
            <div className="relative">
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
