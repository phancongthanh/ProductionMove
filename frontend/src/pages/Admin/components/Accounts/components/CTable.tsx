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
import { RoleSchema } from '../../../../../data/enums/RoleSchema';
import { User } from './types';


let rows1 : User[] = [
  {userId: '1' , userName : 'userName 1', password: 'password 1', name: 'name 1', email:'adolphus48@yahoo.com', phone:'485872892', role: RoleSchema.Distributor, building: 'building 1'},
  {userId: '2' , userName : 'userName 2', password: 'password 2', name: 'name 2', email:'email 2', phone:'phone 2', role: RoleSchema.Distributor, building: 'building 2'},
  {userId: '3' , userName : 'userName 3', password: 'password 3', name: 'name 3', email:'email 3', phone:'phone 3', role: RoleSchema.Distributor, building: 'building 3'},
  {userId: '4' , userName : 'userName 4', password: 'password 4', name: 'name 4', email:'email 4', phone:'phone 4', role: RoleSchema.Distributor, building: 'building 4'},
  {userId: '5' , userName : 'userName 5', password: 'password 5', name: 'name 5', email:'email 5', phone:'phone 5', role: RoleSchema.Distributor, building: 'building 5'},
];

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

  return (
    <>
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <StyledTableCell></StyledTableCell>
            <StyledTableCell>Id</StyledTableCell>
            <StyledTableCell align="right">Tên</StyledTableCell>
            <StyledTableCell align="right">Email</StyledTableCell>
            <StyledTableCell align="right">Số điện thoại</StyledTableCell>
            <StyledTableCell align="right">Vai trò</StyledTableCell>
            <StyledTableCell align="right">Cơ sở</StyledTableCell>
            <StyledTableCell align="right">Xóa</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows)
          .map((row) => (
            <Row key={row.userId} row={row} setRows={setRows} rows={rows} />
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