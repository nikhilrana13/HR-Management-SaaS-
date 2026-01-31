"use client"
import axios from 'axios'
import { Plus } from 'lucide-react'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { CiEdit } from 'react-icons/ci'
import { IoMdClose } from 'react-icons/io'
import { ThreeDots } from 'react-loader-spinner'

const AddDepartmentDialog = ({}) => {
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false)
    const [input, setInput] = useState({
        name: ""
    })
    const [error, setError] = useState({})

    const handleInput = (e) => {
        const { name, value } = e.target
        setInput((prev) => ({ ...prev, [name]: value }))
        // clear error on typing
        setError((prev) => ({ ...prev, [name]: "" }))
    }
    const validation = () => {
        let newError = {}
        if (!input.name.trim()) {
            newError.name = "Department name is Required"
        }
        setError(newError)
        return Object.keys(newError).length === 0
    }
    const handleAddDepartment = async () => {
        if (!validation()) return;
        try {
            setLoading(true)
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/department/create`,{
                name:input.name
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            if (response?.data?.status === "success") {
                toast.success(response?.data?.message)
                setInput("")
                setOpen(false)
            }
        } catch (error) {
            console.error("failed to add department", error)
            toast.error(error?.response?.data?.message || "Internal server error")
        }finally{
            setLoading(false)
        }
    }

    return (
        <>
            <button onClick={() => setOpen(true)} className="w-full  px-5 py-3 cursor-pointer bg-[#1337ec] text-white rounded-lg text-[0.8rem] font-medium hover:bg-[#1337ec]/90 focus:ring-4 focus:ring-[#1337ec]/30 transition-all flex items-center justify-center gap-2">
                <Plus size={22} /> Create Department
            </button>
            {/* MODAL */}
            {open && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
                    {/* BACKDROP */}
                    <div
                        className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm"
                        onClick={() => { setOpen(false), setInput({ name: "" }) }}
                    />
                    {/* DIALOG */}
                    <div onClick={(e) => e.stopPropagation()} className="relative  w-full max-w-lg bg-white dark:bg-[#161a2d] rounded-2xl shadow-2xl overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                                Add New Department
                            </h3>
                            <button
                                onClick={() => { setOpen(false), setInput({ name: "" }) }}
                                className="text-gray-400 cursor-pointer hover:text-gray-500 dark:hover:text-gray-300"
                            >
                                <IoMdClose size={23} />
                            </button>
                        </div>
                        {/* form */}
                        {/* INPUT */}
                        <div className="flex px-6 py-4 flex-col gap-2">
                            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                                Department Name
                            </label>

                            <div className="relative group">
                                <input
                                    type="text"
                                    name='name'
                                    value={input.name}
                                    onChange={handleInput}
                                    placeholder="e.g. Product Development"
                                    className="w-full  bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1337ec]/20 focus:border-[#1337ec] transition-all placeholder:text-slate-400"
                                />
                            </div>
                            {
                                error.name && (
                                    <p className="text-red-500 mt-1 text-[0.75rem]">{error.name}</p>
                                )
                            }
                        </div>
                        {/* ACTION FOOTER */}
                        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/50 flex items-center justify-end gap-3">
                            <button
                                type="button"
                                onClick={() => { setOpen(false), setInput({ name: "" }) }}
                                className="px-6 py-2.5 cursor-pointer rounded-lg text-sm font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                            >
                                Cancel
                            </button>
                            <button  
                                type='button'
                                onClick={() => handleAddDepartment()}
                                className="px-4 py-2.5 cursor-pointer rounded-lg text-sm font-bold bg-[#1337ec] text-white hover:bg-[#1337ec]/90 shadow-md shadow-[#1337ec]/20 transition-all"
                            >
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
                                    ) : " Create Department"
                                }
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default AddDepartmentDialog