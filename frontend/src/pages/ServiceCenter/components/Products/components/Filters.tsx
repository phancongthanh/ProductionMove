import { Button, ButtonGroup, InputAdornment, Stack, TextField, Typography } from '@mui/material';
import React, { FC, useEffect, useState } from 'react'
import useProductLines from '../../../../../hooks/useProductlines';
import { toVN } from '../../../../../utils/ProductStatusExtention';
import { ProductStatus } from '../../../../../data/enums/ProductStatus';
import SearchIcon from '@mui/icons-material/Search';
import Filter from '../../../../../data/models/Filter';
import backend from '../../../../../backend';
import ProductLine from '../../../../../data/entities/ProductLine';

type propTypes = {
  filters: Filter,
  setFilters: any
}

const Filters: FC<propTypes> = (props) => {
  const {filters, setFilters} = props;
  const [productLines, setProductLines] = useState<ProductLine[]|null>(null)

  const allStatuses = [ProductStatus.WaitingForWarranty, ProductStatus.Warranty]

  useEffect(() => {
    const getData = async () => {
      const productLines = await backend.productLines.getProductLines();
      setProductLines(productLines);
    }
    getData()
  },[])

  const onProductLinesClick = (e : any) => {
    const value =  e.currentTarget.value
      if(filters.productLineIds.includes(value)) {
        let newFilter = {...filters}
        newFilter.productLineIds = filters.productLineIds.filter(productLine => productLine !== value)
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
    if(!isNaN(Number(value))) setSearch(value)
  }
  const onSubmit = () => {
    if(!search) {
      const newFilter = {...filters}
      newFilter.productId = null
      setFilters(newFilter)
      return
    }
    const newFilter = {...filters}
    newFilter.productId = Number(search)
    setFilters(newFilter)
  }

  return (
    <Stack spacing={1} padding={2}>
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
      value={search}
      sx={{maxWidth:'600px'}}
      placeholder="Tìm kiếm từ id sản phẩm"
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