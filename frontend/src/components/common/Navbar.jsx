"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { HiMenuAlt3, HiX } from 'react-icons/hi'
import { useSelector } from 'react-redux'

const Navbar = () => {
    const user = useSelector((state) => state.Auth.user)
    const [open, setOpen] = useState(false)
    const pathname = usePathname()

    const navLinkClass = (path) => {
        return `font-medium text-[#131313]  relative pb-1 ${pathname === path
            ? "after:content-[''] after:absolute after:transition-all after:duration-300 after:left-0 after:-bottom-1 after:w-full after:h-[3px] after:bg-[#1337ec]"
            : ""
            }`
    }
    return (
        <>
            <nav className='w-full flex items-center  bg-[#ffffff]  justify-between px-8 py-4 md:px-24 shadow-md'>
                {/* logo */}
                <div className="flex items-center gap-4">
                    <div className="w-8 h-8 text-[#1337ec]">
                        <svg viewBox="0 0 48 48" fill="currentColor">
                            <path d="M42.1739 20.1739L27.8261 5.82609C29.1366 7.13663 28.3989 10.1876 26.2002 13.7654C24.8538 15.9564 22.9595 18.3449 20.6522 20.6522C18.3449 22.9595 15.9564 24.8538 13.7654 26.2002C10.1876 28.3989 7.13663 29.1366 5.82609 27.8261L20.1739 42.1739C21.4845 43.4845 24.5355 42.7467 28.1133 40.548C30.3042 39.2016 32.6927 37.3073 35 35C37.3073 32.6927 39.2016 30.3042 40.548 28.1133C42.7467 24.5355 43.4845 21.4845 42.1739 20.1739Z" />
                        </svg>
                    </div>
                    <h2 className="text-lg hidden sm:flex font-bold text-[#0d101b] dark:text-white">
                        HR Management SaaS
                    </h2>
                </div>
                {/* ul links */}
                <ul className="hidden xl:flex gap-10 p-2 items-center ">
                    <li>
                        <Link href="/" className={navLinkClass("/")}>Home</Link>
                    </li>
                    <li>
                        <Link href="/about" className={navLinkClass("/about")}>About</Link>
                    </li>
                    <li><Link href="/contact" className={navLinkClass("/contact")}>Contact</Link></li>
                </ul>
                {/*Login Buttons */}
                <div className=' hidden xl:flex gap-3'>
                    {!user && (
                        <Link
                            href="/auth/signup"
                            className="px-5 text-sm py-2 hover:bg-indigo-700 hover:text-white font-medium border border-gray-300 rounded-md text-white bg-[#1337ec]"
                        >
                            Get started
                        </Link>
                    )}
                    {user?.role === "hr" && (
                        <Link
                            href="/hr/dashboard"
                            className="px-5 text-sm py-2 hover:bg-indigo-700 hover:text-white font-medium border border-gray-300 rounded-md text-white bg-[#1337ec]"
                        >
                            Dashboard
                        </Link>
                    )}
                    {user?.role === "employee" && (
                        <Link
                            href="/employee/dashboard"
                            className="px-5 text-sm py-2 hover:bg-indigo-700 hover:text-white font-medium border border-gray-300 rounded-md text-white bg-[#1337ec] "
                        >
                            Dashboard
                        </Link>
                    )}
                </div>
                {/* mobile menu button */}
                <button onClick={() => setOpen(!open)} className='xl:hidden text-2xl text-[#18486B]'>
                    {open ? <HiX /> : <HiMenuAlt3 />}
                </button>
            </nav>
            {/* mobile menu */}
            {
                open && (
                    <div className='xl:hidden transition-all duration-300 w-full px-8 py-4 md:px-24 mt-4 flex flex-col gap-4 shadow-md gap bg-white '>
                        <ul className='flex flex-col  gap-4'>
                            <li>
                                <Link href="/" className="font-medium text-[#131313]  relative pb-1">Home</Link>
                            </li>
                            <li>
                                <Link href="/about" className="font-medium text-[#131313]  relative pb-1">About</Link>
                            </li>
                            <li>
                                <Link href="/contact" className="font-medium text-[#131313]  relative pb-1">Contact</Link>
                            </li>
                        </ul>
                        <div className='flex  gap-3'>
                            {!user && (
                                <Link
                                    href="/auth/login"
                                    className="px-5 text-sm py-2 hover:bg-indigo-700 hover:text-white font-medium border border-gray-300 rounded-md text-white bg-[#1337ec]"
                                >
                                    Login
                                </Link>
                            )}
                            {user?.role === "hr" && (
                                <Link
                                    href="/hr/dashboard"
                                    className="px-5 text-sm py-2 hover:bg-[#06263D] hover:text-white font-medium border border-gray-300 rounded-md text-[#06263D]"
                                >
                                    Dashboard
                                </Link>
                            )}
                            {user?.role === "/employee/dashboard" && (
                                <Link
                                    href="/mcadmin/dashboard"
                                    className="px-5 text-sm py-2 hover:bg-[#06263D] hover:text-white font-medium border border-gray-300 rounded-md text-[#06263D]"
                                >
                                    Dashboard
                                </Link>
                            )}
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default Navbar