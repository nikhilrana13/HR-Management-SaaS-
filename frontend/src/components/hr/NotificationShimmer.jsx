import React from 'react'

const NotificationShimmer = () => {
  return (
    <div className="flex flex-col gap-3 px-3 py-4 animate-pulse">
      {[1, 2, 3, 4].map((_, index) => (
        <div
          key={index}
          className="flex flex-col gap-2 bg-[#F0F7FF] border-b py-6 px-3 rounded-md"
        >
          {/* top row */}
          <div className="flex justify-between items-center">
            <div className="h-4 w-[60%] bg-gray-300 rounded-md"></div>
            <div className="h-3 w-[20%] bg-gray-300 rounded-md"></div>
          </div>

          {/* message */}
          <div className="h-3 w-[90%] bg-gray-300 rounded-md"></div>
          <div className="h-3 w-[70%] bg-gray-300 rounded-md"></div>
        </div>
      ))}
    </div>
  )
}

export default NotificationShimmer