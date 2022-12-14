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
import { Button, styled, TableFooter, TablePagination } from '@mui/material';
import Row from './Row';
import ProductLine from '../../../../../data/entities/ProductLine';
import Create from './Create';



let rows1: ProductLine[] = [
  {id: '1', name: 'iphone 1', warrantyPeriod:2, describes: [{property: 'color', value: 'black'}, {property: 'Cpu', value: '1'}]},
  {id: '2', name: 'iphone 2', warrantyPeriod:2, describes: [{property: 'color', value: 'black'}]},
  {id: '3', name: 'iphone 3', warrantyPeriod:2, describes: [{property: 'color', value: 'black'}]},
  {id: '4', name: 'iphone 4', warrantyPeriod:2, describes: [{property: 'color', value: 'black'}]},
  {id: '5', name: 'iphone 5', warrantyPeriod:2, describes: [{property: 'color', value: 'black'}]},

  {id: '6', name: 'iphone 4', warrantyPeriod:2, describes: [{property: 'color', value: 'black'}]},
  {id: '7', name: 'iphone 4', warrantyPeriod:2, describes: [{property: 'color', value: 'black'}]},
  {id: '8', name: 'iphone 4', warrantyPeriod:2, describes: [{property: 'color', value: 'black'}]},
];

const CTable = () => {


  const [rows, setRows] = React.useState(rows1);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [openDialog, setOpenDialog] = React.useState(false);

  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: 'rgb(243, 244, 246)',
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));


  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>

    <Create open={openDialog} handleClose={handleCloseDialog} rows={rows} setRows={setRows} />
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <StyledTableCell>  <Button variant="contained" onClick={handleClickOpenDialog}>+ Thêm</Button> </StyledTableCell>
            <StyledTableCell>Id</StyledTableCell>
            <StyledTableCell align="right">Tên</StyledTableCell>
            <StyledTableCell align="right">Thời hạn bảo hành</StyledTableCell>
            <StyledTableCell align="right">Delete</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows)
          .map((row) => (
            <Row key={row.id} row={row} setRows={setRows} rows={rows} />
          ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 74 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination count={rows.length} rowsPerPage={rowsPerPage} rowsPerPageOptions={[5, 10, 25]} page={page} onPageChange={handleChangePage} onRowsPerPageChange={handleChangeRowsPerPage}/>
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
    </>
  );
}

export default CTable;