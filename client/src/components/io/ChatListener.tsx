import { Dispatch, SetStateAction } from 'react'

import { IMessage } from '@/types/chat'

interface ChatListenerProps {
    setMessages: Dispatch<SetStateAction<IMessage[]>>
    socket: WebSocket | null
}

const ChatListener = ({socket, setMessages}: ChatListenerProps) => {

    if (socket) {
        socket.onmessage = (messageEvent: MessageEvent) => { 
            const message: IMessage = JSON.parse(messageEvent.data)
            setMessages((oldState) => [...oldState, message])
        }
    }

    return null
}

export default ChatListener