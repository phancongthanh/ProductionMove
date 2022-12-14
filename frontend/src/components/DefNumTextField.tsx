import { TextField } from '@mui/material'
import React, { FC } from 'react'


type propTypes = {
    formik: any,
    label: string,
    name: string,
    required: boolean,
 }



const DefNumTextField: FC<propTypes> = (props) => {
    const {formik, label, name, required} = props
    
  return (
    <TextField
        error={Boolean(eval(`formik.touched.${name}`) && eval(`formik.errors.${name}`))}
        fullWidth
        helperText={eval(`formik.touched.${name}`) && eval(`formik.errors.${name}`)}
        label={label}
        name={name}
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        type={name}
        value={Number.isNaN(eval(`formik.values.${name}`)) ? '' : eval(`formik.values.${name}`)}
        variant="outlined"
        required={required}
    />
  )
}

export default DefNumTextField