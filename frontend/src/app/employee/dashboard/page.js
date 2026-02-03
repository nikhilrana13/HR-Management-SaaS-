"use client"
import DashboardHeader from '@/components/employee/DashboardHeader'
import RecentAttendanceTable from '@/components/employee/RecentAttendanceTable'
import TimeCircle from '@/components/employee/TimeCircle'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { ThreeDots } from 'react-loader-spinner'
import { useSelector } from 'react-redux'

const page = () => {
  const user = useSelector((state)=>state.Auth.user)
  const [loading,setLoading] = useState(false)  
  const [outloading,setoutLoading] = useState(false)
  const [attendances,setAttendances] = useState([])

  const handleMarkCheckIn = async()=>{
      try {
        setLoading(true)
         const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/attendance/check-in`,{},{
          headers:{
            Authorization:`Bearer ${localStorage.getItem("token")}`
          }
         })
         if(response?.data?.status === "success"){
           toast.success(response?.data?.message)
         }
      } catch (error) {
         console.error("failed to attendance mark check in",error)
         toast.error(error?.response?.data?.message || "Internal server error")
      }finally{
        setLoading(false)
      }
  }
  const handleMarkCheckOut = async()=>{
      try {
        setoutLoading(true)
         const response = await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/attendance/check-out`,{},{
          headers:{
            Authorization:`Bearer ${localStorage.getItem("token")}`
          }
         })
         if(response?.data?.status === "success"){
           toast.success(response?.data?.message)
         }
      } catch (error) {
         console.error("failed to attendance mark check in",error)
         toast.error(error?.response?.data?.message || "Internal server error")
      }finally{
        setoutLoading(false)
      }
  }
  return (
    <div className='flex flex-col'>
      <DashboardHeader />
        <div className='flex border px-4 sm:px-9 py-5 flex-col gap-5'>
          {/* heading */}
          <div>
            <h1 className="text-3xl font-black">Good Morning, {user?.name || "User"} 👋</h1>
            <p className="text-gray-500">{new Date().toDateString()}</p>
          </div>
          {/* clock */}
           <div className="bg-white dark:bg-[#101322] rounded-xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm flex flex-col md:flex-row gap-8 items-center">
            <TimeCircle />
            <div className="flex-1 space-y-2 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2">
                <p className="text-sm font-semibold text-black uppercase">
                  Active Session
                </p>
              </div>
              <h2 className="text-xl text-green-600  font-bold">
               Check-In completed at 09:00am
              </h2>
              <p className="text-sm text-gray-500">
                You've been working since 06:30 AM.
              </p>
            </div>
            <div className="flex gap-3">
              <button onClick={()=>handleMarkCheckIn()} className="px-6 py-3 cursor-pointer bg-gray-100 dark:bg-gray-800 rounded-lg font-bold text-sm">
                {loading ? (
                  <ThreeDots
                  visible={true}
                  height="20"
                  width="20"
                  color="#000000"
                  radius="9"
                  ariaLabel="three-dots-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                  />
                ):"Clock In"
              } 
              </button>
              <button onClick={()=>handleMarkCheckOut()} className="px-8 py-3 bg-[#1337ec] cursor-pointer text-white rounded-lg font-bold text-sm shadow-lg shadow-[#1337ec]/20">
                  {outloading ? (
                  <ThreeDots
                  visible={true}
                  height="20"
                  width="20"
                  color="#ffffff"
                  radius="9"
                  ariaLabel="three-dots-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                  />
                ):"Clock Out"
              } 
              </button>
            </div>
          </div>
          {/* recent attendance and announcement table */}
          <RecentAttendanceTable attendances={attendances} setAttendances={setAttendances} />
        </div>
    </div>
  )
}

export default page