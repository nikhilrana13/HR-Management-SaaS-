import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Aboutpage = () => {
  return (
     <main className="w-full bg-[#f8fafc] text-[#0d101b]">
      {/* ================= HERO SECTION ================= */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <span className="inline-block mb-4 px-4 py-1 rounded-full text-sm font-semibold bg-[#1337ec]/10 text-[#1337ec]">
            About HRFlow
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6">
            HR software built <br className="hidden md:block" />
            for modern teams
          </h1>
          <p className="text-lg text-[#4c599a] max-w-xl mb-8">
            HRFlow is a modern HR management platform designed to simplify
            attendance, leave tracking, and employee workflows — all in one
            secure and scalable system.
          </p>
          <button className="px-6 h-12 rounded-lg bg-[#1337ec] text-white font-bold hover:bg-[#1337ec]/90 transition">
            Explore Features
          </button>
        </div>

        <div className="relative w-full h-[260px] sm:h-[340px] md:h-[400px] lg:h-[440px] rounded-xl overflow-hidden">
          <Image src="/hrdashboard.png" fill priority alt='dashboard image' />
        </div>
      </section>

      {/* ================= MISSION ================= */}
      <section className="max-w-4xl mx-auto px-6 py-16 text-center">
        <div className="bg-white rounded-2xl border border-[#e7e9f3] shadow-sm p-10">
          <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
          <p className="text-[#4c599a] leading-relaxed">
            To simplify HR operations by building an intuitive, reliable, and
            scalable platform that empowers HR teams and enhances employee
            experience.
          </p>
        </div>
      </section>

      {/* ================= PROBLEMS ================= */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-center mb-12">
          Problems We Solve
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Manual HR Processes",
              desc: "Reduce paperwork and repetitive HR tasks with automation.",
            },
            {
              title: "Delayed Approvals",
              desc: "Faster leave approvals with real-time notifications.",
            },
            {
              title: "Lack of Visibility",
              desc: "Clear insights into attendance and employee activity.",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl border border-[#e7e9f3] p-6 shadow-sm hover:shadow-md transition"
            >
              <h3 className="text-lg font-bold mb-2">{item.title}</h3>
              <p className="text-[#4c599a]">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-bold mb-6">What HRFlow Offers</h2>
          <ul className="space-y-4 text-[#4c599a]">
            {[
              "Employee & Department Management",
              "Attendance Tracking (Check-In / Check-Out)",
              "Leave Request & Approval Workflow",
              "Company Announcements",
              "Real-Time Notifications",
            ].map((feature, idx) => (
              <li key={idx} className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-[#1337ec]" />
                {feature}
              </li>
            ))}
          </ul>
        </div>
 
        <div className="relative w-full h-[260px] sm:h-[340px] md:h-[400px] lg:h-[440px] rounded-xl overflow-hidden">
          <Image src="/hrdashboard.png" fill priority alt='dashboard image' />
        </div>
      </section>
      {/* ================= HR vs EMPLOYEE ================= */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl border border-[#e7e9f3] p-8 shadow-sm">
            <h3 className="text-xl font-bold mb-4">For HR Teams</h3>
            <ul className="space-y-2 text-[#4c599a]">
              <li>✔ Manage employees & departments</li>
              <li>✔ Approve or reject leave requests</li>
              <li>✔ Monitor attendance & activity</li>
            </ul>
          </div>

          <div className="bg-white rounded-xl border border-[#e7e9f3] p-8 shadow-sm">
            <h3 className="text-xl font-bold mb-4">For Employees</h3>
            <ul className="space-y-2 text-[#4c599a]">
              <li>✔ Mark daily attendance</li>
              <li>✔ Apply for leaves easily</li>
              <li>✔ Receive instant updates</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ================= TECH STACK ================= */}
      <section className="max-w-6xl mx-auto px-6 py-16 text-center">
        <h2 className="text-2xl font-bold mb-8">Powered By Modern Tech</h2>
        <div className="flex flex-wrap justify-center gap-4">
          {[
            "Next.js",
            "Node.js",
            "MongoDB",
            "Socket.IO",
            "JWT",
            "Tailwind CSS",
          ].map((tech) => (
            <span
              key={tech}
              className="px-4 py-2 rounded-full border border-[#e7e9f3] bg-white text-sm font-semibold text-[#4c599a]"
            >
              {tech}
            </span>
          ))}
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="bg-[#1337ec] text-white py-20 text-center">
        <h2 className="text-3xl font-extrabold mb-4">
          Built to grow with your team
        </h2>
        <p className="text-white/80 max-w-xl mx-auto mb-8">
          HRFlow scales effortlessly from small teams to growing organizations.
        </p>
        <Link href="/auth/signup" className="px-8 h-12 py-3 rounded-lg bg-white text-[#1337ec] font-bold hover:bg-white/90 transition">
          Get Started
        </Link>
      </section>
    </main>
  )
}

export default Aboutpage