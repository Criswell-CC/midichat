'use client'

import { useContext } from 'react'

import { generateUserId } from '@/utils/utils'

import { useDispatchId, useDispatchUserType } from '@/hooks/userHooks'
import { UserContext } from '@/context/UserContext'
import { MidiContext } from '@/context/MidiContext'

import EnterUsername from '@/components/ui/elements/EnterUsername'

interface UserProps {
    userType: string
}

const User = ({userType}: UserProps) => {

    const userId = generateUserId()

    const userContext = useContext(UserContext)
    const midiContext = useContext(MidiContext)

    useDispatchId(userId, userContext)

    useDispatchUserType(userType, userContext)

    if (midiContext.state.preferredDevice && userContext.state.username === "") {
        return <EnterUsername dispatch={userContext.dispatch}/>
    }

    else {
        return null
    }

}

export default User