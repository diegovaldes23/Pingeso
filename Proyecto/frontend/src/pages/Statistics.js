import React, { useMemo } from "react";
import { Pie, Bar } from "react-chartjs-2";
import { useGlobalContext } from "../utils/GlobalModelContext";
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
} from "chart.js";

// Registrar elementos y controladores
ChartJS.register(ArcElement, BarElement, Tooltip, Legend, CategoryScale, LinearScale);

const Statistics = () => {
  const { orders, filteredOrders } = useGlobalContext();
  // Calcular estadísticas con useMemo para optimizar el rendimiento
  const stats = useMemo(() => {
    const salesByCommune = {};
    const salesByChannel = { "Facebook Ads": 0, Whatsapp: 0, Tiendanube: 0 };
    const totalSalesByProduct = {};
    const totalSalesByDate = {};
    const today = new Date();
    const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);

    let totalRevenue = 0;
    let totalOrders = 0;
    let totalLastMonthRevenue = 0;
    let highestOrder = { total: 0 };
    const customerFrequency = {};

    filteredOrders.forEach((order) => {
      // Total de ingresos y órdenes
      totalRevenue += order.total;
      totalOrders++;

      // Pedido más caro
      if (order.total > highestOrder.total) {
        highestOrder = order;
      }

      // Cliente más frecuente
      customerFrequency[order.customerName] =
        (customerFrequency[order.customerName] || 0) + 1;

      // Ventas por comuna
      salesByCommune[order.commune] = (salesByCommune[order.commune] || 0) + 1;

      // Ventas por canal
      salesByChannel[order.purchaseSource] =
        (salesByChannel[order.purchaseSource] || 0) + 1;

      // Ventas del último mes
      const orderDate = new Date(order.date);
      if (orderDate >= lastMonth) {
        totalLastMonthRevenue += order.total;
        totalSalesByDate[order.date] =
          (totalSalesByDate[order.date] || 0) + order.total;
      }

      // Ventas por producto
      order.products.forEach((product) => {
        totalSalesByProduct[product.name] =
          (totalSalesByProduct[product.name] || 0) + product.price * product.quantity;
      });
    });

    // Comunas más populares
    const mostPopularCommune = Object.keys(salesByCommune).reduce(
      (max, commune) =>
        salesByCommune[commune] > (salesByCommune[max] || 0) ? commune : max,
      ""
    );

    // Cliente más frecuente
    const mostFrequentCustomer = Object.keys(customerFrequency).reduce(
      (max, customer) =>
        customerFrequency[customer] > (customerFrequency[max] || 0)
          ? customer
          : max,
      ""
    );

    return {
      totalRevenue,
      totalOrders,
      mostPopularCommune,
      totalLastMonthRevenue,
      highestOrder,
      mostFrequentCustomer,
      salesByCommune,
      salesByChannel,
      totalSalesByProduct,
      totalSalesByDate,
    };
  }, [filteredOrders]);

  // Preparar datos para gráficos
  const pieDataCommune = {
    labels: Object.keys(stats.salesByCommune),
    datasets: [
      {
        label: "Ventas por comuna",
        data: Object.values(stats.salesByCommune),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"],
      },
    ],
  };

  const pieDataChannel = {
    labels: Object.keys(stats.salesByChannel),
    datasets: [
      {
        label: "Pedidos por canal",
        data: Object.values(stats.salesByChannel),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };

  const barDataProducts = {
    labels: Object.keys(stats.totalSalesByProduct),
    datasets: [
      {
        label: "Ingresos por producto",
        data: Object.values(stats.totalSalesByProduct),
        backgroundColor: "#36A2EB",
      },
    ],
  };

  const barDataDaily = {
    labels: Object.keys(stats.totalSalesByDate),
    datasets: [
      {
        label: "Ingresos diarios (último mes)",
        data: Object.values(stats.totalSalesByDate),
        backgroundColor: "#FFCE56",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
  };


  return (
    <div className="p-4 bg-white shadow rounded-md">
      <h2 className="text-2xl font-bold text-gray-700 mb-6">Dashboard</h2>
      <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-gray-100 p-4 rounded-md">
          <p className="text-sm text-gray-600">Total de ingresos</p>
          <p className="text-xl font-bold text-gray-800">${stats.totalRevenue.toLocaleString()}</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-md">
          <p className="text-sm text-gray-600">Total de órdenes</p>
          <p className="text-xl font-bold text-gray-800">{stats.totalOrders}</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-md">
          <p className="text-sm text-gray-600">Comuna más popular</p>
          <p className="text-xl font-bold text-gray-800">
            {stats.mostPopularCommune || "N/A"}
          </p>
        </div>
        <div className="bg-gray-100 p-4 rounded-md">
          <p className="text-sm text-gray-600">Ingresos del último mes</p>
          <p className="text-xl font-bold text-gray-800">
            ${stats.totalLastMonthRevenue.toLocaleString()}
          </p>
        </div>
      </div>
      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <h3 className="text-gray-700 font-bold text-md mb-2">Ventas por comuna</h3>
          <div className="h-64">
            <Pie data={pieDataCommune} options={chartOptions} />
          </div>
        </div>
        <div>
          <h3 className="text-gray-700 font-bold text-md mb-2">Ingresos diarios</h3>
          <div className="h-64">
            <Bar data={barDataDaily} options={chartOptions}/>
          </div>
        </div>
        <div>
          <h3 className="text-gray-700 font-bold text-md mb-2">Pedidos por canal</h3>
          <div className="h-64">
            <Pie data={pieDataChannel} options={chartOptions}/>
          </div>
        </div>
        <div>
          <h3 className="text-gray-700 font-bold text-md mb-2">Ingresos por producto</h3>
          <div className="h-64">
          <Bar data={barDataProducts} options={chartOptions}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
