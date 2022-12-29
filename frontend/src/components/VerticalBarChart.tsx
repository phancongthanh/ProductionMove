import React from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);


const VerticalBarChart = ({data, text}:any) => {
    const options = {
        responsive: false,
        plugins: {
          // legend: {
          //   position: 'top' as const,
          // },
          title: {
            display: true,
            text: text,
          },
        },
        scales: {
          x: {
            stacked: true,
          },
          y: {
            stacked: true,
          },
        },
      };
    
  return (
    <Bar options={options} data={data} width={"500vh"} height={"300vh"}/>
  )
}

export default VerticalBarChart