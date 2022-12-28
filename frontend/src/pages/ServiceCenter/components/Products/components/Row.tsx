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
import { Slider, styled, TableFooter, TablePagination } from '@mui/material';
import { FC } from 'react';
import Product1 from '../../../../../types/Product1';
import { ProductStatus1 } from '../../../../../types/ProductStatus1';

type propTypes = {
  row: Product1,
  rows: Product1[],
  setRows: Function,
}




const Row: FC<propTypes> = (props) => {

    const {row, rows, setRows } = props;
  
  
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

    const rowsStatusChange = (Status: ProductStatus1) => {
      const newRows = [...rows]
      newRows[rows.indexOf(row)].status = Status
      setRows(newRows);
    }
  
    const handleChange = (event: Event, newValue: number | number[]) => {
      if (typeof newValue === 'number') {
        setValue(newValue);
        if(newValue === 0) {
          rowsStatusChange(ProductStatus1.Canceled)
          return
        }
        if(newValue === 1) {
          rowsStatusChange(ProductStatus1.Warranty)
          return
        }
        if(newValue === 2) {
          rowsStatusChange(ProductStatus1.Waiting)
          return
        }
      }
    };

    const valueFormat = (value: number) => {
      if(value === 0) {
        return ProductStatus1.Canceled
      }
      if(value === 1) {

        return ProductStatus1.Warranty
      }
      if(value === 2) {

        return ProductStatus1.Waiting
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
          <TableCell component="th" scope="row">
            {row.id}
          </TableCell>
          <TableCell align="right">{row.productLineId}</TableCell>
          <TableCell align="right">{row.status}</TableCell>
          <TableCell align="right">{row.dateOfManufacture.toLocaleString()}</TableCell>
          <TableCell align="right">
            <Slider
              value={value}
              min={0}
              max={2}
              // scale={calculateValue}
              valueLabelFormat={valueFormat}
              onChange={handleChange}
              valueLabelDisplay="auto"
              aria-labelledby="non-linear-slider"
              sx={{width: '20%', marginRight: 3, color: value === 0 ? 'red' : value === 1 ? 'grey' : 'green'}}
            />
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
