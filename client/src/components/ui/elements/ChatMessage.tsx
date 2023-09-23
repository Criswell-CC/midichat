import React from 'react'

import { IMessage } from '@/types/chat'

interface ChatMessageProps {
    message: IMessage
}

const ChatMessage = ({message}: ChatMessageProps) => {
  return (
    <div className='flex flex-row -space-y-1 my-1 px-3 py-1  rounded-lg text-left '>
      <span className='text-sm font-semibold text-green-700'>
        {/* do a different weight/color */}
          {message.username}:
      </span>
      <span className='text-black-100 font-sm'>{" " + message.content}</span>
    </div>
  )
}

export default ChatMessage