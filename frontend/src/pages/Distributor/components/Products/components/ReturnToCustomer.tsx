import React, { FC } from 'react'
import Product1 from '../../../../../types/Product1';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Button, Divider, Stack, TextField, Typography } from '@mui/material';
import CategoryIcon from '@mui/icons-material/Category';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import ProductLine from '../../../../../data/entities/ProductLine';
import DefTextField from '../../../../../components/DefTextField';
import DefNumTextField from '../../../../../components/DefNumTextField';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import { phoneRegExp } from '../../../../../untils/Reg';
import { ProductStatus1 } from '../../../../../types/ProductStatus1';

type propTypes = {
    open: boolean,
    setOpenDialog: any,
    rows: Product1[],
    setRows: Function,
    row: Product1,
 }


const ReturnToCustomer: FC<propTypes> = (props) => {
    const {open, setOpenDialog, rows, setRows, row} = props


    const onSubmit = () => {
      const index = rows.indexOf(row);
      const newRows = [...rows];

      newRows[index].status = ProductStatus1.Sold
      setRows(newRows);
      setOpenDialog(false)
    }

  return (
    <Dialog open={open} fullWidth>
    <DialogTitle>
        <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
             <ShoppingCartCheckoutIcon/>
            <Typography variant="h4">Bán hàng</Typography>
        </Stack>
    </DialogTitle>
    <DialogContent>
    <Stack
          direction="row"
          justifyContent="center"
          divider={<Divider orientation="vertical" flexItem />}
        >
        <Stack spacing={4} justifyContent="center" alignItems = "center" margin={2} flex={1}>
        <DialogContentText>
         Thông tin sản phẩm
      </DialogContentText>
        <TextField
                fullWidth
                label={'Id'}
                name={'id'}
                type={'id'}
                value={row.id}
                variant="outlined"
                disabled
            />
            <TextField
                fullWidth
                label={'Id dòng sản phẩm'}
                name={'productLineId'}
                type={'productLineId'}
                value={row.productLineId}
                variant="outlined"
                disabled
            />
        </Stack>
        <Stack spacing={4} justifyContent="center" alignItems = "center" margin={2} flex={1}>
        <DialogContentText>
         Thông tin nơi sản xuất
      </DialogContentText>
      <TextField
                fullWidth
                label={'Id nơi sản xuất'}
                name={'factoryId'}
                type={'factoryId'}
                value={row.factoryId}
                variant="outlined"
                disabled
            />
            <TextField
                fullWidth
                label={'Thời gian sản xuất'}
                name={'dateOfManufacture'}
                type={'dateOfManufacture'}
                value={row.dateOfManufacture.toLocaleString()}
                variant="outlined"
                disabled
            />
        </Stack>
        </Stack>

        <Stack spacing={4} justifyContent="center" alignItems = "center" margin={2}>
        <DialogContentText>
         Thông tin khách hàng
      </DialogContentText>
      <TextField
                fullWidth
                label={'Tên khách hàng'}
                value={row.customer?.name}
                variant="outlined"
                disabled
            />
            <TextField
                fullWidth
                label={'Số điện thoại'}
                value={row.customer?.phone}
                variant="outlined"
                disabled
            />
            <TextField
                fullWidth
                label={'Thời gian bán'}
                value={row.saleDate?.toLocaleString()}
                variant="outlined"
                disabled
            />
        </Stack>
    </DialogContent>
    <DialogActions >
      <Button onClick={() => {setOpenDialog(false)}} variant="outlined">Hủy</Button>
      <Button variant="contained" onClick={onSubmit}>Xác nhận</Button>
    </DialogActions>
  </Dialog>
  )
}

export default ReturnToCustomer