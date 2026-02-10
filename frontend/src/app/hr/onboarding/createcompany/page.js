"use client"
import AuthLoader from '@/components/common/Loader'
import CreateCompanyForm from '@/components/hr/CreateCompanyForm'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'


const page = () => {
    const user = useSelector((state)=>state.Auth.user)
    const [checkingAuth,setCheckingAuth] = useState(true)
    const router = useRouter()
    useEffect(()=>{
      if(user.role !== "hr"){
         router.replace("/auth/login")
      }
    },[user])
    // block ui until auth check 
    if(checkingAuth){
       return <AuthLoader />
    }
  return (
    <CreateCompanyForm />
  )
}

export default page