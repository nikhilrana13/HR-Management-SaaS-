import AddDepartmentDialog from '@/components/hr/AddDepartmentDialog'
import DashboardHeader from '@/components/hr/DashboardHeader'
import DepartmentTable from '@/components/hr/DepartmentTable'
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
            <AddDepartmentDialog />
          </div>
        </div>
        {/* department cards */}
        <DepartmentTable />
      </div>
    </div>
  )
}

export default page