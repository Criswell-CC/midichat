import React, { Dispatch, SetStateAction, useEffect, useRef } from 'react'

import { Box, Button, TextField, Typography } from '@mui/material'

import BasicModal from './BasicModal'

interface JoinModalProps {
    handleSubmit: () => Promise<void>,
    roomIdInput: string,
    setRoomIdInput: Dispatch<SetStateAction<string>>
}

export default function JoinModal(props: JoinModalProps) {

    const ref = useRef(null)

    useEffect(() => {

        document.addEventListener('keydown', handleEnter)

        return () => document.removeEventListener('keydown', handleEnter)

    }, [])

    //React.KeyboardEvent<HTMLInputElement>
    const handleEnter = (e: KeyboardEvent) => {
        if (document.activeElement === ref.current && e.key === 'Enter') {
          props.handleSubmit()
        }
    }
    //

    return (
        <BasicModal open={true}>
            <Typography textAlign="center">
                Enter the room ID to join a room
            </Typography>
            <TextField value={props.roomIdInput} inputRef={ref} onChange={(e) => { props.setRoomIdInput(e.target.value) }}
                 sx={{ width: "100%", marginTop: "3%" }} inputProps={{ sx: { height: "1vh" }}}/>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: "3%"}}>
                <Button onClick={props.handleSubmit} color="primary" variant="contained">
                    Submit
                </Button>
            </Box>
        </BasicModal>
    )
}