'use client'

import { useEffect } from 'react'
import { isBroadcaster } from '@/utils/utils'

import { IAuthMessage } from '@/types/auth'

import { MidiActionNames } from '@/actions/midiActions'
import { SocketActionNames } from '@/actions/socketActions'

import { IRoom } from '@/types/room'
import { IUser } from '@/types/user'
import { ISocketInfo } from '@/types/socket'
import { IMidiContext } from '@/types/midi'
import { IAuthInfo } from '@/types/auth'

export const useSetAuthMessage = (authInfo: IAuthInfo,
    userInfo: IUser,
    roomInfo: IRoom) => {

    useEffect(() => {
        if (authInfo.authMessage === JSON.stringify({})) {

            //ensure JSON body matches server protocol by enforcing type
            const authMessage: IAuthMessage = {
                user_id: userInfo.id,
                user_type: userInfo.type,
                room_id: roomInfo.roomId,
                room_type: roomInfo.roomType
            }

            authInfo.setAuthMessage(JSON.stringify( authMessage ))
        }
    }, [authInfo.authMessage, userInfo, roomInfo])
}

export const useAuthenticate = (authInfo: IAuthInfo, socketInfo: ISocketInfo) => {

    useEffect(() => {

        const sendAuthenticateRequest = async () => {

            if (typeof process.env.REACT_APP_SERVER_URL !== 'undefined') { 
                try {
                    const res = await fetch(process.env.REACT_APP_SERVER_URL + '/authenticate', { method: 'POST', body: authInfo.authMessage, headers: {
                        'Content-Type': 'application/json'
                      }, 
                    })
                    const json = await res.json()
                    authInfo.setAuthResponseReceived(true)
                    authInfo.setAuthenticated(json?.authenticated)
                }
                catch (err) {
                    socketInfo.setSocketConnectionError(true)
                    throw err
                }
            }

            else {
                authInfo.setAuthenticated(false)
                socketInfo.setSocketConnectionError(true)
            }
        }

        if (!authInfo.authResponseReceived && authInfo.authMessage !== JSON.stringify({})) {

            try {
                sendAuthenticateRequest()
            }

            catch (err) {
                authInfo.setAuthResponseReceived(true)
                authInfo.setAuthenticated(false)
            }
        }

    }, [authInfo])
}

export const useSetSocket = (authInfo: IAuthInfo, 
    socketInformation: ISocketInfo,
    midiContext: IMidiContext,
    user: IUser,
    room: IRoom) => {

    useEffect(() => {
        if (authInfo.authenticated && !socketInformation.socket) {

            if (typeof process.env.REACT_APP_SOCKET_URL !== 'undefined') {
                    
                const socket: WebSocket = new WebSocket(process.env.REACT_APP_SOCKET_URL + '?roomId=' + room.roomId + '&userId=' + user.id + 
                    '&userType=' + user.type)

                socket.onerror = (event: Event) => {
                    midiContext.dispatch({ type: MidiActionNames.UPDATE_CONNECTED_TO_SOCKET, payload: { connectedToSocket: false }})
                    socketInformation.setSocketConnectionError(true)
                }

                socketInformation.setSocket(socket)
                socketInformation.socketContextDispatch({ type: SocketActionNames.UPDATE_SOCKET, payload: { socket: socket }})
            }

            else {
                socketInformation.setSocketConnectionError(true)
            }
        }
    }, [authInfo.authenticated, socketInformation])
}

export const useRegisterSocketCallbacks = (userInfo: IUser, socketInformation: ISocketInfo, midiContext: IMidiContext) => {

    useEffect(() => {

        const socket = socketInformation.socket
        const { preferredDevice } = midiContext.state
        const midiDispatch = midiContext.dispatch

        if (preferredDevice) {

            if (socket) {

                if (isBroadcaster(userInfo.type)) {
                    registerBroadcaster(socket, preferredDevice as WebMidi.MIDIInput)
                    midiDispatch({ type: MidiActionNames.UPDATE_CONNECTED_TO_SOCKET, payload: { connectedToSocket: true }})
                }
    
                else {
                    registerListener(socket, preferredDevice as WebMidi.MIDIOutput)
                }
            }
        }
    }, [userInfo, socketInformation, midiContext])
}

const registerBroadcaster = (socket: WebSocket, midiInputDevice: WebMidi.MIDIInput) => {

    socket.binaryType = 'arraybuffer'

    // FIXME: needs to be reset if device is disconnected
    midiInputDevice.onmidimessage = (message: WebMidi.MIDIMessageEvent) => {
        socket.send(convertMidiEventToArrayBuffer(message))
    }
}

const registerListener = (socket: WebSocket, midiOutputDevice: WebMidi.MIDIOutput) => {
    socket.onmessage = (event: MessageEvent) => connectMidiOutputDeviceToSocketStream(event, midiOutputDevice)
}

const connectMidiOutputDeviceToSocketStream = (event: MessageEvent, midiDevice: WebMidi.MIDIOutput) => {
    if (event.data instanceof ArrayBuffer) {
        var midiData = new Uint8Array(event.data)
        midiDevice.send(midiData)
    }
}

const convertMidiEventToArrayBuffer = (message: WebMidi.MIDIMessageEvent): ArrayBuffer => {

    const messageBuffer = new Uint8Array( message.data.length )

    message.data.forEach((message, i) => messageBuffer[i] = message)

    return messageBuffer
}