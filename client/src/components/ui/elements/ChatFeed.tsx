import React from 'react'

import { Box } from '@mui/system'

import { List } from '@mui/material'

import ChatMessage from './ChatMessage'
import { IMessage } from '@/types/chat'

interface ChatFeedProps {
  messages: IMessage[]
}

const ChatFeed = ({messages}: ChatFeedProps) => {
  return (
    <Box sx={{ height: '73vh', paddingLeft: "5%", paddingRight: "2%"}}>
      <List>
        { messages.map((message) => {
              return (
                  <ChatMessage message={message} key={message.timestamp}/>
              )
          })}
      </List>

    </Box>
  )
}

export default ChatFeed