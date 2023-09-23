import React, { Dispatch, SetStateAction, useContext } from 'react'

import { MidiContext } from '@/context/MidiContext'
import { MidiActionNames } from '@/actions/midiActions'
import { disconnectListener } from '@/midi/midi'

import { Box, Button, List, ListItemButton, Typography } from '@mui/material'

import BasicModal from '@/components/ui/elements/BasicModal'

interface DeviceListProps {
    showModal: boolean
    setShowModal: Dispatch<SetStateAction<boolean>>
}

export default function DeviceList({showModal, setShowModal}: DeviceListProps) {

    const context = useContext(MidiContext)

    const handleSelect = (selection: WebMidi.MIDIInput | WebMidi.MIDIOutput) => {
        selection.onstatechange = (e) => { disconnectListener(e, context?.dispatch) }
        context?.dispatch({type: MidiActionNames.UPDATE_PREFERRED_DEVICE, payload: { preferredDevice: selection }})
        toggleModal()
    }

    const toggleModal = () => {
        setShowModal(!showModal)
    }

    if (context.state.midiAccess) {
        return (
            <BasicModal open={showModal}>
                <Typography style={{ textAlign: "center" }}>
                    Select MIDI device to use
                </Typography>
                <List> 
                    {
                        Array.from(context.state.midiAccess.inputs.values()).map((device) => {
                            return (
                                <ListItemButton onClick={() => handleSelect(device)} key={device.id}>
                                    {device.name}
                                </ListItemButton>
                            )
                        })
                    }
                </List>
            </BasicModal>
        )
    }

    else {
        return (
            <BasicModal open={showModal}>
                <Typography>
                    Error trying to read midi devices!
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: "3%"}} >
                    <Button onClick={toggleModal} color="primary" variant="contained">
                        Ok
                    </Button>
                </Box>
            </BasicModal>
        )
    }
}