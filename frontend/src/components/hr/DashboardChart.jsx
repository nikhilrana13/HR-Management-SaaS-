import React from 'react'

const DashboardChart = () => {
  return (
    <div className="bg-white dark:bg-[#1a1d2d] border border-[#e7e9f3] dark:border-[#2a2d3d] rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-bold">Attendance Analytics</h3>
              <p className="text-sm text-[#4c599a] dark:text-gray-400">
                Comparing expected vs actual presence for current month
              </p>

              <div className="mt-6 text-4xl font-bold">90.3%</div>

              <div className="mt-4 h-[240px]">
                <svg viewBox="0 0 1000 240" className="w-full h-full">
                  <path
                    d="M0,180 Q100,160 200,120 T400,140 T600,60 T800,100 T1000,40"
                    fill="none"
                    stroke="#1337ec"
                    strokeWidth="3"
                  />
                </svg>
              </div>
</div>
  )
}

export default DashboardChart