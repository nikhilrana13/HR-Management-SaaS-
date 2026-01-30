"use client"
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import TableRowShimmer from './TableRowShimmer'
import { Switch } from "@/components/ui/switch"
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '../ui/pagination'
import toast from 'react-hot-toast'

const EmployeesTable = ({selectedDepartment,isActive}) => {
    const [loading, setLoading] = useState(false)
    const [Employees, setEmployees] = useState([])
    const [pagination, setPagination] = useState({})
    const [toggelingId,setToggleId] = useState(null)
    const [page,setPage] = useState(1)
    // fetch employee
    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                setLoading(true)
                const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/employee/all`,{
                    params:{
                        department:selectedDepartment,
                        isActive:isActive,
                        page:page,
                        limit:5
                    },
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                })
                if (response?.data?.status === "success") {
                    setEmployees(response?.data?.data?.employees)
                    setPagination(response?.data?.data?.pagination)
                }
            } catch (error) {
                console.error("Failed to get employees", error)
            } finally {
              setLoading(false)
            }
        }
        fetchEmployees()
    }, [selectedDepartment,isActive,page])
    // console.log("employees", Employees)

    const start = (pagination?.currentPage - 1) * pagination?.limit + 1 
    const end = Math.min(pagination?.currentPage * pagination?.limit,pagination?.totalemployee)

    const handleToggleEmployee = async(employeeid,currentStatus)=>{
           try {
             setToggleId(employeeid)
              const response = await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/employee/status/${employeeid}`,{
                isActive:!currentStatus
              },{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem("token")}`
                }
              })
              if(response?.data?.status === "success"){
                  toast.success(response?.data?.message)
                  setEmployees((prev)=>prev.map((emp)=> emp._id === employeeid ? {...emp,isActive: !currentStatus}:emp))
              }
           } catch (error) {
             console.log("failed to toggle employee",error)
             toast.error(error?.response?.data?.message || "Internal server error")
           }
    }
    return (
        <div className='bg-white dark:bg-[#1a1d2d] border border-[#e7e9f3] dark:border-[#2a2d3d] rounded-md shadow-sm overflow-hidden'>
            <div className='overflow-x-auto'>
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-[#f6f6f8] dark:bg-[#252839] text-[#4c599a] dark:text-gray-400 text-xs uppercase tracking-wider">
                            <th className="px-6 py-3 font-bold">Employee</th>
                            <th className="px-6 py-3 font-bold">Role</th>
                            <th className="px-6 py-3 font-bold">Department</th>
                            <th className="px-6 py-3 font-bold">Start Date</th>
                            <th className="px-6 py-3 font-bold">Status</th>
                            <th className="px-6 py-3 font-bold text-right">Action</th>
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
                        ) : Employees?.length > 0 ? (
                            <tbody className="divide-y divide-[#e7e9f3] dark:divide-[#2a2d3d]">
                                {Employees?.map((employee) => {
                                    return (
                                        <tr key={employee?._id} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div
                                                        className="w-8 h-8">
                                                        <img src={employee.profilepic || "/unknownuser.webp"}
                                                         onError={(e) => (e.target.src = "/unknownuser.webp")}
                                                         className='object-cover w-full h-full rounded-full' alt="User image" />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-bold text-[#0d101b] dark:text-white">
                                                            {employee.name || "User"}
                                                        </p>
                                                        <p className="text-xs text-[#4c599a] dark:text-gray-400">
                                                            {employee.email || "NA"}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>

                                            <td className="px-6 py-4 text-sm text-[#0d101b] dark:text-gray-300">
                                                {employee?.position || "NA"}
                                            </td>

                                            <td className="px-6 py-4 text-sm text-[#0d101b] dark:text-gray-300">
                                                {employee?.department || "NA"}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-[#0d101b] dark:text-gray-300">
                                                {new Date(employee?.createdAt).toLocaleDateString("en-US", {
                                                    month: "short", day: 'numeric', year: 'numeric'
                                                })}
                                            </td>
                                            {
                                                employee.isActive === true && (
                                                    <td className="px-6 py-4">
                                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700">
                                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                                            Active
                                                        </span>
                                                    </td>
                                                )
                                            }
                                            {
                                                employee.isActive === false && (
                                                    <td className="px-6 py-4">
                                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-700">
                                                            <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                                                            InActive
                                                        </span>
                                                    </td>
                                                )
                                            }
                                            <td className="px-6 py-4 text-right text-sm text-[#0d101b] dark:text-gray-300">
                                                    <Switch className="cursor-pointer" checked={employee?.isActive} disabled={toggelingId === employee._id} onCheckedChange={()=>handleToggleEmployee(employee?._id,employee.isActive)} id="toggle-active-nd-inactive-employee" />
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
            {/* pagination */}
            {
              !loading && (
                pagination?.totalPages > 1 && (
                <div className="w-full bg-[#f8f9fc] dark:bg-[#101322] border-t-[#cfd3e7] dark:border-t-[#2a2d3d] py-4 px-6 items-center  border-t flex justify-between">
               <div className='flex items-center gap-2'>
                <span className="text-[#747474] text-[0.9rem] sm:text-[0.8rem] font-[600]">
                Showing {start || "NA"}-{end || "NA"} of{" "}
                {pagination?.totalemployee || 0} employees
              </span>
            </div>
            {/* page button */}
            <div>
                <Pagination className="flex gap-2">
                  <PaginationContent>
                    <PaginationItem
                      className={`${
                        page === 1
                          ? "opacity-50 cursor-not-allowed"
                          : "cursor-pointer"
                      }  `}
                    >
                      <PaginationPrevious
                        onClick={() => {
                          if (page > 1) {
                            setPage((prev) => prev - 1);
                          }
                        }}
                      />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink className="p-3">
                        {pagination?.currentPage} of {pagination?.totalPages}
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem
                      className={`${
                        page === pagination.totalPages
                          ? "opacity-50 cursor-not-allowed"
                          : " cursor-pointer"
                      }  `}
                    >
                      <PaginationNext
                        onClick={() => {
                          if (page < pagination?.totalPages) {
                            return setPage((prev) => prev + 1);
                          }
                        }}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
                  </div>
                )
              )
            }
            </div>
        </div>
    )
}

export default EmployeesTable






