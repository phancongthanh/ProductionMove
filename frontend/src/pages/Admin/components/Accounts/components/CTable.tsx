import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled, TableFooter, TablePagination } from '@mui/material';
import Row from './Row';
import User from '../../../../../data/models/User';

const CTable = (props: {rows: User[], setRows: (users: User[]) => void}) => {
  const { rows, setRows } = props;
  
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