import { Dispatch } from 'react'

import { UserAction } from '@/actions/userActions'

export interface IUser {
    id: string,
    type: string
    username: string,
}

export interface IUserContext {
    state: IUser,
    dispatch: Dispatch<UserAction>
}