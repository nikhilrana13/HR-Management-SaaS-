import Link from "next/link"
import {
  FaLinkedinIn,
  FaGithub,
  FaTwitter,
} from "react-icons/fa"

const Footer = () => {
  return (
<footer className="bg-[#0a0f1f] text-gray-300 pt-20">
      <div className="max-w-7xl mx-auto px-6">

        {/* TOP GRID */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-16 border-b border-[#1f243d]">

          {/* BRAND */}
          <div>
            <h3 className="text-2xl font-extrabold text-white">
              HR<span className="text-[#1337ec]">Flow</span>
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-gray-400">
              A modern HR Management SaaS to manage employees, attendance,
              leaves and announcements — all in one place.
            </p>
          </div>

          {/* PRODUCT */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase mb-4">
              Product
            </h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="#features" className="hover:text-white">Features</Link></li>
              <li><Link href="#how-it-works" className="hover:text-white">How it works</Link></li>
              <li><Link href="#pricing" className="hover:text-white">Pricing</Link></li>
              <li><Link href="#dashboard" className="hover:text-white">Dashboard</Link></li>
            </ul>
          </div>

          {/* COMPANY */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase mb-4">
              Company
            </h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/about" className="hover:text-white">About</Link></li>
              <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
              <li><Link href="/privacy" className="hover:text-white">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white">Terms of Service</Link></li>
            </ul>
          </div>

          {/* SOCIAL */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase mb-4">
              Connect
            </h4>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#1337ec]/10 text-[#1337ec] hover:bg-[#1337ec] hover:text-white transition"
              >
                <FaLinkedinIn />
              </a>
              <a
                href="#"
                className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#1337ec]/10 text-[#1337ec] hover:bg-[#1337ec] hover:text-white transition"
              >
                <FaGithub />
              </a>
              <a
                href="#"
                className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#1337ec]/10 text-[#1337ec] hover:bg-[#1337ec] hover:text-white transition"
              >
                <FaTwitter />
              </a>
            </div>
          </div>

        </div>

        {/* BOTTOM */}
        <div className="py-6 flex flex-col md:flex-row items-center justify-between text-sm text-gray-500">
          <p>
            © {new Date().getFullYear()} HRFlow. All rights reserved.
          </p>
          <p className="mt-2 md:mt-0">
            Built with ❤️ By Nikhil Nana
          </p>
        </div>

      </div>
    </footer>
  )
}

export default Footer