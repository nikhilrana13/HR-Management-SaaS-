import React from "react";

const AuthLoader = () => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#F5F7FA]">
      {/* Spinner */}
      <div className="relative w-14 h-14">
        <div className="absolute inset-0 rounded-full border-4 border-gray-300"></div>
        <div className="absolute inset-0 rounded-full border-4 border-[#1337ec] border-t-transparent animate-spin"></div>
      </div>

      {/* Text */}
      <p className="mt-4 text-sm font-medium text-gray-500 tracking-wide">
        Checking authentication…
      </p>
    </div>
  );
};

export default AuthLoader;
