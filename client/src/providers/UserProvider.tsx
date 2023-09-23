'use client'

import React, { PropsWithChildren, useMemo, useReducer } from 'react'

import { UserContext } from '@/context/UserContext'
import { userReducer } from '@/reducers/userReducer'

export const UserProvider = ({children}: PropsWithChildren) => {

    const [state, dispatch] = useReducer(userReducer, {
            id: "",
            type: "",
            username: ""
        }
    )

    const contextValue = useMemo(() => ({ state, dispatch }), [state, dispatch])

    return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
}