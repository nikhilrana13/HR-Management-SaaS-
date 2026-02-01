"use client"
import axios from 'axios'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { FaCloudUploadAlt } from 'react-icons/fa'
import { ThreeDots } from 'react-loader-spinner'
import CompanyProfileShimmer from './CompanyProfileShimmer'

const EditCompanyProfile = () => {
    const [loading, setLoading] = useState(false)
    const [detailsloading,setdetailsLoading] = useState(false)
    const [Imagepreview, setImagePreview] = useState(null)
    const [Error, setError] = useState({})
    const [input, setInput] = useState({})
     const phoneRegex = /^[+][0-9]{10,15}$/;

    useEffect(() => {
        const fetchCompanyDetails = async () => {
            try {
                setdetailsLoading(true)
                const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/company/details`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                })
                // console.log("response", response.data)
                if (response?.data?.status === "success") {
                    const company = response?.data?.data?.company

                    setInput({
                        id:company._id,
                        name: company.name,
                        email: company.email,
                        address: company.address,
                        phoneNumber: company.phoneNumber,
                        logo: company.logo
                    })
                    setImagePreview(company.logo && company.logo.trim() !== "" ? company.logo : null)
                }

            } catch (error) {
                console.error("failed to get company details", error)
            }finally{
              setdetailsLoading(false)  
            }
        }
        fetchCompanyDetails()
    }, [])

    // console.log("input", input)
    const handleInputChange = (e) => {
        const { name, value, files } = e.target
        if (name === "logo") {
            const file = files[0]
            setInput((prev) => ({ ...prev, [name]: file }))
            if (file) setImagePreview(URL.createObjectURL(file))
        } else {
            setInput((prev) => ({ ...prev, [name]: value }))
            setError((prev)=>({...prev,[name]:""}))
        }
    }

    const getCompanyLogo = (logo) => {
        if (!logo || logo.trim() === "") {
            return "/unknownuser.webp"
        }
        return logo
    } 
    
    const validation = ()=>{
        let newError = {}
        if(!input.name || !input.name.trim()){
            newError.name = "Company name is required"
        }
        if(!phoneRegex.test(input.phoneNumber)){
            newError.phoneNumber = "Enter valid phone number"
        }
        setError(newError)
        return Object.keys(newError).length === 0
    }

     const handleUpdateDetails = async(id)=>{
           if(!validation()) return;
           let formdata = new FormData()
             formdata.append("name",input.name)
             formdata.append("address",input.address)
             formdata.append("phoneNumber",input.phoneNumber)
             if(input.logo instanceof File){
                formdata.append("logo",input.logo)
             }
             for(let pair of formdata.entries()){
                console.log(pair[0],pair[1])
             }
            try {
                setLoading(true)
                const response = await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/company/update/${id}`,formdata,{
                    headers:{
                        Authorization:`Bearer ${localStorage.getItem("token")}`
                    }
                })
                if(response?.data?.status === "success"){
                    toast.success(response?.data?.message)
                }
            } catch (error) {
                console.log("failed to update company details",error)
                toast.error(error?.response?.data?.message || "Internal server error")
            }finally{
                    setLoading(false) 
            }
     }



    return (
        <>
          {
            detailsloading ? (
                <CompanyProfileShimmer />
            ):(
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-[#e7e9f3] dark:border-gray-800 overflow-hidden">
            {/* HEADER */}
            <div className="p-6 border-b border-[#e7e9f3] dark:border-gray-800 flex justify-between items-center bg-[#f8f9fc] dark:bg-gray-800/50">
                <div>
                    <h3 className="text-lg font-bold">Company Information</h3>
                    <p className="text-sm text-[#4c599a] dark:text-gray-400">
                        These details appear on invoices and public documentation.
                    </p>
                </div>
                <button onClick={()=>handleUpdateDetails(input.id)}  className="bg-[#1337ec] cursor-pointer text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-[#1337ec]/90 transition-colors">
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
                  ):"Save Changes"
                }  
                </button>
            </div>
            {/* CONTENT */}
            <div className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* LOGO */}
                    <div>
                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-4">
                            Company Logo
                        </label>
                        <div className="relative group w-40 h-40 rounded-full overflow-hidden border-2 border-dashed border-gray-300 dark:border-gray-600 bg-[#f6f7fb] dark:bg-gray-800 cursor-pointer">
                            {/* IMAGE */}
                            {(Imagepreview || input.logo) && (
                                <Image
                                    src={Imagepreview || getCompanyLogo(input.logo)}
                                    alt="Company Logo"
                                    fill
                                    sizes="160px"
                                    className="object-cover"
                                />
                            )}
                            {/* EMPTY STATE */}
                            {!Imagepreview && !input.logo && (
                                <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400">
                                    <FaCloudUploadAlt className="text-3xl mb-2" />
                                    <span className="text-[10px] font-bold uppercase tracking-widest">
                                        Upload Logo
                                    </span>
                                </div>
                            )}
                            {/* HOVER OVERLAY */}
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <span className="text-white text-xs font-semibold px-3 py-1.5 rounded-full bg-black/60">
                                    Change Logo
                                </span>
                            </div>
                            {/* FILE INPUT */}
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleInputChange}
                                name="logo"
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
                                    Company Name
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
                                    Address
                                </label>
                                <input
                                    type="text"
                                    name="address"
                                    value={input.address || ""}
                                    onChange={handleInputChange}
                                    className="bg-[#f6f6f8] dark:bg-gray-800 border-none rounded-lg focus:ring-2 focus:ring-[#1337ec]/50 text-sm p-2.5"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                                    Company Email
                                </label>
                                <input
                                    type="email"
                                    name='email'
                                    disabled
                                    value={input.email || ""}
                                    readOnly
                                    className="bg-[#f6f6f8] dark:bg-gray-800 border-none rounded-lg focus:ring-2 focus:ring-[#1337ec]/50 text-sm p-2.5"
                                />
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                                    Phone
                                </label>
                                <input
                                    type="tel"
                                    name='phoneNumber'
                                    value={input.phoneNumber || ""}
                                    onChange={handleInputChange}
                                    className="bg-[#f6f6f8] dark:bg-gray-800 border-none rounded-lg focus:ring-2 focus:ring-[#1337ec]/50 text-sm p-2.5"
                                />
                                 {Error.phoneNumber && (
                                     <p className='text-red-500 text-[0.8rem]'>{Error.phoneNumber}</p>
                                )}
                            </div>
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

export default EditCompanyProfile