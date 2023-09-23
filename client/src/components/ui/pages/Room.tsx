'use client'

import React, { useState, useContext, useEffect } from 'react'

import DeviceList from '@/components/ui/elements/DeviceList'
import RoomLayout from '@/components/ui/layouts/RoomLayout'

import Socket from '@/components/io/Socket'
import User from '@/components/state/User'
import WebRTC from '@/components/io/WebRTC'

import { useSearchParams } from 'next/navigation'
import { usePathname } from 'next/navigation'

import { extractRoomType, extractRoomId, getProperRoomTypeCapitalization } from '@/utils/utils'
import { MidiContext } from '@/context/MidiContext'
import { UserContext } from '@/context/UserContext'

const Room = () => {

    const userType = useSearchParams()
    const pathname = usePathname()

    const [userSet, setUserSet] = useState<boolean>(false)

    const userContext = useContext(UserContext)
    const midiContext = useContext(MidiContext)

    const [showModal, setShowModal] = useState(true)

    const roomType = extractRoomType(pathname)
    const roomId = extractRoomId(pathname)

    useEffect(() => {
        if (!userSet && userContext.state.id !== '' && userContext.state.type !== '') {
            setUserSet(true)
        }
    }, [userContext, userSet])

    return (
        <div>
            <RoomLayout roomType={getProperRoomTypeCapitalization(roomType)} midiDeviceName={midiContext.state.preferredDevice?.name} roomId={roomId} setShowModal={setShowModal}/>
            <User userType={typeof userType === "string" ? userType : ""}/>
            { roomType === 'broadcast' && userSet && <Socket/>}
            { roomType === 'p2p' && userSet && <WebRTC/>}
            <DeviceList showModal={showModal} setShowModal={setShowModal}/> 
        </div>
    )
}


export default Room