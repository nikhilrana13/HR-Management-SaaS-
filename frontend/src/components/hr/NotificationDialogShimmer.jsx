import React from 'react'

const NotificationDialogShimmer = () => {
    return (
    <div className="flex gap-4 px-4 py-4 animate-pulse">
    <div className="size-11 rounded-lg bg-gray-200 dark:bg-gray-700 shrink-0" />
    <div className="flex flex-col flex-1 gap-2">
      <div className="flex justify-between items-start gap-3">
        <div className="h-3 w-40 rounded bg-gray-200 dark:bg-gray-700" />
        <div className="h-2 w-14 rounded bg-gray-200 dark:bg-gray-700" />
      </div>
      <div className="h-2 w-full rounded bg-gray-200 dark:bg-gray-700" />
      <div className="h-2 w-4/5 rounded bg-gray-200 dark:bg-gray-700" />
    </div>
  </div>
  )
}

export default NotificationDialogShimmer