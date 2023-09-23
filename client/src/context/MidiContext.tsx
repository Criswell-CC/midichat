'use client'

import { createContext, Dispatch } from 'react'

import { MidiAction } from '@/actions/midiActions'
import { IMidiInfo } from '@/types/midi'

const intialState = {
    state: {
        connectedToSocket: false,
        error: null,
        midiAccess: null,
        preferredDevice: null,
        preferredDeviceDisconnected: false
    },
    dispatch: () => {}
}

export const MidiContext = createContext<{ state: IMidiInfo, dispatch: Dispatch<MidiAction>}>(intialState)