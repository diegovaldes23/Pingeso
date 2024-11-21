import React from "react";
import FilterAndSort from "./FilterAndSort";
import Statistics from "./Statistics";
import { useGlobalContext } from "../utils/GlobalModelContext";

const Dashboard = () => {
  const { filteredOrders } = useGlobalContext();

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      {/* Estadísticas */}
      <Statistics filteredOrders={filteredOrders} />
    </div>
  );
};

export default Dashboard;
