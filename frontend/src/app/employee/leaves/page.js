"use client"
import DashboardHeader from '@/components/employee/DashboardHeader'
import EmployeeRequestLeaveTable from '@/components/employee/EmployeeRequestLeaveTable'
import StatsCard from '@/components/hr/StatsCard'
import StatsCardShimmer from '@/components/hr/StatsCardShimmer'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FaRegCheckCircle } from 'react-icons/fa'
import { MdCancel, MdOutlinePendingActions, MdRequestPage } from 'react-icons/md'

const page = () => {
    const [Statsloading,setStatsloading] = useState(false)
      const [StatsCount,setStatsCount] = useState({
         totalRequests:0,
         pendingLeaves:0,
         approvedLeaves:0,
         rejectedLeaves:0,
      })

  const stats = [
      {
        title: "Total Requests",
        value:StatsCount.totalRequests || 0,
        icon: MdRequestPage,
        iconBg: "bg-blue-100",
        iconColor: "text-blue-600",
      },
      {
        title: "Approved",
        value: StatsCount.approvedLeaves || 0,
        icon: FaRegCheckCircle,
        iconBg: "bg-emerald-50",
        iconColor: "text-emerald-500",
      },
      {
        title: "pending",
        value: StatsCount.pendingLeaves || 0,
        icon:  MdOutlinePendingActions,
        iconBg: "bg-rose-50",
        iconColor: "text-rose-500",
      },
      {
        title: "Rejected",
        value: StatsCount.rejectedLeaves || 0,
        icon:MdCancel,
        iconBg: "bg-amber-50",
        iconColor: "text-amber-500",
      },
    ];
    //  fetch dashboard stats
      useEffect(()=>{
           const fetchStats = async()=>{
            try {
                setStatsloading(true)
                 const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/leave/employee/dashboard/stats`,{
                  headers:{
                    Authorization:`Bearer ${localStorage.getItem("token")}`
                  }
                 })
                 if(response?.data?.status === "success"){
                  const total = response?.data?.data?.totalRequests
                   const approved = response?.data?.data?.approvedLeaves
                  const pending = response?.data?.data?.pendingLeaves
                   const rejected = response?.data?.data?.rejectedLeaves
                   setStatsCount((prev)=>({...prev,
                    totalRequests:total,
                    pendingLeaves:pending,
                    approvedLeaves:approved,
                    rejectedLeaves:rejected
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
  return (
    <div className='flex flex-col'>
        <DashboardHeader />
        <div className='flex flex-col gap-3 px-4 md:px-9 py-4'>
            {/* stats cards */}
        <div className='grid grid-cols-1 mt-4 md:grid-cols-3 lg:grid-cols-4 gap-5'>
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
        <EmployeeRequestLeaveTable />
        </div>
      
    </div>
  )
}

export default page