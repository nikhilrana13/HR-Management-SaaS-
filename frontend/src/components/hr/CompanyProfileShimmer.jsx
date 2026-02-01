import React from 'react'

const CompanyProfileShimmer = () => {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-[#e7e9f3] dark:border-gray-800 overflow-hidden animate-in fade-in duration-300">
      {/* HEADER SHIMMER */}
      <div className="p-6 border-b border-[#e7e9f3] dark:border-gray-800 flex justify-between items-center bg-[#f8f9fc] dark:bg-gray-800/50">
        <div className="space-y-2">
          <div className="h-5 w-48 rounded bg-gray-200 dark:bg-gray-700 animate-pulse" />
          <div className="h-3 w-72 rounded bg-gray-200 dark:bg-gray-700 animate-pulse" />
        </div>
        <div className="h-9 w-28 rounded-lg bg-gray-200 dark:bg-gray-700 animate-pulse" />
      </div>
      {/* CONTENT */}
      <div className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* LOGO SHIMMER */}
          <div>
            <div className="h-4 w-28 mb-4 rounded bg-gray-200 dark:bg-gray-700 animate-pulse" />

            <div className="w-40 h-40 rounded-full border-2 border-dashed border-gray-300 dark:border-gray-600 bg-gray-200 dark:bg-gray-700 animate-pulse" />

            <div className="h-3 w-40 mt-3 rounded bg-gray-200 dark:bg-gray-700 animate-pulse" />
          </div>
          {/* FORM SHIMMER */}
          <div className="md:col-span-2 space-y-5">
            {/* ROW 1 */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="h-3 w-28 rounded bg-gray-200 dark:bg-gray-700 animate-pulse" />
                <div className="h-10 w-full rounded-lg bg-gray-200 dark:bg-gray-700 animate-pulse" />
              </div>
              <div className="space-y-2">
                <div className="h-3 w-24 rounded bg-gray-200 dark:bg-gray-700 animate-pulse" />
                <div className="h-10 w-full rounded-lg bg-gray-200 dark:bg-gray-700 animate-pulse" />
              </div>
            </div>

            {/* ROW 2 */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="h-3 w-32 rounded bg-gray-200 dark:bg-gray-700 animate-pulse" />
                <div className="h-10 w-full rounded-lg bg-gray-200 dark:bg-gray-700 animate-pulse" />
              </div>

              <div className="space-y-2">
                <div className="h-3 w-20 rounded bg-gray-200 dark:bg-gray-700 animate-pulse" />
                <div className="h-10 w-full rounded-lg bg-gray-200 dark:bg-gray-700 animate-pulse" />
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default CompanyProfileShimmer