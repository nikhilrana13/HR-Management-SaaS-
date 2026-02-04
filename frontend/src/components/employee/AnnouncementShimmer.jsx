import React from 'react'

const AnnouncementShimmer = () => {
  return (
    <div className="bg-white dark:bg-[#15192b] p-4 rounded-xl border border-[#e7e9f3] dark:border-white/10 shadow-sm animate-pulse">
  {/* NEW POLICY */}
  <div className="h-3 w-20 mb-2 rounded bg-gray-200 dark:bg-gray-700"></div>
  {/* Title */}
  <div className="h-4 w-56 mb-2 rounded bg-gray-200 dark:bg-gray-700"></div>
  {/* Date row */}
  <div className="flex items-center gap-1">
    <div className="h-3 w-3 rounded-full bg-gray-300 dark:bg-gray-600"></div>
    <div className="h-3 w-24 rounded bg-gray-200 dark:bg-gray-700"></div>
  </div>
</div>
  )
}

export default AnnouncementShimmer