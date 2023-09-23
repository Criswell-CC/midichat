'use client'

import React, { Dispatch, SetStateAction, useContext, useState } from 'react'

import { Typography, Button, Grid, Box, IconButton, Tooltip } from '@mui/material'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'

import Piano from '../elements/Piano'

import Chat from '@/components/ui/containers/Chat'
import { UserContext } from '@/context/UserContext'

interface PageLayoutProps {
    midiDeviceName?: string | null | undefined,
    roomId: string,
    roomType: string,
    setShowModal: Dispatch<SetStateAction<boolean>>
}

const RoomLayout = (props: PageLayoutProps) => {

    const [showClipboardTooltip, setShowClipboardTooltip] = useState<boolean>(false)

    const { username } = useContext(UserContext).state

    const onClipboardClick = () => {
        navigator.clipboard.writeText(props.roomId)
        setShowClipboardTooltip(true)
    }

    const onTooltipClose = () => {
        setShowClipboardTooltip(false)
    }

    return (
        <Box sx={{ width: "100%"}}>
            <Grid container rowSpacing={1} paddingLeft="2vh" paddingRight="1vh">
                <Grid item xs={9} marginBottom="0vh">
                    <Typography variant="h6" style={{ display: "flex" }} color="common.white">
                        <p>
                            {props.roomType} Room: {props.roomId}
                        </p>
                        <Tooltip open={showClipboardTooltip} onClose={onTooltipClose} title='Copied to clipboard!' leaveDelay={500}>
                            <IconButton color='primary' onClick={onClipboardClick}>
                                <ContentCopyIcon/>
                            </IconButton>            
                        </Tooltip>
                    </Typography>
                </Grid>
                <Grid item xs={3}>
                    <Typography variant="h6" style={{ paddingTop: "7%", display: "flex", justifyContent: "center", fontSize: "1.1em", marginRight: "15%" }} color="common.white">
                        Participant list
                    </Typography>
                </Grid>
                <Grid item xs={8.5} md={9} height="75vh">
                    <Typography color="common.white">
                        { username ? `Welcome to ${username}'s broadcast room` : "" }
                    </Typography>
                </Grid>
                <Grid item xs={3.5} md={3} sx={{ border: "3px solid", backgroundColor: "#fff", borderRadius: "10px" }}>
                    <Chat/>
                </Grid>
                <Grid item xs={8.5}>
                    <Piano startKey='A' endKey="C" octaves={4} />
                </Grid>
                <Grid item xs={3.5}>
                    <Typography color="common.white">
                        Current device: {props.midiDeviceName}
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: "1vh"}}>
                        <Button variant="contained" onClick={() => props.setShowModal(true)}>
                            Change MIDI input
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}

export default RoomLayout