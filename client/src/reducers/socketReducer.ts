'use client'

import { Reducer } from 'react'

import { SocketAction, SocketActionNames } from '../actions/socketActions'

type SocketState = {
    socket: WebSocket | null
}

export const socketReducer: Reducer<SocketState, SocketAction> = (state: SocketState, action: SocketAction) => {
    switch (action.type) {
        case SocketActionNames.UPDATE_SOCKET:
            return {
                socket: action.payload.socket
            }
        default:
            return state
    }
}