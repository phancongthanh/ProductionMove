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


const VerticalBarChart = ({data, text, large}:any) => {
    const options = {
        responsive: large? true: false,
        plugins: {
          // legend: {
          //   position: 'top' as const,
          // },
          title: {
            display: true,
            text: text,
          },
        },
        // scales: {~
        //   x: {P
        //     stacked: true,
        //   },
        //   y: {
        //     stacked: true,
        //   },
        // },
      };
    
  return (
    <>
   {large ? <Bar options={options} data={data} height={"80vh"}/> : <Bar options={options} data={data} width={"500vh"} height={"300vh"}/>}
   </>
  )
}

export default VerticalBarChart