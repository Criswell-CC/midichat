'use client'

import { Dispatch, SetStateAction, useEffect } from 'react'

import { MidiActionNames } from '@/actions/midiActions'
import { MidiAction } from '@/actions/midiActions'
import { getMidiAccess } from '@/midi/midi'

import { isBroadcaster } from '@/utils/utils'

import { IMidiContext } from '@/types/midi'

export const useFetchMidiAccess = (midiContext: IMidiContext) => {
    
    useEffect(() => {

        const getAccess = async () =>  {
            const res: WebMidi.MIDIAccess = await getMidiAccess()
            midiContext.dispatch({type: MidiActionNames.UPDATE_MIDI_ACCESS, payload: { midiAccess: res }})
        }

        if (!midiContext.state.midiAccess) {
            getAccess().catch(err => {
                midiContext.dispatch({ type: MidiActionNames.UPDATE_ERROR, payload: err })
                console.error(err)
            })
        }

    }, [midiContext])
}

export const useDispatchPreferredDevice = (device: WebMidi.MIDIInput | undefined | null, dispatch: Dispatch<MidiAction>) => {
    useEffect(() => {
        if (device && dispatch) {
            dispatch({type: MidiActionNames.UPDATE_PREFERRED_DEVICE, payload: { preferredDevice: device }})
        }
    }, [device, dispatch])
}

export const useSetMidiOnMessageHandler = (userType: string, midiOnMessageReadyToBeSet: boolean, socket: WebSocket, midiDevice: WebMidi.MIDIInput, setMidiHandlerSet: 
        Dispatch<SetStateAction<boolean>>) => {
    useEffect(() => {
        if (isBroadcaster(userType) && midiOnMessageReadyToBeSet) {
            midiDevice.onmidimessage = (message: WebMidi.MIDIMessageEvent) => {
                socket.send(convertMidiEventToArrayBuffer(message))
                setMidiHandlerSet(true)
            }
        }
    }, [userType, midiOnMessageReadyToBeSet, socket, midiDevice, setMidiHandlerSet])
}

export const useMidiDeviceConnectionError = (midiContext: IMidiContext, setMidiDeviceConnectionError: Dispatch<SetStateAction<boolean>>) => {
    useEffect(() => {
        if (midiContext.state.preferredDeviceDisconnected) {
            setMidiDeviceConnectionError(true)
        }
    }, [])
} 

const convertMidiEventToArrayBuffer = (message: WebMidi.MIDIMessageEvent): ArrayBuffer => {
    return new ArrayBuffer(8)
}
