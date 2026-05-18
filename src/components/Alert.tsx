'use client'

import Alert from '@mui/material/Alert'

export default function AlertComponent(props) {
    return <Alert {...props}>{props.children}</Alert>
}