"use client"
import { ChevronDownIcon, LogIn, LogOutIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Calendar } from '../ui/calendar'
import { format } from 'date-fns'
import TableRowShimmer from '../hr/TableRowShimmer'
import { formatTime } from '@/helps/FormatDatesndTime'
import axios from 'axios'
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '../ui/pagination'
import toast from 'react-hot-toast'
import { ThreeDots } from 'react-loader-spinner'

const MarkAttendance = () => {
    const [Time, setTime] = useState(new Date())
    const [loading, setLoading] = useState(false)
    const [attendances, setAttendances] = useState([])
    const [pagination, setPagination] = useState({})
    const [date, setDate] = useState(new Date())
    const [page, setPage] = useState(1)
    const [checkloading, setcheckloading] = useState(false)
    const [outloading, setoutLoading] = useState(false)
    const [refresh,setRefresh] = useState(0) 


    // get current time 
    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date())
        }, 1000)
        return (() => clearInterval(interval))
    }, [])
    const seconds = Time.getSeconds()
    const minutes = Time.getMinutes()
    const hours = Time.getHours()

    const handleMarkCheckIn = async () => {
        try {
            setcheckloading(true)
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/attendance/check-in`, {}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            //  console.log("response",response)
            if (response?.data?.status === "success") {
                toast.success(response?.data?.message)
                setRefresh((prev)=>prev + 1)  // refetch
             }
        } catch (error) {
            console.error("failed to attendance mark check in", error)
            toast.error(error?.response?.data?.message || "Internal server error")
        } finally {
           setcheckloading(false)
        }
    }
    const handleMarkCheckOut = async () => {
        try {
            setoutLoading(true)
            const response = await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/attendance/check-out`, {}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            if (response?.data?.status === "success") {
                toast.success(response?.data?.message)
                setRefresh((prev)=>prev + 1)  // refetch
            }
        } catch (error) {
            console.error("failed to attendance mark check in", error)
            toast.error(error?.response?.data?.message || "Internal server error")
        } finally {
            setoutLoading(false)
        }
    }


    // fetch attendance 
    useEffect(() => {
        const fetchAttendances = async () => {
            try {
                setLoading(true)
                const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/attendance/monthly`, {
                    params: {
                        page: page,
                        limit: 5,
                        year: date.getFullYear(),
                        month: date.getMonth() + 1
                    },
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                })
                // console.log("response data",response.data)
                if (response?.data.status === "success") {
                    setAttendances(response?.data?.data?.attendance)
                    setPagination(response?.data?.data?.pagination)
                }
            } catch (error) {
                console.error("failed to get employees attendance", error)
            } finally {
                setLoading(false)
            }
        }
        fetchAttendances()
    }, [date, page,refresh])

    const start = (pagination?.currentPage - 1) * pagination?.limit + 1
    const end = Math.min(pagination?.currentPage * pagination?.limit, pagination?.totalRecords)


    return (
        <div className='flex flex-col gap-5'>
            {/* clock container */}
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 p-8 mb-10">
                <div className="flex flex-col items-center">
                    {/* Badge */}
                    <div className="text-center mb-6">
                        <span className="text-xs font-bold uppercase tracking-widest text-[#1337ec] bg-[#1337ec]/10 px-3 py-1 rounded-full">
                            Active Session
                        </span>
                    </div>
                    {/* Timer */}
                    <div className="flex gap-6 py-2 mb-4">
                        {/* Hours */}
                        <div className="flex flex-col items-center gap-2">
                            <div className="flex sm:h-20 sm:w-24 items-center justify-center rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
                                <p className="text-[#0d101b] dark:text-white text-4xl font-black">
                                    {String(hours).padStart(2, "0")}
                                </p>
                            </div>
                            <p className="text-[#4c599a] dark:text-gray-400 text-xs font-medium uppercase tracking-tighter">
                                Hours
                            </p>
                        </div>
                        <div className="flex items-center pt-2">
                            <span className="text-4xl font-bold text-gray-300">:</span>
                        </div>
                        {/* Minutes */}
                        <div className="flex flex-col items-center gap-2">
                            <div className="flex sm:h-20 sm:w-24 items-center justify-center rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
                                <p className="text-[#0d101b] dark:text-white text-4xl font-black">
                                    {String(minutes).padStart(2, "0")}
                                </p>
                            </div>
                            <p className="text-[#4c599a] dark:text-gray-400 text-xs font-medium uppercase tracking-tighter">
                                Minutes
                            </p>
                        </div>
                        <div className="flex items-center pt-2">
                            <span className="text-4xl font-bold text-gray-300">:</span>
                        </div>
                        {/* Seconds */}
                        <div className="flex flex-col items-center gap-2">
                            <div className="flex sm:h-20 sm:w-24 items-center justify-center rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
                                <p className="text-[#0d101b] dark:text-white text-4xl font-black">
                                    {String(seconds).padStart(2, "0")}
                                </p>
                            </div>
                            <p className="text-[#4c599a] dark:text-gray-400 text-xs font-medium uppercase tracking-tighter">
                                Seconds
                            </p>
                        </div>
                    </div>
                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
                        <button onClick={() => handleMarkCheckIn()}  className="flex-1 py-2 cursor-pointer items-center justify-center rounded-lg h-14 px-8 bg-[#1337ec] text-white text-lg font-bold transition-all hover:bg-[#1337ec]/90 hover:scale-[1.02] active:scale-[0.98]">
                            <div className="flex items-center justify-center gap-2">
                                {
                                    checkloading ? (
                                        <ThreeDots
                                            visible={true}
                                            height="22"
                                            width="22"
                                            color="#ffffff"
                                            radius="9"
                                            ariaLabel="three-dots-loading"
                                            wrapperStyle={{}}
                                            wrapperClass=""
                                        />
                                    ) : (
                                        <>
                                            <LogIn />
                                            <span>Clock In</span>
                                        </>
                                    )
                                }
                            </div>
                        </button>
                        <button onClick={() => handleMarkCheckOut()} className="flex-1 cursor-pointer  py-2  items-center justify-center rounded-lg h-14 px-8 bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 text-lg font-bold">
                            <div className="flex items-center justify-center gap-2">
                                {outloading ? (
                                    <ThreeDots
                                        visible={true}
                                        height="22"
                                        width="22"
                                        color="#ffffff"
                                        radius="9"
                                        ariaLabel="three-dots-loading"
                                        wrapperStyle={{}}
                                        wrapperClass=""
                                    />
                                ) : ( 
                                <> 
                                <LogOutIcon />
                                <span>Clock Out</span>
                                </>
                                    )}
                            </div>
                        </button>
                    </div>
                </div>
            </div>
            {/* recent attendance table */}
            <div className="w-full flex items-center flex-col md:flex-row md:justify-between  mt-8 py-4 px-5 bg-white border-gray-300 border rounded-lg ">
                <h3 className='text-[1rem] font-bold'>Recent Logs</h3>
                {/* search input */}
                <div className="gap-3">
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
            <div className='bg-white mt-5 dark:bg-[#1a1d2d] border border-[#e7e9f3] dark:border-[#2a2d3d] rounded-md shadow-sm overflow-hidden'>
                <div className='overflow-x-auto'>
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-[#f6f6f8] dark:bg-[#252839] text-[#4c599a] dark:text-gray-400 text-xs uppercase tracking-wider">
                                <th className="px-6 py-3 font-bold">DATE</th>
                                <th className="px-6 py-3 font-bold">CHECK-IN</th>
                                <th className="px-6 py-3 font-bold">CHECK-OUT</th>
                                <th className="px-6 py-3 font-bold">TOTAL HOURS</th>
                                <th className="px-6 py-3 text-right font-bold">STATUS</th>
                            </tr>
                        </thead>
                        {
                            loading ? (
                                <tbody className="divide-y divide-[#e7e9f3] dark:divide-[#2a2d3d]">
                                    {[1, 2, 3, 4, 5].map((_item, index) => {
                                        return (
                                            <TableRowShimmer key={index} />
                                        )
                                    })}
                                </tbody>
                            ) : attendances?.length > 0 ? (
                                <tbody className="divide-y divide-[#e7e9f3] dark:divide-[#2a2d3d]">
                                    {attendances?.map((attendance) => {
                                        return (
                                            <tr key={attendance?._id} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div>
                                                            <p className="text-sm font-bold text-[#0d101b] dark:text-white">
                                                                {new Date(attendance?.date).toDateString()}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className={`px-6 py-4 text-sm font-bold ${attendance?.clockedIn ? "text-[#0d101b]" : "text-[#4c599a]"}" dark:text-gray-300`}>
                                                    {formatTime(attendance?.clockedIn)}
                                                </td>
                                                <td className={`px-6 py-4 text-sm font-bold ${attendance?.clockedOut ? "text-[#0d101b]" : "text-[#4c599a]"} dark:text-gray-300`}>
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
                                            Showing {start || "NA"}-{end || "NA"} of {" "}
                                            {pagination?.totalRecords || 0} attendance for {format(date, "MMMM yyyy")}
                                        </span>

                                    </div>
                                    {/* page button */}
                                    <div>
                                        <Pagination className="flex gap-2">
                                            <PaginationContent>
                                                <PaginationItem
                                                    className={`${page === 1
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
                                                    className={`${page === pagination.totalPages
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




        </div>
    )
}

export default MarkAttendance