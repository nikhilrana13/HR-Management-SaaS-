"use client"
import React, { useEffect, useState } from 'react'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../ui/select'
import { MdSearch } from 'react-icons/md'
import { Button } from '../ui/button'
import { ChevronDownIcon } from 'lucide-react'
import { format } from 'date-fns/format'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Calendar } from '../ui/calendar'
import axios from 'axios'
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '../ui/pagination'
import TableRowShimmer from './TableRowShimmer'
import { formatTime } from '@/helps/FormatDatesndTime'
import useDebounce from '@/hooks/useDebounce'

const AttendanceTable = () => {
    const [selectedDepartment, setSelectedDepartment] = useState("all")
    const [date, setDate] = useState(new Date())
    const [page,setPage] = useState(1)
    const [loading,setLoading] = useState(false)
    const [pagination,setPagination] = useState({}) 
    const [attendances,setAttendances] = useState([])
    const [search,setSearch] = useState("")

    const searchDebounce = useDebounce(search)

    const Alldepartments = [
        "all",
        "engineering",
        "design",
        "sales",
        "marketing",
        "customersupport",
        "accounts",
        "hr"
    ] 
     useEffect(()=>{
          const fetchAttendances = async()=>{
               try { 
                    setLoading(true)
                    const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/attendance/daily`,{
                        params:{
                        department:selectedDepartment,
                        page:page,
                        limit:5,
                        date:date,
                        employeename:searchDebounce
                    },
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                    })
                    if(response?.data.status === "success"){
                        setAttendances(response?.data?.data?.attendances)
                        setPagination(response?.data?.data?.pagination)
                    }
               } catch (error) {
                   console.error("failed to get employees attendance",error)
               }finally{
                setLoading(false)
               }
          }
          fetchAttendances()
     },[date,page,selectedDepartment,searchDebounce])

    //  console.log("attendances",attendances)

    const start = (pagination?.currentPage - 1) * pagination?.limit + 1 
    const end = Math.min(pagination?.currentPage * pagination?.limit,pagination?.totalemployeesAttendance)

    return (
        <>
            <div className="w-full flex md:items-center flex-col md:flex-row  md:justify-between mt-8 py-4 px-5 bg-white border-gray-300 border rounded-lg ">
                {/* search input */}
                <div className="w-full">
                    <div className="relative flex-1 max-w-md">
                        <span className=" absolute left-3 top-1/2 -translate-y-1/2 text-[#4c599a] text-xl">
                            <MdSearch size={20} />
                        </span>
                        <input
                            type="text"
                            placeholder="Search employee name"
                            onChange={(e)=>setSearch(e.target.value)}
                            className="w-full bg-[#f6f6f8] dark:bg-[#22263a] border-none rounded-lg py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#1337ec]/50"
                        />
                    </div>
                </div>
                <div className="flex gap-3">
                    {/* select department  */}
                    <Select onValueChange={(value) => setSelectedDepartment(value)}>
                        <SelectTrigger className="w-full max-w-48">
                            <SelectValue placeholder="Select a Department" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Departments</SelectLabel>
                                {
                                    Alldepartments?.map((d, index) => {
                                        return (
                                            <SelectItem
                                                key={index}
                                                className="cursor-pointer"
                                                value={d}
                                            >
                                                {d}
                                            </SelectItem>
                                        )
                                    })
                                }
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    {/* date picker */}
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                data-empty={!date}
                                className="data-[empty=true]:text-muted-foreground w-[212px] justify-between text-left font-normal"
                            >
                                {date ? format(date, "PPP") : <span>Pick a date</span>}
                                <ChevronDownIcon />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                                mode="single"
                                selected={date}
                                onSelect={setDate}
                                defaultMonth={date}
                            />
                        </PopoverContent>
                    </Popover>
                </div>
            </div>
            {/* attendance row table */}
             <div className='bg-white mt-5 dark:bg-[#1a1d2d] border border-[#e7e9f3] dark:border-[#2a2d3d] rounded-md shadow-sm overflow-hidden'>
            <div className='overflow-x-auto'>
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-[#f6f6f8] dark:bg-[#252839] text-[#4c599a] dark:text-gray-400 text-xs uppercase tracking-wider">
                            <th className="px-6 py-3 font-bold">EMPLOYEE NAME</th>
                            <th className="px-6 py-3 font-bold">DEPARTMENT</th>
                            <th className="px-6 py-3 font-bold">CHECK-IN</th>
                            <th className="px-6 py-3 font-bold">CHECK-OUT</th>
                            <th className="px-6 py-3 font-bold">TOTAL HOURS</th>
                            <th className="px-6 py-3 text-right font-bold">STATUS</th>
                        </tr>
                    </thead>
                    {
                        loading ? (
                            <tbody className="divide-y divide-[#e7e9f3] dark:divide-[#2a2d3d]">
                                {[1, 2, 3, 4,5].map((_item, index) => {
                                    return (
                                        <TableRowShimmer key={index} />
                                    )
                                })}
                            </tbody>
                        ) : attendances?.length > 0 ? (
                            <tbody className="divide-y divide-[#e7e9f3] dark:divide-[#2a2d3d]">
                                {attendances?.map((attendance) => {
                                    const employeeprofilepic = attendance?.employeeId?.profilepic
                                    const employeename = attendance?.employeeId?.name
                                    const employeeid = attendance?.employeeId?._id
                                    const employeedepartment = attendance?.employeeId?.department
                                    return (
                                        <tr key={attendance?._id} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div
                                                        className="w-8 h-8">
                                                        <img src={employeeprofilepic || "/unknownuser.webp"}
                                                         onError={(e) => (e.target.src = "/unknownuser.webp")}
                                                         className='object-cover w-full h-full rounded-full' alt="User image" />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-bold text-[#0d101b] dark:text-white">
                                                             {employeename || "NA"}
                                                        </p>
                                                        <p className="text-xs text-[#4c599a] dark:text-gray-400">
                                                           EMP:{employeeid.slice(0,4) || "NA"}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>

                                            <td className="px-6 py-4 text-sm text-[#0d101b] dark:text-gray-300">
                                                {employeedepartment || "NA"}
                                            </td>

                                            <td className={`px-6 py-4 text-sm font-bold ${attendance?.clockedIn ? "text-[#0d101b]" : "text-[#4c599a]"}"text-[#0d101b] dark:text-gray-300`}>
                                                {formatTime(attendance?.clockedIn)}
                                            </td>
                                            <td className={`px-6 py-4 text-sm font-bold ${attendance?.clockedOut ? "text-[#0d101b]" : "text-[#4c599a]"} text-[#0d101b] dark:text-gray-300`}>
                                               {formatTime(attendance?.clockedOut)}
                                            </td>
                                              <td className="px-6 py-4 text-sm font-bold text-[#0d101b] dark:text-gray-300">
                                                {attendance?.totalWorkingTime || "NA"}
                                            </td>
                                            {
                                                attendance.status === "present" && (
                                                    <td className="px-6 text-right py-4">
                                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700">
                                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                                        Present
                                                        </span>
                                                    </td>
                                                )
                                            }
                                            {
                                                attendance.status === "absent" && (
                                                    <td className="px-6 text-right py-4">
                                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-700">
                                                            <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                                                            Absent
                                                        </span>
                                                    </td>
                                                )
                                            }
                                            {
                                                attendance?.status === "halfday" && (
                                                    <td className="px-6 text-right py-4">
                                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-yellow-100 text-yellow-700">
                                                            <span className="w-1.5 h-1.5 rounded-full bg-yellow-500"></span>
                                                            Halfday
                                                        </span>
                                                    </td>
                                                )
                                            }
                                        </tr>
                                    )
                                })}
                            </tbody>
                        ) : (
                            <tbody className="divide-y divide-[#e7e9f3] dark:divide-[#2a2d3d]">
                                <tr>
                                    <td colSpan="7" className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                                        <p>No Addendances found</p>
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
                {pagination?.totalemployeesAttendance || 0} employees
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




        </>
    )
}

export default AttendanceTable