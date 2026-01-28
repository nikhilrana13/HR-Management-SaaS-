"use client"
import React from 'react'
import { BiBuildingHouse, BiPhone } from 'react-icons/bi'
import { FaLocationDot } from 'react-icons/fa6'
import { MdEmail } from 'react-icons/md'

const CreateCompanyForm = () => {
    return (
        <div className="min-h-screen flex flex-col bg-[#f6f6f8] dark:bg-[#101322]">
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
                <span className='text-sm text-gray-500 font-medium dark:text-gray-400 tracking-wider'>HR ONBOARDING</span>
            </header>
            <main className="flex-grow flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-[540px]">
                    {/* PROGRESS */}
                    <div className="mb-10">
                        <div className="flex justify-between items-end mb-3">
                            <div>
                                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    Create Your Company
                                </h2>
                            </div>
                            <span className="text-xs font-bold text-[#1337ec] bg-[#1337ec]/10 px-2 py-1 rounded">
                                100% COMPLETE
                            </span>
                        </div>
                        <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                            Tell us about your organization to get started with your new HR
                            management suite.
                        </p>
                    </div>
                    {/* FORM CARD */}
                    <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl shadow-xl p-8 md:p-10">
                        <form className="space-y-6">
                            {/* COMPANY NAME */}
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                                    Company Name <span className="text-red-500">*</span>
                                </label>
                                <div className="relative group">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#1337ec] transition-colors  ">
                                        <BiBuildingHouse className='text-current' />
                                    </span>
                                    <input
                                        type="text"
                                        required
                                        placeholder="e.g. Acme Corp"
                                        className="block w-full pl-11 pr-4 py-3.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-[#1337ec]/20 focus:border-[#1337ec] transition-all duration-200 resize-none"
                                    />
                                </div>
                            </div>

                            {/* EMAIL */}
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                                    Company Email <span className="text-red-500">*</span>
                                </label>
                                <div className="relative group">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#1337ec] transition-colors">
                                        <MdEmail className='text-current' />
                                    </span>
                                    <input
                                        type="email"
                                        required
                                        placeholder="hr@company.com"
                                        className="w-full pl-11 pr-4 py-3.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-[#1337ec]/20 focus:border-[#1337ec]"
                                    />
                                </div>
                            </div>
                            {/* PHONE */}
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                                    Phone Number <span className="text-red-500">*</span>
                                </label>
                                <div className="relative group">
                                    <span className="absolute left-4  top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#1337ec] transition-colors">
                                        <BiPhone className='text-current' />
                                    </span>
                                    <input
                                        type="tel"
                                        required
                                        placeholder="+1 (555) 000-0000"
                                        className="w-full pl-11 pr-4 py-3.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-[#1337ec]/20 focus:border-[#1337ec]"
                                    />
                                </div>
                            </div>

                            {/* ADDRESS */}
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                                    Company Address <span className="text-red-500">*</span>
                                </label>
                                <div className="relative group">
                                    <span className="absolute left-4 group-focus-within:text-[#1337ec] transition-colors top-4 text-gray-400">
                                        <FaLocationDot className='text-current' />
                                    </span>
                                    <textarea
                                        rows={4}
                                        required
                                        placeholder="Enter full physical address"
                                        className="w-full pl-11 pr-4 py-3.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-[#1337ec]/20 focus:border-[#1337ec] resize-none"
                                    />
                                </div>
                            </div>

                            {/* BUTTON */}
                            <button
                                type="submit"
                                className="w-full bg-[#1337ec] hover:bg-[#1337ec]/90 text-white font-bold py-4 rounded-lg shadow-lg shadow-[#1337ec]/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                            >
                                Create Company →
                            </button>
                        </form>
                    </div>

                    {/* FOOTER TEXT */}
                    <p className="mt-8 text-center text-xs text-gray-400 dark:text-gray-600">
                        Secure enterprise-grade data encryption. By continuing, you agree to
                        our Terms of Service.
                    </p>
                </div>
            </main>
        </div>
    )
}

export default CreateCompanyForm