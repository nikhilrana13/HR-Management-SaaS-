import Navbar from '@/components/common/Navbar'
import Footer from '@/components/home/Footer'
import HeroSection from '@/components/home/HeroSection'
import HowItWorks from '@/components/home/HowItWorks'
import WhyChooseUs from '@/components/home/WhyChooseUs'
import React from 'react'


export const metadata = {
  title: "HRFlow – HR Management SaaS",
  description:
    "All-in-one HR Management platform to manage employees, attendance and leaves efficiently.",
}
const page = () => {
  return (
    <div className='w-full'>
      <Navbar />
      <HeroSection />
      <WhyChooseUs />
      <HowItWorks />
      <Footer />
    </div>
  )
}

export default page