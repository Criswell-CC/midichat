import { Dispatch } from 'react'

import { MidiAction } from '@/actions/midiActions'

export interface IMidiInfo {
    connectedToSocket: boolean,
    error: any,
    midiAccess: WebMidi.MIDIAccess | null,
    preferredDevice: WebMidi.MIDIInput | WebMidi.MIDIOutput | null,
    preferredDeviceDisconnected: boolean
}

export interface IMidiContext {
    state: IMidiInfo,
    dispatch: Dispatch<MidiAction>
}