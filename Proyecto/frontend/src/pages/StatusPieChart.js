import React from 'react';
import { Pie } from 'react-chartjs-2';
import { useGlobalContext } from '../utils/GlobalModelContext';

const StatusPieChart = () => {
  const { statistics } = useGlobalContext();

  const data = {
    labels: Object.keys(statistics.statusCounts),
    datasets: [
      {
        data: Object.values(statistics.statusCounts),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4CAF50'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4CAF50'],
      },
    ],
  };

  return <Pie data={data} />;
};

export default StatusPieChart;
