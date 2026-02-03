"use client";
import { useEffect, useState } from "react";



const TimeCircle = () => {
    const [time,setTime] = useState(new Date())

   useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date())
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const seconds = time.getSeconds()
  const minutes = time.getMinutes()
  const hours = time.getHours()

  const radius = 56;
  const circumference = 2*Math.PI * radius

 // seconds based progress
  const progress = seconds / 60;
  const offset = circumference - progress * circumference;

  return (
    <div className="relative w-32 h-32 flex items-center justify-center">
      {/* Circle */}
      <svg className="absolute w-full h-full rotate-[-90deg]">
        {/* Background */}
        <circle
          cx="64"
          cy="64"
          r={radius}
          stroke="#1337ec"
          strokeWidth="8"
          fill="none"
          opacity="0.1"
        />
        {/* Progress seconds */}
        <circle
          cx="64"
          cy="64"
          r={radius}
          stroke="#1337ec"
          strokeWidth="8"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-1000 linear"
        />
      </svg>
      {/* time */}
       <div className="absolute inset-4 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl font-black tracking-wider">
            {String(hours).padStart(2, "0")}:
            {String(minutes).padStart(2, "0")}:
            {String(seconds).padStart(2, "0")}
          </p>
          <p className="text-[10px] uppercase text-gray-400 font-bold mt-1">
            Current Time
          </p>
        </div>
        </div>
    </div>
  );
};
export default TimeCircle;
