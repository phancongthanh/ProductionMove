import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, Divider, FormControl, InputLabel, MenuItem, Select, Stack, TextField, Typography, Container } from '@mui/material';
import DefTextField from '../../../../../components/DefTextField';
import { phoneRegExp } from '../../../../../untils/Reg';
import useLoading from '../../../../../hooks/useLoading';
import backend from '../../../../../backend';
import { RoleSchema } from '../../../../../data/enums/RoleSchema';
import useBuildings from '../../../../../hooks/useBuildings';
import { useSnackbar } from 'notistack';

const CreateAccount = () => {

  const { loading, setLoading } = useLoading();
  const { buildings } = useBuildings();
  const { enqueueSnackbar } = useSnackbar();

  const getBuildings = () => {
    switch(formik.values.role) {
      case RoleSchema.Factory: return buildings?.factories;
      case RoleSchema.Distributor: return buildings?.distributors;
      case RoleSchema.ServiceCenter: return buildings?.serviceCenters;
      default: return null;
    }
  }
  
  const formik = useFormik({
    initialValues: {
      userName: '',
      password: '',
      name: '',       
      phone: '',
      email: '',
      role: RoleSchema.Factory,   
      buildingId: ''  
    },
    validationSchema: Yup.object({
    userName: Yup
        .string()
        .max(255)
        .required('Cần điền userName'),
    password: Yup
        .string()
        .max(255)
        .required('Cần điền password'),
    name: Yup
        .string()
        .max(255)
        .required('Cần điền tên'),
    phone: Yup
        .string()
        .matches(phoneRegExp, 'Không phải định dạng SĐT')
        .max(255)
        .required('Cần điền số điện thoại'),
      
    email: Yup
        .string()
        .email('Không phải email')
        .max(255)
        .required('Cần điền email'),
    role: Yup
        .string()
        .max(255)
        .required('Cần điền vai trò'),
    building: Yup
        .string()
        .max(255)
        .notRequired()
    }),
    onSubmit: (values, { resetForm }) => {
      if (loading) return;
      setLoading(true);
      const newValues = {...values, userId: ''}
      backend.users.createUser(newValues, values.password)
        .then(() => {
          setLoading(false);
          enqueueSnackbar('Đã cập nhật!', {variant: 'success', anchorOrigin: { horizontal: 'right' , vertical: 'top'}});
          resetForm();
        })
        .catch(() => {
          setLoading(false);
          enqueueSnackbar('Có lỗi xảy ra!', {variant: 'error', anchorOrigin: { horizontal: 'right' , vertical: 'top'}});
        });
    }
  })

  return (
  <div className='mainContent'>
    <div className='header'>
      <div className='title'>Cấp tài khoản</div>
    </div>
    <form onSubmit={formik.handleSubmit}>
      <Container sx={{minWidth: '70%'}}>
        <Box sx={{ display: {md: 'flex', sm: 'block'}, border: '1px solid lightgrey', borderRadius: 2 , boxShadow: 3, padding: '10px', alignSelf: 'center'}}>
          <Typography variant="h4" sx={{flex: 1, margin: '20px'}}>Thông tin cơ bản</Typography>
          <Divider orientation="vertical" variant="middle" flexItem />
          <Stack sx={{flex: 2, padding: '20px'}} spacing={2} >
            <DefTextField formik={formik} label={'Username'} name={'userName'} required />
            <DefTextField formik={formik} label={'Password'} name={'password'} required />
            <DefTextField formik={formik} label={'Họ và tên'} name={'name'} required />
            <DefTextField formik={formik} label={'Số điện thoại'} name={'phone'} required />
            <DefTextField formik={formik} label={'Email'} name={'email'} required />
          </Stack>
        </Box>
        <Box sx={{ display: {md: 'flex', sm: 'block'}, border: '1px solid lightgrey', borderRadius: 2 , boxShadow: 3, padding: '10px', alignSelf: 'center', marginTop: '40px'}}>
          <Typography variant="h4" sx={{flex: 1, margin: '20px'}}>Thông tin công việc</Typography>
          <Divider orientation="vertical" variant="middle" flexItem />
          <Stack sx={{flex: 2, padding: '20px'}} spacing="20px">
            <FormControl>
              <InputLabel id="role" required>Vai trò</InputLabel>
              <Select labelId="role" name='role' value={formik.values.role} label="Vai trò" onChange={formik.handleChange} required>
                <MenuItem value={RoleSchema.Factory}>{RoleSchema.Factory}</MenuItem>
                <MenuItem value={RoleSchema.Distributor}>{RoleSchema.Distributor}</MenuItem>
                <MenuItem value={RoleSchema.ServiceCenter}>{RoleSchema.ServiceCenter}</MenuItem>
              </Select>
            </FormControl>
            <FormControl>
              <InputLabel id="buildingId" required>Nơi làm việc</InputLabel>
              <Select labelId="buildingId" name='buildingId' value={formik.values.buildingId} label="Nơi làm việc"
                onChange={formik.handleChange} disabled={formik.values.role ? false : true} required>
                {getBuildings()?.map(b => <MenuItem key={b.id} value={b.id}>{b.name}</MenuItem>)}
              </Select>
            </FormControl>
          </Stack>
        </Box>
        <Stack direction='row' spacing="20px" sx={{justifyContent: 'space-between', marginTop: '40px', }}>
          <Button variant="outlined" onClick={(e) => formik.handleReset(e)}>Làm mới</Button>
          <Button variant="contained" type="submit">Tạo</Button>
        </Stack>
      </Container>
    </form>
  </div>
  )

}

export default CreateAccount