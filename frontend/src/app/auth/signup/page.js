"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { ThreeDots } from "react-loader-spinner";

const page = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [Errors, setErrors] = useState({});
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/;
  const router = useRouter();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
    // remove error on type
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };
  const validation = () => {
    let newErrors = {};
    if (!input.name.trim()) {
      newErrors.name = "Name is Required";
    }
    if (!emailRegex.test(input.email)) {
      newErrors.email = "Please Enter a valid email address";
    }
    if (!passwordRegex.test(input.password)) {
      newErrors.password =
        "Password must contain letters and numbers (minimum 6 characters).";
    }
    if (!termsAccepted) {
      newErrors.terms =
        "You must agree to the Terms of Service and Privacy Policy";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validation()) return;
    const data = {
      name: input.name,
      email: input.email,
      password: input.password,
    };
    // console.log("data",data)
    try {
      setLoading(true);
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/register`,data,);
      if (response.data.status === "success") {
        toast.success(response?.data?.message);
        setInput({
          name: "",
          email: "",
          password: "",
        });
        router.replace("/auth/login");
      }
    } catch (error) {
      console.error("failed to sign up hr", error);
      return toast.error(error?.response?.data?.message || "Internal server error",);
    } finally {
      setLoading(false)
    }
  };
  return (
    <div className="min-h-screen flex flex-col bg-[#f6f6f8] dark:bg-[#101322] ">
      {/* HEADER */}
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

      {/* MAIN */}
      <main className="flex-grow flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-[520px] bg-white dark:bg-[#101322] border border-[#e7e9f3] dark:border-white/10 rounded-xl shadow-xl p-8">
          <div className="flex justify-center mb-6">
            <div className="w-12 h-12 rounded-full bg-[#1337ec]/10 flex items-center justify-center text-[#1337ec] text-3xl">
              👤
            </div>
          </div>
          <div className="text-center mb-8">
            <h1 className="text-[32px] font-bold text-[#0d101b] dark:text-white">
              Create Your Account
            </h1>
            <p className="text-[#4c599a] dark:text-gray-400 pt-2">
              Join our platform to streamline your HR operations.
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* FULL NAME */}
            <div className="flex flex-col gap-2">
              <p className="text-sm font-semibold text-[#0d101b] dark:text-white">
                Full Name
              </p>
              <input
                type="text"
                name="name"
                value={input.name}
                onChange={handleInputChange}
                placeholder="e.g. John Doe"
                className="h-14 px-4 rounded-lg border border-[#cfd3e7] dark:border-white/10 bg-white dark:bg-[#1a1d2e] text-[#0d101b] dark:text-white placeholder:text-[#4c599a] dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#1337ec]/20 transition-all"
              />
            </div>
            {Errors.name && (
              <p className="text-red-500 mt-1 text-[0.75rem]">{Errors.name}</p>
            )}
            {/* EMAIL */}
            <div className="flex flex-col gap-2">
              <p className="text-sm font-semibold text-[#0d101b] dark:text-white">
                Work Email
              </p>
              <input
                type="email"
                name="email"
                value={input.email}
                onChange={handleInputChange}
                placeholder="admin@company.com"
                className="h-14 px-4 rounded-lg border border-[#cfd3e7] dark:border-white/10 bg-white dark:bg-[#1a1d2e] text-[#0d101b] dark:text-white placeholder:text-[#4c599a] dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#1337ec]/20 transition-all"
              />
            </div>
            {Errors.email && (
              <p className="text-red-500 mt-1 text-[0.75rem]">{Errors.email}</p>
            )}
            {/* PASSWORD */}
            <div className="flex flex-col gap-2">
              <p className="text-sm font-semibold text-[#0d101b] dark:text-white">
                Password
              </p>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={input.password}
                  onChange={handleInputChange}
                  placeholder="At least 8 characters"
                  className="h-14 w-full px-4 pr-12 rounded-lg border border-[#cfd3e7] dark:border-white/10 bg-white dark:bg-[#1a1d2e] text-[#0d101b] dark:text-white placeholder:text-[#4c599a] dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#1337ec]/20 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#4c599a] dark:text-gray-400 hover:text-[#1337ec]"
                >
                  👁
                </button>
              </div>
            </div>
            {Errors.password && (
              <p className="text-red-500 mt-1 text-[0.75rem]">
                {Errors.password}
              </p>
            )}
            {/* TERMS */}
            <div className="flex items-start gap-3 pt-1">
              <input
                type="checkbox"
                checked={termsAccepted}
                onChange={(e) => {
                  setTermsAccepted(e.target.checked);
                  setErrors((prev) => ({ ...prev, terms: "" }));
                }}
                className="mt-1 w-4 h-4"
              />
              <p className="text-sm text-[#4c599a] dark:text-gray-400">
                I agree to the{" "}
                <Link href="#" className="text-[#1337ec] font-semibold">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="#" className="text-[#1337ec] font-semibold">
                  Privacy Policy
                </Link>
                .
              </p>
            </div>
            {Errors.terms && (
              <p className="text-red-500 mt-1 text-[0.75rem]">{Errors.terms}</p>
            )}
            {/* BUTTON */}
            <button
              type="submit"
              className="w-full h-14 bg-[#1337ec] text-white rounded-lg font-bold text-base hover:bg-[#1337ec]/90 focus:ring-4 focus:ring-[#1337ec]/30 transition-all flex items-center justify-center gap-2"
            >
              {loading ? (
                <ThreeDots
                  visible={true}
                  height="40"
                  width="40"
                  color="#ffffff"
                  radius="9"
                  ariaLabel="three-dots-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                />
              ) : (
                "Sign Up →"
              )}
            </button>
          </form>
          <div className="mt-10 border-t border-[#e7e9f3] dark:border-white/10 pt-6 text-center">
            <p className="text-sm text-[#4c599a] dark:text-gray-400">
              Already have an account?{" "}
              <Link
                href="/auth/login"
                className="text-[#1337ec] font-bold hover:underline"
              >
                Log In
              </Link>
            </p>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="p-6 text-center">
        <p className="text-xs text-[#4c599a] dark:text-gray-500 font-medium">
          © 2024 HR Management SaaS. Secure Enterprise Registration.
        </p>
      </footer>
    </div>
  );
};

export default page;
