"use client"
import Sidebar from '@/components/common/Sidebar'
import React from 'react'

const layout = ({children}) => {
    
  return (
    <div className='w-full flex flex-col md:flex-row min-h-screen'>
        {/* left side */}
        <div className='w-full md:w-[20%]'>
            <Sidebar />
        </div>
        {/* right side */}
        <div className='w-full md:w-[80%] bg-[#f6f6f8] dark:bg-[#101322] h-screen  overflow-y-auto'>
            {children}
        </div>
    </div>
  )
}

export default layout