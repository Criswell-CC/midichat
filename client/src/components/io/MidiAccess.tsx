'use client'

import { useContext, useState } from 'react'

import { MidiContext } from '@/context/MidiContext'

import { useFetchMidiAccess, useMidiDeviceConnectionError } from '@/hooks/midiHooks'

import ErrorPopup from '@/components/ui/elements/ErrorPopup'

import { ERROR_MESSAGES } from '@/constants/errorMessages'

const MidiAccess = () => {

    const [midiDeviceDisconnected, setMidiDeviceDisconnected] = useState<boolean>(false)

    const midiContext = useContext(MidiContext)

    useFetchMidiAccess(midiContext)

    useMidiDeviceConnectionError(midiContext, setMidiDeviceDisconnected)

    return (
        <>
            { midiDeviceDisconnected && <ErrorPopup errorMessage={ERROR_MESSAGES.MIDI_DEVICE_DISCONNECTED}/>}
        </>
    )
}

export default MidiAccess