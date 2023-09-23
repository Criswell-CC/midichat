import ws from 'ws'

export interface Room {
    clients: ws[],
    roomId: string,
    roomType: string,
    broadcasterId: string
}