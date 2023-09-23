'use client'

import React, { PropsWithChildren, useMemo, useReducer } from 'react'

import { SocketContext } from '@/context/SocketContext'
import { socketReducer } from '@/reducers/socketReducer'

export const SocketProvider = ({children}: PropsWithChildren) => {

    const [state, dispatch] = useReducer(socketReducer, {
            socket: null
        }
    )

    const contextValue = useMemo(() => ({ state, dispatch }), [state, dispatch])

    return <SocketContext.Provider value={contextValue}>{children}</SocketContext.Provider>
}