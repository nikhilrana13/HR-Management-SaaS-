"use client"
import axios from 'axios'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import TableRowShimmer from './TableRowShimmer'

const RecentLeavesTable = () => {
    const [loading,setLoading] = useState(false)
    const [Leaves,setLeaves] = useState([])
    // fetch leaves
    useEffect(()=>{
               const fetchLeaves = async()=>{
                try {
                     setLoading(true)
                    const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/leave/all`,{
                        headers:{
                            Authorization:`Bearer ${localStorage.getItem("token")}`
                        }
                    })
                    // console.log("response",response.data)
                    if(response?.data?.status === "success"){
                        setLeaves(response?.data?.data?.leaves)
                    }
                } catch (error) {
                    console.error("failed to get leave",error)
                }finally{
                   setLoading(false)
                }
               }
               fetchLeaves()
        },[])
    // console.log("leaves",Leaves)

  return (
   <div className="bg-white dark:bg-[#1a1d2d] border border-[#e7e9f3] dark:border-[#2a2d3d] rounded-xl shadow-sm overflow-hidden">
  {/* Header */}
  <div className="flex items-center justify-between p-6 border-b border-[#e7e9f3] dark:border-[#2a2d3d]">
    <h3 className="text-lg font-bold text-[#0d101b] dark:text-white">
      Recent Leave Requests
    </h3>
    <Link href="/hr/dashboard/leaves" className="text-[#1337ec] text-sm font-bold">
      View All
    </Link>
  </div>
  {/* Table */}
  <div className="overflow-x-auto">
    <table className="w-full text-left">
      <thead>
        <tr className="bg-[#f6f6f8] dark:bg-[#252839] text-[#4c599a] dark:text-gray-400 text-xs uppercase tracking-wider">
          <th className="px-6 py-3 font-bold">Employee</th>
          <th className="px-6 py-3 font-bold">Leave Type</th>
          <th className="px-6 py-3 font-bold">Duration</th>
          <th className="px-6 py-3 font-bold">Status</th>
          <th className="px-6 py-3 font-bold text-right">Time</th>
        </tr>
      </thead>
        {
          loading ? (
            <tbody className="divide-y divide-[#e7e9f3] dark:divide-[#2a2d3d]"> 
              {[1,2,3,4].map((_item,index)=>{
                  return (
                    <TableRowShimmer key={index} />
                  )
              })}
            </tbody>
          ):Leaves?.length > 0 ? (
             <tbody className="divide-y divide-[#e7e9f3] dark:divide-[#2a2d3d]">
            {Leaves?.slice(0,4).map((leave)=>{
                const employeeprofilepic = leave?.employeeId?.profilepic
                const employeename = leave?.employeeId?.name
                const employeeposition = leave?.employeeId?.position
              return (
                 <tr key={leave?._id} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
            <div
                className="w-8 h-8">
                    <img src={employeeprofilepic || "/unknownuser.webp"} className='object-cover w-full h-full rounded-full' alt="User image" />
                </div>
              <div>
                <p className="text-sm font-bold text-[#0d101b] dark:text-white">
                  {employeename || "User"}
                </p>
                <p className="text-xs text-[#4c599a] dark:text-gray-400">
                  {employeeposition  || "NA"}
                </p>
              </div>
            </div>
          </td>

          <td className="px-6 py-4 text-sm text-[#0d101b] dark:text-gray-300">
            {leave?.leaveType || "NA"}
          </td>

          <td className="px-6 py-4 text-sm text-[#0d101b] dark:text-gray-300">
            {new Date(leave?.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).replace(/,/g, '')} - {new Date(leave?.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).replace(/,/g, '')} 

          </td>
          {
            leave?.status === "approved" && (
                   <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700">
                         <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      Approved
                   </span>
               </td>
            )
          }
          {
            leave.status === "pending" && (
                <td className="px-6 py-4">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-700">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
              Pending
            </span>
          </td>
          )
          }
          {
            leave.status === "rejected" && (
            <td className="px-6 py-4">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-700">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
              Rejected
            </span>
          </td>
            )
          }
          <td className="px-6 py-4 text-right">
            <span className="text-xs font-medium text-[#4c599a]">
              {new Date(leave?.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}, 
              {new Date(leave?.createdAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })}
            </span>
          </td>
          </tr>
              )
            })}
            </tbody>
          ):(
            <tbody className="divide-y divide-[#e7e9f3] dark:divide-[#2a2d3d]">
              <tr>
                <td colSpan="5" className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                  <p>No Leaves found</p>
                </td>
              </tr>
            </tbody>
          )
        }
    </table>
  </div>
</div>
  )
}

export default RecentLeavesTable