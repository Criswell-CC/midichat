'use client'

import React, { useContext, useState } from 'react'

import JoinModal from '@/components/ui/elements/JoinModal'
import { useRouter } from 'next/navigation'

import { useDispatchUserType } from '@/hooks/userHooks'

import { UserContext } from '@/context/UserContext'

import ErrorPopup from '@/components/ui/elements/ErrorPopup'
import { ERROR_MESSAGES } from '@/constants/errorMessages'

import { ENDPOINTS } from '@/constants/endpoints'

const Join = () => {

    const [roomIdInput, setRoomIdInput] = useState<string>("")
    const [showError, setShowError] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string>("")

    const router = useRouter()
    const userContext = useContext(UserContext)

    useDispatchUserType("listener", userContext)

    const checkRoomId = async () => {

        const body = JSON.stringify({
            room_id: roomIdInput
        })

        try {

            const res = await fetch(process.env.REACT_APP_SERVER_URL + ENDPOINTS.CHECK_JOIN_ROOM, { method: 'POST', body: body, headers: {
                'Content-Type': 'application/json'
              } 
            })
    
            const json = await res.json()
    
            if (json.valid) {
                const roomType = json.room_type

                // this is a hack because app router from next/navigation doesn't support passing query strings or state
                // @ts-ignore
                router.push('/' + roomType + '/' + roomIdInput, { query: { userType: "listener" }})
            }
    
            else {
                setErrorMessage(json.message)                
                setShowError(true)
            }
        }

        catch (e) {
            setErrorMessage(ERROR_MESSAGES.NETWORK_ERROR)
            setShowError(true)
        }
    }

    return (
        <>
            <JoinModal handleSubmit={checkRoomId} roomIdInput={roomIdInput} setRoomIdInput={setRoomIdInput}/>
            { showError && <ErrorPopup errorMessage={errorMessage} setShowPopup={setShowError}/> }
        </>
    )
}

export default Join