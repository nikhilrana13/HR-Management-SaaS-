"use client"
import { SetUser } from '@/redux/AuthSlice'
import axios from 'axios'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { FaCloudUploadAlt } from 'react-icons/fa'
import { ThreeDots } from 'react-loader-spinner'
import { useDispatch, useSelector } from 'react-redux'


const UpdateEmployeeProfile = () => {
      const user = useSelector((state)=>state.Auth.user)
      const [loading, setLoading] = useState(false)
      const [Imagepreview, setImagePreview] = useState(null)
      const [Error, setError] = useState({})
      const [input, setInput] = useState({})
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const dispatch = useDispatch()
    
      useEffect(() => {
         if(user){
           setInput({
             name:user.name || "",
             email:user.email || "",
             profilepic:user.profilepic || null
           })
           setImagePreview(user.profilepic && user.profilepic.trim() !== "" ? user?.profilepic : null )
         }
      }, [user])
  
      // console.log("input", input)
      const handleInputChange = (e) => {
          const { name, value, files } = e.target
          if (name === "profilepic") {
              const file = files[0]
              setInput((prev) => ({ ...prev, [name]: file }))
              if (file) setImagePreview(URL.createObjectURL(file))
          } else {
              setInput((prev) => ({ ...prev, [name]: value }))
              setError((prev)=>({...prev,[name]:""}))
          }
      }
      const getProfilepic = (profilepic) => {
          if (!profilepic || profilepic.trim() === "") {
              return "/unknownuser.webp"
          }
          return profilepic
      } 
      
      const validation = ()=>{
          let newError = {}
          if(!input.name || !input.name.trim()){
              newError.name = "name is required"
          }
          if(!emailRegex.test(input.email)){
              newError.email = "Please Enter valid email address"
          }
          setError(newError)
          return Object.keys(newError).length === 0
      }
      
     const handleUpdateDetails = async()=>{
           if(!validation()) return;
           let formdata = new FormData()
             formdata.append("name",input.name)
             formdata.append("email",input.email)
             if(input.profilepic instanceof File){
                formdata.append("profilepic",input.profilepic)
             }
            //  for(let pair of formdata.entries()){
            //     console.log(pair[0],pair[1])
            //  }
            try {
                setLoading(true)
                const response = await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/employee/updateprofile`,formdata,{
                    headers:{
                        Authorization:`Bearer ${localStorage.getItem("token")}`
                    }
                })
                if(response?.data?.status === "success"){
                    toast.success(response?.data?.message)
                    const user = response?.data?.data?.user 
                    dispatch(SetUser(user))
                }
            } catch (error) {
                console.log("failed to update profile details",error)
                toast.error(error?.response?.data?.message || "Internal server error")
            }finally{
                    setLoading(false) 
            }
     }
  return (
     <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-[#e7e9f3] dark:border-gray-800 overflow-hidden">
            {/* HEADER */}
            <div className="p-6 border-b border-[#e7e9f3] dark:border-gray-800 flex justify-between items-center bg-[#f8f9fc] dark:bg-gray-800/50">
                <div>
                    <h3 className="text-lg font-bold">Personal Details</h3>
                    <p className="text-sm text-[#4c599a] dark:text-gray-400">
                        Update your account information and preferences
                    </p>
                </div>
                <button onClick={()=>handleUpdateDetails()}  className="bg-[#1337ec] cursor-pointer text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-[#1337ec]/90 transition-colors">
                  {loading ? (
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
                  ):"Save Profile"
                }  
                </button>
            </div>
            {/* CONTENT */}
            <div className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* LOGO */}
                    <div>
                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-4">
                            Profile Image
                        </label>
                        <div className="relative group w-40 h-40 rounded-full overflow-hidden border-2 border-dashed border-gray-300 dark:border-gray-600 bg-[#f6f7fb] dark:bg-gray-800 cursor-pointer">
                            {/* IMAGE */}
                                <Image
                                    src={Imagepreview || getProfilepic(input.profilepic)}
                                    alt="Company Logo"
                                    fill
                                    sizes="160px"
                                    className="object-cover"
                                />
                            {/* EMPTY STATE */}
                            {!Imagepreview && !input.profilepic && (
                                <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400">
                                    <FaCloudUploadAlt className="text-3xl mb-2" />
                                    <span className="text-[10px] font-bold uppercase tracking-widest">
                                        Upload Image
                                    </span>
                                </div>
                            )}
                            {/* HOVER OVERLAY */}
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <span className="text-white text-xs font-semibold px-3 py-1.5 rounded-full bg-black/60">
                                    Change Image
                                </span>
                            </div>
                            {/* FILE INPUT */}
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleInputChange}
                                name="profilepic"
                                className="absolute inset-0 opacity-0 cursor-pointer"
                            />
                        </div>
                        <p className="text-xs text-gray-500 mt-3">
                            PNG, JPG or GIF. Max 2MB.
                        </p>
                    </div>
                    {/* FORM */}
                    <div className="md:col-span-2 space-y-5">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={input.name || ""}
                                    onChange={handleInputChange}
                                    className="bg-[#f6f6f8] dark:bg-gray-800 border-none rounded-lg focus:ring-2 focus:ring-[#1337ec]/50 text-sm p-2.5"
                                />
                                {Error.name && (
                                     <p className='text-red-500 text-[0.8rem]'>{Error.name}</p>
                                )}
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                                    Email
                                </label>
                                <input
                                    type="text"
                                    name="email"
                                    value={input.email || ""}
                                    onChange={handleInputChange}
                                    className="bg-[#f6f6f8] dark:bg-gray-800 border-none rounded-lg focus:ring-2 focus:ring-[#1337ec]/50 text-sm p-2.5"
                                />
                                {Error.email && (
                                     <p className='text-red-500 text-[0.8rem]'>{Error.email}</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
           </div>
  )
}

export default UpdateEmployeeProfile