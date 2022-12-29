import { Button, ButtonGroup } from '@mui/material'
import React, { FC } from 'react'
import useProductLines from '../../../../../hooks/useProductlines';
import { toVN } from '../../../../../utils/ProductStatusExtention';
import { ProductStatus } from '../../../../../data/enums/ProductStatus';

type propTypes = {
  filters: string[],
  setFilters: any
}

const Filters: FC<propTypes> = (props) => {
  const {filters, setFilters} = props;
  const { productLines } = useProductLines();

  return (
    <>
    <ButtonGroup variant="outlined" aria-label="outlined button group">
      {productLines && productLines.map((productLine) => <Button key={productLine.id}>{productLine.name}</Button>)}
    </ButtonGroup>
    <ButtonGroup variant="outlined" aria-label="outlined button group">
        <Button>{toVN(ProductStatus.JustImported)}</Button>
        <Button>{toVN(ProductStatus.Sold)}</Button>
        <Button>{toVN(ProductStatus.WaitingForCustomer)}</Button>
    </ButtonGroup>
    </>
    // <div>Filter</div>
  )
}

export default Filters