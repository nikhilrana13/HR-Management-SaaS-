import CreateAnnouncementForm from '@/components/hr/CreateAnnouncementForm'
import DashboardHeader from '@/components/hr/DashboardHeader'
import React from 'react'

const page = () => {
  return (
    <div className='flex flex-col'>
        <DashboardHeader />
         <div className='flex flex-col gap-3 px-4 md:px-9 py-4'>
          {/* announcement form */}
           <div className='flex mt-5 justify-center'>
             <CreateAnnouncementForm />
           </div>
         </div>
    </div>
  )
}

export default page