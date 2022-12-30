import React, { FC } from 'react'
import PropTypes from 'prop-types'
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Button, Stack, Typography, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import CategoryIcon from '@mui/icons-material/Category';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import ProductLine from '../../../../../data/entities/ProductLine';
import DefTextField from '../../../../../components/DefTextField';
import DefNumTextField from '../../../../../components/DefNumTextField';
import { Building } from './types';
import backend from '../../../../../backend';
import useLoading from '../../../../../hooks/useLoading';
import { useSnackbar } from 'notistack';


type propTypes = {
    open: boolean,
    handleClose: any,
    rows: Building[],
    setRows: Function,
 }



const Create: FC<propTypes> = (props) => {
    const {open, handleClose, rows, setRows} = props;
    const { loading, setLoading } = useLoading();
    const { enqueueSnackbar } = useSnackbar();

    // const onClose = ({ resetForm }) => {
    //   handleClose()
    //   resetForm()
    // }

    const formik = useFormik({
        initialValues: {
          id: '',
          name: '',
          address: '',
          type: ''
        },
        validationSchema: Yup.object({
        id: Yup
            .string()
            .required('Cần điền id cơ sở'),
        name: Yup
            .string()
            .required('Cần điền tên cơ sở'),
        address: Yup
            .string()
            .required('Cần điền địa chỉ cơ sở'),
        type: Yup
            .string()
        }),
        onSubmit: (values, { resetForm }) => {
            if (loading) return;
            setLoading(true);
            backend.buildings.createBuilding(values.type, values)
            .then(() => {
                setLoading(false);
                enqueueSnackbar('Đã cập nhật!', {variant: 'success', anchorOrigin: { horizontal: 'right' , vertical: 'top'}});
                setRows([values, ...rows]);
                handleClose();
                resetForm();
            }).catch(e => {
                setLoading(false);
                if (e == 400) enqueueSnackbar('Id hoặc tên cơ sở bị trùng!', {variant: 'error', anchorOrigin: { horizontal: 'right' , vertical: 'top'}});
                else enqueueSnackbar('Có lỗi xảy ra!', {variant: 'error', anchorOrigin: { horizontal: 'right' , vertical: 'top'}});
            })
        }
    })

  return (
    <Dialog open={open} fullWidth>
    <DialogTitle>
        <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
            <CategoryIcon/>
            <Typography variant="h4">Tạo mới</Typography>
        </Stack>
    </DialogTitle>
    <form onSubmit={formik.handleSubmit}>
    <DialogContent>
      <DialogContentText>
         Tạo mới một cơ sở
      </DialogContentText>
        <Stack spacing={4} justifyContent="center" alignItems = "center" margin={2}>
          <DefTextField formik={formik} label={'Id'} name={'id'} required/>
          <DefTextField formik={formik} label={'Tên'} name={'name'} required/>
          <DefTextField formik={formik} label={'Địa chỉ'} name={'address'} required/>
          <FormControl fullWidth>
              <InputLabel id="type" required>Loại</InputLabel>
              <Select
                  labelId="type"
                  name='type'
                  value={formik.values.type}
                  label="Loại"
                  onChange={formik.handleChange}
                  required
              >
                  <MenuItem value={"Factory"}>Factory</MenuItem>
                  <MenuItem value={"Distributor"}>Distributor</MenuItem>
                  <MenuItem value={"ServiceCenter"}>ServiceCenter</MenuItem>
              </Select>
          </FormControl>
        </Stack>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose} variant="outlined">Hủy</Button>
      <Button variant="contained" type="submit">Tạo</Button>
    </DialogActions>
    </form>
  </Dialog>
  )
}



export default Create