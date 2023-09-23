'use client'

import { Reducer } from 'react'

import { IMidiInfo } from '@/types/midi'
import { MidiAction, MidiActionNames } from '@/actions/midiActions'

export const midiReducer: Reducer<IMidiInfo, MidiAction> = (state: IMidiInfo, action: MidiAction) => {
    switch (action.type) {
        case MidiActionNames.UPDATE_CONNECTED_TO_SOCKET:
            return {
                connectedToSocket: action.payload.connectedToSocket,
                error: state.error,
                midiAccess: state.midiAccess,
                preferredDevice: state.preferredDevice,
                preferredDeviceDisconnected: state.preferredDeviceDisconnected,                
            }
        case MidiActionNames.UPDATE_ERROR:
            return {
                connectedToSocket: state.connectedToSocket,
                error: action.payload.error,
                midiAccess: state.midiAccess,
                preferredDevice: state.preferredDevice,
                preferredDeviceDisconnected: state.preferredDeviceDisconnected
            }
        case MidiActionNames.UPDATE_MIDI_ACCESS:
            return {
                connectedToSocket: state.connectedToSocket,
                error: state.error,
                midiAccess: action.payload.midiAccess,
                preferredDevice: state.preferredDevice,
                preferredDeviceDisconnected: state.preferredDeviceDisconnected
            }
        case MidiActionNames.UPDATE_PREFERRED_DEVICE:
            return {
                connectedToSocket: state.connectedToSocket,
                error: state.error,
                midiAccess: state.midiAccess,
                preferredDevice: action.payload.preferredDevice,
                preferredDeviceDisconnected: state.preferredDeviceDisconnected
            }
        case MidiActionNames.UPDATE_PREFERRED_DEVICE_DISCONNECTED:
            return {
                connectedToSocket: state.connectedToSocket,
                error: state.error,
                midiAccess: state.midiAccess,
                preferredDevice: state.preferredDevice,
                preferredDeviceDisconnected: action.payload.preferredDeviceDisconnected
            }
        default:
            return state
    }
}