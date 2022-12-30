import React, { FC, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useFormik } from 'formik';
import DeleteIcon from '@mui/icons-material/Delete';
import ClearIcon from '@mui/icons-material/Clear';
import * as Yup from 'yup';
import { Box, Button, IconButton, Stack, TextField, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Container } from '@mui/system';
import ProductLine, { ProductLineInfo } from '../../../../../data/entities/ProductLine';
import useLoading from '../../../../../hooks/useLoading';
import backend from '../../../../../backend';
import { useSnackbar } from 'notistack';

type propTypes = {
    row: ProductLine,
    rows: ProductLine[],
    setRows: Function, 
    setOpen: Function
 }

const Edit: FC<propTypes> = (props) => {

    const {row, rows, setRows , setOpen} = props;
    const { loading, setLoading } = useLoading();

    const [newDescribes, setNewDescribes] = useState(row.describes)

    const handleDelete = (desc: ProductLineInfo) => {
        setNewDescribes(newDescribes.filter(item => item !== desc))
    }

    const handleChangeProperty = (index: number , value: string) => {
        let Describes = [...newDescribes]
        Describes[index].property = value
        setNewDescribes(Describes)
    }

    const handleChangeValue = (index: number , value: string) => {
        let Describes = [...newDescribes]
        Describes[index].value = value
        setNewDescribes(Describes)
    }

    const { enqueueSnackbar } = useSnackbar();

    const onSubmit = (event: any) => {
        event.preventDefault();
        if (loading) return;
        setLoading(true);
        backend.productLines.updateProductLine(row.id, newDescribes)
        .then(() => {
            setLoading(false);
            const index = rows.indexOf(row);
            const newRows = [...rows]
            newRows[index].describes = newDescribes
            setRows(newRows)
            enqueueSnackbar('Đã cập nhật!', {variant: 'success', anchorOrigin: { horizontal: 'right' , vertical: 'top'}});
        })
        .catch(() => {
            setLoading(false);
            enqueueSnackbar('Có lỗi xảy ra!', {variant: 'error', anchorOrigin: { horizontal: 'right' , vertical: 'top'}});
        });
    }

    const addDesc = () => {
        const newDesc = {property: '', value:''}
        let Describes = [...newDescribes]
        Describes.push(newDesc)
        setNewDescribes(Describes)
    }
    
    
    return (
       <>
            <Box sx={{ borderBottom: 1 }}>
                <Typography sx={{ fontSize: 20 }}>Mô tả chi tiết</Typography>
            </Box>
            <form onSubmit={onSubmit}>
            <Box sx={{ marginTop: 2}}>
             {newDescribes.map((desc, index) => (
                <Stack sx={{ padding: 2}} justifyContent="center"
                alignItems="center" key={index} spacing={2} direction="row">
                    <Typography sx={{ fontSize: 20 }}>{index + 1}</Typography>
                    <TextField
                    size='small'
                    fullWidth
                    label="Đặc tính"
                    margin="normal"
                    onChange={(event) => handleChangeProperty(index, event.target.value)}
                    value={desc.property}
                    variant="outlined"
                    required={true}
                    />
                    <TextField
                    size='small'
                    fullWidth
                    label="Giá trị"
                    margin="normal"
                    name={`desc[${index}].value`}
                    onChange={(event) => handleChangeValue(index, event.target.value)}
                    value={desc.value}
                    variant="outlined"
                    required={true}
                    />
                    <IconButton onClick={() => handleDelete(desc)}>
                        <ClearIcon/>
                    </IconButton>
                </Stack>
             ))}
            </Box>
             <IconButton color='success' sx={{justifyContent: 'center', alignItems: 'center', width: '100%'}} onClick={() => addDesc()}><AddIcon/></IconButton>
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