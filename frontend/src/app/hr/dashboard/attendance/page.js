"use client";
import AttendanceTable from "@/components/hr/AttendanceTable";
import DashboardHeader from "@/components/hr/DashboardHeader";
import StatsCard from "@/components/hr/StatsCard";
import StatsCardShimmer from "@/components/hr/StatsCardShimmer";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import { Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import { FaRegCheckCircle } from "react-icons/fa";
import { FaUsersLine } from "react-icons/fa6";
import { MdCancel, MdOutlinePendingActions, MdSearch } from "react-icons/md";

const page = () => {
  const [Statsloading, setStatsloading] = useState(false);
  const [StatsCount, setStatsCount] = useState({
    totalemployee: 0,
    present: 0,
    absent: 0,
    halfday: 0,
  });
  //  fetch dashboard stats
  useEffect(() => {
    const fetchStats = async () => {
      try {
        setStatsloading(true);
        const todayDate = new Date().toISOString().split("T")[0];
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/attendance/stats?date=${todayDate}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        );
        if (response?.data?.status === "success") {
          const employees = response?.data?.data?.totalEmployees;
          const present = response?.data?.data?.present;
          const absent = response?.data?.data?.absent;
          const halfday = response?.data?.data?.halfday;
          setStatsCount((prev) => ({
            ...prev,
            absent: absent,
            totalemployee: employees,
            present: present,
            halfday: halfday,
          }));
        }
      } catch (error) {
        console.error("Failed to get dashboard stats", error);
      } finally {
        setStatsloading(false);
      }
    };
    fetchStats();
  }, []);
  const stats = [
    {
      title: "Total Employees",
      value: StatsCount.totalemployee || 0,
      icon: FaUsersLine,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      title: "Present Today",
      value: StatsCount.present || 0,
      icon: FaRegCheckCircle,
      iconBg: "bg-emerald-50",
      iconColor: "text-emerald-500",
    },
    {
      title: "Absent",
      value: StatsCount.absent || 0,
      icon: MdCancel,
      iconBg: "bg-rose-50",
      iconColor: "text-rose-500",
    },
    {
      title: "Halfday",
      value: StatsCount.halfday || 0,
      icon: MdOutlinePendingActions,
      iconBg: "bg-amber-50",
      iconColor: "text-amber-500",
    },
  ];
  return (
    <div className="flex flex-col">
      {/* header */}
      <DashboardHeader />
      <div className="flex flex-col gap-5 px-4 md:px-9 py-4">
        <div className="flex gap-5 md:items-center flex-col md:flex-row  md:justify-between">
          <div className="flex flex-col">
            <span className="text-[1.5rem]  font-bold text-black dark:text-white">
              Attendance Management
            </span>
            <span className="text-sm text-[#4c599a] dark:text-[#a1a7c5] font-normal">
              Monitor daily presence, late arrivals, and employee work in hours
              in real time
            </span>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            LIVE UPDATES ACTIVE
          </span>
        </div>
        {/* attendance content */}
        <div className="flex  flex-col gap-">
          {/* attendance card */}
          {/* stats cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {Statsloading ? (
              <>
                {[1, 2, 3, 4].map((_, index) => {
                  return <StatsCardShimmer key={index} />;
                })}
              </>
            ) : (
              stats?.map((item, index) => {
                const Icon = item.icon;
                return (
                  <StatsCard
                    key={index}
                    title={item.title}
                    value={item.value}
                    iconBg={item.iconBg}
                    iconColor={item.iconColor}
                    Icon={Icon}
                  />
                );
              })
            )}
          </div>
          {/* attendance table filters*/}
          <AttendanceTable />
        </div>
      </div>
    </div>
  );
};

export default page;
