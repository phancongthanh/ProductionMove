
import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, Container, Divider, FormHelperText, Grid, Stack, Tab, Tabs, TextField, Typography } from '@mui/material';
import Router from 'react-dom';
import useAuth from '../../hooks/useAuth';
import DefTextField from '../../components/DefTextField';
import LoginResponse from '../../data/models/LoginResponse';
import {RoleSchema} from '../../data/enums/RoleSchema';
import { useNavigate } from 'react-router-dom';


const login : LoginResponse = {
  user: {
    userId: '',
    userName: '',
    name: '',
    phone: '',
    email: '',
    role: RoleSchema.Administrator,
    buildingId: ''
  },
  refreshToken: '',
  accessToken: ''
}


const Login = () => {

    const {setAuth} = useAuth()
    const navigate = useNavigate()

    const navigateOnRole = (role: RoleSchema) => {
      if(role === RoleSchema.Administrator) return navigate('/admin/statistics', {replace : true})
      if(role === RoleSchema.Distributor) return navigate('/distributor/statistics', {replace : true})
      if(role === RoleSchema.Factory) return navigate('/factory/statistics', {replace : true})
      if(role === RoleSchema.ServiceCenter) return navigate('/service/statistics', {replace : true})
      return navigate('/Missing', {replace : true})
    }

    const formik = useFormik({
    initialValues: {
      userName: 'admin',
      password: 'admin'
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
        // alert(JSON.stringify(values))
        setAuth(login)
        navigateOnRole(login.user.role)
    }

  });
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: '100vh' }}
    >
      <Grid item xs={3}>
      <Box sx={{ border: '1px solid lightgrey', borderRadius: 2 , boxShadow: 3, padding: '10px', alignSelf: 'center', alignItems: 'center', display:'flex', flexDirection:'column'}}>
        <Typography variant="h5" sx={{flex: 1, margin: '20px'}}>Đăng nhập</Typography>
        <Divider variant="middle" flexItem />
        
        <Box sx={{flex: 2, padding: '50px', width: '80%'}}>
        <form onSubmit={formik.handleSubmit}>
            <DefTextField formik={formik} label={'Username'} name={'userName'} required/>
            <DefTextField formik={formik} label={'Password'} name={'password'} required/>
          <Button variant="contained" type="submit" fullWidth sx={{marginTop: '40px'}}>Đăng nhập</Button>
        </form>
        </Box>
      </Box>
      </Grid>
    </Grid>
  )
}

export default Login;