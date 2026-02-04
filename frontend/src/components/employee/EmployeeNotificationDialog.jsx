"use client"
import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { ArrowRight, BellIcon } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { Badge } from '../ui/badge'
import { IoIosCloseCircleOutline, IoIosDoneAll } from 'react-icons/io'
import { CiCircleInfo } from 'react-icons/ci'
import { MdCampaign, MdEventBusy } from 'react-icons/md'
import Link from 'next/link'
import { timeAgo } from '@/helps/FormatDatesndTime'
import axios from 'axios'
import toast from 'react-hot-toast'
import { MarkedAllRead } from '@/redux/NotificationSlice'
import NotificationDialogShimmer from '../hr/NotificationDialogShimmer'


const EmployeeNotificationDialog = () => {
 const [open, setOpen] = useState(false)
  const unreadCount = useSelector((state) => state.notification.unreadCount)
  const notificationsLive = useSelector((state) => state.notification.items)
  const [notifications,setNotifications] = useState([])
  const [loading,setLoading] = useState(false)
  const dispatch = useDispatch()
  // console.log("notifications", notifications)
  const mergedNotifications = [...notificationsLive,...notifications.filter(apiNoti=> !notificationsLive.some(liveNoti => liveNoti._id === apiNoti._id))]
  // console.log("merge notifications",mergedNotifications)
  // fetch all notifications 
  useEffect(()=>{
      if(!open) return;
      if(notificationsLive.length > 0 ) return;
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
  },[open])
  
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
  useEffect(() => {
  if (open) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }

  return () => {
    document.body.style.overflow = "auto";
  };
}, [open]);
  return (
     <>
      <Button onClick={() => setOpen(true)} className="relative cursor-pointer" size="sm" variant="outline">
        <BellIcon />
        {unreadCount > 0 && (<Badge
          className="-top-1 -right-2 cursor-pointer absolute z-10 h-5 min-w-5 rounded-full px-1 text-xs"
          variant="destructive">{unreadCount}+</Badge>
        )}
      </Button>
      {
        open && (
          <main className="flex-1 p-8">
            {/* <!-- Notification Center --> */}
            <div onClick={(e) => e.stopPropagation()} className="fixed top-16 right-5 md:right-6 left-4 md:left-auto w-auto md:w-96 bg-white dark:bg-[#1a1d2e] shadow-2xl rounded-xl border border-[#e7e9f3] dark:border-white/10 flex flex-col z-60 overflow-hidden max-h-[80vh]">
              {/* <!-- Header --> */}
              <div className="flex items-center justify-between p-4 border-b border-[#e7e9f3] dark:border-white/10">
                <div>
                  <h3 className="text-lg font-bold text-[#0d101b] dark:text-white">Notifications</h3>
                  <p className="text-xs text-[#4c599a] font-medium">You have {unreadCount} unread notifications</p>
                </div>
                <button onClick={()=>handleMarkAsRead()} className="text-xs font-bold cursor-pointer text-[#1337ec]  flex items-center gap-1">
                  <IoIosDoneAll size={27} />
                  Mark all as read
                </button>
              </div>
              {/* <!-- Info Panel --> */}
              <div className="p-3 bg-[#1337ec]/5 dark:bg-[#1337ec]/10 mx-4 mt-4 rounded-lg flex items-center justify-between border border-[#1337ec]/10">
                <div class="flex items-center gap-2">
                  <CiCircleInfo className='text-[#1337ec]' />
                  <p className="text-xs font-semibold text-[#1337ec]">
                    Pending actions require attention
                  </p>
                </div>
                <span onClick={() => setOpen(false)} className="text-[#1337ec]  text-xs cursor-pointer">
                  <IoIosCloseCircleOutline size={27} />
                </span>
              </div>
              {/* <!-- Notification List --> */}
              <div className="flex-1  custom-scrollbar overflow-y-auto mt-2">
                {
                  loading ? (
                     ([1,2,3,4,]).map((_,i)=>{
                      return (
                        <NotificationDialogShimmer key={i} />
                      )
                     })
                  ):mergedNotifications.length > 0 ? (
                    mergedNotifications?.map((notification) => {
                    const Icon = notification.type === "leave" ? <MdEventBusy /> : <MdCampaign />
                    return (
                      <div key={notification?._id} className={`flex gap-4 px-4 py-4 cursor-pointer relative  ${notification?.isRead === false ? "bg-[#1337ec]/5 dark:bg-[#1337ec]/5 border-l-4 border-[#1337ec]":"hover:bg-[#f6f6f8] dark:hover:bg-white/5 transition-colors"}`}>
                        <div className="flex items-center justify-center rounded-lg bg-yellow-100 dark:bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 size-11 shrink-0">
                          {Icon}
                        </div>
                        <div className="flex flex-col flex-1">
                          <div className="flex justify-between items-start">
                            <p className="text-[0.8rem] font-bold text-[#0d101b] dark:text-white">
                              {notification?.title || "NA"}
                            </p>
                            <span class="text-[10px] font-medium text-[#4c599a]">{timeAgo(notification?.createdAt)}</span>
                          </div>
                          <p className="text-xs text-[#4c599a] dark:text-gray-400 mt-1 line-clamp-2">
                            {notification?.content || notification?.message || "NA"}
                          </p>
                        </div>
                      </div>
                    )
                   })
                  ):(
                     <p className="py-10 text-center text-gray-500">
                      No notifications found
                    </p>
                  )
                }
                
              </div>
              {/* footer */}
              <div class="p-3 border-t border-[#e7e9f3] dark:border-white/10 bg-[#f6f6f8]/30 dark:bg-white/5 text-center">
                <Link href="/hr/dashboard/notifications" class="inline-flex items-center gap-2 text-sm font-bold text-[#1337ec] hover:text-[#1337ec]/80">
                  View all notifications
                  <ArrowRight size={15} />
                </Link>
              </div>
            </div>

            {/* <!-- Backdrop --> */}
            <div onClick={() => setOpen(false)} className="fixed inset-0 bg-[#101322]/20 dark:bg-black/40 backdrop-blur-[1px] z-50"></div>
          </main>
        )
      }

    </>
  )
}

export default EmployeeNotificationDialog