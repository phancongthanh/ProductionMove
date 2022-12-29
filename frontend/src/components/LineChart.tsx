import React from 'react'
import { Line } from 'react-chartjs-2';


const LineChart = ({data, text}:any) => {
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
    <Line options={options} data={data} width={"500vh"} height={"300vh"}/>
  )
}

export default LineChart