'use client'

import React, { useContext, useState } from 'react'

import ChatFeed from '../elements/ChatFeed'
import ChatInput from '../elements/ChatInput'
import ChatLayout from '../elements/ChatLayout'
import ChatListener from '@/components/io/ChatListener'

import { Box } from '@mui/system'

import { IMessage } from '@/types/chat'

import { SocketContext } from '@/context/SocketContext'

const Chat = () => {

    const [messages, setMessages] = useState<IMessage[]>([])

    const socket = useContext(SocketContext).state.socket
    
    React.useEffect(() => {
        const el = document.getElementById('chat-feed')

        if (el) {
            el.scrollTop = el.scrollHeight
        }

    //dependency should be message list?
    }, [])

    return (
        <>
            <ChatListener socket={socket} setMessages={setMessages}/>
            <Box sx={{width: "100%", height: "100%"}}>
                <ChatLayout>
                    <ChatFeed messages={messages}/>
                    <ChatInput messages={messages} setMessages={setMessages}/>
                </ChatLayout>
            </Box>
        </>
    )
}

export default Chat