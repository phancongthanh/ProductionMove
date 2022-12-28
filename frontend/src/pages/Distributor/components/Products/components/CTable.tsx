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
import Product1, { Customer } from '../../../../../types/Product1';
import { ProductStatus1 } from '../../../../../types/ProductStatus1';
import Product from '../../../../../data/entities/Product';
import { ProductStatus } from '../../../../../data/enums/ProductStatus';



const customer: Customer = {
  phone: '1',
  name: 'A'
}

let rows1: Product1[] = [
  {id: 1, status: ProductStatus1.JustImported, dateOfManufacture: new Date(), saleDate: null, productLineId: 'line 1', factoryId: '1', distributionId: '1', customer: null},
  {id: 2, status: ProductStatus1.Sold, dateOfManufacture: new Date(), saleDate: new Date(), productLineId: 'line 2', factoryId: '2', distributionId: '2', customer},
  {id: 3, status: ProductStatus1.Waiting, dateOfManufacture: new Date(), saleDate: new Date(), productLineId: 'line 3', factoryId: '3', distributionId: '3', customer},
  {id: 4, status: ProductStatus1.JustImported, dateOfManufacture: new Date(), saleDate: new Date(), productLineId: 'line 4', factoryId: '4', distributionId: '4', customer},
  {id: 5, status: ProductStatus1.JustImported, dateOfManufacture: new Date(), saleDate: new Date(), productLineId: 'line 5', factoryId: '5', distributionId: '5', customer},
]

const CTable = () => {


  const [rows, setRows] = React.useState(rows1);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

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

  const onSubmit = () => {
    alert(JSON.stringify(rows))
  }

  return (
    <>
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <StyledTableCell></StyledTableCell>
            <StyledTableCell>Id</StyledTableCell>
            <StyledTableCell align="right">Dòng</StyledTableCell>
            <StyledTableCell align="right">Trạng thái</StyledTableCell>
            <StyledTableCell align="right">Tên khách hàng</StyledTableCell>
            <StyledTableCell align="right">Số điện thoại</StyledTableCell>
            <StyledTableCell align="right">Ngày bán</StyledTableCell>
            <StyledTableCell align="right">Hàng động</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows)
          .map((row, index) => (
            <Row key={row.id} index={index} row={row} setRows={setRows} rows={rows} />
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
    <Box sx = {{margin: 2, display:'flex', justifyContent: 'flex-end'}}>
      <Button variant="contained" onClick={onSubmit}>Cập nhập</Button>
    </Box>
    </>
  );
}

export default CTable;