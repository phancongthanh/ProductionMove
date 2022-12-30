import { FC } from 'react'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Button, Divider, Stack, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import DefTextField from '../../../../../components/DefTextField';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import { phoneRegExp } from '../../../../../untils/Reg';
import Product from '../../../../../data/entities/Product';
import backend from '../../../../../backend';
import useLoading from '../../../../../hooks/useLoading';
import { useSnackbar } from 'notistack';

type propTypes = {
    open: boolean,
    setOpenDialog: any,
    row: Product,
    reload: () => void
 }


const Sold: FC<propTypes> = (props) => {
    const {open, setOpenDialog, row, reload} = props
    const { setLoading } = useLoading();
    const { enqueueSnackbar } = useSnackbar();
    // const onClose = ({ resetForm }) => {
    //   handleClose()
    //   resetForm()
    // }

    const formik = useFormik({
        initialValues: {
            name: '',
            phone: '',
            saleDate: new Date()
        },
        validationSchema: Yup.object({
            name: Yup.string().max(255).required("Cần điền tên khác hàng"),
            phone: Yup.string().matches(phoneRegExp, "Không phải định dạng SĐT").max(255).required("Cần điền SĐT khác hàng"),
        }),
        onSubmit: (values, { resetForm }) => {
          var customer = {
            name: values.name,
            phone: values.phone
          };
          setLoading(true);
          backend.products.sellProduct(row.id, customer)
          .then(() => {
            setLoading(false);
            enqueueSnackbar('Đã cập nhật!', {variant: 'success', anchorOrigin: { horizontal: 'right' , vertical: 'top'}});
            reload();
            resetForm();
            setOpenDialog(false)
          }).catch(e => {
            setLoading(false);
            enqueueSnackbar('Có lỗi xảy ra!', {variant: 'error', anchorOrigin: { horizontal: 'right' , vertical: 'top'}});
            console.log(e);
            setOpenDialog(false)
            reload();
          });
        },
      });

  return (
    <Dialog open={open} fullWidth>
    <DialogTitle>
        <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
             <ShoppingCartCheckoutIcon/>
            <Typography variant="h4">Bán hàng</Typography>
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
                value={new Date(row.dateOfManufacture).toLocaleString()}
                variant="outlined"
                disabled
            />
        </Stack>
        </Stack>

        <Stack spacing={4} justifyContent="center" alignItems = "center" margin={2}>
        <DialogContentText>
         Nhập thông tin khách hàng
      </DialogContentText>
        <DefTextField
              formik={formik}
              label={"Tên khách hàng"}
              name={"name"}
              required
            />
            <DefTextField
              formik={formik}
              label={"Số điện thoại"}
              name={"phone"}
              required
            />
            <TextField
                fullWidth
                label={'Thời gian bán'}
                name={'saleDate'}
                type={'saleDate'}
                value={formik.values.saleDate.toLocaleString()}
                variant="outlined"
                disabled
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

export default Sold