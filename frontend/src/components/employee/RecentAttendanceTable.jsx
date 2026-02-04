import { formatTime } from '@/helps/FormatDatesndTime'
import axios from 'axios'
import { Calendar1, Calendar1Icon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import RecentAttendanceShimmer from './RecentAttendanceShimmer'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { Calendar } from '../ui/calendar'
import AnnouncementShimmer from './AnnouncementShimmer'

const RecentAttendanceTable = ({ attendances, setAttendances }) => {
    const [attendanceloading, setattendanceLoading] = useState(false)
    const [announcements, setAnnouncements] = useState([])
    const [annloading, setannLoading] = useState(false)

    useEffect(() => {
        const fetchRecentAttendances = async () => {
            try {
                setattendanceLoading(true)
                const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/attendance/monthly`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                })
                if (response?.data?.status === "success") {
                    setAttendances(response?.data?.data?.attendance)
                }
            } catch (error) {
                console.error("failed to get attendances", error)
            } finally {
                setattendanceLoading(false)
            }
        }
        fetchRecentAttendances()
    }, [])
    // console.log("attendances", attendances)
    useEffect(() => {
        const fetchAnnouncements = async () => {
            try {
                setannLoading(true)
                const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/announcement/company`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                })
                if (response?.data?.status === "success") {
                    setAnnouncements(response?.data?.data)
                }

            } catch (error) {
                console.error("failed to get announcements", error)
                toast.error(error?.response?.data?.message || "Internal server error")
            } finally {
                setannLoading(false)
                
            }
        }
        fetchAnnouncements()
    }, [])



    return (
        <div className="grid grid-cols-1 mt-5 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 flex flex-col">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-bold">Recent Attendance</h2>
                    <Link href="/employee/attendance" className="text-[#1337ec] text-sm font-medium">
                        View All
                    </Link>
                </div>

                <div className="bg-white dark:bg-[#15192b] rounded-xl border border-[#e7e9f3] dark:border-white/10 overflow-hidden shadow-sm">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-[#f6f6f8] dark:bg-white/5">
                                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-[#4c599a] dark:text-gray-400">
                                    Date
                                </th>
                                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-[#4c599a] dark:text-gray-400">
                                    Status
                                </th>
                                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-[#4c599a] dark:text-gray-400">
                                    Check-In
                                </th>
                                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-[#4c599a] dark:text-gray-400">
                                    Total Hours
                                </th>
                            </tr>
                        </thead>
                        {
                            attendanceloading ? (
                                <tbody className="divide-y divide-[#e7e9f3] dark:divide-white/10">
                                    {[1, 2, 3, 4].map((_, index) => {
                                        return (
                                            <RecentAttendanceShimmer key={index} />
                                        )
                                    })}
                                </tbody>
                            ) : attendances?.length > 0 ? (
                                <tbody className="divide-y divide-[#e7e9f3] dark:divide-white/10">
                                    {attendances?.slice(0, 4).map((a) => {
                                        return (
                                            <tr key={a?._id} className="hover:bg-[#1337ec]/5 transition-colors">
                                                <td className="px-6 py-4 text-sm font-medium">
                                                    {new Date(a?.createdAt).toLocaleDateString("en-US", { month: 'short', day: 'numeric', year: 'numeric' } || "NA")}
                                                </td>
                                                {
                                                    a.status === "present" && (
                                                        <td className="px-6  py-4">
                                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700">
                                                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                                                Present
                                                            </span>
                                                        </td>
                                                    )
                                                }
                                                {
                                                    a.status === "absent" && (
                                                        <td className="px-6 py-4">
                                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-700">
                                                                <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                                                                Absent
                                                            </span>
                                                        </td>
                                                    )
                                                }
                                                {
                                                    a?.status === "halfday" && (
                                                        <td className="px-6  py-4">
                                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-yellow-100 text-yellow-700">
                                                                <span className="w-1.5 h-1.5 rounded-full bg-yellow-500"></span>
                                                                Halfday
                                                            </span>
                                                        </td>
                                                    )
                                                }
                                                <td className="px-6 py-4 text-sm text-[#4c599a] dark:text-gray-400">
                                                    {formatTime(a?.clockedIn)}
                                                </td>
                                                <td className="px-6 py-4 text-sm font-bold">
                                                    {a?.totalWorkingTime || "NA"}
                                                </td>
                                            </tr>
                                        )
                                    })}

                                </tbody>

                            ) : (
                                <tbody className="divide-y divide-[#e7e9f3] dark:divide-[#2a2d3d]">
                                    <tr>
                                        <td colSpan="5" className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                                            <p>No Attendance found</p>
                                        </td>
                                    </tr>
                                </tbody>
                            )}
                    </table>
                </div>
            </div>

            {/* ================= Announcements ================= */}
            <div className="lg:col-span-4 flex flex-col">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-bold">Announcements</h2>
                    <Link href="/employee/announcements" className="text-[#1337ec] text-sm font-medium ">
                        See All
                    </Link>
                </div>

                <div className="flex h-[50vh] custom-scrollbar overflow-y-auto flex-col gap-3">

                    {
                        annloading ? (
                            <>
                               {[1,2,3,4].map((_,index)=>{
                                return (
                                    <AnnouncementShimmer key={index} />
                                )
                               })}
                            </>
                        ) : announcements?.length > 0 ? (
                            announcements.map((a) => {
                                return (
                                    <div key={a?._id} className="bg-white dark:bg-[#15192b] p-4 rounded-xl border border-[#e7e9f3] dark:border-white/10 shadow-sm">
                                        <p className={`text-xs font-bold ${a?.category === "event" ? "text-orange-500" : "text-[#1337ec]" } mb-1`}>
                                            {a?.category || "NA"}
                                        </p>
                                        <h3 className="font-bold text-sm mb-1">
                                            {a?.title || "NA"}
                                        </h3>
                                        <p className="text-xs text-[#4c599a] dark:text-gray-400 flex items-center gap-1">
                                          <Calendar1Icon size={12} />
                                            {new Date(a.createdAt).toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})}
                                        </p>
                                    </div>
                                )
                            })
                        ):(
                            <p className='text-gray-500 text-center'>No announcements found</p>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default RecentAttendanceTable