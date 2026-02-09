"use client"

import {
  MdPeople,
  MdOutlineAccessTime,
  MdEventAvailable,
  MdNotificationsActive,
  MdSecurity,
  MdDashboard,
} from "react-icons/md"




const features = [
  {
    icon: <MdPeople size={26} />,
    title: "Employee Management",
    desc: "Add, manage and organize employees by departments with role-based access control.",
  },
  {
    icon: <MdOutlineAccessTime size={26} />,
    title: "Smart Attendance",
    desc: "Real-time check-in & check-out with auto absent & half-day logic built-in.",
  },
  {
    icon: <MdEventAvailable size={26} />,
    title: "Leave Management",
    desc: "Employees request leaves, HR approves or rejects with full tracking.",
  },
  {
    icon: <MdNotificationsActive size={26} />,
    title: "Instant Notifications",
    desc: "Live notifications for announcements, leaves, and important updates.",
  },
  {
    icon: <MdDashboard size={26} />,
    title: "Powerful HR Dashboard",
    desc: "Daily attendance stats, employee overview, and actionable insights.",
  },
  {
    icon: <MdSecurity size={26} />,
    title: "Secure & Role Based",
    desc: "Separate access for HR and Employees with secure authentication.",
  },
]
const WhyChooseUs = () => {
  return (
     <section className="bg-white dark:bg-[#0b1023] py-24">
      <div className="max-w-7xl mx-auto px-6">

        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block mb-3 px-4 py-1.5 rounded-full bg-[#1337ec]/10 text-[#1337ec] font-bold text-sm">
            WHY CHOOSE US
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0d101b] dark:text-white">
            Everything HR Needs,  
            <span className="text-[#1337ec]"> One Smart Platform</span>
          </h2>
          <p className="mt-4 text-gray-600 dark:text-gray-400 text-lg">
            Designed for startups, growing teams, and enterprises to simplify HR operations.
          </p>
        </div>

        {/* FEATURES GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group rounded-2xl border border-[#e7e9f3] dark:border-[#1f243d] bg-white dark:bg-[#0f172a] p-8 transition-all hover:shadow-xl hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-xl bg-[#1337ec]/10 text-[#1337ec] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-lg font-bold text-[#0d101b] dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default WhyChooseUs