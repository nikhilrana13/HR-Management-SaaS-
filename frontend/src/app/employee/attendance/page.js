import DashboardHeader from '@/components/employee/DashboardHeader'
import MarkAttendance from '@/components/employee/MarkAttendance'
import React from 'react'

const page = () => {
  return (
    <div className='flex flex-col'>
      <DashboardHeader />
        <div className='flex border px-4 sm:px-9 py-5 flex-col gap-5'>
        <div className="flex gap-5 md:items-center flex-col md:flex-row  md:justify-between">
          <div className="flex flex-col">
            <span className="text-[1.5rem]  font-bold text-black dark:text-white">
              Mark My Attendance
            </span>
            <span className="text-sm text-[#4c599a] dark:text-[#a1a7c5] font-normal">
              Manage your daily clock-in and clock-out activities
            </span>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            LIVE UPDATES ACTIVE
          </span>
        </div>
        {/* attendance tables and attendance marked box */}
        <MarkAttendance />
        </div>

    </div>
  )
}

export default page