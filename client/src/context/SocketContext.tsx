'use client'

import { createContext, Dispatch } from 'react'
import { SocketAction } from '@/actions/socketActions'

const initialState = {
    state: {
        socket: null
    },
    dispatch: () => {}
}

export const SocketContext = createContext<{ state: { socket: WebSocket | null }, dispatch: Dispatch<SocketAction>}>(initialState)