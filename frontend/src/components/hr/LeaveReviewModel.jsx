import axios from 'axios'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { IoMdClose } from 'react-icons/io'
import { MdAssignmentInd, MdCancel, MdCheckCircle, MdVerified, MdWarning } from 'react-icons/md'
import { ThreeDots } from 'react-loader-spinner'
import { useSelector } from 'react-redux'

const LeaveReviewModel = ({ id, Leave, setLeaves }) => {
    const [loading, setLoading] = useState(false)
    const [decision, setDecision] = useState("")
    const [open, setOpen] = useState(false)
    const user = useSelector((state) => state.Auth.user)
    const [reason, setReason] = useState("")
    // console.log("leave", Leave)
    const handleApproveAndReject = async () => {
        if (decision === "rejected" && !reason.trim()) {
            return toast.error("Please provide rejection reason");
        }
        const payload = {
            leaveId: id,
            status: decision
        }
        if (decision === "approved") {
            payload.approvedBy = user?.id
        }
        if (decision === "rejected") {
            payload.rejectedBy = user?.id
            payload.rejectedReason = reason
        }
        try {
            setLoading(true)
            const response = await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/leave/approveorreject`, payload, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            if (response?.data?.status === "success") {
                toast.success(response?.data?.message)
                const updatedLeave = response?.data?.data
                setLeaves((prev) => prev.map((leave) => leave._id === id ? { ...leave, status: updatedLeave?.status } : leave))
            }
        } catch (error) {
            console.error("failed to approve or reject leave", error)
            toast.error(error?.response?.data?.message || "Internal server error")
        } finally {
            setLoading(false)
        }
    }
    return (
        <>
            <button onClick={() => setOpen(true)} className='bg-[#1337ec] cursor-pointer text-white px-4 py-1.5 rounded-lg text-xs font-bold shadow-sm hover:bg-[#1337ec]/90'>Review</button>
            {
                open && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
                        {/* BACKDROP */}
                        <div
                            className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm"
                            onClick={() => { setOpen(false), setDecision(""), setReason("") }}
                        />
                        {/* DIALOG */}
                        <div className="relative  w-full max-w-lg bg-white dark:bg-[#161a2d] rounded-2xl shadow-2xl overflow-hidden">
                            <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
                                <div className='flex items-center text-[#0d101b] dark:text-white gap-2'>
                                    <div className='size-10 bg-[#1337ec]/10 text-[#1337ec] rounded-full flex items-center justify-center'>
                                        <MdAssignmentInd size={25} />
                                    </div>
                                    <div className='flex items-start flex-col'>
                                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">Reviewing: {Leave?.employeeId?.name || "NA"}</h3>
                                        <span className="text-sm font-medium text-[#1337ec]">Leave Type: {Leave?.leaveType || "NA"}</span>
                                    </div>

                                </div>
                                <button
                                    onClick={() => { setOpen(false), setDecision(""), setReason("") }}
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
                                            Department
                                        </p>
                                        <p className="text-sm font-medium text-[#0d101b] dark:text-white">
                                            {Leave?.employeeId?.department || "NA"}
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
                                </div>

                                {/* DECISION */}
                                <div className="space-y-4">
                                    <h3 className="text-sm text-start font-bold text-[#0d101b] dark:text-white">
                                        Admin Decision
                                    </h3>

                                    {
                                        Leave?.status === "pending" && (
                                            <div className="grid grid-cols-2 gap-4">
                                                {/* APPROVE */}
                                                <label
                                                    onClick={() => setDecision("approved")}
                                                    className={`relative cursor-pointer rounded-lg border-2 p-4 flex items-center justify-center transition-all
                                                     ${decision === "approved"
                                                            ? "border-green-500 bg-green-50 dark:bg-green-950/20"
                                                            : "border-[#e7e9f3] dark:border-[#2d3250]"
                                                        }`}
                                                >
                                                    <div className="flex flex-col items-center gap-2">
                                                        <MdCheckCircle className="text-green-500 text-xl" />
                                                        <span className="text-sm font-bold">Approve</span>
                                                    </div>
                                                    {decision === "approved" && (
                                                        <MdVerified className="absolute top-2 right-2 text-green-500" />
                                                    )}
                                                </label>

                                                {/* REJECT */}
                                                <label
                                                    onClick={() => setDecision("rejected")}
                                                    className={`relative cursor-pointer rounded-lg border-2 p-4 flex items-center justify-center transition-all
                                              ${decision === "rejected"
                                                            ? "border-red-500 bg-rose-50 dark:bg-rose-950/20"
                                                            : "border-[#e7e9f3] dark:border-[#2d3250]"
                                                        }`}
                                                >
                                                    <div className="flex flex-col items-center gap-2">
                                                        <MdCancel className="text-red-500 text-xl" />
                                                        <span className="text-sm font-bold">Rejected</span>
                                                    </div>
                                                    {decision === "rejected" && (
                                                        <MdWarning className="absolute top-2 right-2 text-red-500" />
                                                    )}
                                                </label>
                                            </div>
                                        )
                                    }
                                    {
                                        Leave?.status === "approved" && (
                                            <div className="flex items-start">
                                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                                    Approved
                                                </span>
                                            </div>
                                        )
                                    }
                                    {
                                        Leave.status === "rejected" && (
                                            <div className="flex items-start">
                                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-700">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                                                    Rejected
                                                </span>
                                            </div>
                                        )
                                    }
                                    {/* REJECT REASON */}
                                    {decision === "rejected" && (
                                        <div className="mt-4 animate-in fade-in slide-in-from-top-2">
                                            <label className="flex items-start text-sm font-medium text-[#4c599a] mb-2">
                                                Reason for Rejection <span className="text-red-500">*</span>
                                            </label>
                                            <textarea
                                                rows={3}
                                                //   value={reason}
                                                onChange={(e) => setReason(e.target.value)}
                                                className="w-full rounded-lg border border-[#cfd3e7] dark:border-[#2d3250] bg-white dark:bg-[#121629] text-sm px-3 py-2 focus:ring-2 focus:ring-[#1337ec]/30"
                                                placeholder="Please explain why this request is being rejected..."
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                            {/* FOOTER */}
                            {
                                Leave?.status === "pending" && (
                                    <footer className="flex justify-end gap-3 border-t border-[#e7e9f3] dark:border-[#2d3250] px-6 py-4 bg-[#fcfcfd] dark:bg-[#14182e]">
                                        <button
                                            onClick={() => { setOpen(false), setDecision(""), setReason("") }}
                                            className="px-4 h-10 cursor-pointer rounded-lg border border-[#cfd3e7] text-sm font-bold text-[#4c599a] hover:bg-gray-50"
                                        >
                                            Cancel
                                        </button>
                                        <button onClick={() => handleApproveAndReject()} className={`px-6 h-10 cursor-pointer rounded-lg text-white bg-[#1337ec]  ${!decision ? "opacity-50 cursor-not-allowed" : "bg-[#1337ec] hover:bg-[#1337ec]/90"} text-sm font-bold shadow-md shadow-[#1337ec]/20`}>
                                            {loading ? (
                                                <ThreeDots
                                                    visible={true}
                                                    height="25"
                                                    width="25"
                                                    color="#ffffff"
                                                    radius="9"
                                                    ariaLabel="three-dots-loading"
                                                    wrapperStyle={{}}
                                                    wrapperClass=""
                                                />
                                            ):"Confirm Decision"
                                        }
                                        </button>
                                    </footer>
                                )
                            }
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default LeaveReviewModel