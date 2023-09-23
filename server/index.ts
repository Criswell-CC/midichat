import { createRequire } from "module"
const require = createRequire(import.meta.url)

import { createServer } from 'http'
import express, { Request, Response } from 'express'

const path = require('path')
const url = require('url')

const bodyParser = require('body-parser')
const cors = require('cors')

import { RawData, WebSocketServer } from 'ws'
const WebSocket = require('ws')

import * as Validators from './src/validators/validators.js'

import { Room } from './src/types/room.js'

require('dotenv').config()

const PORT = 8081
const P2P_LIMIT = 4

const corsOptions = { 
    //origin: '*'
    origin: process.env.ALLOWED_ORIGIN
}

const app = express()

app.use(bodyParser.json())
app.use(cors(corsOptions))

const server = createServer(app)
const socketServer = new WebSocketServer({ server: server, clientTracking: true })

// global map to keep track of rooms in use; ok as a global for now, but would be good to use an in-memory store to scale
const rooms = new Map<string, Room>()

const userList = new Map<string, string>()

const BROADCASTER_TYPE = 'broadcaster'

app.post('/authenticate', Validators.validateAuthenticateRules(), Validators.validateAuthenticateRequest, (req: Request, res: Response) => {

    const roomId = req.body.room_id
    const userId = req.body.user_id

    if (checkIfRoomExists(roomId)) {

        const room = rooms.get(roomId)

        if (typeof room !== 'undefined') {

            if (room.roomType === 'p2p' && room.clients.length === P2P_LIMIT) {
                console.log("p2p room at capacity: " + roomId)
                return res.send({ authenticated: false })
            }
        }

        else {
            console.log("Room not found on authentication request: " + roomId)
            return res.status(500).send({ authenticated: false} )
        }
    }

    else {
        const room: Room = {
            roomId: roomId,
            roomType: req.body.room_type,
            broadcasterId: req.body.user_type === BROADCASTER_TYPE ? userId : "",
            clients: []
        }

        rooms.set(roomId, room)
        console.log("New room created: " + roomId + " by user: " + userId)
    }

    return res.status(200).json({ authenticated: true })
})

app.post('/checkJoinRoom', Validators.validateCheckJoinRoomRules(), Validators.validateCheckJoinRoomRequest, (req: Request, res: Response) => {

    const room_id = req.body.room_id

    if (checkIfRoomExists(room_id)) {

        if (checkRoomType(room_id) === 'broadcast') {
            return res.send({ valid: true, room_type: 'broadcast' })
        }

        //p2p room
        else {
            if (checkListenerLimit(room_id)) {
                return res.send({ valid: true, room_type: 'p2p' })
            } else {
                return res.send({ valid: false, message: "p2p room limit reached!" })
            }
        }
    }

    else {
        return res.send({ valid: false, message: "Invalid room id!" })
    }    
})

app.post('/checkUsername', Validators.validateCheckUsernameRules(), Validators.validateCheckUsernameRequest,  (req: Request, res: Response) => {

    if (userList.has(req.body.username)) {
        return res.status(422).send({ valid: false, message: "Username already exists!" })
    }

    else {
        userList.set(req.body.user_id, req.body.username)
        return res.send({ valid: true })
    }
})

socketServer.on('connection', (socket, req) => {

    const params = url.parse(req.url, true).query

    console.log("New socket connection: " + JSON.stringify(params))

    socket.roomId = params.roomId
    socket.userId = params.userId
    socket.userType = params.userType

    console.log("Adding listener to room: " + socket.roomId)
    rooms.get(socket.roomId)?.clients.push(socket)

    socket.on('error', (error) => {
        console.log("Socket error: " + error)
    })

    socket.on('message', (data, isBinary) => {

        if (socket.userType === BROADCASTER_TYPE) {

            if (isBinary) {

                // FIXME: make new function that only sends midi message to clients
                // chat should send/receive all
                // midi: only non-broadcaster
                sendMessageToClients(socket, data, isBinary)

                // this will send to all clients, regardless of room
                // socketServer.clients.forEach((client) => {
                //     if (client.readyState == WebSocket.OPEN) {
                //         client.send(data, { binary: isBinary})
                //     }
                // })
            }

            else {
                sendMessageToClients(socket, data)
            }
        }

        // TODO: handle quit messages
        // put quit messages on beforeunload

        // send chat message
        else {
            sendMessageToClients(socket, data)
        }
    })

    // socket.on('end', (event) => {
    //     removeListenerFromRoom(socket)
    //     console.log("Socket ending: " + socket.userId)
    //     if (rooms.get(socket.roomId)?.clients.length === 0) {
    //         console.log("Closing room: " + socket.roomId)
    //         removeRoomOnEmpty(socket.roomId)
    //     }
    //     socket.terminate()
    // })

    socket.on('close', (event) => {
        removeListenerFromRoom(socket)
        console.log("Closing socket: " + event)
        socket.terminate()
    })

    socket.on('disconnect', (event) => {
        removeListenerFromRoom(socket)
        console.log("Socket disconnected: " + JSON.stringify(event))
    })
})

// server.on('upgrade', (req, socket, head) => {

//     // filter on path
//     // path = room id
// /* 
//     if (isValid(pathname)) {
//         socketServer.handleUpgrade(req, socket, head, (ws) => {
//             ws.emit('connection', ws, req)
//         })
//     } */

// /*     else {
//         socket.destroy()
//     }
//  */
// })

const checkIfRoomExists = (roomId: string): boolean => {
    return typeof rooms.get(roomId) !== 'undefined'
}

const checkRoomType = (roomId: string) => {
    return rooms.get(roomId)?.roomType
}

const checkListenerLimit = (roomId: string) => {
    return rooms.get(roomId)?.clients.length === P2P_LIMIT
}

// TODO: fix typing on socekt
const sendMessageToClients = (socket, data: RawData, isBinary?: boolean) => {

    rooms.get(socket.roomId)?.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            isBinary ? client.send(data, { binary: isBinary }) : client.send(data.toString())
        }
    })
}

// TODO: fix typing on socket
const removeListenerFromRoom = (socket) => {

    const index = rooms.get(socket.roomId)?.clients.indexOf(socket)
        
    if (typeof index !== 'undefined') {
        rooms.get(socket.roomId)?.clients.splice(index, index)
    }
}

// TODO: implement
const removeRoomOnEmpty = (roomId: string) => {

}

server.listen(PORT, () => {
    console.log("Server listening on port: " + PORT)
})