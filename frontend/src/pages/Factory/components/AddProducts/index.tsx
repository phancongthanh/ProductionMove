import { useFormik } from "formik";
import * as Yup from 'yup';
import { Box, Button, Container, Divider, FormControl, InputLabel, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";
import DefTextField from "../../../../components/DefTextField";
import DefNumTextField from '../../../../components/DefNumTextField';
import {useState, useEffect} from 'react';
import useLoading from "../../../../hooks/useLoading";
import backend from "../../../../backend";
import useProductLines from "../../../../hooks/useProductlines";

const AddProducts = () => {
  const [quantity, setQuantity] = useState(1)
  const { setLoading } = useLoading();
  const { productLines } = useProductLines();
  
    const formik = useFormik({
      initialValues: {
        productLineId: '',
        fromId: NaN,
        toId: NaN,
      },
      validationSchema: Yup.object({
      productLineId: Yup
          .string()
          .max(255)
          .required('Cần điền id dòng sản phẩm'),
      fromId: Yup
          .number()
          .required('Cần điền từ ID'),
      toId: Yup
          .number()
          .required('Cần điền đến ID'),
      }),
      onSubmit: (values, { resetForm }) => {
          setLoading(true);
          backend.products.addProduct(values.productLineId, values.fromId, values.toId)
          .then(() => {
            setLoading(false);
            alert("Thành công");
            resetForm();
          }).catch(() => {
            setLoading(false);
            alert("Id các sản phẩm mới có thể bị trùng với các sản phẩm cũ!");
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
        <div className="title">Thêm sản phẩm</div>
      </div>
      <Container sx={{minWidth: '70%'}}>
      <form onSubmit={formik.handleSubmit}>
      <Box sx={{ display: {md: 'flex', sm: 'block'}, border: '1px solid lightgrey', borderRadius: 2 , boxShadow: 3, padding: '10px', alignSelf: 'center'}}>
        <Typography variant="h4" sx={{flex: 1, margin: '20px'}}>Thông tin</Typography>
        <Divider orientation="vertical" variant="middle" flexItem />
        <Stack sx={{flex: 2, padding: '20px'}} spacing={2} >
          {/*
          <DefTextField formik={formik} label={'Id dòng sản phẩm'} name={'productLineId'} required />
          */}
          <FormControl sx={{width: '100%'}}>
            <InputLabel id="productLineId" required>Dòng sản phẩm</InputLabel>
            <Select labelId="productLineId" name='productLineId' value={formik.values.productLineId} label="Dòng sản phẩm" onChange={formik.handleChange} required>
                {productLines?.map(pl => <MenuItem key={pl.id} value={pl.id}>{pl.name}</MenuItem>)}
            </Select>
          </FormControl>
          <Divider variant="middle" flexItem />
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
          <Stack spacing={2} direction='row' alignItems={'center'}>
            <DefNumTextField formik={formik} label={'Từ id'} name={'fromId'} required />
            <Divider sx ={{width:40}}  />
            <DefNumTextField formik={formik} label={'Đến id'} name={'toId'} required />
          </Stack>
        </Stack>
      </Box>
      <Stack direction='row' spacing="20px" sx={{justifyContent: 'space-between', marginTop: '40px', }}>
        <Button variant="outlined" onClick={(e) => formik.handleReset(e)}>Làm mới</Button>
        <Button variant="contained" type="submit">Tạo</Button>
      </Stack>
      </form>
      </Container>
    </div>
  );
};

AddProducts.propTypes = {};

export default AddProducts;
