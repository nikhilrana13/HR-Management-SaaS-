"use client"
import { AlertTriangle, Home } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const Notfound = () => {
  return (
    <div className="min-h-screen bg-[#F5F7FA] flex items-center justify-center px-4">
      <div className="max-w-xl text-center bg-white rounded-xl shadow-sm p-10">

        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 flex items-center justify-center rounded-full bg-[#E6F0F8]">
            <AlertTriangle className="w-8 h-8 text-[#0A3D62]" />
          </div>
        </div>

        {/* 404 */}
        <h1 className="text-6xl font-bold text-[#0A3D62]">404</h1>

        {/* Title */}
        <h2 className="mt-3 text-xl font-semibold text-gray-800">
          Page Not Found
        </h2>

        {/* Description */}
        <p className="mt-2 text-sm text-gray-600 leading-relaxed">
          The page you are looking for does not exist or may have been moved.
          Please check the URL or return to the homepage.
        </p>

        {/* Actions */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-md
            bg-[#0A3D62] text-white text-sm font-semibold hover:bg-[#08304e] transition"
          >
            <Home className="w-4 h-4" />
            Go to Home
          </Link>

          <Link
            href="/citizen/register-complaint"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-md
            border border-[#0A3D62] text-[#0A3D62] text-sm font-semibold
            hover:bg-[#E6F0F8] transition"
          >
            Report an Issue
          </Link>
        </div>

        {/* Footer Note */}
        <p className="mt-6 text-xs text-gray-400">
          © {new Date().getFullYear()}HRFlow. All rights reserved.
        </p>
      </div>
    </div>
  )
}

export default Notfound