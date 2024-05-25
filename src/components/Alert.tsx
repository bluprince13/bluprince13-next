/* eslint-disable react/jsx-filename-extension */
import Alert from '@mui/material/Alert'

// https://mui.com/components/alert/
const fn = (props) => {
    return <Alert {...props}>{props.children}</Alert>
}

export default fn