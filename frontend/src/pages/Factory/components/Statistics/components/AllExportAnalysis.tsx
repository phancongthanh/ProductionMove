import React, { FC } from 'react'
import ProductStatistics, { DistributorProductStatisticsItem } from '../../../../../data/models/ProductStatistics'
import { Stack } from '@mui/material'
import ProductAnalysis from '../../../../../data/models/ProductAnalysis'
import ExportAnalysis from './ExportAnalysis'

type propTypes = {
  analysis: any
}

const AllExportAnalysis: FC<propTypes> = ({analysis}) => {
  return (
    <Stack direction={'row'} sx={{}} flexWrap='wrap' display={'flex'}>
        <ExportAnalysis analysis={analysis.yearAnalyses} text='Phân tích sản phẩm được xuất theo năm so với năm trước(%)' type='year'/>
        <ExportAnalysis analysis={analysis.quarterAnalyses} text='Phân tích sản phẩm được xuất theo quý so với quý trước(%)' type='quarter'/>
        <ExportAnalysis analysis={analysis.monthAnalysis} text='Phân tích sản phẩm được xuất theo tháng so với tháng trước(%)' type='month'/>
    </Stack>
  )
}

export default AllExportAnalysis