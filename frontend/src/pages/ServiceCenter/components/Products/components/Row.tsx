import * as React from 'react';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Slider, styled } from '@mui/material';
import { FC } from 'react';
import Product from '../../../../../data/entities/Product';
import useLoading from '../../../../../hooks/useLoading';
import Extentions from '../../../../../utils/Extentions';
import { ProductStatus } from '../../../../../data/enums/ProductStatus';
import ConstructionIcon from '@mui/icons-material/Construction';
import backend from '../../../../../backend';
import { useSnackbar } from 'notistack';

type propTypes = {
  row: Product,
  reload: () => void
}

const Row: FC<propTypes> = (props) => {
  const {row, reload } = props;
  const { loading, setLoading } = useLoading();
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
  const [value, setValue] = React.useState<number>(1);

  const startWarranty = () => {
    setLoading(true);
    backend.warranties.startWarranty(row.id)
    .then(() => {
      setLoading(false);
      enqueueSnackbar('Bắt đầu bảo hành sản phẩm!', {variant: 'success', anchorOrigin: { horizontal: 'right' , vertical: 'top'}});
      reload();
    }).catch(e => {
      setLoading(false);
      enqueueSnackbar('Có lỗi xảy ra!', {variant: 'error', anchorOrigin: { horizontal: 'right' , vertical: 'top'}});
      reload();
      console.log(e)
    })
  }

  const completeWarranty = (isSuccessed: boolean) => {
    setLoading(true);
    backend.warranties.completeWarranty(row.id, isSuccessed)
    .then(() => {
      setLoading(false);
      enqueueSnackbar(
        isSuccessed ? 'Đã ghi nhận bảo hành thành công!' : "Đã ghi nhận bảo hành thất bại!",
        {variant: isSuccessed ? 'success' : 'error', anchorOrigin: { horizontal: 'right' , vertical: 'top'}});
      reload();
    }).catch(e => {
      setLoading(false);
      enqueueSnackbar('Có lỗi xảy ra!', {variant: 'error', anchorOrigin: { horizontal: 'right' , vertical: 'top'}});
      reload();
      console.log(e)
    })
  }

  const handleChange = (event: Event, newValue: number | number[]) => {
    if (loading) return;
    if (typeof newValue === 'number') {
      setValue(newValue);
      console.log(newValue);
      switch(newValue) {
        case 0: completeWarranty(false);
          break;
        case 2: completeWarranty(true);
          break;
      }
    }
  };

  const valueFormat = (value: number) => {
    switch (value) {
      case 0: return Extentions.ProductStatus.toEN(ProductStatus.WaitingForFactory);
      case 1: return Extentions.ProductStatus.toEN(ProductStatus.Warranty);
      case 2: return Extentions.ProductStatus.toEN(ProductStatus.WaitingForCustomer);
    }
  }

  return (
    <>
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
        <TableCell component="th" scope="row">{row.id}</TableCell>
        <TableCell align="right">{row.productLineId}</TableCell>
        <TableCell align="right">{Extentions.ProductStatus.toVN(row.status)}</TableCell>
        <TableCell align="right">{new Date(row.dateOfManufacture).toLocaleString()}</TableCell>
        <TableCell align="right">
          {
            row.status === ProductStatus.WaitingForWarranty
            ? <IconButton onClick={() => startWarranty()}><ConstructionIcon color="action"/></IconButton>
            : <Slider value={value} min={0} max={2}
                // scale={calculateValue}
                valueLabelFormat={valueFormat}
                onChange={handleChange}
                valueLabelDisplay="auto"
                aria-labelledby="non-linear-slider"
                sx={{width: '40%', marginRight: 3, color: value === 0 ? 'red' : value === 1 ? 'grey' : 'green'}}
              />
          }
        </TableCell>
      </StyledTableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            {/* <Edit row={row} rows={rows} setRows={setRows} setOpen={setOpen}/> */}
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

export default Row
