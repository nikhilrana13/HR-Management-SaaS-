"use client"
import React from 'react'
import { useSelector } from 'react-redux'
import { Button } from '../ui/button'
import { BellIcon } from 'lucide-react'
import { Badge } from '../ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { usePathname } from 'next/navigation'
import EmployeeNotificationDialog from './EmployeeNotificationDialog'

const DashboardHeader = () => {
    const user = useSelector((state)=>state.Auth.user)
    const pathname = usePathname()


     const pageNames = {
        "/employee/dashboard": "Dashboard Overview",
        "/employee/attendance": "Attendance Overview",
        "/employee/notifications": "Notifications",
        "/employee/leaves": "Leaves Overview",
        "/employee/announcements": "Announcements Overview",
        "/empolyee/settings":"Notifications"
    }

    const pageTitle = pageNames[pathname] || "Dashboard Overview"

  return (
    <header className='bg-white border-b px-5 py-1 items-center flex justify-between'>
            <h3 className='text-black dark:text-white text-xl sm:text-[1.3rem] font-bold'>
                {pageTitle}</h3>
            <div className='flex px-3 py-2.5 items-center gap-4'>
                {/* notifications */}
                <div className='relative flex cursor-pointer items-center justify-center size-10 rounded-lg '>
                    <EmployeeNotificationDialog />
                </div>
                <div className='h-8 w-px bg-[#e7e9f3] dark:bg-[#2a2d3d]'></div>
                {/* profile */}
                <div className='flex gap-3'>
                    <div className='hidden sm:flex flex-col items-end '>
                        <span className='text-sm font-bold  text-[#0d101b] dark:text-white'>{user?.name || "User"}</span>
                        <span className='text-[#4c599a] dark:text-gray-400 text-[0.7rem] font-medium'>
                            {user?.role === "hr" ? "Hr" : "Employee"}
                        </span>
                    </div>
                    {/* profile image */}
                    <Avatar>
                        <AvatarImage src={user?.profilepic || '/unknownuser.webp'} />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </div>
            </div>
        </header>
  )
}

export default DashboardHeader