"use client"
import { ChevronDown, ChevronDownIcon, Plus, PlusIcon, Users2 } from 'lucide-react';
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form';
import { IoMdClose, IoMdSend } from 'react-icons/io';
import { MdAssignmentInd } from 'react-icons/md';
import { ThreeDots } from 'react-loader-spinner';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { format } from 'date-fns';
import { Calendar } from '../ui/calendar';
import toast from 'react-hot-toast';
import axios from 'axios';

const ApplyforLeaveDialog = () => {
  const [open, setOpen] = useState(false);
  const { register, handleSubmit,control ,formState: { errors }, reset } = useForm()
  const [loading, setLoading] = useState(false)


  const onSubmit = async (data) => {
      if(data.endDate < data.startDate){
          toast.error("To date cannot be before From date")
          return
      }
      const payload={
         title:data.title,
         startDate:format(data.startDate,"yyyy-MM-dd"),
         endDate:format(data.endDate,"yyyy-MM-dd"),
         leaveType:data.leaveType,
         reasonforleave:data.reasonforleave
      }
      // console.log("payload",payload)
      try {
         setLoading(true)
         const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/leave/apply`,payload,{
          headers:{
            Authorization:`Bearer ${localStorage.getItem("token")}`
          }
         })
         if(response?.data?.status === "success")
           toast.success(response?.data?.message)
          reset()
      } catch (error) {
        console.error("failed to apply for leave",error)
        toast.error(error?.response?.data?.message || "Internal server error")
      }finally{
        setLoading(false)
      }
  }

  const handleClose = () => {
    setOpen(false);
    reset()
  };
  return (
    <>
      <button onClick={() => setOpen(true)} className="w-full  px-5 py-3 cursor-pointer bg-[#1337ec] text-white rounded-lg text-[0.8rem] font-medium hover:bg-[#1337ec]/90 focus:ring-4 focus:ring-[#1337ec]/30 transition-all flex items-center justify-center gap-2">
        <PlusIcon size={26} /> Apply Leave
      </button>
      {/* MODAL */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* BACKDROP */}
          <div
            className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm"
            onClick={() => handleClose()}
          />
          {/* DIALOG */}
          <div onClick={(e) => e.stopPropagation()} className="relative  w-full max-w-lg bg-white dark:bg-[#161a2d] rounded-2xl shadow-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
              <div className='flex items-center text-[#0d101b] dark:text-white gap-2'>
                <div className='size-10 bg-[#1337ec]/10 text-[#1337ec] rounded-full flex items-center justify-center'>
                  <MdAssignmentInd size={25} />
                </div>
                <div className='flex items-start flex-col'>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">Apply for Leave</h3>
                  <span className="text-sm font-medium text-[#1337ec]">Fill in the details to submit your request</span>
                </div>

              </div>
              <button
                onClick={() => handleClose()}
                className="text-gray-400 cursor-pointer hover:text-gray-500 dark:hover:text-gray-300"
              >
                <IoMdClose />
              </button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="p-6">
              <div className="space-y-5">
               
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                    Leave Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    {...register("title",{required:"Please write leave title"})}
                    placeholder="e.g. sick leave"
                    className="block w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:ring-2 focus:ring-[#1337ec]/20 focus:border-[#1337ec] transition-all dark:text-white outline-none"
                  />
                   {errors.title && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.title.message}
                      </p>
                    )}

                </div>
                 {/* Leave type */}
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                    Leave Type
                  </label>
                  <div className="relative">
                    <select
                      name='leaveType'
                      {...register("leaveType", { required: "Please Select leave type" })}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-3 text-sm focus:ring-2 cursor-pointer focus:ring-[#1337ec] outline-none appearance-none"
                    >
                      <option value="">Select Leave type</option>
                      <option value="sick">Sick Leave</option>
                      <option value="casual">Casual Leave</option>
                      <option value="paid">Paid Leave</option>
                      <option value="unpaid">Unpaid Leave</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-3 text-slate-400 pointer-events-none" />
                  </div>
                  {errors.leaveType && (
                    <p className="text-red-500 mt-1 text-[0.75rem]">{errors.leaveType.message}</p>
                  )}

                </div>
                {/* from date to end date */}
                <div className='grid grid-cols-2 gap-4'>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                      From Date
                    </label>
                    <Controller name='startDate' control={control} rules={{ required: "From date is required" }}
                      render={({ field }) => (
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className="data-[empty=true]:text-muted-foreground w-[212px] justify-between text-left font-normal cursor-pointer"
                            >
                              {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                              <ChevronDownIcon />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                            />
                          </PopoverContent>
                        </Popover>
                      )}
                    />
                    {errors.startDate && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.startDate.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                      To Date
                    </label>
                    <Controller name='endDate' control={control} rules={{ required: "To date is required" }}
                      render={({ field }) => (
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className="data-[empty=true]:text-muted-foreground w-[212px] justify-between text-left font-normal cursor-pointer"
                            >
                              {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                              <ChevronDownIcon />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                            />
                          </PopoverContent>
                        </Popover>
                      )}
                    />
                    {errors.endDate && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.endDate.message}
                      </p>
                    )}
                  </div>

                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                    Reason
                  </label>
                  <textarea
                    rows={3}
                    maxLength={250}
                    name='reasonforleave'
                    {...register("reasonforleave", { required: "Please write reason for leave" })}
                    placeholder="Explain the reason for your leave request..."
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-[#1337ec] outline-none resize-none"
                  />
                  <div className="flex justify-end mt-1">
                    <span className="text-[10px] text-slate-400 font-medium">
                      {/* {charCount} / 250 characters */}
                    </span>
                  </div>
                  {errors.reasonforleave && (
                    <p className="text-red-500 mt-1 text-[0.75rem]">{errors.reasonforleave.message}</p>
                  )}
                </div>

              </div>

              {/* ACTIONS */}
              <div className="mt-8 flex flex-col gap-3">
                <button
                  type="submit"
                  className="w-full cursor-pointer bg-[#1337ec] hover:bg-[#1337ec]/90 text-white px-4 py-3 rounded-xl font-semibold transition-all shadow-lg shadow-[#1337ec]/20 flex items-center justify-center gap-2"
                >
                  {
                    loading ? (
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
                    ) : (
                      <>
                        <IoMdSend />
                        <span>Submit Request</span>
                      </>

                    )
                  }
                </button>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="w-full cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

export default ApplyforLeaveDialog