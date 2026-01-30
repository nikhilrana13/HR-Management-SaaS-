"use client"
import { usePathname } from 'next/navigation'
import React from 'react'

const TableRowShimmer = () => {
     const pathname = usePathname()
  return (
    <tr className="animate-pulse">
  {/* Employee */}
  <td className="px-6 py-4">
    <div className="flex items-center gap-3">
      {/* Avatar */}
      <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700" />

      {/* Name + Role */}
      <div className="flex flex-col gap-1">
        <div className="h-3 w-24 rounded bg-gray-200 dark:bg-gray-700" />
        <div className="h-2.5 w-16 rounded bg-gray-200 dark:bg-gray-700" />
      </div>
    </div>
  </td>

  {/* Leave Type */}
  <td className="px-6 py-4">
    <div className="h-3 w-20 rounded bg-gray-200 dark:bg-gray-700" />
  </td>

  {/* Duration */}
  <td className="px-6 py-4">
    <div className="h-3 w-32 rounded bg-gray-200 dark:bg-gray-700" />
  </td>

  {/* Status */}
  <td className="px-6 py-4">
    <div className="h-5 w-20 rounded-full bg-gray-200 dark:bg-gray-700" />
  </td>
    {
    pathname === "/hr/dashboard/employees" && (
     <td className="px-6 py-4">
    <div className="h-5 w-20 rounded-full bg-gray-200 dark:bg-gray-700" />
    </td>
    )
   }
  {/* Date */}
  <td className="px-6 py-4 text-right">
    <div className="h-3 w-20 ml-auto rounded bg-gray-200 dark:bg-gray-700" />
  </td>
</tr>
  )
}

export default TableRowShimmer