"use client"
import { getSocket } from '@/config/socket'
import { SetUser } from '@/redux/AuthSlice'
import { resetNotifications } from '@/redux/NotificationSlice'
import { persistor } from '@/redux/Store'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'

const UseLogout = () => {
     const router = useRouter()
     const dispatch = useDispatch()

     const handleLogout = async()=>{
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/logout`)
            if(response.data.status === "success"){
                const socket = getSocket() 
                if(socket?.connected){
                    socket.disconnect()
                }
                localStorage.removeItem("token")
                 // clear persisted notification data
                await persistor.purge()
                dispatch(resetNotifications())
                dispatch(SetUser(null))
                toast.success(response?.data?.message)
                router.replace("/auth/login")
            }
        } catch (error) {
            console.error("failed to logout",error)
            return toast.error(error?.response?.data?.message || "Internal server error")
        }
     }
  return {handleLogout}
}

export default UseLogout