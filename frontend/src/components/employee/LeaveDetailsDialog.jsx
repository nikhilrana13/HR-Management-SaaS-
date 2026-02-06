"use client"
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { IoMdClose } from 'react-icons/io'
import { MdAssignmentInd, MdCancel, MdCheckCircle, MdVerified, MdWarning } from 'react-icons/md'
import { ThreeDots } from 'react-loader-spinner'
import { useSelector } from 'react-redux'

const LeaveDetailsDialog = ({ Leave }) => {
    const [open, setOpen] = useState(false)
    // console.log("leave", Leave)

    return (
        <>
            <button onClick={() => setOpen(true)} className='bg-[#1337ec] cursor-pointer text-white px-4 py-1.5 rounded-lg text-xs font-bold shadow-sm hover:bg-[#1337ec]/90'>Review</button>
            {
                open && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
                        {/* BACKDROP */}
                        <div
                            className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm"
                            onClick={() => { setOpen(false) }}
                        />
                        {/* DIALOG */}
                        <div className="relative  w-full max-w-lg bg-white dark:bg-[#161a2d] rounded-2xl shadow-2xl overflow-hidden">
                            <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
                                <div className='flex items-center text-[#0d101b] dark:text-white gap-2'>
                                    <div className='size-10 bg-[#1337ec]/10 text-[#1337ec] rounded-full flex items-center justify-center'>
                                        <MdAssignmentInd size={25} />
                                    </div>
                                    <div className='flex items-start flex-col'>
                                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">Reviewing:Leave Deatils</h3>
                                        <span className="text-sm font-medium text-[#1337ec]">Leave Type: {Leave?.leaveType || "NA"}</span>
                                    </div>

                                </div>
                                <button
                                    onClick={() => { setOpen(false)}}
                                    className="text-gray-400 cursor-pointer hover:text-gray-500 dark:hover:text-gray-300"
                                >
                                    <IoMdClose size={25} />
                                </button>
                            </div>
                            {/* CONTENT */}
                            <div className="p-6 overflow-y-auto max-h-[70vh]">
                                {/* DETAILS */}
                                <div className="grid grid-cols-2 gap-x-6 gap-y-4 mb-6">
                                    <div className="flex flex-col gap-1 items-start border-b border-[#cfd3e7] dark:border-[#2d3250] pb-4">
                                        <p className="text-xs font-semibold uppercase tracking-wider text-[#4c599a]">
                                            Date Range
                                        </p>
                                        <p className="text-sm font-medium text-[#0d101b] dark:text-white">
                                            {new Date(Leave?.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).replace(/,/g, '')} - {new Date(Leave?.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).replace(/,/g, '')}
                                        </p>
                                    </div>
                                    <div className="flex flex-col gap-1 border-b border-[#cfd3e7] dark:border-[#2d3250] pb-4">
                                        <p className="text-xs font-semibold uppercase tracking-wider text-[#4c599a]">
                                            Total Days
                                        </p>
                                        <p className="text-sm font-medium text-[#0d101b] dark:text-white">
                                            4 Working Days
                                        </p>
                                    </div>

                                    <div className="flex items-start flex-col gap-1">
                                        <p className="text-xs font-semibold uppercase tracking-wider text-[#4c599a]">
                                            Request Date
                                        </p>
                                        <p className="text-sm font-medium text-[#0d101b] dark:text-white">
                                            {new Date(Leave?.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                                        </p>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <p className="text-xs font-semibold uppercase tracking-wider text-[#4c599a]">
                                            Status
                                        </p>

                                        {
                                            Leave?.status === "approved" && (
                                                <div className="">
                                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                                        Approved
                                                    </span>
                                                </div>
                                            )
                                        }
                                        {
                                            Leave?.status === "pending" && (
                                                <div className="">
                                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-700">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                                                        Pending
                                                    </span>
                                                </div>
                                            )
                                        }
                                        {
                                            Leave?.status === "rejected" && (
                                                <div className="">
                                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-700">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                                                        Rejected
                                                    </span>
                                                </div>
                                            )
                                        }
                                    </div>
                                     <div className="space-y-4 ">
                                            <h3 className="text-sm  text-start font-bold text-[#0d101b] dark:text-white">
                                                Reason for leave
                                            </h3>
                                            <p className='text-start text-gray-500 text-[0.8rem] '>{Leave?.reasonforleave || "NA"}</p>
                                              {
                                                Leave.status === "approved" && (
                                                    <div className="flex flex-col gap-2 items-start">
                                                        <span className='inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700'>
                                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                                          Approved By: {Leave?.approvedBy?.name || "NA"}
                                                        </span>
                                                    </div>
                                                )
                                            }
                                            {
                                                Leave.status === "rejected" && (
                                                    <div className="flex flex-col  gap-2 items-start w-full">
                                                        <span className='text-sm  text-start font-bold text-[#0d101b] dark:text-white'>Reason for rejected</span>
                                                        <span className="w-full border text-start border-rose-200 bg-rose-100 text-rose-700 px-3 py-2 rounded-lg text-xs font-medium leading-relaxed break-words">
                                                            {Leave?.rejectedReason || "No reason provided"}
                                                        </span>
                                                        <span className='inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-700'>
                                                            <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                                                          rejected By: {Leave?.rejectedBy?.name || "NA"}
                                                        </span>
                                                    </div>
                                                )
                                            }
                                           
                                        </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default LeaveDetailsDialog