"use client"

import {
  MdPersonAddAlt1,
  MdApartment,
  MdPeopleAlt,
  MdChecklist,
} from "react-icons/md"

const steps = [
  {
    step: "01",
    icon: <MdPersonAddAlt1 size={28} />,
    title: "HR Signup & Company Setup",
    desc: "HR creates an account and sets up the company with basic details and departments.",
  },
  {
    step: "02",
    icon: <MdPeopleAlt size={28} />,
    title: "Add Employees & Departments",
    desc: "Invite employees, assign departments and manage access with full control.",
  },
  {
    step: "03",
    icon: <MdChecklist size={28} />,
    title: "Track Attendance & Leaves",
    desc: "Employees check-in daily, apply for leaves and HR manages approvals easily.",
  },
]

const HowItWorks = () => {
  return (
    <section className="relative bg-[#f8f9fc] dark:bg-[#0a0f1f] py-24">
      <div className="max-w-7xl mx-auto px-6">

        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="inline-block mb-3 px-4 py-1.5 rounded-full bg-[#1337ec]/10 text-[#1337ec] font-bold text-sm">
            HOW IT WORKS
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0d101b] dark:text-white">
            Simple Setup.  
            <span className="text-[#1337ec]"> Powerful Results.</span>
          </h2>
          <p className="mt-4 text-gray-600 dark:text-gray-400 text-lg">
            Get started in minutes and manage your entire workforce with ease.
          </p>
        </div>

        {/* STEPS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {steps.map((item, index) => (
            <div
              key={index}
              className="relative bg-white dark:bg-[#0f172a] border border-[#e7e9f3] dark:border-[#1f243d] rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all"
            >
              {/* STEP NUMBER */}
              <div className="absolute -top-6 left-6 bg-[#1337ec] text-white text-sm font-extrabold px-4 py-1 rounded-full">
                Step {item.step}
              </div>

              {/* ICON */}
              <div className="w-14 h-14 rounded-xl bg-[#1337ec]/10 text-[#1337ec] flex items-center justify-center mb-6">
                {item.icon}
              </div>

              {/* CONTENT */}
              <h3 className="text-xl font-bold text-[#0d101b] dark:text-white mb-3">
                {item.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default HowItWorks
