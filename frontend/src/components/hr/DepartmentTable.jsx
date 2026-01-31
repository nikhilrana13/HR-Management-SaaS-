"use client"
import React, { useEffect, useState } from 'react'
import DepartmentStats from './DepartmentStats'
import TableRowShimmer from './TableRowShimmer'
import { Switch } from '../ui/switch'
import axios from 'axios'
import { CiEdit } from 'react-icons/ci'
import toast from 'react-hot-toast'
import AddDepartmentDialog from './AddDepartmentDialog'
import UpdateDepartmentDialog from './UpdateDepartmentDialog'

const DepartmentTable = () => {
    const [loading,setLoading] = useState(false)
    const [departments,setDepartments] = useState([])
    const [totalemployees,setTotalemployees] = useState(0)
    const [toggelingId,setToggleId] = useState(null)

    useEffect(()=>{
          const fetchDepartment = async()=>{
            try {
                 setLoading(true)
                 const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/department/all`,{
                    headers:{
                        Authorization:`Bearer ${localStorage.getItem("token")}`
                    }
                 })
                 if(response?.data?.status === "success"){
                    setDepartments(response?.data?.data?.departments)
                    setTotalemployees(response?.data?.data?.totalemployees)
                 }
                
            } catch (error) {
                console.error(error?.response?.data?.message || "failed to get departments",error)
            }finally{
                setLoading(false)
            }
          }
          fetchDepartment()
    },[])
    // console.log("departments",departments)
    
    const handleToggledept = async(deptid,currentStatus)=>{
           try {
             setToggleId(deptid)
              const response = await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/department/toggle/${deptid}`,{
                isActive:!currentStatus
              },{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem("token")}`
                }
              })
              if(response?.data?.status === "success"){
                  toast.success(response?.data?.message)
                  setDepartments((prev)=>prev.map((dept)=> dept._id === deptid ? {...dept,isActive: !currentStatus}:dept))
              }
           } catch (error) {
             console.log("failed to toggle department",error)
             toast.error(error?.response?.data?.message || "Internal server error")
           }
    }
  return (
    <>
    
    <DepartmentStats departments={departments?.length} employees={totalemployees} />
      <div className='bg-white dark:bg-[#1a1d2d] border border-[#e7e9f3] dark:border-[#2a2d3d] rounded-md shadow-sm overflow-hidden'>
         <div className='overflow-x-auto'>
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-[#F8FAFC] border-b dark:bg-[#252839] text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wider">
                            <th className="px-6 py-3 font-bold">DEPARTMENT NAME</th>
                            <th className="px-6 py-3 font-bold">NO OF EMPLOYEES</th>
                            <th className="px-6 py-3 font-bold">Start Date</th>
                            <th className="px-6 py-3 font-bold">STATUS</th>
                              <th className="px-6 py-3 font-bold">UPDATE</th>
                            <th className="px-6 py-3 font-bold text-right">ACTIONS</th>
                        </tr>
                    </thead>
                    {
                        loading ? (
                            <tbody className="divide-y divide-[#e7e9f3] dark:divide-[#2a2d3d]">
                                {[1, 2, 3, 4].map((_item, index) => {
                                    return (
                                        <TableRowShimmer key={index} />
                                    )
                                })}
                            </tbody>
                        ) : departments?.length > 0 ? (
                            <tbody className="divide-y divide-[#e7e9f3] dark:divide-[#2a2d3d]">
                                {departments?.map((department) => {
                                    return (
                                        <tr key={department?._id} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col ">
                                        <span className='text-black text-[1rem] dark:text-white font-bold'>{department?.name}</span>
                                                    <span className='text-gray-500 text-[0.8rem] font-medium dark:text-gray-400'>ID:DEPT:{department?._id.slice(0,5)}</span>
                                                </div>
                                            </td>

                                            <td className="px-6 py-4  text-sm text-[#0d101b] dark:text-gray-300">
                                                <span className='inline-flex items-center px-3 py-1 rounded-full bg-[#1337ec]/10 text-[#1337ec] text-sm font-bold'>
                                                {department?.employees?.length || 0}</span>
                                                
                                            </td>
                                            <td className="px-6 py-4 text-sm text-[#0d101b] dark:text-gray-300">
                                                {new Date(department?.createdAt).toLocaleDateString("en-US", {
                                                    month: "short", day: 'numeric', year: 'numeric'
                                                })}
                                            </td>
                                            {
                                                department?.isActive === true && (
                                                    <td className="px-6 py-4">
                                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700">
                                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                                            Active
                                                        </span>
                                                    </td>
                                                )
                                            }
                                            {
                                                department?.isActive === false && (
                                                    <td className="px-6 py-4">
                                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-700">
                                                            <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                                                            InActive
                                                        </span>
                                                    </td>
                                                )
                                            } 
                                            <td className="px-6 py-4 cursor-pointer  text-sm text-[#0d101b] dark:text-gray-300">
                                               <UpdateDepartmentDialog deptname={department?.name} setDepartments={setDepartments}    deptid={department?._id} />
                                            </td>

                                         <td className="px-6 py-4 text-right text-sm text-[#0d101b] dark:text-gray-300">
                                                    <Switch className="cursor-pointer" checked={department?.isActive} 
                                                    disabled={toggelingId === department?._id}
                                                    onCheckedChange={()=>handleToggledept(department?._id,department?.isActive)}
                                                    id="toggle-active-nd-inactive-employee" />
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        ) : (
                            <tbody className="divide-y divide-[#e7e9f3] dark:divide-[#2a2d3d]">
                                <tr>
                                    <td colSpan="7" className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                                        <p>No Employees found</p>
                                    </td>
                                </tr>
                            </tbody>
                        )
                    }
                </table>
            </div>

      </div>
    </>
  )
}

export default DepartmentTable