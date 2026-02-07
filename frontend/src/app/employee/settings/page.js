import DashboardHeader from '@/components/employee/DashboardHeader'
import EditProfileAndChangePassword from '@/components/employee/EditProfileAndChangePassword'
import React from 'react'

const page = () => {
  return (
    <div className='flex flex-col'>
      <DashboardHeader />
      <div className='flex flex-col gap-3 px-4 md:px-9 py-5'>
        <div className="flex gap-5">
          <div className="flex flex-col">
            <span className="text-[1.5rem]  font-bold text-black dark:text-white">
             Accounts Settings
            </span>
            <span className="text-sm text-[#4c599a] dark:text-[#a1a7c5] font-normal">
              Manage your personal profile information
            </span>
          </div>
        </div>
        {/*profile form */}
        <EditProfileAndChangePassword />
      </div>
    </div>
  )
}

export default page