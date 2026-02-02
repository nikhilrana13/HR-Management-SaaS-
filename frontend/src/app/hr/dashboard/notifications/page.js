"use client"
import AllNotifications from '@/components/hr/AllNotifications'
import DashboardHeader from '@/components/hr/DashboardHeader'
import { MarkedAllRead } from '@/redux/NotificationSlice'
import axios from 'axios'
import React from 'react'
import toast from 'react-hot-toast'
import { IoIosDoneAll } from 'react-icons/io'
import { useDispatch } from 'react-redux'

const page = () => {
    const dispatch = useDispatch()
     // handle mark read 
  const handleMarkAsRead = async()=>{
         try {
              const response = await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/notification/markread`,{},{
                headers:{
                  Authorization:`Bearer ${localStorage.getItem("token")}`
                }
              })
              // console.log("response",response?.data)
              if(response?.data?.status === "success"){
                 dispatch(MarkedAllRead())
                 toast.success(response?.data?.message)
              }
         } catch (error) {
          console.error("failed to mark notifications",error)
          toast.error(error?.response?.data?.message || "Internal server error")
         }
  } 
  return (
    <div className='flex flex-col'>
         <DashboardHeader />
         <div className='flex flex-col gap-3 px-4 md:px-9 py-4'>
          <div className="flex gap-5 md:items-center flex-col md:flex-row  md:justify-between">
          <div className="flex flex-col">
            <span className="text-[1.5rem]  font-bold text-black dark:text-white">
              Notification Center
            </span>
            <span className="text-sm text-[#4c599a] dark:text-[#a1a7c5] font-normal">
              Manage and respond to all employee updates in one place
            </span>
          </div>
          <div>
            <button onClick={()=>handleMarkAsRead()}  className="w-full  px-5 py-3 cursor-pointer bg-[#1337ec] text-white rounded-lg text-[0.8rem] font-medium hover:bg-[#1337ec]/90 focus:ring-4 focus:ring-[#1337ec]/30 transition-all flex items-center justify-center gap-2">
           <IoIosDoneAll size={27} />   Mark all Read
            </button>
            
          </div>
          </div>
           {/* all notifications */}
           <AllNotifications />
         </div>
    </div>
  )
}

export default page