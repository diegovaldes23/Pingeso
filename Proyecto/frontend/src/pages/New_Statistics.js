import React, { useEffect, useState } from "react";
import { Pie, Bar } from "react-chartjs-2";
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
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    mostPopularCommune: "",
    totalLastMonthRevenue: 0,
    salesByCommune: [],
    salesByChannel: [],
    productSales: [],
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

        const salesByChannel = salesByChannelData.reduce((acc, item) => {
          acc[item.source] = item.orderCount;
          return acc;
        }, {});

        const totalSalesByProduct = productSalesData.reduce((acc, product) => {
          acc[product.productName] = product.totalPrice;
          return acc;
        }, {});

        setStats({
          totalRevenue,
          totalOrders,
          mostPopularCommune,
          totalLastMonthRevenue,
          salesByCommune: salesByCommuneData,
          salesByChannel:salesByChannelData,
          productSales: productSalesData,
        });
      } catch (error) {
        console.error("Error al obtener las estadísticas:", error);
      }
    };

    fetchStats();
  }, []);

  const pieDataCommune = {
    labels: stats.salesByCommune.map((item) => item.commune),
    datasets: [
      {
        label: "Ventas por comuna",
        data: stats.salesByCommune.map((item) => item.orderCount),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"],
      },
    ],
  };

  const pieDataChannel = {
    labels: stats.salesByChannel.map((item) => item.source || "Desconocido"),
    datasets: [
      {
        label: "Pedidos por canal",
        data: stats.salesByChannel.map((item) => item.orderCount),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"],
      },
    ],
  };
  const barDataProducts = {
    labels: stats.productSales.map((item) => item.productName),
    datasets: [
      {
        label: "Ingresos por producto",
        data: stats.productSales.map((item) => item.totalPrice),
        backgroundColor: "#36A2EB",
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="lg:col-span-1">
          <h3 className="text-gray-700 font-bold text-md mb-2">Ventas por comuna</h3>
          <div className="flex">
            <div className="w-1/2">
              <Pie data={pieDataCommune} options={chartOptions} />
            </div>
            <div className="w-1/2 max-h-64 overflow-y-auto bg-gray-100 p-4 rounded-md">
              <ul>
                {stats.salesByCommune.map((commune) => (
                  <li key={commune.commune} className="mb-2 border-b pb-2">
                    <p className="text-sm font-bold text-gray-800">{commune.commune}</p>
                    <p className="text-sm text-gray-600">
                      Ventas: <span className="font-bold">{commune.orderCount}</span>
                    </p>
                    <p className="text-sm text-gray-600">
                      Ingresos: <span className="font-bold">${commune.total.toLocaleString()}</span>
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="lg:col-span-1">
          <h3 className="text-gray-700 font-bold text-md mb-2">Pedidos por canal</h3>
          <div className="flex">
            <div className="w-1/2">
              <Pie data={pieDataChannel} options={chartOptions} />
            </div>
            <div className="w-1/2 max-h-64 overflow-y-auto bg-gray-100 p-4 rounded-md">
              <ul>
                {stats.salesByChannel.map((channel) => (
                  <li key={channel.source || "Desconocido"} className="mb-2 border-b pb-2">
                    <p className="text-sm font-bold text-gray-800">
                      {channel.source || "Desconocido"}
                    </p>
                    <p className="text-sm text-gray-600">
                      Pedidos: <span className="font-bold">{channel.orderCount}</span>
                    </p>
                    <p className="text-sm text-gray-600">
                      Ingresos: <span className="font-bold">${channel.total.toLocaleString()}</span>
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div>
          <h3 className="text-gray-700 font-bold text-md mb-2">Ingresos por producto</h3>
          <div className="flex">
            <div className="w-1/2">
              <Bar data={barDataProducts} options={chartOptions} />
            </div>
            <div className="w-1/2 max-h-64 overflow-y-auto bg-gray-100 p-4 rounded-md">
              <ul>
                {stats.productSales.map((product) => (
                  <li key={product.idProduct} className="mb-2 border-b pb-2">
                    <p className="text-sm font-bold text-gray-800">{product.productName}</p>
                    <p className="text-sm text-gray-600">
                      Cantidad vendida: <span className="font-bold">{product.totalQuantity}</span>
                    </p>
                    <p className="text-sm text-gray-600">
                      Ingresos: <span className="font-bold">${product.totalPrice.toLocaleString()}</span>
                    </p>
                  </li>
                ))}
              </ul>
            </div>
            </div>
            </div>
      </div>
    </div>
  );
};

export default Statistics;
