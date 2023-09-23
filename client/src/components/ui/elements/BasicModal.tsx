import React, { ReactNode } from 'react'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'

interface BasicModalProps {
    children: ReactNode,
    open: boolean,
    onClose?: () => {}
}

const BasicModal = (props: BasicModalProps) => {
    return (
        <Modal open={props.open} onClose={props.onClose}> 
            <Box sx={styles.box}>
                {props.children}
            </Box>
        </Modal>
    )
}

const styles = {
    box: {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        borderRadius: "30px"
    }
}

export default BasicModal