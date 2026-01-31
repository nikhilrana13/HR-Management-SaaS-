"use client"
import DashboardChart from '@/components/hr/DashboardChart'
import DashboardHeader from '@/components/hr/DashboardHeader'
import RecentLeavesTable from '@/components/hr/RecentLeavesTable'
import StatsCard from '@/components/hr/StatsCard'
import StatsCardShimmer from '@/components/hr/StatsCardShimmer'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FaRegCheckCircle } from 'react-icons/fa'
import { FaUsersLine } from 'react-icons/fa6'
import { MdCancel, MdOutlinePendingActions } from 'react-icons/md'


const page = () => {
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
      <DashboardHeader />
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