import React, { useState, useEffect, useRef } from 'react';
import { useGlobalContext } from '../utils/GlobalModelContext';
import regionsAndCommunes from './RegionesYComunas';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

/**
 * FilterAndSort Component
 * 
 * Proporciona una interfaz de usuario para filtrar y ordenar órdenes.
 * Incluye funcionalidades de:
 * - Búsqueda global
 * - Filtrado por múltiples criterios
 * - Ordenamiento de resultados
 * 
 * @component
 * @returns {React.ReactElement} Componente de filtrado y ordenamiento
 */
const FilterAndSort = ( ) => {
    // Extracción de métodos y estado de filtros del contexto global
    const { filters, setFilters, applyFilters, resetFilters } = useGlobalContext();

    const [searchTerm, setSearchTerm] = useState('');
    const [localFilters, setLocalFilters] = useState({});

    // Referencias para manejar clicks fuera de los dropdowns
    const filterDropdownRef = useRef(null);
    const sortDropdownRef = useRef(null);

    // Estados para controlar la visibilidad de los dropdowns
    const [showFilterDropdown, setShowFilterDropdown] = useState(false);
    const [showSortDropdown, setShowSortDropdown] = useState(false);

    // Opciones de estado para los pedidos
    const statusOptions = [
        'Pendiente',
        'En proceso',
        'Completada',
        'Cancelada'
    ];

    // Obtiene las comunas disponibles basadas en la región seleccionada
    const availableCommunes = filters.region
        ? regionsAndCommunes.find(r => r.NombreRegion === filters.region)?.comunas || []
        : [];


    const handleFilterChange = (key, value) => {
        setFilters((prev) => ({ ...prev, [key]: value }));
    };
          

    /**
   * Maneja los cambios en la búsqueda global
   * Actualiza el término de búsqueda y aplica los filtros
   * 
   * @param {React.ChangeEvent<HTMLInputElement>} e - Evento de cambio del input
   */
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setFilters(prev => ({ ...prev, searchTerm: e.target.value }));
    }

    /**
   * Aplica los filtros locales al estado global
   * Ejecuta la función de filtrado
   */
    const handleApplyFilters = () => {
        setFilters(filters);
        applyFilters();
    };

    // Gestiona el cierre de dropdowns al hacer click fuera
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
    
        // Agrega el evento de click al documento
        document.addEventListener('mousedown', handleClickOutside);
    
        // Limpia el evento cuando el componente se desmonta
        return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="relative">
            <div className="flex justify-center mb-4 space-x-4">
                {/* Barra de búsqueda */}
                <input
                    type="text"
                    placeholder="Buscar órdenes..."
                    value={filters.searchTerm}
                    onChange={(e) => setFilters({...filters, searchTerm: e.target.value})}
                    className="w-1/3 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

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
                                    value={filters.region}
                                    onChange={(e) => {
                                        const selectedRegion = e.target.value;
                                        handleFilterChange('region', selectedRegion);
                                        handleFilterChange('commune', ''); // Resetea la comuna
                                    }}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                >
                                    <option value="">Todas las regiones</option>
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
                                    value={filters.commune}
                                    onChange={(e) => handleFilterChange('commune', e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    disabled={!filters.region} // Desactiva si no hay región seleccionada
                                >
                                    <option value="">Todas</option>
                                    {regionsAndCommunes
                                        .find(r => r.NombreRegion === filters.region)
                                        ?.comunas.map((commune) => (
                                            <option key={commune} value={commune}>
                                                {commune}
                                            </option>
                                        ))
                                    }
                                </select>
                            </div>


                            <div className="mb-4">
                                <label className="block text-gray-700">Año</label>
                                <select
                                    value={filters.year}
                                    onChange={(e) => handleFilterChange('year', e.target.value)}
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
                                    value={filters.month}
                                    onChange={(e) => handleFilterChange('month', e.target.value)}
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
                                    selected={filters.startDate}
                                    onChange={(date) => handleFilterChange('startDate', date)}
                                    dateFormat="dd/MM/yyyy"
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    placeholderText="Selecciona una fecha"
                                />
                            </div>

                            {/* Filtro de Fecha de Término */}
                            <div>
                                <label className="block text-gray-700">Fecha de Término</label>
                                <DatePicker
                                    selected={filters.endDate}
                                    onChange={(date) => handleFilterChange('endDate', date)}
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
                                value={filters.orderStatus}
                                onChange={(e) => handleFilterChange('orderStatus', e.target.value)}
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
                            onClick={handleApplyFilters}
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
                                    value={filters.sortBy}
                                    onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                >
                                    <option value="">Ninguno</option>
                                    <option value="orderDate">Fecha</option>
                                    <option value="deliveryDate">Fecha de entrega</option>
                                    <option value="total">Valor total</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Orden</label>
                                <select
                                    value={filters.sortOrder}
                                    onChange={(e) => handleFilterChange('sortOrder', e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                >
                                    <option value="">Ninguno</option>
                                    <option value="asc">Ascendente</option>
                                    <option value="desc">Descendente</option>
                                </select>
                            </div>
                            <button
                                onClick={handleApplyFilters}
                                className="w-full px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                            >
                                Aplicar
                            </button>
                        </div>
                    )}
                </div>

                {/* Botón Restablecer */}
                <button
                    onClick={() => {
                        resetFilters();
                        setSearchTerm('');
                      }}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                >
                    Restablecer
                </button>
            </div>
        </div>
    );
};

export default FilterAndSort;
