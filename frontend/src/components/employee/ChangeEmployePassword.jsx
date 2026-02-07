"use client"
import axios from "axios"
import React, { useState } from "react"
import toast from "react-hot-toast"
import { MdLockReset, MdVisibility, MdInfo } from "react-icons/md"
import { ThreeDots } from "react-loader-spinner"

const ChangeEmployePassword = () => {
     const [showPassword,setShowPassword] = useState(false)
       const [loading,setloading] = useState(false)
       const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/;
       const [input,setInput] = useState({
          currentpassword:"",
          newpassword:""
         })
       const [errors,setErrors] = useState({})

       const handleInputChange = (e)=>{
        const {name,value} = e.target 
        setInput((prev)=>({...prev,[name]:value}))
        // remove error on typing
        setErrors((prev)=>({...prev,[name]:""}))
       }

       const validation = ()=>{
        let newErrors = {}
        if(!passwordRegex.test(input.currentpassword)){
            newErrors.currentpassword = "Password must contain letters and numbers (minimum 6 characters)."
        }
        if(!passwordRegex.test(input.newpassword)){
            newErrors.newpassword = "Password must contain letters and numbers (minimum 6 characters)."
        }
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
       }

       const handleChangepassword = async()=>{
             if(!validation()) return;
           try {
              setloading(true)
              const response = await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/employee/changepassword`,{
                oldpassword:input.currentpassword,
                newpassword:input.newpassword
              },{
                headers:{
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
              })
              if(response?.data?.status === "success"){
                  toast.success(response?.data?.message)
              }
            
           } catch (error) {
              console.error("Failed to change password",error)
              toast.error(error?.response?.data?.message,error)
           }finally{
            setloading(false)
           }
       }
  return (
     <main className="flex-1 max-w-[800px] mx-auto">
      {/* Card */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="p-8">
          {/* Header */}
          <div className="flex items-center gap-4 mb-2">
            <div className="bg-[#1337ec]/10 p-2 rounded-lg">
              <MdLockReset className="text-[#1337ec] text-2xl" />
            </div>
            <h2 className="text-slate-900 dark:text-white text-2xl font-bold">
              Change Password
            </h2>
          </div>

          <p className="text-slate-500 dark:text-slate-400 mb-8">
            Ensure your account is protected with a strong, unique password.
          </p>

          {/* Form */}
          <div className="space-y-6">
            {/* Current Password */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Current Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text':'password'}
                  name="currentpassword"
                  onChange={handleInputChange}
                  placeholder="Enter current password"
                  className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-[#1337ec]/20 focus:border-[#1337ec]"
                />
                <MdVisibility onClick={()=>setShowPassword(!showPassword)} className="absolute cursor-pointer right-3 top-1/2 -translate-y-1/2 text-slate-400" />
              </div>
              {
                errors.currentpassword && (
                    <p className="text-red-500 mt-1 text-[0.75rem]">{errors.currentpassword}</p>
                )
              }
            </div>

            <hr className="border-slate-100 dark:border-slate-800" />

            {/* New Password */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text':'password'}
                  name="newpassword"
                  onChange={handleInputChange}
                  placeholder="Create new password"
                  className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-[#1337ec]/20 focus:border-[#1337ec]"
                />
                <MdVisibility onClick={()=>setShowPassword(!showPassword)}  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
              </div>
              {
                errors.newpassword && (
                    <p className="text-red-500 mt-1 text-[0.75rem]">{errors.newpassword}</p>
                )
              }
            </div>
            {/* Actions */}
            <div className="flex justify-end gap-3 pt-4">
              <button onClick={()=>setInput({currentpassword:"",newpassword:""})} className="px-6 cursor-pointer py-2.5 rounded-lg text-sm font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800">
                Cancel
              </button>
              <button onClick={()=>handleChangepassword()} className="px-6 py-2.5 cursor-pointer rounded-lg bg-[#1337ec] text-white text-sm font-bold shadow-md shadow-[#1337ec]/20 hover:bg-[#1337ec]/90">
               {
                loading ? (
                  <ThreeDots
                  visible={true}
                  height="20"
                  width="20"
                  color="#ffffff"
                  radius="9"
                  ariaLabel="three-dots-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                  />
                  
                ):"Update Password"
               }
              </button>
            </div>
          </div>
        </div>
        {/* Footer */}
        <div className="bg-slate-100/50 dark:bg-slate-800/30 px-8 py-4 border-t border-slate-100 dark:border-slate-800 flex items-center gap-3">
          <MdInfo className="text-[#1337ec] text-xl" />
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Once updated, you’ll need to log in again on all devices.
          </p>
        </div>
      </div>
    </main>
  )
}

export default ChangeEmployePassword