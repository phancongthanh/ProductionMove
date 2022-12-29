import * as React from 'react';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import DeleteIcon from '@mui/icons-material/Delete';
import Edit from './Edit';
import { styled } from '@mui/material';
import { FC } from 'react';
import User from '../../../../../data/models/User';
import useLoading from '../../../../../hooks/useLoading';
import backend from '../../../../../backend';
import { RoleSchema } from '../../../../../data/enums/RoleSchema';

type propTypes = {
  row: User,
  rows: User[],
  setRows: Function,
}

const Row: FC<propTypes> = (props) => {

  const {row, rows, setRows } = props;
  const { loading, setLoading } = useLoading();
  
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
      if (!rows.some(u => u.role == RoleSchema.Administrator && u.userId != row.userId)) {
        alert("Không thể xóa hết admin");
        return;
      }
      else {
        setLoading(true);
        console.log(row.userId)
        backend.users.deleteUser(row.userId)
        .then(() => {
          setLoading(false);
          setRows(rows.filter(item => item !== row));
        }).catch(() => setLoading(false))
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
            {row.userId}
          </TableCell>
          <TableCell align="right">{row.name}</TableCell>
          <TableCell align="right">{row.email}</TableCell>
          <TableCell align="right">{row.phone}</TableCell>
          <TableCell align="right">{row.role}</TableCell>
          <TableCell align="right">{row.buildingId}</TableCell>
          <TableCell align="right">
            <IconButton  onClick={handleDelete}>
              <DeleteIcon color='error' />
            </IconButton>
          </TableCell>
        </StyledTableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Edit row={row} rows={rows} setRows={setRows} setOpen={setOpen}/>
            </Collapse>
          </TableCell>
        </TableRow>
      </>
    );
  }

export default Row
