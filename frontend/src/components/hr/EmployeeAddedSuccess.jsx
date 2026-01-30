"use client"
import React, { useState } from 'react'
import { FaCopy, FaRegCheckCircle, FaRegCopy } from 'react-icons/fa';

const EmployeeAddedSuccess = ({onDone,inviteLink}) => {
// const inviteLink = "app.hrsaas.com/invite/sj-9182-kx0";
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(inviteLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-8 flex flex-col items-center text-center">
      {/* ICON */}
      <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-6">
        <span className=" text-green-600 dark:text-green-400 text-4xl leading-none">
          <FaRegCheckCircle />
        </span>
      </div>

      {/* TITLE */}
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
        Employee added successfully!
      </h3>

      {/* DESCRIPTION */}
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-8 px-4">
        You&apos;ve successfully added Employee. Share the unique invitation
        link below to complete their onboarding.
      </p>

      {/* INVITE LINK BOX */}
      <div className="w-full bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl p-4 mb-8">
        <div className="flex flex-col gap-1 text-left mb-3">
          <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">
            Invitation Link
          </span>
          <p className="text-sm font-medium text-[#1337ec] dark:text-blue-400 break-all">
            {inviteLink}
          </p>
        </div>

        <button
          onClick={handleCopy}
          className="w-full flex items-center justify-center gap-2 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 border border-gray-200 dark:border-gray-600 px-4 py-2 rounded-lg text-sm font-semibold text-gray-700 dark:text-gray-200 transition-all shadow-sm"
        >
          <span className="text-lg">
            {copied ? <FaCopy /> : <FaRegCopy />}
          </span>
          <span>{copied ? "Copied" : "Copy Link"}</span>
        </button>
      </div>

      {/* DONE */}
      <button
        onClick={onDone}
        className="w-full bg-[#1337ec] cursor-pointer hover:bg-[#1337ec]/90 text-white py-3 rounded-xl text-sm font-semibold transition-all shadow-lg shadow-[#1337ec]/20"
      >
        Done
      </button>

    </div>
  )
}

export default EmployeeAddedSuccess