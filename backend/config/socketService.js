import {Server} from "socket.io"

let io; 

export const initializeSocket = (server)=>{
    io = new Server(server,{
        cors:{
            origin:process.env.NEXT_FRONTEND_URL,
            credentials:true,
            methods:["GET","POST","PUT","PATCH","DELETE"]
        },
        pingTimeout:60000
    })
    // when a new socket connection is established
    io.on("connection",(socket)=>{
        console.log(`user connected ${socket.id}`)
    // Company-wide notifications
    socket.on("join-company",({companyId,userId})=>{
         if (!companyId || !userId) return;
        socket.join(`company_${companyId}`);
        console.log(`User ${userId} joined company_${companyId}`)
    });
     // personal notifications (Hr/employee)
    socket.io("join-user",({userId})=>{
        if(!userId) return;
        socket.join(`user_${userId}`)
          console.log(`User joined personal room: user_${userId}`);
    })
    socket.on("disconnect",()=>{
        console.log(`User disconnected:`,socket.id)
    })
   })
return io
}
export const getIo = ()=>{
    if(!io){
        throw new Error("socket.io not initialized")
    }
    return io;
}



