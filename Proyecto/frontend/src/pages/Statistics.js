import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';

ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const Statistics = () => {
  const [selectedView, setSelectedView] = useState('commune');
  const [sortOrder, setSortOrder] = useState('desc');
  const [stats, setStats] = useState({
    totalRevenue: 280370,
    totalOrders: 11,
    popularCommune: 'Coronel',
    lastMonthRevenue: 0,
    salesByCommune: {
      'Santiago': 15,
      'Las Condes': 10,
      'Providencia': 8,
      'Ñuñoa': 12,
      'San Joaquín': 20,
      'Coronel': 35
    },
    salesByChannel: {
      'Facebook Ads': 85,
      'Whatsapp': 5,
      'Tiendanube': 8,
      'undefined': 2
    },
    productRevenue: {
      'Helado de Chocolate': 15000,
      'Brownie': 18000,
      'Tarta de frambuesa': 8000,
      'Cupcake': 6000,
      'Cheesecake': 12000,
      'Brownie de chocolate': 16000,
      'Macarons': 14000,
      'Tarta de lima': 10000,
      'Trufa de chocolate': 12000,
      'Tarta de manzana': 35000,
      'Galletas de avena': 105000
    }
  });

  const getChartData = () => {
    switch(selectedView) {
      case 'commune':
        return {
          labels: Object.keys(stats.salesByCommune),
          datasets: [{
            data: Object.values(stats.salesByCommune),
            backgroundColor: [
              '#FF6B6B', '#4ECDC4', '#FFD93D', '#6C5CE7', '#A8E6CF', '#FF8B94'
            ]
          }]
        };
      case 'channel':
        return {
          labels: Object.keys(stats.salesByChannel),
          datasets: [{
            data: Object.values(stats.salesByChannel),
            backgroundColor: ['#FF6B6B', '#4ECDC4', '#FFD93D', '#A8E6CF']
          }]
        };
      case 'products':
        return {
          labels: Object.keys(stats.productRevenue),
          datasets: [{
            label: 'Ingresos por producto',
            data: Object.values(stats.productRevenue),
            backgroundColor: '#36A2EB'
          }]
        };
      default:
        return null;
    }
  };

  const getSortedData = () => {
    const data = selectedView === 'commune' 
      ? stats.salesByCommune 
      : selectedView === 'channel' 
        ? stats.salesByChannel 
        : stats.productRevenue;

    return Object.entries(data)
      .sort(([, a], [, b]) => {
        return sortOrder === 'asc' ? a - b : b - a;
      });
  };

  const toggleSort = () => {
    setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        display: selectedView !== 'products'
      }
    },
    scales: selectedView === 'products' ? {
      y: {
        beginAtZero: true,
        grid: {
          drawBorder: false
        }
      }
    } : undefined
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
        
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Total de ingresos</p>
            <p className="text-2xl font-bold">${stats.totalRevenue.toLocaleString()}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Total de órdenes</p>
            <p className="text-2xl font-bold">{stats.totalOrders}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Comuna más popular</p>
            <p className="text-2xl font-bold">{stats.popularCommune}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Ingresos del último mes</p>
            <p className="text-2xl font-bold">${stats.lastMonthRevenue}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded-lg">
            <div className="mb-4">
              <select 
                value={selectedView}
                onChange={(e) => setSelectedView(e.target.value)}
                className="border border-gray-300 rounded px-3 py-1"
              >
                <option value="commune">Ventas por comuna</option>
                <option value="channel">Pedidos por canal</option>
                <option value="products">Ingresos por producto</option>
              </select>
            </div>
            <div className="h-[400px]">
              {selectedView === 'products' ? (
                <Bar data={getChartData()} options={chartOptions} />
              ) : (
                <Pie data={getChartData()} options={chartOptions} />
              )}
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold">Detalles</h3>
              <button 
                onClick={toggleSort}
                className="text-gray-600 hover:text-gray-800"
              >
                Ordenar {sortOrder === 'asc' ? '↑' : '↓'}
              </button>
            </div>
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Métrica</th>
                  <th className="text-right py-2">Valor</th>
                </tr>
              </thead>
              <tbody>
                {getSortedData().map(([key, value]) => (
                  <tr key={key} className="border-b">
                    <td className="py-2">{key}</td>
                    <td className="text-right">
                      {selectedView === 'products' ? `$${value.toLocaleString()}` : value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;