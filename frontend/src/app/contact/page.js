import Navbar from '@/components/common/Navbar'
import ContactPage from '@/components/contact/ContactPage'
import Footer from '@/components/home/Footer'
import React from 'react'

export const metadata = {
  title: "Contact HRFlow | Modern HR Management SaaS",
  description:
    "HRFlow is a modern HR management SaaS that simplifies attendance, leave management, and employee workflows for growing teams.",
};

const page = () => {
  return (
    <div className='w-full'>
        <Navbar />
        <ContactPage />
        <Footer />
    </div>
  )
}

export default page