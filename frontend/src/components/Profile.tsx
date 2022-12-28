import React from 'react'
import PropTypes from 'prop-types'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, Divider, FormControl, InputLabel, MenuItem, Select, Stack, TextField, Typography, Container, Avatar } from '@mui/material';
import { phoneRegExp } from '../untils/Reg';
import DefTextField from './DefTextField';
import useAuth from '../hooks/useAuth';
import User from '../data/models/User';

const Profile = () => {

    const {auth, setAuth} = useAuth()
  
  const formik = useFormik({
    initialValues: {
      name: auth?.user.name,       
      phone: auth?.user.phone,
      email: auth?.user.email,
    },
    validationSchema: Yup.object({
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
        .email('Không phải Email')
        .max(255)
        .required('Cần điền email'),
    }),
    onSubmit: (values, { resetForm }) => {
        if(auth) {
        const newUser:User = {
            ...auth?.user,
            name: values.name ? values.name : auth?.user.name,
            phone: values.phone ? values.phone : auth?.user.phone,
            email: values.email ? values.email : auth?.user.email,
        }
        const newAuth = {...auth, user:{}}
        setAuth
        alert(JSON.stringify(values))
     }
    }
})

  return (
    <div className='mainContent'>
    <div className='header'>
      <div className='title'>Tài khoản</div>
      </div>
      <form onSubmit={formik.handleSubmit}>
        <Container sx={{minWidth: '70%'}}>
      <Box sx={{ display: {md: 'flex', sm: 'block'}, border: '1px solid lightgrey', borderRadius: 2 , boxShadow: 3, padding: '10px', alignSelf: 'center'}}>
        <Typography variant="h4" sx={{flex: 1, margin: '20px'}}>Thông tin cơ bản</Typography>
        <Avatar/>
        <Divider orientation="vertical" variant="middle" flexItem />
        <Stack sx={{flex: 2, padding: '20px'}} spacing={2} >
          <DefTextField formik={formik} label={'Họ và tên'} name={'name'} required />
          <DefTextField formik={formik} label={'Số điện thoại'} name={'phone'} required />
          <DefTextField formik={formik} label={'Email'} name={'email'} required />
        </Stack>
      </Box>
      <Stack direction='row' spacing="20px" sx={{justifyContent: 'flex-end', marginTop: '40px'}}>
        <Button variant="contained" type="submit">Lưu</Button>
      </Stack>
      </Container>
      </form>
  </div>
  )
}

export default Profile