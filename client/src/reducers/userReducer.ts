'use client'

import { Reducer } from 'react'

import { IUser } from '@/types/user'
import { UserActionNames, UserAction } from '@/actions/userActions'

export const userReducer: Reducer<IUser, UserAction> = (state: IUser, action: UserAction) => {
    switch (action.type) {
        case UserActionNames.UPDATE_USER_ID:
            return {
                id: action.payload.id,
                type: state.type,
                username: state.username
            }
        case UserActionNames.UPDATE_TYPE:
            return {
                id: state.id,
                type: action.payload.type,
                username: state.username,
            }
        case UserActionNames.UPDATE_USERNAME:
            return {
                id: state.id,
                type: state.type,
                username: action.payload.username,
            }
        default:
            return state
    }
}