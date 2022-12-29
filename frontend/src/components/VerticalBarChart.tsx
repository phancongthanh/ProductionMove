import React from 'react'
import { Bar } from 'react-chartjs-2';


const VerticalBarChart = ({data, text}:any) => {
    const options = {
        responsive: false,
        plugins: {
          legend: {
            position: 'top' as const,
          },
          title: {
            display: true,
            text: text,
          },
        },
      };
    
  return (
    <Bar options={options} data={data} width={"500vh"} height={"300vh"}/>
  )
}

export default VerticalBarChart