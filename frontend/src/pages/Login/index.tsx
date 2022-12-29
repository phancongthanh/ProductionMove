import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, Container, Divider, Grid, Stack, Typography } from '@mui/material';
import useAuth from '../../hooks/useAuth';
import DefTextField from '../../components/DefTextField';
import {RoleSchema} from '../../data/enums/RoleSchema';
import { useNavigate } from 'react-router-dom';
import user from '../../actions/user';

const Login = () => {

    const {setAuth} = useAuth()
    const navigate = useNavigate()

    const navigateOnRole = (role: RoleSchema) => {
      if(role === RoleSchema.Administrator) return navigate('/admin/productLine', {replace : true})
      if(role === RoleSchema.Distributor) return navigate('/distributor/statistics', {replace : true})
      if(role === RoleSchema.Factory) return navigate('/factory/statistics', {replace : true})
      if(role === RoleSchema.ServiceCenter) return navigate('/serviceCenter/statistics', {replace : true})
      return navigate('/Missing', {replace : true})
    }

    const formik = useFormik({
    initialValues: {
      userName: '',
      password: ''
    },
    validationSchema: Yup.object({
      userName: Yup
        .string()
        .min(5)
        .max(255)
        .required('Cần điền tài khoản'),
      password: Yup
        .string()
        .min(5)
        .max(255)
        .required('Cần điền mật khẩu')
    }),
    onSubmit: (values) => {
        console.log(values);
        user.login(values.userName, values.password)
        .then(login => {
          console.log(login);
          setAuth(login)
          navigateOnRole(login.user.role)
        })
        .catch(e => {
          if (e == 400) alert("Tài khoản hoặc mật khẩu không đúng");
        })
    }

  });
  return (
    <Container sx={{height: '100vh', alignItems: 'center', justifyContent: 'center', display:'flex'}}>
      <Box sx={{ border: '1px solid lightgrey', borderRadius: 2 , boxShadow: 3, padding: '10px', width:'50%', minWidth:'50vh', alignSelf: 'center', alignItems: 'center', display:'flex', flexDirection:'column'}}>
        <Typography variant="h5" sx={{flex: 1, margin: '20px'}}>Đăng nhập</Typography>
        <Divider variant="middle" flexItem />
        
        <Box sx={{flex: 2, padding: '50px', width: '80%'}} justifyContent={'center'} alignItems="center">
        <form onSubmit={formik.handleSubmit}>
          <Stack spacing={2} sx={{minWidth: '100%'}} justifyContent={'center'}>
            <DefTextField formik={formik} label={'Username'} name={'userName'} required/>
            <DefTextField formik={formik} label={'Password'} name={'password'} required/>
          </Stack>
          <Button variant="contained" type="submit" fullWidth  sx={{marginTop: '60px'}}>Đăng nhập</Button>
        </form>
        </Box>
      </Box>
    </Container>
  )
}

export default Login;