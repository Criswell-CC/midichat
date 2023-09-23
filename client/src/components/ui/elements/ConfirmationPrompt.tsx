import { useCallback, useEffect } from 'react'

import { Router } from "next/router"

interface ConfirmationPromptProps {
    when: boolean
    message: string
    socket: WebSocket | null
}

const ConfirmationPrompt = ({ when, message, socket, ...props }: ConfirmationPromptProps) => {
    usePrompt(when, message, socket)
    return null
}

const usePrompt = (when: boolean, message: string | null | undefined | false, socket: WebSocket | null) => {

    useEffect(() => {

        const block = () => {
            if (when && typeof message === "string") {
                if (confirm(message)) {
                    socket?.send(JSON.stringify({

                    }))
                    socket?.close()
                }
            }
        }
    
        Router.events.on("routeChangeStart", block)
    
        return () => {
            Router.events.off("routeChangeStart", block)
        }

    }, [])

}

export default ConfirmationPrompt