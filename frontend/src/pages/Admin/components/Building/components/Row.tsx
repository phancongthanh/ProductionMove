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
import ProductLine from '../../../../../data/entities/ProductLine';
import { FC } from 'react';
import { Building } from './types';

type propTypes = {
  row: Building,
  rows: Building[],
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
  
    const handleDelete = () => {
      setRows(rows.filter(item => item !== row))
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
          <TableCell align="right">{row.name}</TableCell>
          <TableCell align="right">{row.address}</TableCell>
          <TableCell align="right">{row.type}</TableCell>
          <TableCell align="right">
            <IconButton  onClick={handleDelete}>
              <DeleteIcon color='error' />
            </IconButton>
          </TableCell>
        </StyledTableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Edit row={row} rows={rows} setRows={setRows} setOpen={setOpen}/>
            </Collapse>
          </TableCell>
        </TableRow>
      </>
    );
  }

export default Row