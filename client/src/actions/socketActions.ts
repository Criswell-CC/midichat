export enum SocketActionNames {
    UPDATE_SOCKET = "UPDATE_SOCKET",
}

export type SocketAction =
    {
        type: typeof SocketActionNames.UPDATE_SOCKET,
        payload: { socket: WebSocket | null }
    } 

export const updateSocketAction = (socket: WebSocket | null) => ({
    type: SocketActionNames.UPDATE_SOCKET,
    payload: socket
})