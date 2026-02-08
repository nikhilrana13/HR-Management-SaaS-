import AnnouncementTable from '@/components/employee/AnnouncementTable'
import DashboardHeader from '@/components/employee/DashboardHeader'
import React from 'react'

const page = () => {
  return (
    <div className='flex flex-col'>
      <DashboardHeader />
       <div className='flex mx-auto px-4 sm:px-15 py-10  gap-4'>
        {/* announcement cards */}
        <AnnouncementTable />
       </div>
    </div>
  )
}

export default page