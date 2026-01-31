"use client"
import React from 'react'
import { FaUserGroup } from 'react-icons/fa6';
import { MdAccountTree } from 'react-icons/md';

const DepartmentStats = ({departments,employees}) => {

    const statsData = [
  {
    id: 1,
    title: "Total Departments",
    value: departments || 0,
    icon: MdAccountTree,
    iconBg: "bg-blue-50 dark:bg-blue-900/30",
    iconColor: "text-[#1337ec]",
  },
  {
    id: 2,
    title: "Total Employees",
    value: employees || 0,
    icon:FaUserGroup,
    iconBg: "bg-green-50 dark:bg-green-900/30",
    iconColor: "text-green-600",
  },
];

  return (
    <div className="grid mt-4 grid-cols-1 md:grid-cols-3 gap-4">
      {statsData.map((item) => {
        const Icon = item.icon
        return (
          <div
            key={item.id}
            className="flex flex-col gap-2 rounded-xl p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm"
          >
            <div className="flex items-center gap-3">
              <div
                className={`p-2 rounded-lg ${item.iconBg} ${item.iconColor}`}
              >
                <Icon className="text-xl" />
              </div>
              <p className="text-gray-500 dark:text-gray-400 text-sm font-medium uppercase tracking-wider">
                {item.title}
              </p>
            </div>

            <p className="text-slate-900 dark:text-white text-3xl font-bold mt-1">
              {item.value}
            </p>
          </div>
        )
      })}
    </div>
  )
}

export default DepartmentStats