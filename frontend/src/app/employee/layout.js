"use client"
import AuthLoader from '@/components/common/Loader'
import Sidebar from '@/components/common/Sidebar'
import SocketProvider from '@/components/common/SocketProvider'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const layout = ({children}) => {
  const user = useSelector((state)=>state.Auth.user) 
    const [checkingAuth,setCheckingAuth] = useState(true)
    const token = localStorage.getItem("token")
    const router = useRouter()

    useEffect(()=>{
      if(!token || user?.role !== "employee"){
          router.replace("/auth/login")
      }else{
        setCheckingAuth(false)
      }
    },[token,user])
    // BLOCK UI until auth check finishes
    if(checkingAuth){
       return <AuthLoader />
    }

  return (
    <div className='w-full flex flex-col md:flex-row min-h-screen'>
      <SocketProvider />
        {/* left side */}
        <div className='w-full md:w-[20%]'>
          <Sidebar />
        </div>
        {/* right side */}
        <div className='w-full md:w-[80%] overflow-y-auto bg-[#f6f6f8] dark:bg-[#101322] h-screen' >
            {children}
        </div>
    </div>
  )
}

export default layout