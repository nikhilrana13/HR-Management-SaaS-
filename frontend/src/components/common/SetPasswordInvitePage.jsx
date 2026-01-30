"use client";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { set, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaArrowRight } from "react-icons/fa";
import { MdCelebration } from "react-icons/md";
import { ThreeDots } from "react-loader-spinner";

const SetPasswordInvitePage = () => {
    const {register,handleSubmit,formState:{errors}} = useForm()
    const [loading,setLoading] = useState(false)
    const {token} = useParams()
    const router = useRouter() 

    const onSubmit = async(data)=>{
        if(data.password !== data.confirmPassword){
            return toast.error("Passwords do not match")
        }
        // console.log("data",data) 
        try {
            setLoading(true)
            const response = await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/employee/set-password`,{
                token:token,
                password:data.password
            })
            if(response?.data?.status === "success"){
                toast.success(response?.data?.message)
                router.push("/auth/login")
            }
        } catch (error) {
          toast.error(error?.response?.data?.message || "Invalid or expired link")
        }finally{
          setLoading(false)
        }
    }
  return (
    <main className="flex-1 flex items-center justify-center p-6 sm:p-12">
      <div className="w-full max-w-[540px] bg-white dark:bg-gray-900 rounded-xl shadow-xl border border-gray-100 dark:border-gray-800 p-8 sm:p-12">
        
        {/* HEADER */}
        <div className="flex flex-col items-center text-center mb-10">
          <div className="w-16 h-16 bg-[#1337ec]/10 dark:bg-[#1337ec]/20 rounded-full flex items-center justify-center mb-6">
            <span className="text-[#1337ec] text-3xl">
              <MdCelebration />
            </span>
          </div>
          <h1 className="text-[#0d101b] dark:text-white tracking-tight text-3xl font-bold leading-tight pb-2">
            Welcome
          </h1>

          <p className="text-gray-600 dark:text-gray-400 text-base font-normal leading-relaxed max-w-sm">
            HR has invited you to join the team. Let&apos;s finish
            setting up your account.
          </p>
        </div>
        {/* FORM */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex flex-col gap-4">
            {/* PASSWORDS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label className="flex flex-col">
                <p className="text-[#0d101b] dark:text-gray-200 text-sm font-semibold leading-normal pb-2">
                  Create Password
                </p>
                <input
                  type="password"
                  name="password"
                  {...register("password",{required:true,minLength:6})}
                  placeholder="••••••••"
                  className="w-full rounded-lg text-[#0d101b] dark:text-white focus:outline-0 focus:ring-2 focus:ring-[#1337ec]/20 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:border-[#1337ec] h-12 px-4 text-base font-normal"
                />
                {
                 errors.password && (
                    <p className="text-xs text-red-500 mt-1"> Password must be at least 6 characters
                    </p>
                 )
                }
              </label>
              <label className="flex flex-col">
                <p className="text-[#0d101b] dark:text-gray-200 text-sm font-semibold leading-normal pb-2">
                  Confirm Password
                </p>
                <input
                  type="password"
                  name="confirmPassword"
                  {...register("confirmPassword",{required:true})}
                  placeholder="••••••••"
                  className="w-full rounded-lg text-[#0d101b] dark:text-white focus:outline-0 focus:ring-2 focus:ring-[#1337ec]/20 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:border-[#1337ec] h-12 px-4 text-base font-normal"
                />
                  {
                 errors.confirmPassword && (
                    <p className="text-xs text-red-500 mt-1"> Password must be at least 6 characters
                    </p>
                 )
                }
              </label>
            </div>
          </div>

          {/* SUBMIT */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full bg-[#1337ec] hover:bg-[#1337ec]/90 text-white font-bold py-4 px-6 rounded-lg transition duration-200 flex items-center cursor-pointer justify-center gap-2 shadow-lg shadow-[#1337ec]/20"
            > 
             {
                loading  ? (
                     <ThreeDots
                                visible={true}
                                height="25"
                                width="25"
                                color="#ffffff"
                                radius="9"
                                ariaLabel="three-dots-loading"
                                wrapperStyle={{}}
                                wrapperClass=""
                              />
                ):(
                    <>
                <span>Join Your Team</span>
              <FaArrowRight />
                    </>
                )
             } 
            </button>
          </div>
        </form>
        {/* FOOTER */}
        <div className="mt-8 text-center">
          <p className="text-xs text-gray-500 dark:text-gray-500">
            By clicking &quot;Join Your Team&quot;, you agree to our{" "}
            <a href="#" className="text-[#1337ec] hover:underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-[#1337ec] hover:underline">
              Privacy Policy
            </a>.
          </p>
        </div>

      </div>
    </main>
  );
};

export default SetPasswordInvitePage;
