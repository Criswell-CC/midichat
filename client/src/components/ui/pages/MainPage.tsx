import React from 'react'

import MidiAccess from '@/components/io/MidiAccess'
import MainPageLayout from '@/components/ui/layouts/MainPageLayout'

const MainPage = () => { 
    return (
        <>
            <MidiAccess/>
            <MainPageLayout/>
        </>
    )
}

export default MainPage

