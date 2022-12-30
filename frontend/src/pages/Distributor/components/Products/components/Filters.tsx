import { Button, ButtonGroup, InputAdornment, Stack, TextField } from '@mui/material';
import React, { FC, useState } from 'react'
import useProductLines from '../../../../../hooks/useProductlines';
import { toVN } from '../../../../../utils/ProductStatusExtention';
import { ProductStatus } from '../../../../../data/enums/ProductStatus';
import { Filter } from '../../../../../data/models/Filter';
import SearchIcon from '@mui/icons-material/Search';;

type propTypes = {
  filters: Filter,
  setFilters: any
}

const Filters: FC<propTypes> = (props) => {
  const {filters, setFilters} = props;
  const { productLines } = useProductLines();
  const allStatuses = [ProductStatus.JustImported, ProductStatus.Sold, ProductStatus.WaitingForCustomer]

  console.log(filters)

  const onProductLinesClick = (e : any) => {
    const value =  e.currentTarget.value
      if(filters.productLineIds.includes(value)) {
        let newFilter = {...filters}
        newFilter.productLineIds = filters.productLineIds.filter(productLineId => productLineId !== value)
        setFilters(newFilter)
        return;
      }
      const newFilter = {...filters}
      newFilter.productLineIds.push(value);
      setFilters(newFilter)
  }

  const checkProductLinesClick = (productLine: string) => {
    return filters.productLineIds.includes(productLine) ? true : false;
  }

  const onStatusClick = (e : any) => {
    const value =  e.currentTarget.value
    if(filters.statuses.includes(Number(value))) {
      let newFilter = {...filters}
      newFilter.statuses = filters.statuses.filter(status => status !== Number(value))
      setFilters(newFilter)
      return;
    }
    const newFilter = {...filters}
    newFilter.statuses.push(Number(value));
    setFilters(newFilter)
    
  }

  const checkStatusClick = (status: ProductStatus) => {
    return filters.statuses.includes(status) ? true : false;
  }

  const [search, setSearch] = useState(null)

  const searchChange = (e: any) => {
    const value =  e.currentTarget.value
    setSearch(value)
  }
  const onSubmit = () => {
    if(!search) return
    const newFilter = {...filters}
    newFilter.productId = search
    setFilters(newFilter)
  }

  return (
    <Stack>
    <ButtonGroup variant="outlined" aria-label="outlined button group">
      {productLines && productLines.map((productLine) => checkProductLinesClick(productLine.name) 
      ? <Button onClick={onProductLinesClick} key={productLine.id} value={productLine.name} variant='contained'>{productLine.name}</Button> 
      : <Button onClick={onProductLinesClick} key={productLine.id} value={productLine.name} variant='outlined'>{productLine.name}</Button>)}
    </ButtonGroup>
    <ButtonGroup variant="outlined" aria-label="outlined button group">
      {allStatuses && allStatuses.map((status) => checkStatusClick(status) 
      ? <Button onClick={onStatusClick} key={status} value={status} variant='contained'>{toVN(status)}</Button> 
      : <Button onClick={onStatusClick} key={status} value={status} variant='outlined'>{toVN(status)}</Button>)}
    </ButtonGroup>
      <TextField onChange={searchChange}
      InputProps={{
          startAdornment: ( 
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position='end'>
                <Button onClick={onSubmit}>Tìm kiếm</Button>
              </InputAdornment>
          )
        }}/>
    </Stack>
  )
}

export default Filters