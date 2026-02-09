import Aboutpage from '@/components/about/Aboutpage'
import Navbar from '@/components/common/Navbar'
import Footer from '@/components/home/Footer';
import React from 'react'

export const metadata = {
  title: "About HRFlow | Modern HR Management SaaS",
  description:
    "HRFlow is a modern HR management SaaS that simplifies attendance, leave management, and employee workflows for growing teams.",
};

const page = () => {
  return (
    <div className='w-full'>
       <Navbar />
       <Aboutpage />
       <Footer />
  </div>
  )
}

export default page