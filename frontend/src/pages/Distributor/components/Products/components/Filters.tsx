import { Button, ButtonGroup } from '@mui/material'
import React from 'react'
import useProductLines from '../../../../../hooks/useProductlines';



const Filters = () => {

  const { productLines } = useProductLines();
  return (
    <ButtonGroup variant="outlined" aria-label="outlined button group">
      {productLines && productLines.map((productLine) => <Button key={productLine.id}>{productLine.name}</Button>)}
    </ButtonGroup>
    // <div>Filter</div>
  )
}

export default Filters