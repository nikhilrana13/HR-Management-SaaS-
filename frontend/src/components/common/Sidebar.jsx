"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { BiBuilding } from 'react-icons/bi'
import { CiSettings } from 'react-icons/ci'
import { FaUserSecret } from 'react-icons/fa'
import { HiUsers } from 'react-icons/hi'
import { LuLayoutDashboard, LuLogOut } from 'react-icons/lu'
import { MdAccountTree, MdAnnouncement, MdEventBusy } from 'react-icons/md'
import { PiUserSquare } from 'react-icons/pi'
import { SlCalender } from 'react-icons/sl'
import { useSelector } from 'react-redux'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import UseLogout from '@/hooks/UseLogout'
import { BellIcon } from 'lucide-react'

const Sidebar = () => {
    const user = useSelector((state) => state.Auth.user)
    const pathname = usePathname()
    const {handleLogout} = UseLogout()

    const navlink = (path) => {
        return `${pathname === path ? "bg-[#E7EBFD] text-[#1337ec] font-semibold px-3 py-2.5  rounded-md  flex items-center gap-2" : "px-3 py-2.5 dark:text-gray-300 text-[#4c599a] hover:bg-gray-100 font-medium dark:hover:bg-gray-800 rounded-md "}`
    }
    return (
        <aside className='w-full border-r flex-shink-0 flex flex-col gap-2 h-full bg-white dark:bg-[#1a1d2d] relative'>
            {/* logo */}
            <div className='flex items-center  px-5 py-4 gap-3'>
                <div className='bg-[#1337ec] flex items-center justify-center rounded-lg size-10'>
                    <BiBuilding className='text-white' />
                </div>
                <div className='flex flex-col'>
                    <span className='text-[#0d101b] dark:text-white text-[1rem] font-bold leading-tight'>HR pulse</span>
                    <span className='text-[#4c599a] dark:text-gray-400 text-xs font-normal'>
                    {user?.role === "hr" ? "Admin Portal":"Employee Portal"}   </span>
                </div>
            </div>
            {/* nav links */}
            <nav className='flex flex-col mt-3  gap-2 px-4'>
                <Link href={` ${user?.role === "hr" ? '/hr/dashboard' : '/employee/dashboard'}`}
                    className={`${user?.role === "hr" ? navlink("/hr/dashboard") : navlink("/employee/dashboard")}`}>
                    <div className="flex items-center gap-4">
                        <LuLayoutDashboard size={23} />
                        <span className="transition-opacity  text-sm duration-500">Dashboard</span>
                    </div>
                </Link>
                {
                    user?.role === "hr" && (
                      <Link href='/hr/dashboard/employees'
                    className={navlink("/hr/dashboard/employees")}>
                    <div className="flex items-center gap-4">
                        <HiUsers size={23} />
                        <span className="transition-opacity  text-sm duration-500">Employees</span>
                    </div>
                    </Link>
                    )
                }
                {
                    user?.role === "employee" && (
                    <Link href="/employee/attendance"
                    className={navlink("/employee/attendance")}>
                    <div className="flex items-center gap-4">
                        <SlCalender size={23} />
                        <span className="transition-opacity  text-sm duration-500">Attendance</span>
                    </div>
                </Link>
                    )
                }
                {
                    user?.role === "hr" && (
                 <Link href='/hr/dashboard/departments'
                    className={navlink("/hr/dashboard/departments")}>        
                     <div className="flex items-center gap-4">
                        <MdAccountTree size={23} />
                        <span className="transition-opacity  text-sm duration-500">Departments</span>
                    </div>
                </Link>
                    )
                }
                {
                    user?.role === "hr" && (
                    <Link href='/hr/dashboard/attendance'
                    className={navlink("/hr/dashboard/attendance")}>
                    <div className="flex items-center gap-4">
                        <SlCalender size={23} />
                        <span className="transition-opacity  text-sm duration-500">Attendance</span>
                    </div>
                </Link>

                    )
                }
                {
                    user?.role === "hr" && (
                         <Link href='/hr/dashboard/leaves'
                    className={navlink("/hr/dashboard/leaves")}>
                    <div className="flex items-center gap-4">
                        <MdEventBusy size={23} />
                        <span className="transition-opacity  text-sm duration-500">Leaves Requests</span>
                    </div>
                    </Link>
                    )
                }
                {
                    user?.role === "hr" && (
                         <Link href='/hr/dashboard/announcements'
                    className={navlink("/hr/dashboard/announcements")}>
                    <div className="flex items-center gap-4">
                        <MdAnnouncement size={23} />
                        <span className="transition-opacity  text-sm duration-500">Announcements</span>
                    </div>
                    </Link>
                    )
                }
                <Link href={` ${user?.role === "hr" ? '/hr/dashboard/notifications' : '/employee/notifications'}`}
                    className={`${user?.role === "hr" ? navlink("/hr/dashboard/notifications") : navlink("/employee/notifications")}`}>
                    <div className="flex items-center gap-4">
                        <BellIcon size={23} />
                        <span className="transition-opacity  text-sm duration-500">Notifications</span>
                    </div>
                </Link>

                {
                    user?.role === "hr" && (
                        <Link href='/hr/dashboard/settings'
                    className={navlink("/hr/dashboard/settings")}>
                    <div className="flex items-center gap-4">
                        <CiSettings size={23} />
                        <span className="transition-opacity text-sm duration-500">Settings</span>
                    </div>
                </Link>
                    )
                }
                {
                    user?.role === "employee" && (
                          <Link href='/employee/leaves'
                    className={navlink("/employee/leaves")}>
                    <div className="flex items-center gap-4">
                        <MdEventBusy size={23} />
                        <span className="transition-opacity  text-sm duration-500">My Leaves</span>
                    </div>
                    </Link>
                    )
                }
                

                {
                    user?.role === "employee" && (
                       <Link href='/employee/settings'
                    className={navlink("/employee/settings")}>
                    <div className="flex items-center gap-4">
                        <CiSettings size={23} />
                        <span className="transition-opacity text-sm duration-500">Settings</span>
                    </div>
                </Link>
                    )
                }
            </nav>
            {/* bottom */}
            <div className='border-t bottom-0 md:absolute left-0 right-0 flex flex-col gap-3 border-gray-300 px-4 md:px-6 py-2 md:py-3 cursor-pointer bg-white dark:bg-[#1a1d2d]'>
                {/* profile */}
                <div className='hidden md:flex px-3 py-2.5 items-center gap-2'>
                    {/* profile image */}
                    <Avatar>
                        <AvatarImage src={user?.profilepic || '/unknownuser.webp'} />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className='flex flex-col '>
                        <span className='leading-tight text-[0.9rem] font-bold text-[#0d101b] dark:text-white'>
                        {user?.name || "User"}</span>
                         <span className='text-[#4c599a] dark:text-gray-400 text-xs font-normal'>
                            {user?.role === "hr" ? "Hr":"Employee"}</span>
                    </div>
                </div>
                <div onClick={handleLogout}  className={`${user?.role === "hr" ? navlink("#") : navlink("#")}`}>
                    <div className="flex items-center gap-4">
                        <LuLogOut size={23} />
                        <span className="transition-opacity text-sm duration-500">Logout</span>
                    </div>
                </div>
            </div>
        </aside>
    )
}
export default Sidebar