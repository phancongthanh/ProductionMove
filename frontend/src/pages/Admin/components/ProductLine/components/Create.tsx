import React, { FC } from 'react'
import PropTypes from 'prop-types'
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Button, Stack, Typography } from '@mui/material';
import CategoryIcon from '@mui/icons-material/Category';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import ProductLine from '../../../../../data/entities/ProductLine';
import DefTextField from '../../../../../components/DefTextField';
import DefNumTextField from '../../../../../components/DefNumTextField';
import useLoading from '../../../../../hooks/useLoading';
import backend from '../../../../../backend';
import { useSnackbar } from 'notistack';

type propTypes = {
    open: boolean,
    handleClose: any,
    rows: ProductLine[],
    setRows: Function,
 }



const Create: FC<propTypes> = (props) => {
    const {open, handleClose, rows, setRows} = props

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
          warrantyPeriod: NaN,
        },
        validationSchema: Yup.object({
        id: Yup
            .string()
            .max(255)
            .required('Cần điền Id dòng sản phẩm'),
        name: Yup
            .string()
            .min(5)
            .max(255)
            .required('Cần điền tên dòng sản phẩm'),
        warrantyPeriod : Yup
            .number()
            .required('Cần điền thời hạn bảo hành')
            .typeError('Thời hạn bảo hành phải là số')
        }),
        onSubmit: (values, { resetForm }) => {
          if (loading) return;
          const productLine: ProductLine = {...values, describes:[]}
          setLoading(true);
          backend.productLines.createProductLine(productLine)
          .then(() => {
            setLoading(false);
            enqueueSnackbar('Đã cập nhật!', {variant: 'success', anchorOrigin: { horizontal: 'right' , vertical: 'top'}});
            handleClose();
            setRows([...rows, productLine]);
            resetForm();
          })
          .catch(() => {
            setLoading(false);
            enqueueSnackbar('Id hoặc tên dòng sản phẩm đã tồn tại!', {variant: 'error', anchorOrigin: { horizontal: 'right' , vertical: 'top'}});
          });
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
         Tạo mới một dòng sản phẩm
      </DialogContentText>
        <Stack spacing={4} justifyContent="center" alignItems = "center" margin={2}>
          <DefTextField formik={formik} label={'Id'} name={'id'} required/>
          <DefTextField formik={formik} label={'Tên'} name={'name'} required/>
          <DefNumTextField formik={formik} label={'Thời hạn bảo hành (ngày)'} name={'warrantyPeriod'} required/>
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