"use client"
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import AnnouncementCardShimmer from './AnnouncementCardShimmer'

const AnnouncementTable = () => {
    const [loading, setloading] = useState(false)
    const [announcements, setAnnouncements] = useState([])

    useEffect(() => {
        const fetchannouncements = async () => {
            try {
                setloading(true)
                const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/announcement/company`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                })
                if (response?.data?.status === "success") {
                    setAnnouncements(response?.data?.data)
                }
            } catch (error) {
                console.error("Failed to fetch announcements", error)
            } finally {
               setloading(false)
            }
        }
        fetchannouncements()
    }, [])
    const formatAnnouncementContent = (content = "") => {
        return content
            .split("\n")
            .map(line => line.trim())
            .filter(line => line.length > 0);
    };
    return (
        <div className='flex w-full flex-col gap-5'>
            {
                loading ? (<>
                      {Array.from({length:3}).map((_,index)=>{
                        return (
                            <AnnouncementCardShimmer key={index} />
                        )
                      })}
                      </>
                 
                ) : announcements.length > 0 ? (
                    announcements.map((a) => {
                        return (
                            <div className="bg-white w-full lg:w-[800px] dark:bg-[#0f172a] p-6 rounded-xl shadow-sm border border-[#e2e8f0]/60 dark:border-[#1e293b] flex flex-col gap-4">
                                {/* Header */}
                                <div className="flex items-start justify-between">
                                    <div className="flex flex-col gap-1">
                                        <div className="flex items-center gap-3">
                                            <span className="bg-[#ede9fe] dark:bg-[#2e1065]/30 text-[#7c3aed] dark:text-[#a78bfa] text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
                                                {a?.category || "NA"}
                                            </span>
                                            <span className="text-xs text-[#94a3b8] dark:text-[#64748b] font-medium">
                                                {new Date(a?.createdAt).toDateString() || "NA"}
                                            </span>
                                        </div>
                                        <h3 className="text-lg font-bold text-[#0f172a] dark:text-white mt-1">
                                            {a?.title || "NA"}
                                        </h3>
                                    </div>
                                </div>
                                {/* Description */}
                                <p className="text-[#475569] dark:text-[#94a3b8] text-base wrap-break-word leading-relaxed">
                                    {formatAnnouncementContent(a?.content || "").map((line, index) => (
                                        <p key={index}>
                                            {line}
                                        </p>
                                    ))}
                                </p>
                            </div>
                        )
                    })
                ) : (
                    <p className='text-gray-500 mt-20 text-center'>No Announcements found</p>
                )
            }
        </div>
    )
}

export default AnnouncementTable