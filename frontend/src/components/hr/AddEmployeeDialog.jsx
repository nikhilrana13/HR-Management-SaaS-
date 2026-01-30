"use client";
import { Users2 } from "lucide-react";
import { useState } from "react";
import { IoMdClose, IoMdSend } from "react-icons/io";
import EmployeeAddedSuccess from "./EmployeeAddedSuccess";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { ThreeDots } from "react-loader-spinner";

const AddEmployeeDialog = () => {
  const [open, setOpen] = useState(false);
  const [inviteLink,setInviteLink] = useState("")
  const [Step,setStep] = useState(1)
  const {register,handleSubmit,formState:{errors},reset} = useForm()
  const [loading,setLoading] = useState(false)
    
  const handleAddEmployee = async(data)=>{
    // console.log("data",data)
    try { 
        setLoading(true)
        const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/employee/add-employee`,data,{
          headers:{
            Authorization:`Bearer ${localStorage.getItem("token")}`
          }
        })
        if(response?.data){
           toast.success(response?.data?.message) 
           setInviteLink(response?.data?.data?.inviteLink)
           setStep(2)
        }         
    } catch (error) {
       console.error("Failed to add employee",error)
       toast.error(error?.response?.data?.message || "Internal server error")
    }finally{
      setLoading(false)
    }
  }
  const handleClose = () => {
  setOpen(false);
  setStep(1);
  setInviteLink("");
  reset()
 };

  return (
    <>
      <button onClick={()=> setOpen(true)}  className="w-full  px-5 py-3 cursor-pointer bg-[#1337ec] text-white rounded-lg text-[0.8rem] font-medium hover:bg-[#1337ec]/90 focus:ring-4 focus:ring-[#1337ec]/30 transition-all flex items-center justify-center gap-2">
              <Users2 size={22} /> Add Employee
            </button>
      {/* MODAL */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* BACKDROP */}
          <div
            className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm"
            onClick={() => handleClose()}
          />
          {/* DIALOG */}
          <div  onClick={(e) => e.stopPropagation()} className="relative  w-full max-w-lg bg-white dark:bg-[#161a2d] rounded-2xl shadow-2xl overflow-hidden">
            {
              Step === 1 && (
             <>   
            <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                Add New Employee
              </h3>
              <button
                onClick={() => handleClose()}
                className="text-gray-400 cursor-pointer hover:text-gray-500 dark:hover:text-gray-300"
              >
               <IoMdClose />
              </button>
            </div>
            <form onSubmit={handleSubmit(handleAddEmployee)} className="p-6">
              <div className="space-y-5">
                {/* FULL NAME */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    {...register("name",{required:true})}
                    placeholder="e.g. Robert Fox"
                    className="block w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:ring-2 focus:ring-[#1337ec]/20 focus:border-[#1337ec] transition-all dark:text-white outline-none"
                  />
                </div>
                {errors.name && (
                   <p className="text-red-500 mt-1 text-[0.75rem]">Employee name is required</p>
                )}

                {/* EMAIL */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                    Work Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    {...register("email",{required:true})}
                    placeholder="robert@company.com"
                    className="block w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:ring-2 focus:ring-[#1337ec]/20 focus:border-[#1337ec] transition-all dark:text-white outline-none"
                  />
                </div>
                 {errors.email && (
                   <p className="text-red-500 mt-1 text-[0.75rem]">Employee email is required</p>
                )}
                {/* DEPARTMENT + position */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                      Department
                    </label>
                    <select name="department" {...register("department",{required:true})}  className="block w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:ring-2 focus:ring-[#1337ec]/20 focus:border-[#1337ec] transition-all dark:text-white outline-none">
                      <option value="">Select Department</option>
                      <option value="engineering">Engineering</option>
                      <option value="marketing">Marketing</option>
                      <option value="design">Design</option>
                      <option value="hr">Human Resources</option>
                      <option value="sales">Sales</option>
                      <option value="accounts">Finance / Accounts</option>
                     <option value="customersupport">Customer support</option>
                    </select>
                    {errors.department && (
                   <p className="text-red-500 mt-1 text-[0.75rem]">Department is required</p>
                )}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                      Position
                    </label>
                    <input
                      type="text"
                      name="position"
                      {...register("position",{required:true})}
                      placeholder="e.g. UI Designer"
                      className="block w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:ring-2 focus:ring-[#1337ec]/20 focus:border-[#1337ec] transition-all dark:text-white outline-none"
                    />
                    {errors.position && (
                   <p className="text-red-500 mt-1 text-[0.75rem]">Employee position is required</p>
                    )}
                  </div>
                  
                </div>
              </div>

              {/* ACTIONS */}
              <div className="mt-8 flex flex-col gap-3">
                <button
                  type="submit"
                  className="w-full cursor-pointer bg-[#1337ec] hover:bg-[#1337ec]/90 text-white px-4 py-3 rounded-xl font-semibold transition-all shadow-lg shadow-[#1337ec]/20 flex items-center justify-center gap-2"
                > 
                 {
                  loading ? (
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
                  <IoMdSend />
                  <span>Create & Generate Invite</span>
                    </>
                
                  )
                 }
                </button>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="w-full cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
            </>
              )
            }
            {
              Step === 2 && (
                <EmployeeAddedSuccess onDone={()=>handleClose()} inviteLink={inviteLink} />
              )
            }
          </div>
        </div>
      )}
    </>
  );
};

export default AddEmployeeDialog;
