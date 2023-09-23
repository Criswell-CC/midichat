import { Dispatch, SetStateAction } from 'react'

export interface IAuthMessage {
    room_id: string,
    room_type: string,
    user_id: string,
    user_type: string
}

export interface IAuthInfo {
    authMessage: string,
    authenticated: boolean,
    authResponseReceived: boolean,
    setAuthMessage: Dispatch<SetStateAction<string>>,
    setAuthenticated: Dispatch<SetStateAction<boolean>>,
    setAuthResponseReceived: Dispatch<SetStateAction<boolean>>
}