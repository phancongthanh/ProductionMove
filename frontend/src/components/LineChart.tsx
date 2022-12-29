import React from 'react'
import { Line } from 'react-chartjs-2';


const LineChart = ({data, text, large}:any) => {
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
    <>
   {large ? <Line options={options} data={data} width={"1500vh"} height={"300vh"}/> : <Line options={options} data={data} width={"500vh"} height={"300vh"}/>}
   </>
  )
}

export default LineChart