'use client'

import { useContext, useState } from 'react'

import { UserContext } from '@/context/UserContext'
import { MidiContext } from '@/context/MidiContext'

import { usePathname } from 'next/navigation'

import { useSetAuthMessage, useAuthenticate, useSetSocket, useRegisterSocketCallbacks } from '@/hooks/socketHooks'

import { SocketContext } from '@/context/SocketContext'

import { extractRoomId, extractRoomType, isBroadcaster } from '@/utils/utils'

import ErrorPopup from '@/components/ui/elements/ErrorPopup'
import ConfirmationPrompt from '@/components/ui/elements/ConfirmationPrompt'

import { ERROR_MESSAGES } from '@/constants/errorMessages'

import { IRoom } from '@/types/room'
import { IUser } from '@/types/user'
import { ISocketInfo } from '@/types/socket'
import { IAuthInfo } from '@/types/auth'

const Socket = () => {

    const CONFIRMATION_MESSAGE = "Are you sure you want to quit?" 

    const pathname  = usePathname()

    const [ authMessage, setAuthMessage ] = useState(JSON.stringify({}))
    const [ authResponseReceived, setAuthResponseReceived ] = useState(false)
    const [ authenticated, setAuthenticated ] = useState(false)
    const [ socket, setSocket ] = useState<WebSocket | null>(null)
    const [ socketConnectionError, setSocketConnectionError ] = useState<boolean>(false)

    const midiContext = useContext(MidiContext)
    const socketContext = useContext(SocketContext)

    const userInfo: IUser = useContext(UserContext).state

    const roomInfo: IRoom = { 
        roomId: extractRoomId(pathname),
        roomType: extractRoomType(pathname)
    }

    const socketInfo: ISocketInfo = {
        socket: socket,
        setSocket: setSocket,
        socketContextDispatch: socketContext.dispatch,
        socketConnectionError: socketConnectionError,
        setSocketConnectionError: setSocketConnectionError,
    }

    const authInfo: IAuthInfo = {
        authMessage: authMessage,
        authenticated: authenticated,
        authResponseReceived: authResponseReceived,
        setAuthMessage: setAuthMessage,
        setAuthenticated: setAuthenticated,
        setAuthResponseReceived: setAuthResponseReceived
    }

    useSetAuthMessage(authInfo, userInfo, roomInfo)

    useAuthenticate(authInfo, socketInfo)

    useSetSocket(authInfo, socketInfo, midiContext, userInfo, roomInfo)

    useRegisterSocketCallbacks(userInfo, socketInfo, midiContext)

    return (
        <>
            { socketConnectionError && <ErrorPopup errorMessage={ERROR_MESSAGES.CONNECTION_LOST}/> }
            { isBroadcaster(userInfo.type) && <ConfirmationPrompt when={socket !== null} socket={socket} message={CONFIRMATION_MESSAGE}/> }
        </>
    )
}

export default Socket