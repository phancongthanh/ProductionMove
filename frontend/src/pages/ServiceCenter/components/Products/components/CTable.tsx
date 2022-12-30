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
import Product from '../../../../../data/entities/Product';
import useLoading from '../../../../../hooks/useLoading';
import backend from '../../../../../backend';
import Filter from '../../../../../data/models/Filter';

/*
const customer: Customer = {
  phone: '1',
  name: 'A'
}

let rows1: Product1[] = [
  {id: 1, status: ProductStatus1.JustProduced, dateOfManufacture: new Date(), saleDate: new Date(), productLineId: 'line 1', factoryId: '1', distributionId: '1', customer},
  {id: 2, status: ProductStatus1.JustProduced, dateOfManufacture: new Date(), saleDate: new Date(), productLineId: 'line 2', factoryId: '2', distributionId: '2', customer},
  {id: 3, status: ProductStatus1.JustProduced, dateOfManufacture: new Date(), saleDate: new Date(), productLineId: 'line 3', factoryId: '3', distributionId: '3', customer},
  {id: 4, status: ProductStatus1.JustProduced, dateOfManufacture: new Date(), saleDate: new Date(), productLineId: 'line 4', factoryId: '4', distributionId: '4', customer},
  {id: 5, status: ProductStatus1.JustProduced, dateOfManufacture: new Date(), saleDate: new Date(), productLineId: 'line 5', factoryId: '5', distributionId: '5', customer},
]
*/

const CTable = (props: {filters: Filter}) => {
  const [total, setTotal] = React.useState(0);
  const [rows, setRows] = React.useState<Product[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const { setLoading } = useLoading();

  const loadPage = (pageNumber: number, pageSize: number) => {
    pageNumber++;
    if (pageNumber <= 0 || pageSize <= 0) return;
    setLoading(true);
    backend.products.getProductsWithFilter(pageNumber, pageSize, props.filters)
    .then(ps => {
      setLoading(false);
      setTotal(ps.totalCount);
      setPage(pageNumber-1);
      setRowsPerPage(pageSize);
      setRows(ps.items);
    }).catch(() => setLoading(false));
  }

  React.useEffect(() => {
    loadPage(0, rowsPerPage);
  }, [props.filters])

  //const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - total) : 0;

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
    loadPage(newPage, rowsPerPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setPage(0);
    loadPage(0, newRowsPerPage);
  };
  /*
  const { enqueueSnackbar } = useSnackbar();

  const filterSubmit = (row: Product1) => {
    if(row.status === ProductStatus1.Canceled || row.status === ProductStatus1.Waiting) return true;
    return false
  }

  const getSubmit = (row: Product1) => { 
      return {
        productId: row.id,
        isSuccessed: row.status === ProductStatus1.Canceled ? false : true,
      }
  }
  
  const onSubmit = () => {
    const Success =  rows.filter(filterSubmit).map(getSubmit)
    alert(JSON.stringify(Success))
    if(Success.length !== 0) enqueueSnackbar('Hoàn tất thay đổi',{variant: 'success', anchorOrigin: { horizontal: 'right' , vertical: 'top'}});
    else enqueueSnackbar('Không có thay đổi nào',{variant: 'info', anchorOrigin: { horizontal: 'right' , vertical: 'top'}});
  }
  */

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
            <StyledTableCell align="right">Ngày sản xuất</StyledTableCell>
            <StyledTableCell align="right">Hành động</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {
          /*
          (rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows)
          */
          rows.map((row) => (
            <Row key={row.id} row={row} reload={() => loadPage(page, rowsPerPage)} />
          ))
        }
          {emptyRows > 0 && (
            <TableRow style={{ height: 74 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination count={total} rowsPerPage={rowsPerPage} rowsPerPageOptions={[5, 10, 25]} page={page} onPageChange={handleChangePage} onRowsPerPageChange={handleChangeRowsPerPage}/>
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
    {
      /*
      <Box sx = {{margin: 2, display:'flex', justifyContent: 'flex-end'}}>
        <Button variant="contained" onClick={onSubmit}>Cập nhập</Button>
      </Box>
      */
    }
    </>
  );
}

export default CTable;