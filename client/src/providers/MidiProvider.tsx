'use client'

import React, { PropsWithChildren, useMemo, useReducer } from 'react'

import { MidiContext } from '@/context/MidiContext'
import { midiReducer } from '@/reducers/midiReducer'

export const MidiProvider = ({children}: PropsWithChildren) => {

    const [state, dispatch] = useReducer(midiReducer, {
            connectedToSocket: false,
            error: null,
            midiAccess: null,
            preferredDevice: null,
            preferredDeviceDisconnected: false
        }
    )

    const contextValue = useMemo(() => ({ state, dispatch }), [state, dispatch])

    return <MidiContext.Provider value={contextValue}>{children}</MidiContext.Provider>
}