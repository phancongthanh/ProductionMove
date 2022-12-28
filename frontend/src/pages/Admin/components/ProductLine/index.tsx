import { Box } from '@mui/material';
import CTable from './components/CTable';

import './styles.scss';

const ProductLine = () => {
  return (
    <div className='mainContent'>
      <div className='header'>
        <div className='title'>Dòng sản phẩm</div>
      </div>
      <Box sx={{ border: '1px solid lightgrey', borderRadius: 2 , boxShadow: 3}}>
        <div className='search'>Search</div>
        <div className='filter'>Filter</div>
        <div className='table'>
          <CTable />
        </div>
      </Box>
    </div>
  )
}

ProductLine.propTypes = { }

export default ProductLine