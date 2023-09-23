export enum MidiActionNames {
    UPDATE_CONNECTED_TO_SOCKET = "UPDATE_CONNECTED_TO_SOCKET",
    UPDATE_ERROR = "UPDATE_ERROR",
    UPDATE_MIDI_ACCESS = "UPDATE_MIDI_ACCESS",
    UPDATE_PREFERRED_DEVICE = "UPDATE_PREFERRED_DEVICE",
    UPDATE_PREFERRED_DEVICE_DISCONNECTED = "UPDATE_PREFERRED_DEVICE_DISCONNECTED"
}

export type MidiAction =
    {
          type: typeof MidiActionNames.UPDATE_MIDI_ACCESS,
          payload: { midiAccess: WebMidi.MIDIAccess }
      }
    | {
        type: typeof MidiActionNames.UPDATE_PREFERRED_DEVICE,
        payload: { preferredDevice: WebMidi.MIDIInput | WebMidi.MIDIOutput }
    }
    | {
        type: typeof MidiActionNames.UPDATE_ERROR,
        payload: { error: string }
    } 
    | { 
        type: typeof MidiActionNames.UPDATE_CONNECTED_TO_SOCKET,
        payload: { connectedToSocket: boolean }
    }
    | {
        type: typeof MidiActionNames.UPDATE_PREFERRED_DEVICE_DISCONNECTED,
        payload: { preferredDeviceDisconnected: boolean }
    }

export const updateConnectionToSocketAction = ( connectedToSocket: boolean ) => ({
    type: MidiActionNames.UPDATE_CONNECTED_TO_SOCKET,
    payload: connectedToSocket
})

export const updateErrorAction = ( error: string ) => ({
    type: MidiActionNames.UPDATE_ERROR,
    payload: error
})

export const updateMidiAccessAction = (midiAccess: WebMidi.MIDIAccess) => ({
    type: MidiActionNames.UPDATE_MIDI_ACCESS,
    payload: midiAccess
})

export const updatePreferredDeviceAction = (device: WebMidi.MIDIPort) => ({
    type: MidiActionNames.UPDATE_PREFERRED_DEVICE,
    payload: device
})

export const updatePreferredDeviceDisconnectedAction = (disconnected: boolean) => ({
    type: MidiActionNames.UPDATE_PREFERRED_DEVICE_DISCONNECTED,
    payload: disconnected
})