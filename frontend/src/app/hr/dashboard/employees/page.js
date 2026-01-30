"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import DashboardHeader from "@/components/hr/DashboardHeader";
import { Users2 } from "lucide-react";
import React, { useState } from "react";
import EmployeesTable from "@/components/hr/EmployeesTable";
import AddEmployeeDialog from "@/components/hr/AddEmployeeDialog";

const page = () => {
  const [selectedDepartment,setSelectedDepartment] = useState("all")
  const [isActive,setIsActive] = useState(true)

  const Alldepartments = [
    "all",
    "engineering",
    "design",
    "sales",
    "marketing",
    "customer support",
    "accounts",
    "hr"
  ]
  return (
    <div className="flex flex-col">
      {/* header */}
      <DashboardHeader />
      <div className="flex px-4 md:px-9 py-4 flex-col gap-5">
        <div className="flex gap-5 md:items-center flex-col md:flex-row  md:justify-between">
          <div className="flex flex-col">
            <span className="text-[1.5rem]  font-bold text-black dark:text-white">
              Employee Directory
            </span>
            <span className="text-sm text-[#4c599a] dark:text-[#a1a7c5] font-normal">
              Manage your organization's workforce,roles,and access
            </span>
          </div>
          <div>
            <AddEmployeeDialog />
          </div>
        </div>
        {/* employee table filters*/}
        <div className="w-full py-4 px-5 bg-white border-gray-300 border rounded-lg ">
          <div className="flex justify-end gap-3">
            <Select onValueChange={(value)=> setSelectedDepartment(value)}>
              <SelectTrigger className="w-full max-w-48">
                <SelectValue placeholder="Select a Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Departments</SelectLabel>
                  {
                    Alldepartments?.map((d,index)=>{
                      return (
                        <SelectItem
                        key={index}
                        className="cursor-pointer"
                        value={d}
                      >
                        {d}
                      </SelectItem>
                      )
                    })
                  }
                </SelectGroup>
              </SelectContent>
            </Select>
            <Select onValueChange={(value)=> setIsActive(value)}>
              <SelectTrigger className="w-full max-w-48">
                <SelectValue placeholder="Select a Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Status</SelectLabel>
                  <SelectItem value={true}>Active</SelectItem>
                  <SelectItem value={false}>In Active</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
         <EmployeesTable selectedDepartment={selectedDepartment} isActive={isActive} />

      </div>
    </div>
  );
};

export default page;
