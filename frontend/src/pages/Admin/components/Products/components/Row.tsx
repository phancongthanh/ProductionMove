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
import Product from '../../../../../data/entities/Product';
import useLoading from '../../../../../hooks/useLoading';
import Extentions from '../../../../../utils/Extentions';

type propTypes = {
  row: Product,
  reload: () => void
}

const Row: FC<propTypes> = (props) => {
  const {row, reload } = props;
  const { setLoading } = useLoading();
  
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


  const [openSoldDialog, setOpenSoldDialog] = React.useState(false);
  const [openWarrantyDialog, setWarrantyDialog] = React.useState(false);
  const [openRTFDialog, setOpenRTFDialog] = React.useState(false);
  const [openRTCDialog, setOpenRTCDialog] = React.useState(false);

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
        <TableCell align="right">{row.customer?.name}</TableCell>
        <TableCell align="right">{row.customer?.phone}</TableCell>
        <TableCell align="right">{row.saleDate?.toLocaleString()}</TableCell>
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
