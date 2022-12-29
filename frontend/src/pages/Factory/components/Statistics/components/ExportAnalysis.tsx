import React, { FC } from 'react'
import LineChart from '../../../../../components/LineChart'
import { Box } from '@mui/material'
import { ProductStatusColor } from '../../../../../data/enums/ProductStatusColor'
import { getDarkerColor } from '../../../../../utils/GetDarkerColor'
import VerticalBarChart from '../../../../../components/VerticalBarChart'


type propTypes = {
    analysis: any[]
    text: string
    type: 'year' | 'month' | 'quarter'
}

const ExportAnalysis: FC<propTypes> = ({analysis, text, type}) => {
    const labels = type === 'year' ? analysis.map((analyst) => String(analyst.year)):
                    type === 'month' ? analysis.map((analyst) => String('T' +(analyst.month+1) + '/' + analyst.year)):
                    type === 'quarter' ? analysis.map((analyst) => String('Q'+(analyst.quarter+1)+ '/' + analyst.year)): null

    // const getColor = (analyst: any) => {
    //   return analyst.percentage >= 0 ? '#008000' : '#FF0000'
    // }
    
    let datasets = [
    {
        label: '%',
        data: analysis.map((analyst) => `${!analyst.percentage ? 0 : analyst.percentage - 100}`),
        backgroundColor: '#87CEFA',
    },
    ]

    const data = {
      labels,
      datasets
    }
  return (
    <Box sx={{flex: 1}}>
       <VerticalBarChart data={data} text={text}/>
    </Box>
  )
}

export default ExportAnalysis