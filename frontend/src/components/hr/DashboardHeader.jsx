"use client"
import React from 'react'
import { useSelector } from 'react-redux'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { usePathname } from 'next/navigation'
import { Button } from '../ui/button'
import { BellIcon } from 'lucide-react'
import { Badge } from '../ui/badge'
import NotificationDialogHr from './NotificationDialogHr'

const DashboardHeader = () => {
    const user = useSelector((state) => state.Auth.user)
    const pathname = usePathname()

    const pageNames = {
        "/hr/dashboard": "Dashboard Overview",
        "/hr/dashboard/employees": "Employee Overview",
        "/hr/dashboard/departments": "Departments Overview",
        "/hr/dashboard/attendance": "Attendance Overview",
        "/hr/dashboard/settings": "Settings Overview",
        "/hr/dashboard/leaves": "Leaves Overview",
        "/hr/dashboard/announcements": "Announcement",
        "/hr/dashboard/notifications":"Notifications"
    }

    const pageTitle = pageNames[pathname] || "Dashboard Overview"

    return (
        <header className='bg-white border-b px-5 py-1 items-center flex justify-between'>
            <h3 className='text-black dark:text-white text-xl sm:text-[1.3rem] font-bold'>
                {pageTitle}</h3>
            <div className='flex px-3 py-2.5 items-center gap-4'>
                {/* notifications */}
                <div className='relative flex cursor-pointer items-center justify-center size-10 rounded-lg '>
                    {/* <Button className="relative cursor-pointer" size="sm" variant="outline">
                        <BellIcon />
                        {unreadCount > 0 && (<Badge
                            className="-top-1 -right-2 cursor-pointer absolute z-10 h-5 min-w-5 rounded-full px-1 text-xs"
                            variant="destructive">{unreadCount}+</Badge>
                        )} 
                    </Button> */}
                    <NotificationDialogHr />
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