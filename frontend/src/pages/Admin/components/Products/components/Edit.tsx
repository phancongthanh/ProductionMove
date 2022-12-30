import { FC } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Box, Button, Divider, Stack, TextField, Typography, } from "@mui/material";
import DefTextField from "../../../../../components/DefTextField";
import { phoneRegExp } from "../../../../../untils/Reg";
import Product from "../../../../../data/entities/Product";
import Extentions from "../../../../../utils/Extentions";

type propTypes = {
  row: Product,
  reload: () => void
  setOpen: Function;
};

const Edit: FC<propTypes> = (props) => {
  const { row, reload, setOpen } = props;

  row.warranties.sort((a, b) => {
    if (!a.startTime) return -1;
    if (!b.startTime) return 1;
    return a.startTime.getTime() - b.startTime.getTime()
  });

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
      console.log(values)
      alert("Tính năng không hỗ trợ!")
      /*
      const index = rows.indexOf(row);
      const newRows = [...rows];
      newRows[index].customer = {
        name: values.name ? values.name : '',
        phone: values.phone ? values.phone : '',
      }
      setRows(newRows);
      */
      reload();
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
                value={Extentions.ProductStatus.toVN(row.status)}
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
          {
            row.warranties.length > 0?
              <Stack sx={{ padding: 4 }} alignItems="center" spacing={2} flex={1}>
              <Typography sx={{ fontSize: 18 }}>Bảo hành</Typography>
              <TextField fullWidth label={'Số lần bảo hành'} name={'warrantyCount'}
                type={'warrantyCount'} value={row.warranties.length} variant="outlined" disabled
              />
              <TextField fullWidth label={'Bảo hành lần cuối tại'} name={'serviceCenterId'}
                  type={'serviceCenterId'} value={row.warranties[0].serviceCenterId} variant="outlined" disabled
              />
              <TextField fullWidth label={'Bảo hành lần cuối lúc'} name={'warrantyTime'}
                type={'warrantyTime'} value={row.warranties[0].startTime || " "} variant="outlined" disabled
              />
            </Stack>
            : ""
          }
          {row.customer ?
          <Stack sx={{ padding: 4 }} alignItems="center" spacing={2} flex={1}>
            <Typography sx={{ fontSize: 18 }}>Khách hàng</Typography>
            {/*
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
            */}
            <TextField
                fullWidth
                label={'Tên khách hàng'}
                name={'customerName'}
                type={'customerName'}
                value={row.customer?.name || ""}
                variant="outlined"
                disabled
            />
            <TextField
                fullWidth
                label={'Số điện thoại'}
                name={'customerPhone'}
                type={'customerPhone'}
                value={row.customer?.phone || ""}
                variant="outlined"
                disabled
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
          </Stack> : ""}
        </Stack>
        {
          /*
          <Stack spacing={2} sx={{ borderTop: 1, padding: 2 }} direction="row">
            <Button variant="contained" type="submit">Cập nhập</Button>
            <Button variant="outlined" onClick={() => {setOpen(false);}}>Hủy</Button>
          </Stack>
          */
        }
      </form>
    </>
  );
};

Edit.propTypes = {};

export default Edit;
