import React, { FC, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useFormik } from 'formik';
import DeleteIcon from '@mui/icons-material/Delete';
import ClearIcon from '@mui/icons-material/Clear';
import * as Yup from 'yup';
import { Box, Button, Divider, FormControl, IconButton, InputLabel, MenuItem, Select, Stack, TextField, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Container } from '@mui/system';
import DefTextField from '../../../../../components/DefTextField';
import { phoneRegExp } from '../../../../../untils/Reg';
import { User } from './types';

type propTypes = {
    row: User,
    rows: User[],
    setRows: Function, 
    setOpen: Function
 }

const Edit: FC<propTypes> = (props) => {

    const {row, rows, setRows , setOpen} = props;

    const formik = useFormik({
        initialValues: {
          userName: row.userName,
          password: row.password,
          name: row.name,
          email: row.email,
          phone: row.phone,
          role: row.role,
          building: '',

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
            .email('Không phải Email')
            .max(255)
            .required('Cần điền email'),
        role: Yup
            .string()
            .max(255)
            .required('Cần điền vai trò'),
        building: Yup
            .string()
            .max(255)
            .required('Cần điền id chỗ làm việc'),
        }),
        onSubmit: (values, { resetForm }) => {
            // alert(JSON.stringify(values))
            
            const index = rows.indexOf(row);
            const newRows = [...rows]
            newRows[index].userName = values.userName
            newRows[index].password = values.password
            newRows[index].name = values.name
            newRows[index].phone = values.phone
            newRows[index].email = values.email
            newRows[index].role = values.role
            newRows[index].building = values.building
            setRows(newRows)
        }
    })

    return (
       <>
            <Box sx={{ borderBottom: 1 }}>
                <Typography sx={{ fontSize: 20 }}>Mô tả chi tiết</Typography>
            </Box>
            <form onSubmit={formik.handleSubmit}>
                <Stack sx={{ padding: 4}} direction='row' divider={<Divider orientation="vertical" flexItem/>}>
                    <Stack sx={{ padding: 4 }} alignItems='center' spacing={2} flex={1}>
                        <Typography sx={{ fontSize: 18 }}>Tài khoản</Typography>
                        <DefTextField formik={formik} label={'Username'} name={'userName'} required />
                        <DefTextField formik={formik} label={'Password'} name={'password'} required />
                    </Stack>
                    <Stack sx={{ padding: 4 }} alignItems='center' spacing={2} flex={2}>
                       <Typography sx={{ fontSize: 18 }}>Cơ bản</Typography>
                       <DefTextField formik={formik} label={'Email'} name={'email'} required />
                       <DefTextField formik={formik} label={'Số điện thoại'} name={'phone'} required />
                    </Stack>
                    <Stack sx={{ padding: 4 }} alignItems='center' spacing={2} flex={1}>
                      <Typography sx={{ fontSize: 18 }}>Công việc</Typography>
                        <FormControl fullWidth>
                            <InputLabel id="type" required>Vai trò</InputLabel>
                            <Select
                                labelId="type"
                                name='type'
                                value={formik.values.role}
                                label="Vai trò"
                                onChange={formik.handleChange}
                                required
                            >
                                <MenuItem value={"Factory"}>Factory</MenuItem>
                                <MenuItem value={"Distributor"}>Distributor</MenuItem>
                                <MenuItem value={"ServiceCenter"}>ServiceCenter</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl fullWidth>
                        <InputLabel id="building" required>Nơi làm việc</InputLabel>
                        <Select
                            labelId="building"
                            name='building'
                            value={formik.values.building}
                            label="Nơi làm việc"
                            onChange={formik.handleChange}
                            disabled={formik.values.role ? false : true}
                            required
                        >
                            <MenuItem value={"building 1"}>building 1</MenuItem>
                            <MenuItem value={"building 2"}>building 2</MenuItem>
                            <MenuItem value={"building 3"}>building 3</MenuItem>
                            <MenuItem value={"building 4"}>building 4</MenuItem>
                        </Select>
                        </FormControl>
                    </Stack>
                    {/* <DefTextField formik={formik} label={'Tên'} name={'name'} required />
                    <DefTextField formik={formik} label={'Địa chỉ'} name={'address'} required /> */}
                    {/* <FormControl sx={{width: '400px'}}>
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
                    </FormControl> */}
                </Stack>
             {/* <IconButton color='success' sx={{justifyContent: 'center', alignItems: 'center', width: '100%'}} onClick={() => addDesc()}><AddIcon/></IconButton> */}
            <Stack spacing={2} sx={{ borderTop: 1, padding: 2 }} direction="row">
                <Button variant="contained" type='submit'>Cập nhập</Button>
                <Button variant="outlined" onClick={() => {setOpen(false)}}>Hủy</Button>
            </Stack>
            </form>
       </>
    )
}

Edit.propTypes = { 
}


export default Edit