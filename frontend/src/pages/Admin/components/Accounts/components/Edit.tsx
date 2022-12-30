import React, { FC, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Box, Button, Divider, FormControl, InputLabel,
  MenuItem, Select, Stack, TextField, Typography,
} from "@mui/material";
import DefTextField from "../../../../../components/DefTextField";
import { phoneRegExp } from "../../../../../untils/Reg";
import User from "../../../../../data/models/User";
import useLoading from "../../../../../hooks/useLoading";
import backend from "../../../../../backend";
import { useSnackbar } from "notistack";

type propTypes = {
  row: User;
  rows: User[];
  setRows: Function;
  setOpen: Function;
};

const Edit: FC<propTypes> = (props) => {
  const { row, rows, setRows, setOpen } = props;

  const { loading, setLoading } = useLoading();
  const { enqueueSnackbar } = useSnackbar();

  const formik = useFormik({
    initialValues: {
      userName: row.userName,
      password: "",
      name: row.name,
      email: row.email,
      phone: row.phone,
      role: row.role,
      buildingId: row.buildingId,
    },
    validationSchema: Yup.object({
      userName: Yup.string().max(255).required("Cần điền userName"),
      password: Yup.string().max(255),
      name: Yup.string().max(255).required("Cần điền tên"),
      phone: Yup.string()
        .matches(phoneRegExp, "Không phải định dạng SĐT")
        .max(255)
        .required("Cần điền số điện thoại"),

      email: Yup.string()
        .email("Không phải Email")
        .max(255)
        .required("Cần điền email"),
      role: Yup.string().max(255).required("Cần điền vai trò"),
      buildingId: Yup.string().max(255),
    }),
    onSubmit: (values, { resetForm }) => {
      if (loading) return;
      const user = {
        userId: row.userId,
        userName: values.userName,
        name: values.name,
        phone: values.phone,
        email: values.email,
        role: row.role,
        buildingId: row.buildingId
      }
      setLoading(true);
      backend.users.changeUser(user)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Đã cập nhật tài khoản!', {variant: 'success', anchorOrigin: { horizontal: 'right' , vertical: 'top'}});
        setRows([...rows.filter(r => r.userId != user.userId), user]);
      })
      .catch(() => {
        setLoading(false);
        enqueueSnackbar('Có lỗi xảy ra!', {variant: 'error', anchorOrigin: { horizontal: 'right' , vertical: 'top'}});
      });
      if (values.password) {
        backend.users.changePassword(user.userId, values.password)
        .then(() => enqueueSnackbar('Đã cập nhật mật khẩu!', {variant: 'success', anchorOrigin: { horizontal: 'right' , vertical: 'top'}}))
        .catch(() => {
          enqueueSnackbar('Đổi mật khẩu thất bại!', {variant: 'error', anchorOrigin: { horizontal: 'right' , vertical: 'top'}});
        });
      }
    },
  });

  return (
    <>
      <Box sx={{ borderBottom: 1 }}>
        <Typography sx={{ fontSize: 20 }}>Mô tả chi tiết</Typography>
      </Box>
      <form onSubmit={formik.handleSubmit}>
        <Stack
          sx={{ padding: 4}}
          direction="row"
          justifyContent="center"
          alignItems="center"
          divider={<Divider orientation="vertical" flexItem />}
        >
          <Stack sx={{ padding: 4 }} alignItems="center" spacing={2} flex={1}>
            <Typography sx={{ fontSize: 18 }}>Tài khoản</Typography>
            <DefTextField
              formik={formik}
              label={"Username"}
              name={"userName"}
              required
            />
            <DefTextField
              formik={formik}
              label={"Password"}
              name={"password"}
              required={false}
            />
          </Stack>
          <Stack sx={{ padding: 4 }} alignItems="center" spacing={2} flex={2}>
            <Typography sx={{ fontSize: 18 }}>Thông tin cơ bản</Typography>
            <DefTextField
              formik={formik}
              label={"Email"}
              name={"email"}
              required
            />
            <DefTextField
              formik={formik}
              label={"Số điện thoại"}
              name={"phone"}
              required
            />
          </Stack>
          <Stack sx={{ padding: 4 }} alignItems="center" spacing={2} flex={1}>
            <Typography sx={{ fontSize: 18 }}>Công việc</Typography>
            <TextField fullWidth label={'Vai trò'} name={'type'}
                type={'type'} value={row.role} variant="outlined" disabled/>
            <TextField fullWidth label={'Nơi làm việc'} name={'buildingId'}
                type={'buildingId'} value={row.buildingId} variant="outlined" disabled/>
            {/*
            <FormControl fullWidth>
              <InputLabel id="role" required>
                Vai trò
              </InputLabel>
              <Select
                labelId="role"
                name="role"
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
              <InputLabel id="building" required>
                Nơi làm việc
              </InputLabel>
              <Select
                labelId="building"
                name="building"
                value={formik.values.buildingId}
                label="Nơi làm việc"
                onChange={formik.handleChange}
                // disabled={formik.values.role ? false : true}
                required
              >
                <MenuItem value={"building 1"}>building 1</MenuItem>
                <MenuItem value={"building 2"}>building 2</MenuItem>
                <MenuItem value={"building 3"}>building 3</MenuItem>
                <MenuItem value={"building 4"}>building 4</MenuItem>
              </Select>
            </FormControl>
            */}
          </Stack>
        </Stack>
        <Stack spacing={2} sx={{ borderTop: 1, padding: 2 }} direction="row">
          <Button variant="contained" type="submit">
            Cập nhập
          </Button>
          <Button
            variant="outlined"
            onClick={() => {
              setOpen(false);
            }}
          >
            Hủy
          </Button>
        </Stack>
      </form>
    </>
  );
};

Edit.propTypes = {};

export default Edit;
