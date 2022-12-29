import { FC } from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, FormControl, InputLabel, MenuItem, Select, Stack, Typography } from '@mui/material';
import { Building } from './types';
import DefTextField from '../../../../../components/DefTextField';
import backend from '../../../../../backend';
import useLoading from '../../../../../hooks/useLoading';

type propTypes = {
    row: Building,
    rows: Building[],
    setRows: Function, 
    setOpen: Function
 }

const Edit: FC<propTypes> = (props) => {

    const {row, rows, setRows , setOpen} = props;
    const { setLoading } = useLoading();

    // const [newBuildingInfo, setBuildingInfo] = useState<BuildingInfo>({
    //     name: row.name,
    //     address: row.address,
    //     type: row.type
    // })

    const formik = useFormik({
        initialValues: {
          name: row.name,
          address: row.address,
          type: row.type,
        },
        validationSchema: Yup.object({
        name: Yup
            .string()
            .max(255)
            .required('Cần điền tên cơ sở'),
        address: Yup
            .string()
            .min(5)
            .max(255)
            .required('Cần điền địa chỉ cơ sở'),
        type : Yup
            .string()
        }),
        onSubmit: (values, { resetForm }) => {
            const index = rows.indexOf(row);
            const newRows = [...rows]
            newRows[index].name = values.name
            newRows[index].address = values.address
            newRows[index].type = values.type

            setLoading(true);
            backend.buildings.updateBuilding(values.type, newRows[index])
            .then(() => {
                setRows(newRows)
                setLoading(false);
            })
            .catch(e => {
                setLoading(false);
                if (e == 400)
                    alert("Tên cơ sở bị trùng!")
            });
        }
    })

    return (
       <>
            <Box sx={{ borderBottom: 1 }}>
                <Typography sx={{ fontSize: 20 }}>Mô tả chi tiết</Typography>
            </Box>
            <form onSubmit={formik.handleSubmit}>
                <Stack sx={{ padding: 4 }} alignItems='center' spacing={2} direction="row">
                    <DefTextField formik={formik} label={'Tên'} name={'name'} required />
                    <DefTextField formik={formik} label={'Địa chỉ'} name={'address'} required />
                    <FormControl sx={{width: '400px'}}>
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
                    </FormControl>
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