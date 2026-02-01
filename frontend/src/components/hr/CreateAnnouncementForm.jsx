"use client"
import axios from 'axios'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { IoMdSend } from 'react-icons/io'
import { ThreeDots } from 'react-loader-spinner'

const CreateAnnouncementForm = () => {
    const [loading,setloading] = useState(false)
    const [errors,setErrors] = useState({})
    const [input,setInput] = useState({
        title:"",
        content:"",
        category:"",
    })

    const handleInputChange = (e)=>{
        const {name,value} = e.target 
        setInput((input)=>({...input,[name]:value}))
        // remove error on typing
        setErrors((prev)=>({...prev,[name]:""}))
    }
    const validation = ()=>{
        let newErrors = {}
        if(!input.title){
            newErrors.title= "Title is Required"
        }
        if(!input.content){
            newErrors.content = "Content is Required"
        }
        if(!input.category){
            newErrors.category = "Category is Required"
        }
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleCreateAnnouncement = async()=>{
         if(!validation()) return ;
        try {
            setloading(true)
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/announcement/create`,{
                title:input.title,
                content:input.content,
                category:input.category
            },{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem("token")}`
                }
            })
            if(response?.data?.status === "success"){
                toast.success(response?.data?.message)
            }
        } catch (error) {
            console.error("Failed to create announcement",error)
            toast.error(error?.response?.data?.message)
        }finally{
            setloading(false)
        }
    }



  return (
    <div className="relative z-20 w-full max-w-[800px] bg-white dark:bg-[#1a1d2e] rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">

      {/* HEADER */}
      <div className="px-8 py-6 border-b border-gray-100 dark:border-gray-800 flex justify-between items-start">
        <div>
          <h1 className="text-[#0d101b] dark:text-white text-2xl font-bold">
            Create New Announcement
          </h1>
          <p className="text-[#4c599a] dark:text-gray-400 text-sm mt-1">
            Fill in the details below to broadcast a message to your organization.
          </p>
        </div>
      </div>

      {/* CONTENT */}
      <div className="overflow-y-auto px-8 py-6 space-y-6 custom-scrollbar">
        {/* TITLE + CATEGORY */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-[#0d101b] dark:text-gray-200">
              Announcement Title
            </label>
            <input
              type="text"
              name='title'
              value={input.title}
              onChange={handleInputChange}
              placeholder="e.g. Q4 Company All-Hands Meeting"
              className="w-full rounded-lg border border-[#cfd3e7] dark:border-gray-700 bg-white dark:bg-[#101322] px-4 py-3 text-[#0d101b] dark:text-white focus:ring-2 focus:ring-[#1337ec]/20 focus:border-[#1337ec]"
            />
            {errors.title && (
                <p className="text-red-500 mt-1 text-[0.75rem]">{errors.title}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-[#0d101b] dark:text-gray-200">
              Category
            </label>
            <div className="relative">
              <select name='category' value={input.category} onChange={handleInputChange} className="w-full appearance-none rounded-lg border border-[#cfd3e7] dark:border-gray-700 bg-white dark:bg-[#101322] px-4 py-3 text-[#0d101b] dark:text-white focus:ring-2 focus:ring-[#1337ec]/20 focus:border-[#1337ec]">
                <option value="">Select a category</option>
                <option value="corporate">Corporate</option>
                <option value="event">Event</option>
                <option value="hrupdate">Hr Update</option>
              </select>
            </div>
             {errors.category && (
                <p className="text-red-500 mt-1 text-[0.75rem]">{errors.category}</p>
            )}
          </div>
        </div>
        {/* MESSAGE */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-[#0d101b] dark:text-gray-200">
            Message Content
          </label>

          <div className="rounded-lg border border-[#cfd3e7] dark:border-gray-700 bg-white dark:bg-[#101322] overflow-hidden focus-within:ring-2 focus-within:ring-[#1337ec]/20">
            <textarea
              name='content'
              value={input.content}
              onChange={handleInputChange}
              rows={6}
              placeholder="Write your announcement message here..."
              className="w-full p-4 bg-transparent text-[#0d101b] dark:text-white resize-none focus:ring-0"
            />
          </div>
           {errors.content && (
                <p className="text-red-500 mt-1 text-[0.75rem]">{errors.content}</p>
            )}
        </div>
      </div>

      {/* FOOTER */}
      <div className="px-8 py-6 border-t border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-white/5 flex flex-col sm:flex-row justify-end gap-3">
        <button onClick={()=>setInput({title:"",content:"",category:""})} className="w-full cursor-pointer sm:w-auto px-6 py-2.5 rounded-lg border border-[#cfd3e7] dark:border-gray-700 text-[#4c599a] dark:text-gray-300 font-semibold hover:bg-gray-100 dark:hover:bg-gray-800">
          Cancel
        </button>

        <button type='button' disabled={loading}  onClick={()=>handleCreateAnnouncement()} className={`w-full cursor-pointer sm:w-auto px-8 py-2.5 rounded-lg bg-[#1337ec] text-white font-semibold shadow-lg shadow-[#1337ec]/20 hover:bg-[#1337ec]/90 flex items-center justify-center gap-2 ${loading ? "opacity-60 cursor-not-allowed" : "bg-[#1337ec] hover:bg-[#1337ec]/90"}`}>
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
                ):(
                  <>
                  <IoMdSend />
                  <span>Publish Announcement</span>
                  </>  
                )
            }
          
        </button>
      </div>
    </div>
  )
}

export default CreateAnnouncementForm