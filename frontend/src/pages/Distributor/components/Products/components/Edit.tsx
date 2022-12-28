import React, { FC, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useFormik } from "formik";
import DeleteIcon from "@mui/icons-material/Delete";
import ClearIcon from "@mui/icons-material/Clear";
import * as Yup from "yup";
import {
  Box,
  Button,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Container } from "@mui/system";
import DefTextField from "../../../../../components/DefTextField";
import { phoneRegExp } from "../../../../../untils/Reg";
import Product1 from "../../../../../types/Product1";

type propTypes = {
  row: Product1;
  rows: Product1[];
  setRows: Function;
  setOpen: Function;
};

const Edit: FC<propTypes> = (props) => {
  const { row, rows, setRows, setOpen } = props;
  

  const formik = useFormik({
    initialValues: {
        // id: row.id,
        // status: row.status,
        // dateOfManufacture: row.dateOfManufacture,
        // saleDate: row.saleDate,
        // productLineId: row.productLineId,
        // factoryId: row.factoryId,
        // distributionId: row.distributionId,
        name: row.customer?.name,
        phone: row.customer?.phone,
    },
    validationSchema: Yup.object({
        name: Yup.string().max(255).required("Cần điền tên khác hàng"),
        phone: Yup.string().matches(phoneRegExp, "Không phải định dạng SĐT").max(255).required("Cần điền SĐT khác hàng"),
    }),
    onSubmit: (values, { resetForm }) => {
      alert(JSON.stringify(values))

      const index = rows.indexOf(row);
      const newRows = [...rows];
      newRows[index].customer = {
        name: values.name ? values.name : '',
        phone: values.phone ? values.phone : '',
      }
      // setRows(newRows);
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
          divider={<Divider orientation="vertical" flexItem />}
        >
          <Stack sx={{ padding: 4 }} alignItems="center" spacing={2} flex={1}>
            <Typography sx={{ fontSize: 18 }}>Sản phẩm</Typography>
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
          <Stack sx={{ padding: 4 }} alignItems="center" spacing={2} flex={1}>
            <Typography sx={{ fontSize: 18 }}>Nơi sản xuất</Typography>
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
                label={'Trạng thái'}
                name={'status'}
                type={'status'}
                value={row.status}
                variant="outlined"
                disabled
            />
            <TextField
                fullWidth
                label={'Thời gian sản xuất'}
                name={'dateOfManufacture'}
                type={'dateOfManufacture'}
                value={row.dateOfManufacture}
                variant="outlined"
                disabled
            />
          </Stack>
          <Stack sx={{ padding: 4 }} alignItems="center" spacing={2} flex={1}>
            <Typography sx={{ fontSize: 18 }}>Khách hàng</Typography>
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
                value={row.saleDate}
                variant="outlined"
                disabled
            />
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
