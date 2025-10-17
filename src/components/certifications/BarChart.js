// components/BarChart.js
import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = () => {
  const data = {
    labels: ['Uncertified', 'Certified'],
    datasets: [
      {
        label: 'Average Salary ($)',
        data: [76636, 107289],
        backgroundColor: [
          'rgba(0, 123, 255, 0.7)',
          'rgba(255, 99, 132, 0.7)'
        ],
        borderRadius: 5,
        borderWidth: 1,
      },
    ],
  };

  const options = {
    indexAxis: 'x',
    scales: {
        
      y: {
        beginAtZero: true,
        ticks: {
          callback: value => ""
        }
      }
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: context => `${context.raw.toLocaleString()}`
        }
      }
    },
    responsive: true,
  };

  return (
    <div style={{ width: '100%', maxWidth: 400 }}>
      <p><em>Certified</em> PMP earn higher than their non-certified peers.</p>
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;
