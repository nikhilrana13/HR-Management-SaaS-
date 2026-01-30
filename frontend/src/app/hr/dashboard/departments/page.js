import DashboardHeader from '@/components/hr/DashboardHeader'
import { Plus } from 'lucide-react'
import React from 'react'

const page = () => {
  return (
    <div className='flex flex-col'>
      {/* header */}
      <DashboardHeader />
      <div className='flex px-4 md:px-9 py-4 flex-col gap-5'>
         <div className="flex gap-5 md:items-center flex-col md:flex-row  md:justify-between">
          <div className="flex flex-col">
            <span className="text-[1.5rem]  font-bold text-black dark:text-white">
              Department Management
            </span>
            <span className="text-sm text-[#4c599a] dark:text-[#a1a7c5] font-normal">
              Manage and organize your company's department structure and leadership
            </span>
          </div>
          <div>
             <button className="w-full  px-5 py-3 cursor-pointer bg-[#1337ec] text-white rounded-lg text-[0.8rem] font-medium hover:bg-[#1337ec]/90 focus:ring-4 focus:ring-[#1337ec]/30 transition-all flex items-center justify-center gap-2">
              <Plus size={22} /> Create Department
            </button>
          </div>
        </div>
        {/* department filters */}
        

      </div>
    </div>
  )
}

export default page