"use client"
import React, { useState } from 'react'
import EditCompanyProfile from './EditCompanyProfile'
import EditHrProfile from './EditHrProfile'
import ChangePassword from './ChangePassword'

const CompanyAndProfileEdit = () => {
     const [selectedTab,setSelectedTab] = useState("companyprofile")


    return (
        <div className='flex mt-5 flex-col'>
            {/* tab */}
            <div className="mb-8 border-b border-[#cfd3e7] dark:border-gray-800">
                <div className="flex gap-8">
                    <span onClick={()=>setSelectedTab("companyprofile")} className={`pb-4 cursor-pointer border-b-2  ${selectedTab === "companyprofile" ? "text-[#1337ec] border-[#1337ec] ":"text-[#4c599a] hover:text-[#1337ec] border-transparent"} font-bold text-sm tracking-wide`}>
                        Company Profile
                    </span>
                    <span onClick={()=>setSelectedTab("myprofile")} className={`pb-4 cursor-pointer border-b-2 ${selectedTab === "myprofile" ? "text-[#1337ec] border-[#1337ec] ":"text-[#4c599a] hover:text-[#1337ec] border-transparent"} font-bold text-sm tracking-wide transition-colors`}>
                        My Profile
                    </span>
                    <span onClick={()=>setSelectedTab("changepassword")} className={`pb-4 cursor-pointer border-b-2 ${selectedTab === "changepassword" ? "text-[#1337ec] border-[#1337ec] ":"text-[#4c599a] hover:text-[#1337ec] border-transparent"} font-bold text-sm tracking-wide transition-colors`}>
                        Change password
                    </span>
                </div>
            </div>
            {selectedTab === "companyprofile" && (
                <EditCompanyProfile />
            )}
            {
              selectedTab === "myprofile" && (
                <EditHrProfile />
              )
            }
            {
                selectedTab === "changepassword" && (
                    <ChangePassword />
                )
            }

        </div>
    )
}

export default CompanyAndProfileEdit