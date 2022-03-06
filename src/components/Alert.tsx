import Alert from '@mui/material/Alert'

// https://mui.com/components/alert/
export default (props) => {
    return <Alert {...props}>{props.children}</Alert>
}
