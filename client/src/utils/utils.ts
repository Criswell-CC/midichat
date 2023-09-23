import { v4 } from 'uuid'

import { IMessage } from '@/types/chat'
import { USER_TYPES } from '@/constants/userTypes'

export const getErrorMessage = (error: unknown) => {
  if (error instanceof Error) return error.message
  return String(error)
}

export const generateRoomId = () => {
  return v4()
}

export const generateUserId = () => {
  return v4()
}

export const extractRoomId = (path: string): string => {
  return path.slice(1).substring(path.slice(1).indexOf('/')+1)
}

export const extractRoomType = (path: string): string => {
  return path.slice(path.indexOf('/')+1, path.lastIndexOf('/'))
}

export const isBroadcaster = (userType: string | undefined): boolean => userType === USER_TYPES.BROADCASTER_TYPE

export const getProperRoomTypeCapitalization = (roomType: string): string => {
  if (roomType === "broadcast") {
    return "Broadcast"
  }
  else if (roomType === "p2p") {
    return "P2P"
  }
  else {
    return ""
  }
}

export const createMessageObject = (content: string, username: string): IMessage => {
  return {
    content: content, 
    username: username !== "" ? username : "anon", 
    timestamp: new Date().getTime()
  }
}