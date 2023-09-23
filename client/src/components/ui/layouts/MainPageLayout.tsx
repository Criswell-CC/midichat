import React from 'react'

import Link from 'next/link'
import { Container, Typography, Slide, Fade } from '@mui/material'
import Stack from '@mui/material/Stack'

import Card from '@/components/ui/elements/Card'

import { generateRoomId } from '@/utils/utils'

const MainPageLayout = () => {

    return (
        <Container maxWidth="lg" sx={{ textAlign: "center"}}>
            <Typography variant="h4" className="MainPage-header" color="common.white">
                Midi chat
            </Typography>
            <Slide direction="right" in={true} unmountOnExit={true}>
                <Fade in={true}>
                    <Stack direction="row" spacing={3} justifyContent="center">
                        <Card elevation={9}>
                            <Link href={{pathname: '/broadcast/' + generateRoomId(), query: {userType: 'broadcaster'}}} style={{ display: "inline-block", paddingTop: "2.5vh", fontSize: ".93em" }}> Broadcast to large audience </Link>
                        </Card>
                        <Card elevation={8}>
                            <Link href={{pathname: '/p2p/' + generateRoomId(), query: {userType: 'broadcaster'}}} style={{ display: "inline-block", paddingTop: "3.5vh", fontSize: ".93em" }}> Perform for a small crowd </Link>
                        </Card>
                        <Card elevation={8}>
                            <Link href='/join' style={{ display: "inline-block", paddingTop: "3.5vh", fontSize: ".93em" }}>Join a room</Link>
                        </Card>
                    </Stack>
                </Fade>
            </Slide>
        </Container>
    )
}

export default MainPageLayout