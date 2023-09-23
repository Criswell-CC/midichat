import ws from 'ws'

declare module 'ws' {
    export interface WebSocket extends ws {
        roomId: string
        userId: string
        userType: string
    }
}