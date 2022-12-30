import * as React from 'react';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Edit from './Edit';
import { styled } from '@mui/material';
import { FC } from 'react';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import FactoryIcon from '@mui/icons-material/Factory';
import StoreIcon from '@mui/icons-material/Store';
import Sold from './Sold';
import ConstructionIcon from '@mui/icons-material/Construction';
import Warranty from './Warranty';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ReturnToCustomer from './ReturnToCustomer';
import Product from '../../../../../data/entities/Product';
import useLoading from '../../../../../hooks/useLoading';
import { ProductStatus } from '../../../../../data/enums/ProductStatus';
import Extentions from '../../../../../utils/Extentions';
import backend from '../../../../../backend';
import { useSnackbar } from 'notistack';

type propTypes = {
  row: Product,
  reload: () => void
}

const Row: FC<propTypes> = (props) => {
  const {row, reload } = props;
  const { setLoading } = useLoading();
  const { enqueueSnackbar } = useSnackbar();
  
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
    //setRows(rows.filter(item => item !== row))
  }

  const [openSoldDialog, setOpenSoldDialog] = React.useState(false);
  const [openWarrantyDialog, setWarrantyDialog] = React.useState(false);
  const [openRTFDialog, setOpenRTFDialog] = React.useState(false);
  const [openRTCDialog, setOpenRTCDialog] = React.useState(false);

  const RTFOnSubmit = () => {
    setLoading(true);
    backend.distributor.returnToFactory(row.id)
    .then(() => {
      setLoading(false);
      enqueueSnackbar('Đã cập nhật!', {variant: 'success', anchorOrigin: { horizontal: 'right' , vertical: 'top'}});
      reload();
    }).catch(e => {
      setLoading(false);
      enqueueSnackbar('Có lỗi xảy ra!', {variant: 'error', anchorOrigin: { horizontal: 'right' , vertical: 'top'}});
      console.log(e)
    })
  }

  let icon;
  switch(row.status) {
    case ProductStatus.JustImported:
      icon = (
        <>
          <IconButton onClick={() => setOpenSoldDialog(true)}><ShoppingCartCheckoutIcon color="primary"/></IconButton>
          {/*<IconButton onClick={() => setOpenRTFDialog(true)}><FactoryIcon color='disabled'/></IconButton>*/}
          <IconButton onClick={() => RTFOnSubmit()}><FactoryIcon color='disabled'/></IconButton>
        </>
      );
      break;
    case ProductStatus.Sold:
    case ProductStatus.Recall:
      icon = <IconButton onClick={() => setWarrantyDialog(true)}><ConstructionIcon color="action"/></IconButton>
      break;
    case ProductStatus.WaitingForCustomer:
      icon = <IconButton onClick={() => setOpenRTCDialog(true)}><StoreIcon color="success"/></IconButton>
      break;
    case ProductStatus.WaitingForWarranty:
    case ProductStatus.Warranty:
      icon = <LocalShippingIcon/>
      break;
    default: icon = ""
  }

  return (
    <>
      <Sold open={openSoldDialog} setOpenDialog={setOpenSoldDialog} row={row} reload={reload} />
      <Warranty open={openWarrantyDialog} setOpenDialog={setWarrantyDialog} row={row} reload={reload} />
      <ReturnToCustomer open={openRTCDialog} setOpenDialog={setOpenRTCDialog} row={row} reload={reload} />
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
        <TableCell align="right">{Extentions.ProductStatus.toVN(row.status)}</TableCell>
        <TableCell align="right">{row.customer?.name}</TableCell>
        <TableCell align="right">{row.customer?.phone}</TableCell>
        <TableCell align="right">{row.saleDate ? new Date(row.saleDate).toLocaleString() : null}</TableCell>
        <TableCell align="right">{icon}</TableCell>
      </StyledTableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Edit row={row} reload={reload} setOpen={setOpen}/>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

export default Row
