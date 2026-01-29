"use client"
import DashboardChart from '@/components/hr/DashboardChart'
import RecentLeavesTable from '@/components/hr/RecentLeavesTable'
import StatsCard from '@/components/hr/StatsCard'
import StatsCardShimmer from '@/components/hr/StatsCardShimmer'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FaRegCheckCircle } from 'react-icons/fa'
import { FaUsersLine } from 'react-icons/fa6'
import { IoIosNotificationsOutline } from 'react-icons/io'
import { MdCancel, MdOutlinePendingActions } from 'react-icons/md'
import { useSelector } from 'react-redux'

const page = () => {
  const user = useSelector((state)=>state.Auth.user)
  const [Statsloading,setStatsloading] = useState(false)
  const [StatsCount,setStatsCount] = useState({
    totalemployee:0,
    present:0,
    absent:0,
    halfday:0
  }) 
  //  fetch dashboard stats
  useEffect(()=>{
       const fetchStats = async()=>{
        try {
            setStatsloading(true)
             const todayDate = new Date().toISOString().split('T')[0]
             const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/attendance/stats?date=${todayDate}`,{
              headers:{
                Authorization:`Bearer ${localStorage.getItem("token")}`
              }
             })
             if(response?.data?.status === "success"){
               const employees = response?.data?.data?.totalEmployees
               const present = response?.data?.data?.present 
               const absent = response?.data?.data?.absent
               const halfday = response?.data?.data?.halfday 
               setStatsCount((prev)=>({...prev,
                absent:absent,
                totalemployee:employees,
                present:present,
                halfday:halfday
               }))
             }
        } catch (error) {
          console.error("Failed to get dashboard stats",error)
        }finally{
            setStatsloading(false)
        }
       }
        fetchStats()
  },[])
   const stats = [
    {
      title: "Total Employees",
      value:StatsCount.totalemployee || 0,
      icon: FaUsersLine,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      title: "Present Today",
      value: StatsCount.present || 0,
      icon: FaRegCheckCircle,
      iconBg: "bg-emerald-50",
      iconColor: "text-emerald-500",
    },
    {
      title: "Absent",
      value: StatsCount.absent || 0,
      icon: MdCancel,
      iconBg: "bg-rose-50",
      iconColor: "text-rose-500",
    },
    {
      title: "Halfday",
      value: StatsCount.halfday || 0,
      icon: MdOutlinePendingActions,
      iconBg: "bg-amber-50",
      iconColor: "text-amber-500",
    },
  ];
  return (
    <div className='flex flex-col'>
      {/* header */}
      <header className='bg-white border-b px-5 py-1 items-center flex justify-between'>
        <h3 className='text-black dark:text-white text-sm sm:text-[1.3rem] font-bold'>Dashboard Overview</h3>
        <div className='flex px-3 py-2.5 items-center gap-4'>
          {/* notifications */}
           <div className='relative flex cursor-pointer items-center justify-center size-10 rounded-lg bg-[#f6f6f8] dark:bg-[#252839] text-[#4c599a] dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors'>
            <IoIosNotificationsOutline size={23} />
            <span className='absolute top-2 right-2.5 size-2 bg-red-500 rounded-full border-2 border-white dark:border-black'></span>
           </div>
          <div className='h-8 w-px bg-[#e7e9f3] dark:bg-[#2a2d3d]'></div>
          {/* profile */}
          <div className='flex gap-3'>
              <div className='hidden sm:flex flex-col items-end '>
                        <span className='text-sm font-bold  text-[#0d101b] dark:text-white'>{user?.name || "User"}</span>
                         <span className='text-[#4c599a] dark:text-gray-400 text-[0.7rem] font-medium'>
                          {user?.role === "hr" ? "Hr":"Employee"}
                         </span>
            </div>
                    {/* profile image */}
            <Avatar>
                <AvatarImage src={user?.profilepic || '/unknownuser.webp' } />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
          </div>
      </header>
      {/* dashboard content */}
      <div className='flex border px-4 sm:px-9 py-5 flex-col gap-3'>
        {/* stats cards */}
        <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5'>
          {
            Statsloading ? (
                <>
                 {[1,2,3,4].map((_,index)=>{
                   return (
                    <StatsCardShimmer key={index} />
                   )
                 })}
                </>
            ):(
               stats?.map((item,index)=>{
              const Icon = item.icon
              return (
                <StatsCard key={index} title={item.title} value={item.value} iconBg={item.iconBg} iconColor={item.iconColor} Icon={Icon} />
              )
               })
            )
          }
        </div>
        <DashboardChart />
        <RecentLeavesTable />
      </div>

    </div>
  )
}

export default page