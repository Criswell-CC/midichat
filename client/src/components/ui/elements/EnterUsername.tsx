import React, { Dispatch, useContext, useRef, useState } from 'react'

import { Box, Button, TextField, Typography } from '@mui/material'

import BasicModal from './BasicModal'

import { UserAction, UserActionNames } from '@/actions/userActions'

import ErrorPopup from './ErrorPopup'

import { ERROR_MESSAGES } from '@/constants/errorMessages'
import { UserContext } from '@/context/UserContext'

interface EnterUsernameProps {
    dispatch: Dispatch<UserAction>
}

const EnterUsername = (props: EnterUsernameProps) => {

    const [enteredUsername, setEnteredUsername] = useState<string>('')
    const [showError, setShowError] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string>('')

    const userContext = useContext(UserContext)

    const textInput = useRef(null)

    const handleEnter = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (document.activeElement === textInput.current && e.key === 'Enter') {
          await handleSubmit()
        }
    }

    const checkUsername = async (username: string): Promise<boolean> => {

        try {
            const res = await fetch(process.env.REACT_APP_SERVER_URL + '/checkUsername', { method: 'POST', body: JSON.stringify({ user_id: userContext.state.id, 
                username: username }), 
                    headers: {
                        'Content-Type': 'application/json'
                    }, 
                })
            const json = await res.json()
            return json.valid
        }

        catch (e) {
            throw e
        }
    }

    const handleSubmit = async () => {

        if (enteredUsername !== '') {
            try {
                const valid = await checkUsername(enteredUsername)
                if (valid) {
                    props.dispatch({type: UserActionNames.UPDATE_USERNAME, payload: { username: enteredUsername }})
                }
                else {
                    setErrorMessage(ERROR_MESSAGES.INVALID_USERNAME_ERROR)
                    setShowError(true)
                }
            }
            catch (e) {
                setErrorMessage(ERROR_MESSAGES.NETWORK_ERROR)
                setShowError(true)
            }
        }
    }

    return (
        <BasicModal open={true}>
            <Typography textAlign="center" fontWeight={650}>
                Enter your username
            </Typography>
            <TextField inputRef={textInput} sx={{ width: "100%", marginTop: "3%" }} inputProps={{ sx: { height: "1vh" }}} value={enteredUsername} 
                onChange={(e) => { setEnteredUsername(e.target.value)}} onKeyDown={handleEnter}/>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: "3%"}}>
                <Button onClick={handleSubmit} color="primary" variant="contained">
                    Submit
                </Button>
            </Box>
            { showError && <ErrorPopup errorMessage={errorMessage} setShowPopup={setShowError}/> }
        </BasicModal>
    )
}

export default EnterUsername
