'use client'

import { Dispatch } from 'react'
import { MidiAction } from '@/actions/midiActions'
import { MidiActionNames } from '@/actions/midiActions'

export const getMidiAccess = async (): Promise<WebMidi.MIDIAccess> => {

  if (navigator.requestMIDIAccess) {

    try {

      const res = await navigator.requestMIDIAccess()

      res.onstatechange = (e) => {
        console.log(e.port.name)
        // TODO: dispatch to context
        // define function for handling device connectivity events
      }

      return res

    }

    catch (err) {
      
      console.log("Error getting midi access: " + err)
      alert("No access to MIDI devices or your browser doesn't support WebMIDI API. Please use WebMIDIAPIShim")
      // TODO: change to show custom modal when error returned

      throw err
    }
  }

  throw new Error("Navigator undefined")
}

export const disconnectListener = (event: WebMidi.MIDIConnectionEvent, dispatch: Dispatch<MidiAction>) => {
  if (event.port.state === 'disconnected') {
    dispatch({type: MidiActionNames.UPDATE_PREFERRED_DEVICE_DISCONNECTED, payload: { preferredDeviceDisconnected: true }})
  }
}