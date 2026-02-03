import React from 'react'

const RecentAttendanceShimmer = () => {
  return (
    <tr className="animate-pulse">
  {/* Date */}
  <td className="px-6 py-4">
    <div className="h-4 w-32 rounded bg-gray-200 dark:bg-gray-700"></div>
  </td>

  {/* Status badge */}
  <td className="px-6 py-4">
    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gray-200 dark:bg-gray-700">
      <div className="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-gray-600"></div>
      <div className="h-3 w-14 rounded bg-gray-300 dark:bg-gray-600"></div>
    </div>
  </td>

  {/* Clock In */}
  <td className="px-6 py-4">
    <div className="h-4 w-20 rounded bg-gray-200 dark:bg-gray-700"></div>
  </td>

  {/* Total Working Time */}
  <td className="px-6 py-4">
    <div className="h-4 w-24 rounded bg-gray-200 dark:bg-gray-700"></div>
  </td>
</tr>

  )
}

export default RecentAttendanceShimmer