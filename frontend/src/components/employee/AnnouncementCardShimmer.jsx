const AnnouncementCardShimmer = () => {
  return (
    <div className="bg-white w-[400px] lg:w-[800px] dark:bg-[#0f172a] p-6 rounded-xl shadow-sm border border-[#e2e8f0]/60 dark:border-[#1e293b] flex flex-col gap-4 animate-pulse">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-1 w-full">
          <div className="flex items-center gap-3">
            {/* Category badge */}
            <div className="h-4 w-20 rounded bg-gray-200 dark:bg-gray-700"></div>
            {/* Date */}
            <div className="h-3 w-24 rounded bg-gray-200 dark:bg-gray-700"></div>
          </div>
          {/* Title */}
          <div className="h-5 w-3/4 mt-2 rounded bg-gray-200 dark:bg-gray-700"></div>
        </div>
      </div>
      {/* Description lines */}
      <div className="space-y-2">
        <div className="h-4 w-full rounded bg-gray-200 dark:bg-gray-700"></div>
        <div className="h-4 w-[95%] rounded bg-gray-200 dark:bg-gray-700"></div>
        <div className="h-4 w-[85%] rounded bg-gray-200 dark:bg-gray-700"></div>
      </div>
    </div>
  );
};

export default AnnouncementCardShimmer;
