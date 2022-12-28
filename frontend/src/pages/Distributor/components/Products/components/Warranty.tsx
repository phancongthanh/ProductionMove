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
import ConstructionIcon from '@mui/icons-material/Construction';
import { phoneRegExp } from '../../../../../untils/Reg';
import { ProductStatus1 } from '../../../../../types/ProductStatus1';

type propTypes = {
    open: boolean,
    setOpenDialog: any,
    rows: Product1[],
    setRows: Function,
    row: Product1,
 }


const Warranty: FC<propTypes> = (props) => {
    const {open, setOpenDialog, rows, setRows, row} = props

    // const onClose = ({ resetForm }) => {
    //   handleClose()
    //   resetForm()
    // }

    const formik = useFormik({
        initialValues: {
            ServiceCenterId:''
        },
        validationSchema: Yup.object({
            ServiceCenterId: Yup.string().max(255).required("Cần điền id nơi bảo hành"),
        }),
        onSubmit: (values, { resetForm }) => {
          alert(JSON.stringify(values))
    
          const index = rows.indexOf(row);
          const newRows = [...rows];
          newRows[index].status = ProductStatus1.Warranty
          setRows(newRows);
          resetForm();
          setOpenDialog(false)
        },
      });

  return (
    <Dialog open={open} fullWidth>
    <DialogTitle>
        <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
             <ConstructionIcon/>
            <Typography variant="h4">Gửi bảo hành</Typography>
        </Stack>
    </DialogTitle>
    <form onSubmit={formik.handleSubmit}>
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
         Nhập nơi bảo hiểm
      </DialogContentText>
        <DefTextField
              formik={formik}
              label={"id nơi bảo hiểm"}
              name={"ServiceCenterId"}
              required
            />
        </Stack>
    </DialogContent>
    <DialogActions >
      <Button onClick={() => {setOpenDialog(false); formik.resetForm()}} variant="outlined">Hủy</Button>
      <Button variant="contained" type="submit">Xác nhận</Button>
    </DialogActions>
    </form>
  </Dialog>
  )
}

export default Warranty