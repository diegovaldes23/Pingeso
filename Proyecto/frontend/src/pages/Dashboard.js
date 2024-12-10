import React from "react";
import FilterAndSort from "./FilterAndSort";
import Statistics from "./Statistics";
import { useGlobalContext } from "../utils/GlobalModelContext";

const Dashboard = () => {
  const { filteredOrders } = useGlobalContext();

  return (
    <div className="mx-auto">
      {/* Estadísticas */}
      <Statistics filteredOrders={filteredOrders} />
    </div>
  );
};

export default Dashboard;
