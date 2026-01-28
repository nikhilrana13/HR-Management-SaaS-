import { io } from "socket.io-client";


export const socket = io(process.env.NEXT_PUBLIC_FRONTEND_URL,{
    withCredentials:true,
    transports:['websocket']
})

export default socket 

