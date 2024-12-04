import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';

ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const Statistics = () => {
  const [selectedView, setSelectedView] = useState('commune');
  const [sortOrder, setSortOrder] = useState('desc');
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    popularCommune: '',
    lastMonthRevenue: 0,
    salesByCommune: {},
    salesByChannel: {},
    productRevenue: {},
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const ordersRes = await fetch("http://localhost:8080/admin/orders");
        const ordersData = await ordersRes.json();

        const salesByCommuneRes = await fetch("http://localhost:8080/admin/orders/salesByCommune");
        const salesByCommuneData = await salesByCommuneRes.json();

        const salesByChannelRes = await fetch("http://localhost:8080/admin/orders/salesByChannel");
        const salesByChannelData = await salesByChannelRes.json();

        const productSalesRes = await fetch("http://localhost:8080/admin/orderproduct/product-sales");
        const productSalesData = await productSalesRes.json();

        let totalRevenue = 0;
        let totalOrders = ordersData.length;
        const lastMonth = new Date();
        lastMonth.setMonth(lastMonth.getMonth() - 1);
        let totalLastMonthRevenue = 0;

        ordersData.forEach((order) => {
          totalRevenue += order.subtotal;
          if (new Date(order.order_date) >= lastMonth) {
            totalLastMonthRevenue += order.subtotal;
          }
        });

        const mostPopularCommune = salesByCommuneData.reduce((max, commune) =>
          commune.orderCount > max.orderCount ? commune : max,
        { commune: "", orderCount: 0 }).commune;

        setStats({
          totalRevenue,
          totalOrders,
          popularCommune: mostPopularCommune,
          lastMonthRevenue: totalLastMonthRevenue,
          salesByCommune: salesByCommuneData.reduce((acc, item) => {
            acc[item.commune] = item.orderCount;
            return acc;
          }, {}),
          salesByChannel: salesByChannelData.reduce((acc, item) => {
            acc[item.source || 'Desconocido'] = item.orderCount;
            return acc;
          }, {}),
          productRevenue: productSalesData.reduce((acc, item) => {
            acc[item.productName] = item.totalPrice;
            return acc;
          }, {}),
        });
      } catch (error) {
        console.error("Error al obtener las estadísticas:", error);
      }
    };

    fetchStats();
  }, []);

  // Función para obtener colores (ampliar la paleta de colores pastel si es necesario)
  const pastelColors = [
  '#FFB3BA', // Light Red
  '#FFDFBA', // Light Orange
  '#FFFFAA',  // Soft Yellow
  '#BAFFC9', // Soft Green
  '#BAE1FF', // Soft Blue
  '#C9C9FF', // Soft Purple
  '#F1CBFF'  // Soft Pink

];

  

  const getChartData = () => {
    switch(selectedView) {
      case 'commune':
        const sortedData = Object.entries(stats.salesByCommune)
        .sort(([, a], [, b]) => b - a);

      // Calcular el total de ventas
      const totalSales = sortedData.reduce((acc, [, value]) => acc + value, 0);

      // Agregar categoría "Otros" para el 20% de las ventas más pequeñas
      let accumulatedSales = 0;
      const otherData = [];
      const filteredData = sortedData.filter(([commune, sales]) => {
        accumulatedSales += sales;
        if (accumulatedSales / totalSales > 0.8) {
          otherData.push([commune, sales]);
          return false;  // Remover este valor
        }
        return true;
      });

      // Añadir "Otros" al final
      if (otherData.length > 0) {
        filteredData.push(['Otros', otherData.reduce((acc, [, value]) => acc + value, 0)]);
      }

      // Extraer los datos ordenados
      const labels = filteredData.map(([commune]) => commune);
      const data = filteredData.map(([, sales]) => sales);

      // Usar colores pastel predefinidos
      const colors = pastelColors.slice(0, filteredData.length); // Asegurarse de no usar más colores de los que hay

      return {
        labels,
        datasets: [{
          data,
          backgroundColor: colors
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
            <p className="text-2xl font-bold">${stats.lastMonthRevenue.toLocaleString()}</p>
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
