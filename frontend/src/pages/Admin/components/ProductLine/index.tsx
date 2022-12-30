import { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import CTable from './components/CTable';
import ProductLine from '../../../../data/entities/ProductLine';
import backend from '../../../../backend';
import useLoading from '../../../../hooks/useLoading';
import './styles.scss';

/*
let serverProductLines: ProductLine[] = [
  {id: '1', name: 'iphone 1', warrantyPeriod:2, describes: [{property: 'color', value: 'black'}, {property: 'Cpu', value: '1'}]},
  {id: '2', name: 'iphone 2', warrantyPeriod:2, describes: [{property: 'color', value: 'black'}]},
  {id: '3', name: 'iphone 3', warrantyPeriod:2, describes: [{property: 'color', value: 'black'}]},
  {id: '4', name: 'iphone 4', warrantyPeriod:2, describes: [{property: 'color', value: 'black'}]},
  {id: '5', name: 'iphone 5', warrantyPeriod:2, describes: [{property: 'color', value: 'black'}]},

  {id: '6', name: 'iphone 4', warrantyPeriod:2, describes: [{property: 'color', value: 'black'}]},
  {id: '7', name: 'iphone 4', warrantyPeriod:2, describes: [{property: 'color', value: 'black'}]},
  {id: '8', name: 'iphone 4', warrantyPeriod:2, describes: [{property: 'color', value: 'black'}]},
];
*/

const ProductLineView = () => {
  const [productLines, setProductLines] = useState<ProductLine[]>([]);
  const { setLoading } = useLoading();

  useEffect(() => {
    setLoading(true);
    backend.productLines.getProductLines()
    .then(pls => {
      setLoading(false);
      setProductLines(pls);
    }).catch(() => setLoading(false));
  }, [])

  return (
    <div className='mainContent'>
      <div className='header'>
        <div className='title'>Dòng sản phẩm</div>
      </div>
      <Box sx={{ border: '1px solid lightgrey', borderRadius: 2 , boxShadow: 3}}>
        <div className='table'>
          <CTable rows={productLines} setRows={setProductLines}/>
        </div>
      </Box>
    </div>
  )
}

ProductLineView.propTypes = { }

export default ProductLineView