import { BarChart, Calendar1, CheckCircle, PlayCircle } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const HeroSection = () => {
  return (
  <section className="max-w-[1440px] mx-auto px-6 lg:px-20 py-20 lg:py-32 grid lg:grid-cols-2 gap-16 items-center">
  {/* LEFT CONTENT */}
  <div className="flex flex-col gap-8">
    <div className="flex flex-col gap-6">
      <span className="px-4 py-1.5 bg-[#1337ec]/10 text-[#1337ec] text-xs font-bold tracking-widest uppercase rounded-full w-fit">
        The Future of HR Management
      </span>

      <h1 className="text-[#0d101b] dark:text-white text-5xl lg:text-7xl font-black leading-[1.1] tracking-tight">
        All-in-One HR Management Platform for Modern Teams
      </h1>

      <p className="text-[#4c599a] dark:text-[#9ca3af] text-lg lg:text-xl leading-relaxed max-w-xl">
        Streamline your HR operations with our comprehensive platform designed
        for growing businesses. Manage attendance, leaves, and employee data in
        one place.
      </p>
    </div>
    {/* CTA BUTTONS */}
    <div className="flex flex-wrap gap-4">
      <button  className="px-8 h-14  bg-[#1337ec] text-white rounded-xl text-lg font-bold hover:shadow-lg hover:shadow-[#1337ec]/30 transition-all">
        Start Free Trial
      </button>
      <button className="px-8 h-14 bg-white cursor-pointer dark:bg-white/5 border border-[#e7e9f3] dark:border-[#2a2d3d] text-[#0d101b] dark:text-white rounded-xl text-lg font-bold hover:bg-[#f8fafc] dark:hover:bg-white/10 transition-all flex items-center gap-2">
       <PlayCircle />
        View Demo
      </button>
    </div>
    {/* TRUST */}
    <div className="flex items-center gap-4 text-sm text-[#4c599a] font-medium">
      <div className="flex -space-x-2">
        <div className="w-8 h-8 rounded-full border-2 border-white">
            <img src="https://t4.ftcdn.net/jpg/06/39/70/53/360_F_639705399_x6nqWrJQhQTFl2luSaEPjeV6vwmYe1XY.jpg" alt="user image" className='w-full h-full object-cover rounded-full' />
        </div>
        <div className="w-8 h-8 rounded-full border-2 border-white ">
            <img src="https://assets.peoplematters.in/images/df9d38d0-ce9a-46af-ba9f-72eb4b1d2124.jpg" alt="user image" className='w-full h-full object-cover rounded-full' />
        </div>
        <div className="w-8 h-8 rounded-full border-2 border-white">
            <img src="https://assets.peoplematters.in/images/df9d38d0-ce9a-46af-ba9f-72eb4b1d2124.jpg" alt="user image" className='w-full h-full object-cover rounded-full' />
        </div>
      </div>
      <span>Trusted by 10,000+ HR Professionals</span>
    </div>

  </div>

  {/* RIGHT MOCKUP */}
  <div className="relative group">
    <div className="absolute -inset-1 bg-gradient-to-r from-[#1337ec] to-[#60a5fa] rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000" />

    <div className="relative bg-white dark:bg-[#1a1e35] rounded-3xl border border-[#e7e9f3] dark:border-[#2a2d3d] shadow-2xl overflow-hidden aspect-[4/3]">

      <div className="p-6 h-full flex flex-col gap-4">

        {/* WINDOW HEADER */}
        <div className="flex justify-between items-center pb-4 border-b border-[#f1f5f9] dark:border-[#1f2937]">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-[#f87171]" />
            <div className="w-3 h-3 rounded-full bg-[#facc15]" />
            <div className="w-3 h-3 rounded-full bg-[#4ade80]" />
          </div>
          <div className="h-6 w-32 bg-[#f1f5f9] dark:bg-[#1f2937] rounded" />
        </div>

        {/* DASHBOARD */}
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2 h-40 bg-[#1337ec]/5 rounded-xl border border-[#1337ec]/10 flex items-center justify-center">
              <BarChart className="text-[#1337ec] text-4xl" />
          </div>

          <div className="h-40 bg-[#22c55e]/5 rounded-xl border border-[#22c55e]/10 flex items-center justify-center">
            <CheckCircle className="text-[#22c55e] text-4xl" />
          </div>
        </div>

        {/* TABLE AREA */}
        <div className="flex-1 w-full bg-[#f8fafc] dark:bg-[#1f2937]/50 rounded-xl p-4 flex flex-col gap-2">
          <div className="h-4 w-full bg-[#e5e7eb] dark:bg-[#374151] rounded" />
          <div className="h-4 w-3/4 bg-[#e5e7eb] dark:bg-[#374151] rounded" />

          <div className="mt-4 grid grid-cols-4 gap-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="h-12 bg-white dark:bg-[#1f2937] rounded-lg shadow-sm"
              />
            ))}
          </div>
        </div>

      </div>
    </div>

    {/* FLOATING CARD */}
    <div className="absolute -bottom-6 -left-6 bg-white dark:bg-[#1a1e35] p-4 rounded-2xl shadow-xl border border-[#e7e9f3] dark:border-[#2a2d3d] flex items-center gap-3">
      <div className="size-10 rounded-full bg-[#dbeafe] flex items-center justify-center text-[#1337ec]">
        <Calendar1 />
      </div>
      <div>
        <p className="text-[10px] text-[#4c599a] uppercase font-bold tracking-wider">
          Leave Status
        </p>
        <p className="text-sm font-bold">
          Approved (12)
        </p>
      </div>
    </div>

  </div>
</section>

  )
}

export default HeroSection