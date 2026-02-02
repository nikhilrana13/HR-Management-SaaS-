"use client"
import { MarkedAllRead } from '@/redux/NotificationSlice'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import NotificationShimmer from './NotificationShimmer'
import { timeAgo } from '@/helps/FormatDatesndTime'

const AllNotifications = () => {
    const [notifcations,setNotifications] = useState([])
    const [loading,setLoading] = useState(false)
     
  // fetch notifications
  useEffect(()=>{
        const fetchNotifications = async()=>{
          try {
              setLoading(true)
              const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/notification/all`,{
                headers:{
                  Authorization:`Bearer ${localStorage.getItem("token")}`
                }
              })
            //   console.log("response",response)
              if(response.data){
                setNotifications(response?.data?.data)
              }
          } catch (error) {
            console.log("failed to get notifications",error)
          }finally{
           setLoading(false)
            
          }
        }
        fetchNotifications()
  },[])


   


  return (
    <div className='flex px-4 md:px-20 sm:justify-center py-3 '>
          <div className='bg-white w-full md:w-[700px]   flex border rounded-md flex-col'>
            <div className='flex border-b py-3 px-3 flex-col gap-2  sm:items-center sm:flex-row justify-between'>
              <div className='flex gap-2'>
                <div className='flex items-center gap-1'>
                 <span className='text-[0.8rem] font-semibold text-[#0A3D62]'>All notifcations</span>
                 <span className='text-[0.6rem] bg-[#F5F7FA] text-[#0A3D62] font-semibold border px-1  rounded-full '>{notifcations?.length || 0}</span>
              </div>
              </div>
            </div>
            {/* notifications */}
            {
              loading ? (
                <NotificationShimmer />
              ):notifcations?.length > 0 ? (
                <div className='flex flex-col   overflow-y-auto  h-[70vh] '>
                  {notifcations?.map((notification)=>{
                    return (
                      <div key={notification?._id} className={`flex flex-col  ${notification?.isRead === true ? "bg-white":"bg-[#F0F7FF]"} border-b  py-7 px-3  gap-1`}>
                    <div className='flex w-full  justify-between'>
                        <span className='text-[#0A3D62]   text-[0.9rem] font-semibold '>{notification?.title || "NA"}</span>
                       <span className='text-[0.8rem] text-gray-500'>{timeAgo(notification?.createdAt) || new Date().toLocaleDateString()}</span>        
                 </div>
                   <p className='text-gray-500 text-[0.8rem]'>{notification.content || "NA"}</p>
               </div> 
                    )
                })}
                </div>
              ):(
                <p className="py-10 text-center text-[#0A3D62]">
                      No notifications found
                </p>
              )
            }
          </div>
      </div>
  )
}

export default AllNotifications