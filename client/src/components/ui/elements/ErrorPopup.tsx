import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'

import { Box, Button, Typography } from '@mui/material'

import BasicModal from './BasicModal'

interface ErrorPopupProps {
    errorMessage: string
    setShowPopup?: Dispatch<SetStateAction<boolean>>
}

export default function ErrorPopup(props: ErrorPopupProps) {

    const [isShowing, setIsShowing] = useState<boolean>(true)

    const handleClose = () => {

        if (props.setShowPopup) {
            props.setShowPopup(false)
        }

        else {
            setIsShowing(false)
        }
    }

    useEffect(() => {

        document.addEventListener('keydown', handleClose)
        return () => document.removeEventListener('keydown', handleClose)

    }, [])

    return (
        <BasicModal open={isShowing}>
                <Typography textAlign="center">
                    {props.errorMessage}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: "3%"}} >
                    <Button onClick={handleClose} color="primary" variant="contained">
                        Ok
                    </Button>
                </Box>
        </BasicModal>
    )
}

