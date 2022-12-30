import * as React from 'react';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import DeleteIcon from '@mui/icons-material/Delete';
import { styled } from '@mui/material';
import { FC } from 'react';
import Product from '../../../../../data/entities/Product';
import Extentions from '../../../../../utils/Extentions';
import { ProductStatus } from '../../../../../data/enums/ProductStatus';
import backend from '../../../../../backend';
import useLoading from '../../../../../hooks/useLoading';
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
    setLoading(true);
    backend.factory.cancelProduct(row.id)
    .then(() => {
      setLoading(false);
      enqueueSnackbar('Đã cập nhật hủy sản phẩm!', {variant: 'success', anchorOrigin: { horizontal: 'right' , vertical: 'top'}});
      reload();
    }).catch(() => {
      setLoading(false);
      enqueueSnackbar('Có lỗi xảy ra!', {variant: 'error', anchorOrigin: { horizontal: 'right' , vertical: 'top'}});
      reload();
    });
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
        <TableCell component="th" scope="row">
          {row.id}
        </TableCell>
        <TableCell align="right">{row.productLineId}</TableCell>
        <TableCell align="right">{Extentions.ProductStatus.toVN(row.status)}</TableCell>
        <TableCell align="right">{new Date(row.dateOfManufacture).toLocaleString()}</TableCell>
        <TableCell align="right">
          {
            row.status == ProductStatus.WaitingForFactory
            ?
              <IconButton  onClick={handleDelete}>
                <DeleteIcon color='error' />
              </IconButton>
            : ""
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
