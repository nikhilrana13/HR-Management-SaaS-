import React from 'react'

const StatsCard = ({title,iconBg,iconColor,value,Icon}) => {
  return (
     <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition"
              >
                {/* Top */}
                <div className="flex items-center justify-between">
                  <p className="text-sm text-[#4c599a] dark:text-gray-400  font-medium">
                    {title}
                  </p>
                  <div
                    className={`w-9 h-9 flex items-center justify-center rounded-lg ${iconBg}`}
                  >
                    <Icon className={`w-5 h-5 ${iconColor}`} />
                  </div>
                </div>
                {/* Value */}
                <h2 className="text-3xl font-bold text-gray-900 mt-4">
                  {value}
                </h2>
      </div>
  )
}

export default StatsCard