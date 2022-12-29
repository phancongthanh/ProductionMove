import React, { FC } from 'react'
import ProductStatistics, { DistributorProductStatisticsItem } from '../../../../../data/models/ProductStatistics'
import { Stack } from '@mui/material'
import StatusStatistics from './StatusStatistics'
import SoldAnalysis from './SoldAnalysis'
import ProductAnalysis from '../../../../../data/models/ProductAnalysis'

type propTypes = {
  analysis: ProductAnalysis
}

const AllSoldAnalysis: FC<propTypes> = ({analysis}) => {
  return (
    <Stack direction={'row'} sx={{}} flexWrap='wrap' display={'flex'}>
        <SoldAnalysis analysis={analysis.yearAnalyses} text='Phân tích sản phẩm bán được theo năm so với năm trước(%)' type='year'/>
        <SoldAnalysis analysis={analysis.quarterAnalyses} text='Phân tích sản phẩm bán được theo quý so với quý trước(%)' type='quarter'/>
        <SoldAnalysis analysis={analysis.monthAnalysis} text='Phân tích sản phẩm bán được theo tháng so với tháng trước(%)' type='month'/>
    </Stack>
  )
}

export default AllSoldAnalysis