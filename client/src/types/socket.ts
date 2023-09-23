import { Dispatch, SetStateAction }  from 'react'
import { SocketAction } from '@/actions/socketActions'

export interface ISocketInfo {
    socket: WebSocket | null,
    setSocket: Dispatch<SetStateAction<WebSocket | null>>,
    socketContextDispatch: Dispatch<SocketAction>,
    socketConnectionError: boolean,
    setSocketConnectionError: Dispatch<SetStateAction<boolean>>
}