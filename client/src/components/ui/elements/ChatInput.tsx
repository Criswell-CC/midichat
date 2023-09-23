import React, { Dispatch, SetStateAction, useContext, useRef, useState } from 'react'

import { Box, IconButton, InputAdornment, TextField } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'

import { IMessage } from '@/types/chat'

import { UserContext } from '@/context/UserContext'
import { SocketContext } from '@/context/SocketContext'

import { createMessageObject } from '@/utils/utils'

interface ChatInputProps {
    messages: IMessage[]
    setMessages: Dispatch<SetStateAction<IMessage[]>>
}

const ChatInput = (props: ChatInputProps) => {

  const [text, setText] = useState<string>('')

  const chatInput = useRef(null)
  const userContext = useContext(UserContext)
  const socketContext = useContext(SocketContext)

  const username = userContext.state.username

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (document.activeElement === chatInput.current && e.key === 'Enter') {
      handleSubmit()
    }
  }

  const handleSubmit = () => {
    //pass in old state
    //props.setMessages([...props.messages, createMessageObject(text, userContext?.state.username)])

    socketContext.state.socket?.send(JSON.stringify(createMessageObject(text, username)))
    setText('')
  }

  return (
    <Box sx={{width: "100%"}}>
      <TextField id="filled-basic" label="Send message" variant="filled" sx={{ width: "100%"}} 
        onKeyDown={handleEnter} inputRef={chatInput} value={text} onChange={(e) => setText(e.target.value)}
        InputProps={{ endAdornment: 
          <InputAdornment position="end">
            <IconButton onClick={handleSubmit}>
              <SendIcon color='primary'/>
            </IconButton>
          </InputAdornment>
        }}/>
    </Box>
  )
}

export default ChatInput