import React from 'react';
import { useGlobalContext } from '../utils/GlobalModelContext';

const StatisticsView = () => {
  const { statistics } = useGlobalContext();

  return (
    <div>
      <h2>Estadísticas</h2>
      <p>Total de pedidos: {statistics.totalOrders}</p>
      <p>Total de ingresos: ${statistics.totalRevenue.toLocaleString()}</p>
      <div>
        <h3>Pedidos por estado:</h3>
        <ul>
          {Object.entries(statistics.statusCounts).map(([status, count]) => (
            <li key={status}>
              {status}: {count}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default StatisticsView;
