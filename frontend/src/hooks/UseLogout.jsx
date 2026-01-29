"use client"
import { SetUser } from '@/redux/AuthSlice'
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
                toast.success(response?.data?.message)
                localStorage.removeItem("token")
                dispatch(SetUser(null))
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