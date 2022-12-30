import { useFormik } from "formik";
import * as Yup from 'yup';
import { Box, Button, Container, Divider, FormControl, InputLabel, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";
import DefTextField from "../../../../components/DefTextField";
import DefNumTextField from '../../../../components/DefNumTextField';
import {useState, useEffect} from 'react';
import useAuth from "../../../../hooks/useAuth";
import useLoading from "../../../../hooks/useLoading";
import backend from "../../../../backend";
import useProductLines from "../../../../hooks/useProductlines";
import useBuildings from "../../../../hooks/useBuildings";
import { useSnackbar } from "notistack";

const Distribution = () => {
  const { auth } = useAuth();
  const { setLoading } = useLoading();
  const { buildings } = useBuildings();
  const { productLines } = useProductLines();
  const [quantity, setQuantity] = useState(1);
  const { enqueueSnackbar } = useSnackbar();

  const formik = useFormik({
    initialValues: {
      factoryId: '',
      productLineId: '',
      fromId: NaN,
      toId: NaN,
    },
    validationSchema: Yup.object({
    factoryId: Yup
      .string()
      .max(255)
      .required('Cần điền id nơi phân phối'),
    productLineId: Yup
        .string()
        .max(255)
        .required('Cần điền id dòng sản phẩm'),
    fromId: Yup
        .number()
        .typeError('Từ ID phải là số')
        .required('Cần điền từ ID'),
    toId: Yup
        .number()
        .typeError('Đến ID phải là số')
        .required('Cần điền đến ID'),
    }),
    onSubmit: (values, { resetForm }) => {
      if (auth == null) return;
      setLoading(true);
      backend.distributions.addDistribution(values.factoryId, auth.user.buildingId, values.productLineId, values.fromId, values.toId)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Đã cập nhật!', {variant: 'success', anchorOrigin: { horizontal: 'right' , vertical: 'top'}});
        resetForm();
      }).catch(() => {
        setLoading(false);
        enqueueSnackbar('Không có sản phẩm nào để nhập!', {variant: 'error', anchorOrigin: { horizontal: 'right' , vertical: 'top'}});
      })
    }
  })
  
  const handleQuantityChange = (value: string) => {
    if(!isNaN(Number(value))) setQuantity(Number(value))
  }

  const handleQuantityBlur = () => {
    if(!isNaN(formik.values.fromId)) {
      formik.setFieldValue( 'toId' ,Number(formik.values.fromId) + quantity - 1)
    }
  }

  useEffect(() => {
    formik.setFieldValue( 'toId' ,Number(formik.values.fromId) + quantity - 1)
  }, [formik.values.fromId])

  useEffect(() => {
    if(!isNaN(Number(formik.values.fromId)))
    setQuantity(Number(formik.values.toId) - Number(formik.values.fromId) + 1)
  }, [formik.values.toId])

  return (
    <div className="mainContent">
      <div className="header">
        <div className="title">Nhập sản phẩm</div>
      </div>
      <Container sx={{minWidth: '70%'}}>
      <form onSubmit={formik.handleSubmit}>
      <Box sx={{ display: {md: 'flex', sm: 'block'}, border: '1px solid lightgrey', borderRadius: 2 , boxShadow: 3, padding: '10px', alignSelf: 'center'}}>
        <Typography variant="h4" sx={{flex: 1, margin: '20px'}}>Thông tin</Typography>
        <Divider orientation="vertical" variant="middle" flexItem />
        <Stack sx={{flex: 2, padding: '20px'}} spacing={2} >
          {/*
          <DefTextField formik={formik} label={'Id nơi sản xuất'} name={'factoryId'} required />
          <DefTextField formik={formik} label={'Id dòng sản phẩm'} name={'productLineId'} required />
          */}
          <FormControl sx={{width: '100%'}}>
            <InputLabel id="factoryId" required>Nơi sản xuất</InputLabel>
            <Select labelId="factoryId" name='factoryId' value={formik.values.factoryId} label="Nơi sản xuất" onChange={formik.handleChange} required>
                {buildings?.factories.map(f => <MenuItem key={f.id} value={f.id}>{f.name}</MenuItem>)}
            </Select>
          </FormControl>
          <FormControl sx={{width: '100%'}}>
            <InputLabel id="productLineId" required>Dòng sản phẩm</InputLabel>
            <Select labelId="productLineId" name='productLineId' value={formik.values.productLineId} label="Dòng sản phẩm" onChange={formik.handleChange} required>
                {productLines?.map(pl => <MenuItem key={pl.id} value={pl.id}>{pl.name}</MenuItem>)}
            </Select>
          </FormControl>
          <Divider variant="middle" flexItem />
          <Stack spacing={2} direction='row' alignItems={'center'}>
          <TextField
              fullWidth
              label={'Số lượng'}
              name={'quantity'}
              onBlur={handleQuantityBlur}
              onChange={(e) => handleQuantityChange(e.target.value)}
              type={'quantity'}
              value={quantity}
              variant="outlined"
          />
            <DefNumTextField formik={formik} label={'Từ id'} name={'fromId'} required />
            <Divider sx ={{width:40}}  />
            <DefNumTextField formik={formik} label={'Đến id'} name={'toId'} required />
          </Stack>
        </Stack>
      </Box>
      <Stack direction='row' spacing="20px" sx={{justifyContent: 'space-between', marginTop: '40px'}}>
        <Button variant="outlined" onClick={(e) => {formik.handleReset(e); setQuantity(0)}}>Làm mới</Button>
        <Button variant="contained" type="submit">Tạo</Button>
      </Stack>
      </form>
      </Container>
    </div>
  );
};

Distribution.propTypes = {};

export default Distribution;
