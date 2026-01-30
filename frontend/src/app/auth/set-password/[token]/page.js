import SetPasswordInvitePage from '@/components/common/SetPasswordInvitePage'
import React from 'react'

const page = () => {
  return (
    <div className='min-h-screen flex flex-col bg-[#f6f6f8] dark:bg-[#101322]'>
        {/* header */}
        <header className="flex items-center justify-between border-b border-[#e7e9f3] dark:border-white/10 px-6 py-3 bg-white dark:bg-[#101322]/50">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 text-[#1337ec]">
            <svg viewBox="0 0 48 48" fill="currentColor">
              <path d="M42.1739 20.1739L27.8261 5.82609C29.1366 7.13663 28.3989 10.1876 26.2002 13.7654C24.8538 15.9564 22.9595 18.3449 20.6522 20.6522C18.3449 22.9595 15.9564 24.8538 13.7654 26.2002C10.1876 28.3989 7.13663 29.1366 5.82609 27.8261L20.1739 42.1739C21.4845 43.4845 24.5355 42.7467 28.1133 40.548C30.3042 39.2016 32.6927 37.3073 35 35C37.3073 32.6927 39.2016 30.3042 40.548 28.1133C42.7467 24.5355 43.4845 21.4845 42.1739 20.1739Z" />
            </svg>
          </div>
          <h2 className="text-lg font-bold text-[#0d101b] dark:text-white">
            HR Management SaaS
          </h2>
        </div>
        <button className="h-10 px-4 rounded-lg bg-[#1337ec] text-white text-sm font-bold hover:bg-[#1337ec]/90 transition-colors">
          Support
        </button>
      </header>
      {/* set password form */}
      <SetPasswordInvitePage />
      {/* FOOTER */}
      <footer className="p-6 text-center">
        <p className="text-xs text-[#4c599a] dark:text-gray-500 font-medium">
          © 2026 HR Management SaaS. Secure Enterprise Registration.
        </p>
      </footer>
    </div>
  )
}

export default page