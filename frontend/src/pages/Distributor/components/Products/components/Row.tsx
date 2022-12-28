import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import DeleteIcon from '@mui/icons-material/Delete';
import Edit from './Edit';
import { styled, TableFooter, TablePagination } from '@mui/material';
import { FC } from 'react';
import Product1 from '../../../../../types/Product1';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import { ProductStatus1 } from '../../../../../types/ProductStatus1';
import FactoryIcon from '@mui/icons-material/Factory';
import StoreIcon from '@mui/icons-material/Store';
import Sold from './Sold';
import ConstructionIcon from '@mui/icons-material/Construction';
import Warranty from './Warranty';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ReturnToCustomer from './ReturnToCustomer';

type propTypes = {
  row: Product1,
  rows: Product1[],
  setRows: Function,
  index: number,
}


const Row: FC<propTypes> = (props) => {

    const {row, rows, setRows, index } = props;
  
  
    const StyledTableRow = styled(TableRow)(({ theme }) => ({
      '&:hover': {
        backgroundColor: theme.palette.action.hover,
      },
      // hide last border
      '&:last-child td, &:last-child th': {
        border: 0,
      },
    }));
  
    const [open, setOpen] = React.useState(false);
  
    const handleDelete = () => {
      setRows(rows.filter(item => item !== row))
    }

    const [openSoldDialog, setOpenSoldDialog] = React.useState(false);
    const [openWarrantyDialog, setWarrantyDialog] = React.useState(false);
    const [openRTFDialog, setOpenRTFDialog] = React.useState(false);
    const [openRTCDialog, setOpenRTCDialog] = React.useState(false);

  
    return (
      <>
       <Sold open={openSoldDialog} setOpenDialog={setOpenSoldDialog} rows={rows} setRows={setRows} row={row} />
       <Warranty open={openWarrantyDialog} setOpenDialog={setWarrantyDialog} rows={rows} setRows={setRows} row={row} />
       <ReturnToCustomer open={openRTCDialog} setOpenDialog={setOpenRTCDialog} rows={rows} setRows={setRows} row={row} />
        <StyledTableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row">
            {row.id}
          </TableCell>
          <TableCell align="right">{row.productLineId}</TableCell>
          <TableCell align="right">{row.status}</TableCell>
          <TableCell align="right">{row.customer?.name}</TableCell>
          <TableCell align="right">{row.customer?.phone}</TableCell>
          <TableCell align="right">{row.saleDate?.toLocaleString()}</TableCell>
          <TableCell align="right">
            
              {row.status === ProductStatus1.JustImported ? <IconButton onClick={() => setOpenSoldDialog(true)}><ShoppingCartCheckoutIcon color="primary"/></IconButton>
              : row.status === ProductStatus1.Sold ? <IconButton onClick={() => setWarrantyDialog(true)}><ConstructionIcon color="action"/></IconButton>
              : row.status === ProductStatus1.Waiting ? <IconButton onClick={() => setOpenRTCDialog(true)}><StoreIcon color="success"/></IconButton>
              : row.status === ProductStatus1.Recall ? <IconButton onClick={() => setOpenRTFDialog(true)}><FactoryIcon color='disabled'/></IconButton>
              : <LocalShippingIcon/>}

            
          </TableCell>
        </StyledTableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Edit row={row} rows={rows} setRows={setRows} setOpen={setOpen}/>
            </Collapse>
          </TableCell>
        </TableRow>
      </>
    );
  }

export default Row
