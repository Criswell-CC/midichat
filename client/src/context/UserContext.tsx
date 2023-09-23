'use client'

import { createContext, Dispatch } from 'react'

import { UserAction } from '@/actions/userActions'
import { IUser } from '@/types/user'

const initialState = {
    state: {
        id: "",
        type: "",
        username: ""
    },
    dispatch: () => {}
}

export const UserContext = createContext<{ state: IUser, dispatch: Dispatch<UserAction>}>(initialState)